package com.e_learning.controller;

import com.e_learning.model.Enrollment;
import com.e_learning.service.EnrollmentService;
import com.e_learning.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final ResponseService responseService;

    private EnrollmentController(EnrollmentService enrollmentService, ResponseService responseService){
        this.enrollmentService = enrollmentService;
        this.responseService = responseService;
    }

    @PostMapping("/{userId}/enroll/{courseId}")
    public ResponseEntity<Map<String, Object>> enrollUser(@PathVariable Long userId, @PathVariable Long courseId) {
        try {
            Enrollment enrollment = enrollmentService.enrollUser(userId, courseId);
            return responseService.createSuccessResponse(0, enrollment, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            Map<String, String[]> errors = new HashMap<>();
            errors.put("enrollmentError", new String[]{ex.getMessage()});
            return responseService.createErrorResponse(1, errors, HttpStatus.BAD_REQUEST);
        }
    }
}
