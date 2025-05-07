package com.e_learning.controller;

import com.e_learning.dto.*;
import com.e_learning.model.AnswerOption;
import com.e_learning.model.Question;
import com.e_learning.model.TestAttempt;
import com.e_learning.model.TestSubmission;
import com.e_learning.service.ResponseService;
import com.e_learning.service.TestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/tests")
public class TestController {

    private final TestService testService;
    private final ResponseService responseService;

    public TestController(TestService testService, ResponseService responseService) {
        this.testService = testService;
        this.responseService = responseService;
    }

//    @PostMapping("/topic/{topicId}")
//    public ResponseEntity<Map<String, Object>> createTest(
//            @PathVariable Long topicId,
//            @RequestBody CreateTestRequest request
//    ) {
//        try {
//            Test test = testService.createTest(topicId, request.getTitle());
//            return responseService.createSuccessResponse(200, test, HttpStatus.CREATED);
//        } catch (RuntimeException ex) {
//            Map<String, String> errors = Map.of("testCreationError", ex.getMessage());
//            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
//        }
//    }

    @PostMapping("/topics/{topicId}/questions")
    public ResponseEntity<Map<String, Object>> addQuestion(
            @PathVariable Long topicId,
            @RequestBody QuestionDTO dto
    ) {
        try {
            Question saved = testService.addQuestionWithAnswers(topicId, dto);
            return responseService.createSuccessResponse(200, saved, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("questionError", ex.getMessage());
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/topics/{topicId}/questions")
    public ResponseEntity<Map<String, Object>> getQuestionsByTopic(@PathVariable Long topicId) {
        try {
            List<QuestionResponseDTO> questions = testService.getQuestionsByTopicId(topicId);
            return responseService.createSuccessResponse(200, questions, HttpStatus.OK);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("fetchError", ex.getMessage());
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }


//    @PostMapping("/submit-tests")
//    public ResponseEntity<Map<String, Object>> submitTests(
//            @RequestBody BulkTestSubmissionDTO bulkDto
//    ) {
//        try {
//            double totalScore = testService.submitTestAnswers(bulkDto);
//            Map<String, Object> result = Map.of("totalScore", totalScore);
//            return responseService.createSuccessResponse(200, result, HttpStatus.OK);
//        } catch (RuntimeException ex) {
//            Map<String, String> errors = Map.of("submissionError", ex.getMessage());
//            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
//        }
//    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitTestAnswers(@RequestBody BulkTestSubmissionDTO bulkDto) {
        if (bulkDto.getUserId() == null || bulkDto.getSubmissions() == null || bulkDto.getSubmissions().isEmpty()) {
            Map<String, String> errors = Map.of("submissionError", "User ID and submissions must not be null or empty");
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }

        try {
            double totalScore = testService.submitTestAnswers(bulkDto);
            Map<String, Object> responseData = Map.of(
                    "message", "Test submitted successfully",
                    "score", totalScore
            );
            return responseService.createSuccessResponse(200, responseData, HttpStatus.OK);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("submissionFailure", ex.getMessage());
            return responseService.createErrorResponse(500, errors, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }







//    @GetMapping("/by-topic/{topicId}")
//    public ResponseEntity<Map<String, Object>> getTestByTopic(@PathVariable Long topicId) {
//        try {
//            Question question = testService.getTestByTopic(topicId);
//            return responseService.createSuccessResponse(200, question, HttpStatus.OK);
//        } catch (RuntimeException ex) {
//            Map<String, String> errors = Map.of("testFetchError", ex.getMessage());
//            return responseService.createErrorResponse(404, errors, HttpStatus.NOT_FOUND);
//        }
//    }

//    @PostMapping("/{testId}/questions")
//    public ResponseEntity<Map<String, Object>> addQuestion(@PathVariable Long testId, @RequestBody QuestionDTO dto) {
//        try {
//            Question question = testService.addQuestion(testId, dto.getContent(), dto.getMultipleAnswersAllowed());
//            return responseService.createSuccessResponse(200, question, HttpStatus.CREATED);
//        } catch (RuntimeException ex) {
//            Map<String, String> errors = Map.of("questionError", ex.getMessage());
//            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
//        }
//    }

//    @PostMapping("/questions/{questionId}/answers")
//    public ResponseEntity<Map<String, Object>> addAnswer(@PathVariable Long questionId, @RequestBody AnswerOptionDTO dto) {
//        try {
//            AnswerOption answer = testService.addAnswerOption(questionId, dto.getAnswerText(), dto.getCorrect());
//            return responseService.createSuccessResponse(200, answer, HttpStatus.CREATED);
//        } catch (RuntimeException ex) {
//            Map<String, String> errors = Map.of("answerError", ex.getMessage());
//            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
//        }
//    }

//    @PostMapping("/{testId}/submit")
//    public ResponseEntity<Map<String, Object>> submitTest(
//            @PathVariable Long testId,
//            @RequestParam Long userId,
//            @RequestBody Map<Long, List<Long>> questionAnswersMap
//    ) {
//        try {
//            TestSubmission submission = testService.submitTest(testId, userId, questionAnswersMap);
//            return responseService.createSuccessResponse(200, submission, HttpStatus.CREATED);
//        } catch (RuntimeException ex) {
//            Map<String, String> errors = Map.of("submissionError", ex.getMessage());
//            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
//        }
//    }

//    @GetMapping("/submissions/user/{userId}")
//    public ResponseEntity<Map<String, Object>> getUserSubmissions(@PathVariable Long userId) {
//        List<TestSubmission> submissions = testService.getUserSubmissions(userId);
//        return responseService.createSuccessResponse(200, submissions, HttpStatus.OK);
//    }
//
//    @GetMapping("/{testId}/submissions")
//    public ResponseEntity<Map<String, Object>> getSubmissionsByTest(@PathVariable Long testId) {
//        List<TestSubmission> submissions = testService.getSubmissionsByTest(testId);
//        return responseService.createSuccessResponse(200, submissions, HttpStatus.OK);
//    }
//
//    @GetMapping("/submissions/{submissionId}")
//    public ResponseEntity<Map<String, Object>> getSubmissionDetails(@PathVariable Long submissionId) {
//        TestSubmission submission = testService.getSubmissionDetails(submissionId);
//        return responseService.createSuccessResponse(200, submission, HttpStatus.OK);
//    }
//
//    @GetMapping("/{testId}/questions")
//    public ResponseEntity<Map<String, Object>> getQuestionsByTest(@PathVariable Long testId) {
//        List<Question> questions = testService.getQuestionsByTest(testId);
//        return responseService.createSuccessResponse(200, questions, HttpStatus.OK);
//    }
//
//    @GetMapping("/questions/{questionId}/answers")
//    public ResponseEntity<Map<String, Object>> getAnswersByQuestion(@PathVariable Long questionId) {
//        List<AnswerOption> answers = testService.getAnswersByQuestion(questionId);
//        return responseService.createSuccessResponse(200, answers, HttpStatus.OK);
//    }
}

