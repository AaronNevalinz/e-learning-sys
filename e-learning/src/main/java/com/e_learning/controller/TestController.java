package com.e_learning.controller;

import com.e_learning.dto.*;
import com.e_learning.model.*;
import com.e_learning.service.ResponseService;
import com.e_learning.service.TestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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


    @GetMapping("/results")
    public ResponseEntity<Map<String, Object>> getTestResults(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal(); // Ensure your `User` implements UserDetails
            List<TestAttemptDTO> results = testService.getTestResultsForUser(user.getId());
            return responseService.createSuccessResponse(200, results, HttpStatus.OK);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("resultFetchError", ex.getMessage());
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/results/{resultId}")
    public ResponseEntity<Map<String, Object>> getTestResultById(
            @PathVariable Long resultId,
            Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal(); // Must implement UserDetails
            TestAttemptDTO result = testService.getTestResultById(user.getId(), resultId);
            return responseService.createSuccessResponse(200, result, HttpStatus.OK);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("resultFetchError", ex.getMessage());
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/results/topic/{topicId}")
    public ResponseEntity<Map<String, Object>> getTestResultByTopicId(
            @PathVariable Long topicId,
            Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal(); // User implements UserDetails
            TestAttemptDTO result = testService.getTestResultByTopic(user.getId(), topicId);
            return responseService.createSuccessResponse(200, result, HttpStatus.OK);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("resultFetchError", ex.getMessage());
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }



    @PutMapping("/update/{questionId}")
    public ResponseEntity<Map<String, Object>> updateQuestion(
            @PathVariable Long questionId,
            @RequestBody QuestionDTO dto
    ) {
        try {
            Question updated = testService.updateQuestionWithAnswers(questionId, dto);
            return responseService.createSuccessResponse(200, updated, HttpStatus.OK);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("updateError", ex.getMessage());
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("/delete/{questionId}")
    public ResponseEntity<Map<String, Object>> deleteQuestion(@PathVariable Long questionId) {
        try {
            testService.deleteQuestion(questionId); // Delegating to service layer
            Map<String, String> response = Map.of("message", "Question deleted successfully");
            return responseService.createSuccessResponse(200, response, HttpStatus.OK);
        } catch (RuntimeException ex) {
            Map<String, String> errors = Map.of("deleteError", ex.getMessage());
            return responseService.createErrorResponse(400, errors, HttpStatus.BAD_REQUEST);
        }
    }

}

