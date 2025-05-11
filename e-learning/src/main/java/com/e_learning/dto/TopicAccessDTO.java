package com.e_learning.dto;

import java.util.List;

public class TopicAccessDTO {
    private Long id;
    private String title;
    private String description;
    private int orderInCourse;
    private boolean locked;
    private List<SubtopicDTO> subtopics;

    // Updated constructor with subtopics
    public TopicAccessDTO(Long id, String title, String description, int orderInCourse, boolean locked, List<SubtopicDTO> subtopics) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.orderInCourse = orderInCourse;
        this.locked = locked;
        this.subtopics = subtopics;
    }

    // Getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOrderInCourse() {
        return orderInCourse;
    }

    public void setOrderInCourse(int orderInCourse) {
        this.orderInCourse = orderInCourse;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public List<SubtopicDTO> getSubtopics() {
        return subtopics;
    }

    public void setSubtopics(List<SubtopicDTO> subtopics) {
        this.subtopics = subtopics;
    }
}


