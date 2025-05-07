package com.e_learning.dto;

import java.time.LocalDateTime;

public class CourseCommentResponse {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String username;
    private String profilePicture;

    public CourseCommentResponse(Long id, String content, LocalDateTime createdAt, String username, String profilePicture) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.username = username;
        this.profilePicture = profilePicture;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getUsername() {
        return username;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}

