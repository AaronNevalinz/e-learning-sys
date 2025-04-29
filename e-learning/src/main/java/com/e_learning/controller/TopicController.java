package com.e_learning.controller;

import com.e_learning.model.Topic;
import com.e_learning.service.ResponseService;
import com.e_learning.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/topics")
public class TopicController {

    private final TopicService topicService;
    private final ResponseService responseService;

    public TopicController(TopicService topicService, ResponseService responseService) {
        this.topicService = topicService;
        this.responseService = responseService;
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity<Map<String, Object>> createTopic(@PathVariable Long courseId, @RequestBody Topic topic) {
        Topic saved = topicService.createTopic(courseId, topic);
        return responseService.createSuccessResponse(201, saved, HttpStatus.CREATED);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<Map<String, Object>> getTopicsByCourse(@PathVariable Long courseId) {
        List<Topic> topics = topicService.getTopicsByCourse(courseId);
        return responseService.createSuccessResponse(200, topics, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateTopic(@Valid @PathVariable Long id, @RequestBody Topic topic) {
        Topic updated = topicService.updateTopic(id, topic);
        return responseService.createSuccessResponse(200, updated, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
        return responseService.createSuccessResponse(200, "Topic deleted successfully", HttpStatus.OK);
    }

}

