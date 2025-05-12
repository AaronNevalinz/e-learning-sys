package com.e_learning.service;

import com.e_learning.dto.*;
import com.e_learning.exception.ResourceNotFoundException;
import com.e_learning.model.*;
import com.e_learning.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TestService {

    private final TopicRepository topicRepository;
    private final QuestionRepository questionRepository;
    private final AnswerOptionRepository answerOptionRepository;
    private final UserRepository userRepository;
    private final TestAttemptRepository testAttemptRepository;
    private final UserTopicProgressRepository userTopicProgressRepository;

    public TestService(TopicRepository topicRepository, QuestionRepository questionRepository,
                       AnswerOptionRepository answerOptionRepository,
                       UserRepository userRepository, TestAttemptRepository testAttemptRepository,
                       UserTopicProgressRepository userTopicProgressRepository) {

        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.answerOptionRepository = answerOptionRepository;
        this.userRepository = userRepository;
        this.testAttemptRepository = testAttemptRepository;
        this.userTopicProgressRepository = userTopicProgressRepository;
    }

    @Transactional
    public Question addQuestionWithAnswers(Long topicId, QuestionDTO dto) {
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found with ID: " + topicId));

        Question question = new Question();
        question.setContent(dto.getContent());
        question.setMultipleAnswersAllowed(Boolean.TRUE.equals(dto.getMultipleAnswersAllowed()));
        question.setTopic(topic);

        // Save question first to ensure it has an ID for the FK in AnswerOption
        Question savedQuestion = questionRepository.save(question);

        if (dto.getAnswerOptions() != null) {
            for (AnswerOptionDTO optionDTO : dto.getAnswerOptions()) {
                AnswerOption option = new AnswerOption();
                option.setAnswerText(optionDTO.getAnswerText());
                option.setCorrect(Boolean.TRUE.equals(optionDTO.getCorrect()));
                option.setQuestion(savedQuestion);
                answerOptionRepository.save(option); // or use a cascade
            }
        }

        return savedQuestion;
    }


    public List<QuestionResponseDTO> getQuestionsByTopicId(Long topicId) {
        List<Question> questions = questionRepository.findByTopicIdWithAnswers(topicId);

        return questions.stream().map(question -> {
            QuestionResponseDTO dto = new QuestionResponseDTO();
            dto.setId(question.getId());
            dto.setContent(question.getContent());
            dto.setMultipleAnswersAllowed(question.isMultipleAnswersAllowed());

            List<AnswerOptionResponseDTO> options = question.getAnswerOptions().stream().map(opt -> {
                AnswerOptionResponseDTO optionDTO = new AnswerOptionResponseDTO();
                optionDTO.setId(opt.getId());
                optionDTO.setAnswerText(opt.getAnswerText());
                optionDTO.setCorrect(opt.isCorrect());
                return optionDTO;
            }).collect(Collectors.toList());

            dto.setAnswerOptions(options);
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public double submitTestAnswers(BulkTestSubmissionDTO bulkDto) {
        User user = userRepository.findById(bulkDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (bulkDto.getSubmissions().isEmpty()) {
            throw new IllegalArgumentException("No submissions found.");
        }

        // Fetch the question and ensure the Topic is managed
        Question firstQuestion = questionRepository.findById(bulkDto.getSubmissions().get(0).getQuestionId())
                .orElseThrow(() -> new RuntimeException("First question not found"));

        Topic topic = topicRepository.findById(firstQuestion.getTopic().getId())
                .orElseThrow(() -> new RuntimeException("Topic not found")); // Fetching ensures the topic is managed

        // Get or create attempt
        TestAttempt attempt = testAttemptRepository.findByUserAndTopic(user, topic)
                .orElseGet(() -> {
                    TestAttempt newAttempt = new TestAttempt();
                    newAttempt.setUser(user);
                    newAttempt.setTopic(topic); // now it's a managed Topic
                    return newAttempt;
                });

        attempt.setSubmittedAt(LocalDateTime.now());

        // Clear old submissions
        if (attempt.getSubmissions() != null && !attempt.getSubmissions().isEmpty()) {
            for (TestSubmission submission : new ArrayList<>(attempt.getSubmissions())) {
                submission.setTestAttempt(null);
            }
            attempt.getSubmissions().clear();
        } else {
            attempt.setSubmissions(new ArrayList<>());
        }

        double totalScore = 0;

        for (TestSubmissionDTO dto : bulkDto.getSubmissions()) {
            Question question = questionRepository.findById(dto.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            Long selectedId = dto.getSelectedAnswerId();
            List<Long> correctAnswerIds = question.getAnswerOptions().stream()
                    .filter(AnswerOption::isCorrect)
                    .map(AnswerOption::getId)
                    .toList();

            boolean isCorrect = correctAnswerIds.size() == 1 && correctAnswerIds.contains(selectedId);
            double score = isCorrect ? 1.0 : 0.0;

            TestSubmission submission = new TestSubmission();
            submission.setTestAttempt(attempt);
            submission.setQuestion(question);
            submission.setSelectedAnswerId(selectedId);
            submission.setCorrect(isCorrect);
            submission.setScore(score);

            attempt.getSubmissions().add(submission);
            totalScore += score;
        }

        double percentage = (bulkDto.getSubmissions().size() == 0) ? 0 : (totalScore / bulkDto.getSubmissions().size()) * 100;
        boolean passed = percentage >= 50.0;

        attempt.setScore(totalScore);
        attempt.setPassed(passed);

        testAttemptRepository.save(attempt);

        // Save progress if passed
        if (passed) {
            UserTopicProgress progress = userTopicProgressRepository
                    .findByUserAndTopic(user, topic)
                    .orElseGet(() -> {
                        UserTopicProgress newProgress = new UserTopicProgress();
                        newProgress.setUser(user);
                        newProgress.setTopic(topic); // again, a managed topic
                        return newProgress;
                    });

            progress.setCompleted(true);
            progress.setCompletedAt(LocalDateTime.now());
            userTopicProgressRepository.save(progress);
        }

        return totalScore;
    }

    public List<TestAttemptDTO> getTestResultsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<TestAttempt> attempts = testAttemptRepository.findByUser(user);

        return attempts.stream()
                .map(attempt -> new TestAttemptDTO(
                        attempt.getId(),
                        attempt.getTopic().getTitle(),
                        attempt.getScore(),
                        attempt.isPassed(),
                        attempt.getSubmittedAt()
                ))
                .toList();
    }

    public TestAttemptDTO getTestResultById(Long userId, Long resultId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        TestAttempt attempt = testAttemptRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Test result not found with id: " + resultId));

        // Ensure the result belongs to the authenticated user
        if (!attempt.getUser().getId().equals(userId)) {
            throw new RuntimeException("Access denied: Test result does not belong to the authenticated user.");
        }

        return new TestAttemptDTO(
                attempt.getId(),
                attempt.getTopic().getTitle(),
                attempt.getScore(),
                attempt.isPassed(),
                attempt.getSubmittedAt()
        );
    }

    public TestAttemptDTO getTestResultByTopic(Long userId, Long topicId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + topicId));

        TestAttempt attempt = testAttemptRepository.findByUserAndTopic(user, topic)
                .orElseThrow(() -> new ResourceNotFoundException("No test attempt found for the given topic and user."));

        return new TestAttemptDTO(
                attempt.getId(),
                attempt.getTopic().getTitle(),
                attempt.getScore(),
                attempt.isPassed(),
                attempt.getSubmittedAt()
        );
    }


    @Transactional
    public Question updateQuestionWithAnswers(Long questionId, QuestionDTO dto) {
        Question existing = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with ID: " + questionId));

        // Only update non-null fields (partial update)
        if (dto.getContent() != null) {
            existing.setContent(dto.getContent());
        }

        if (dto.getMultipleAnswersAllowed() != null) {
            existing.setMultipleAnswersAllowed(dto.getMultipleAnswersAllowed());
        }

        // Only replace answer options if provided
        if (dto.getAnswerOptions() != null) {
            answerOptionRepository.deleteAll(existing.getAnswerOptions());
            existing.getAnswerOptions().clear();

            for (AnswerOptionDTO optionDTO : dto.getAnswerOptions()) {
                AnswerOption option = new AnswerOption();
                option.setAnswerText(optionDTO.getAnswerText());
                option.setCorrect(Boolean.TRUE.equals(optionDTO.getCorrect()));
                option.setQuestion(existing);
                existing.getAnswerOptions().add(option);
            }
        }
        return questionRepository.save(existing);
    }

    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with ID: " + questionId));

        questionRepository.delete(question);
    }
}


