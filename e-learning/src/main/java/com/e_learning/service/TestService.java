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


    // The goal is to submit a test, calculate the score, save the attempt, and mark the user’s progress if they pass.
    // A student (user) submits answers to a test. This method checks the answers, calculates the score, and saves the result. If they pass, it marks the topic as completed.
    @Transactional
    public double submitTestAnswers(BulkTestSubmissionDTO bulkDto) {
        User user = userRepository.findById(bulkDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Safety check: If the user didn’t submit any answers, throw an error.
        if (bulkDto.getSubmissions().isEmpty()) {
            throw new IllegalArgumentException("No submissions found.");
        }

        // - Get the **first question** from the submitted answers.
        //- We use it to figure out **which topic** this test is about.
        Question firstQuestion = questionRepository.findById(bulkDto.getSubmissions().get(0).getQuestionId())
                .orElseThrow(() -> new RuntimeException("First question not found"));

        Topic topic = topicRepository.findById(firstQuestion.getTopic().getId())
                .orElseThrow(() -> new RuntimeException("Topic not found")); // Fetching ensures the topic is managed

        // - Checks if the user already has an attempt for this topic.
        //- If yes → reuse it.
        //- If no → create a **new attempt** and associate it with the user and topic.
        TestAttempt attempt = testAttemptRepository.findByUserAndTopic(user, topic)
                .orElseGet(() -> {
                    TestAttempt newAttempt = new TestAttempt();
                    newAttempt.setUser(user);
                    newAttempt.setTopic(topic); // now it's a managed Topic
                    return newAttempt;
                });
        // Record the timestamp when this test was submitted.
        attempt.setSubmittedAt(LocalDateTime.now());

        // Clear old submissions
        // - If the attempt already has answers from a previous submission:
        //  - **Disconnect** them (break the reference to `TestAttempt`)
        //  - **Clear the list**, making room for new answers.
        //- Else: initialize an empty list.
        //
        //Why?
        //> We don’t want to mix **old answers** with the **new answers** being submitted now.
        if (attempt.getSubmissions() != null && !attempt.getSubmissions().isEmpty()) {
            for (TestSubmission submission : new ArrayList<>(attempt.getSubmissions())) {
                submission.setTestAttempt(null);
            }
            attempt.getSubmissions().clear();
        } else {
            attempt.setSubmissions(new ArrayList<>());
        }

        double totalScore = 0;

        // looping through each answer for every answer submitted by the user...
        for (TestSubmissionDTO dto : bulkDto.getSubmissions()) {
            // - Load the actual question from the database.
            Question question = questionRepository.findById(dto.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            Long selectedId = dto.getSelectedAnswerId();
            List<Long> correctAnswerIds = question.getAnswerOptions().stream()
                    .filter(AnswerOption::isCorrect)
                    .map(AnswerOption::getId)
                    .toList();

            // - Check if the selected answer is **exactly** the correct one.
            //- It assumes questions only have **one correct answer**.
            boolean isCorrect = correctAnswerIds.size() == 1 && correctAnswerIds.contains(selectedId);
            // If the user got it right → give 1 point. Else → 0.
            double score = isCorrect ? 1.0 : 0.0;

            // Create a new submission record with all the relevant info.
            TestSubmission submission = new TestSubmission();
            submission.setTestAttempt(attempt);
            submission.setQuestion(question);
            submission.setSelectedAnswerId(selectedId);
            submission.setCorrect(isCorrect);
            submission.setScore(score);

            attempt.getSubmissions().add(submission);
            // - Add this answer to the attempt.
            //- Add this question’s score to the total.
            totalScore += score;
        }

        // Calculate percentage + pass/fail:
        // Compute how much the user scored as a percentage.
        // Consider them passed if they got 50% or more.
        double percentage = (bulkDto.getSubmissions().size() == 0) ? 0 : (totalScore / bulkDto.getSubmissions().size()) * 100;
        boolean passed = percentage >= 50.0;

        attempt.setScore(totalScore);
        attempt.setPassed(passed);

        testAttemptRepository.save(attempt);  // - Save the final result of the attempt.

        // Save progress if passed
        // Mark topic as completed if passed:
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

            //If the user passed:
               //Check if progress already exists → reuse or create.
               //Mark the topic as completed.
            //Save it.
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


