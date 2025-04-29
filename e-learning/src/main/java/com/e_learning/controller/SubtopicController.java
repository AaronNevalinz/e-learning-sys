package com.e_learning.controller;

import com.e_learning.model.Subtopic;
import com.e_learning.service.ResponseService;
import com.e_learning.service.SubtopicService;
import jakarta.validation.Valid;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/subtopics")   //http://localhost:8000/api/v1/subtopics/topic/1
public class SubtopicController {

    private final SubtopicService subtopicService;
    private final ResponseService responseService;

    public SubtopicController(SubtopicService subtopicService, ResponseService responseService) {
        this.subtopicService = subtopicService;
        this.responseService = responseService;
    }

    @PostMapping("/topic/{topicId}")
    public ResponseEntity<Map<String, Object>> createSubtopic(@PathVariable Long topicId, @RequestBody Subtopic subtopic) {
        Subtopic created = subtopicService.createSubtopic(topicId, subtopic);
        return responseService.createSuccessResponse(201, created, HttpStatus.CREATED);
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<Map<String, Object>> getSubtopicsByTopic(@PathVariable Long topicId) {
        List<Subtopic> subtopics = subtopicService.getSubtopicsByTopicId(topicId);
        return responseService.createSuccessResponse(200, subtopics, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateSubtopic(@Valid @PathVariable Long id, @RequestBody Subtopic updated) {
        Subtopic subtopic = subtopicService.updateSubtopic(id, updated);
        return responseService.createSuccessResponse(200, subtopic, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteSubtopic(@PathVariable Long id) {
        subtopicService.deleteSubtopic(id);
        return responseService.createSuccessResponse(200, "Subtopic deleted successfully", HttpStatus.OK);
    }
}

