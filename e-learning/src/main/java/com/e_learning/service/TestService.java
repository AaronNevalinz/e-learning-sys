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
    private final UserAnswerRepository userAnswerRepository;
    private final TestSubmissionRepository testSubmissionRepository;
    private final UserRepository userRepository;
    private final TestAttemptRepository testAttemptRepository;

    public TestService(TopicRepository topicRepository, QuestionRepository questionRepository,
                       AnswerOptionRepository answerOptionRepository, UserAnswerRepository userAnswerRepository,
                       TestSubmissionRepository testSubmissionRepository,
                       UserRepository userRepository, TestAttemptRepository testAttemptRepository) {

        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.answerOptionRepository = answerOptionRepository;
        this.userAnswerRepository = userAnswerRepository;
        this.testSubmissionRepository = testSubmissionRepository;
        this.userRepository = userRepository;
        this.testAttemptRepository = testAttemptRepository;
    }

//    public Test createTest(Long topicId, String testTitle) {
//        Topic topic = topicRepository.findById(topicId)
//                .orElseThrow(() -> new ResourceNotFoundException("Topic not found"));
//
//        Test test = new Test();
//        test.setTitle(testTitle);
//        test.setTopic(topic);
//        return questionRepository.save(test);
//    }


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



    public double submitTestAnswers(BulkTestSubmissionDTO bulkDto) {
        User user = userRepository.findById(bulkDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        TestAttempt attempt = new TestAttempt();
        attempt.setUser(user);
        attempt.setSubmittedAt(LocalDateTime.now());

        List<TestSubmission> submissions = new ArrayList<>();
        double totalScore = 0;

        for (TestSubmissionDTO dto : bulkDto.getSubmissions()) {
            Question question = questionRepository.findById(dto.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            List<Long> selectedIds = dto.getSelectedAnswerIds();
            List<Long> correctAnswerIds = question.getAnswerOptions().stream()
                    .filter(AnswerOption::isCorrect)
                    .map(AnswerOption::getId)
                    .toList();

            boolean isCorrect = new HashSet<>(selectedIds).equals(new HashSet<>(correctAnswerIds));
            double score = isCorrect ? 1.0 : 0.0;

            TestSubmission submission = new TestSubmission();
            submission.setTestAttempt(attempt);
            submission.setQuestion(question);
            submission.setSelectedAnswer(
                    selectedIds.stream().map(String::valueOf).collect(Collectors.joining(","))
            );
            submission.setCorrect(isCorrect);
            submission.setScore(score);

            submissions.add(submission);
            totalScore += score;
        }

        attempt.setSubmissions(submissions);
        testAttemptRepository.save(attempt); // Cascade saves submissions if mapped correctly
        return totalScore;
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


