package com.e_learning.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e_learning.model.Badge;
import com.e_learning.repository.BadgeRepository;
import com.e_learning.service.BadgeService;
import com.e_learning.service.ResponseService;


@RestController
@RequestMapping("/api/v1/badge")
public class BadgeController {
    private final BadgeRepository badgeRepository;
    private final ResponseService responseService;
    private final BadgeService badgeService;
    public BadgeController(BadgeRepository badgeRepository, BadgeService badgeService, ResponseService responseService) {
        this.badgeRepository = badgeRepository;
        this.badgeService = badgeService;
        this.responseService = responseService;
    }
    @PostMapping()
    public ResponseEntity<Map<String, Object>> createBadge(@RequestBody Badge badge) {
        Badge created = badgeService.saveBadge(badge);
        return responseService.createSuccessResponse(201, created, HttpStatus.CREATED);
    }    
}
