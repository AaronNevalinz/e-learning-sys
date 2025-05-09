package com.e_learning.controller;

import com.e_learning.dto.UserCourseProgressDTO;
import com.e_learning.service.ResponseService;
import com.e_learning.service.UserCourseProgressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/progress")
public class ProgressController {

    private final UserCourseProgressService progressService;
    private final ResponseService responseService;

    public ProgressController(UserCourseProgressService progressService, ResponseService responseService) {
        this.progressService = progressService;
        this.responseService = responseService;
    }

    @GetMapping("/courseId/{courseId}")
    public ResponseEntity<Map<String, Object>> getUserCourseProgress(
            @PathVariable Long courseId,
            Principal principal) {

        UserCourseProgressDTO progress = progressService.getProgress(principal.getName(), courseId);
        return responseService.createSuccessResponse(200, progress, HttpStatus.OK);
    }

}

