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










//    public Question getTestByTopic(Long topicId) {
//        return questionRepository.findByTopicId(topicId)
//                .orElseThrow(() -> new RuntimeException("No test found for topic with ID: " + topicId));
//    }


//    public Question addQuestion(Long testId, String content, Boolean multiAnswer) {
//        Test test = testRepository.findById(testId)
//                .orElseThrow(() -> new ResourceNotFoundException("Test not found"));
//
//        Question question = new Question();
//        question.setTest(test);
//        question.setContent(content);
//        question.setMultipleAnswersAllowed(multiAnswer);
//
//        return questionRepository.save(question);
//    }

//    public Question addQuestion(Long testId, String content, Boolean multipleAnswersAllowed) {
//        Question question = new Question();
//        question.setContent(content);
//        question.setTest(testRepository.findById(testId)
//                .orElseThrow(() -> new RuntimeException("Test not found")));
//
//        // Default to false if null
//        question.setMultipleAnswersAllowed(multipleAnswersAllowed != null && multipleAnswersAllowed);
//
//        return questionRepository.save(question);
//    }


//    public AnswerOption addAnswerOption(Long questionId, String text, Boolean isCorrect) {
//        Question question = questionRepository.findById(questionId)
//                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
//
//        if (!question.isMultipleAnswersAllowed() && isCorrect) {
//            boolean alreadyHasCorrect = answerOptionRepository.existsByQuestionIdAndIsCorrectTrue(questionId);
//            if (alreadyHasCorrect) {
//                throw new IllegalStateException("Only one correct answer is allowed for this question.");
//            }
//        }
//
//        AnswerOption option = new AnswerOption();
//        option.setQuestion(question);
//        option.setAnswerText(text);
//        option.setCorrect(isCorrect);
//
//        return answerOptionRepository.save(option);
//    }

//    public TestSubmission submitTest(Long testId, Long userId, Map<Long, List<Long>> questionAnswersMap) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
//
//        Test test = testRepository.findById(testId)
//                .orElseThrow(() -> new ResourceNotFoundException("Test not found"));
//
//        int correctAnswers = 0;
//        int totalQuestions = 0;
//
//        TestSubmission submission = new TestSubmission();
//        submission.setTest(test);
//        submission.setUser(user);
//        submission.setSubmittedAt(LocalDateTime.now());
//        submission = testSubmissionRepository.save(submission);
//
//        for (Map.Entry<Long, List<Long>> entry : questionAnswersMap.entrySet()) {
//            Long questionId = entry.getKey();
//            List<Long> selectedAnswerIds = entry.getValue();
//
//            Question question = questionRepository.findById(questionId)
//                    .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
//
//            // Fetch correct answers
//            List<AnswerOption> correctOptions = answerOptionRepository.findByQuestionIdAndIsCorrectTrue(questionId);
//            Set<Long> correctIds = correctOptions.stream().map(AnswerOption::getId).collect(Collectors.toSet());
//
//            // Enforce: multiple-answer questions must have at least 2 correct options
//            if (question.isMultipleAnswersAllowed() && correctIds.size() < 2) {
//                throw new IllegalStateException("Question marked as allowing multiple correct answers must have at least 2 correct options.");
//            }
//
//            // Compare selected vs correct
//            Set<Long> selectedIds = new HashSet<>(selectedAnswerIds);
//            if (correctIds.equals(selectedIds)) {
//                correctAnswers++;
//            }
//
//            // Fetch selected AnswerOption entities
//            List<AnswerOption> selectedOptions = selectedAnswerIds.stream()
//                    .map(id -> answerOptionRepository.findById(id)
//                            .orElseThrow(() -> new ResourceNotFoundException("Answer not found")))
//                    .collect(Collectors.toList());
//
//            // Save UserAnswer
//            UserAnswer userAnswer = new UserAnswer();
//            userAnswer.setUser(user);
//            userAnswer.setSubmission(submission);
//            userAnswer.setQuestion(question);
//            userAnswer.setSelectedOptions(selectedOptions);
//            userAnswerRepository.save(userAnswer);
//
//            totalQuestions++;
//        }
//
//
//        submission.setScore((double) correctAnswers / totalQuestions * 100);
//        return testSubmissionRepository.save(submission);
//    }

//    public List<TestSubmission> getUserSubmissions(Long userId) {
//        return testSubmissionRepository.findByUserId(userId);
//    }
//
//    public List<TestSubmission> getSubmissionsByTest(Long testId) {
//        return testSubmissionRepository.findByTestId(testId);
//    }
//
//    public TestSubmission getSubmissionDetails(Long submissionId) {
//        return testSubmissionRepository.findById(submissionId)
//                .orElseThrow(() -> new ResourceNotFoundException("Submission not found"));
//    }
//
//    public List<Question> getQuestionsByTest(Long testId) {
//        return questionRepository.findByTestId(testId);
//    }
//
//    public List<AnswerOption> getAnswersByQuestion(Long questionId) {
//        return answerOptionRepository.findByQuestionId(questionId);
//    }
}


