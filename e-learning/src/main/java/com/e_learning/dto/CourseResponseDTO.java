package com.e_learning.dto;

import java.time.LocalDateTime;

public class CourseResponseDTO {
    private Long courseId;
    private String imageUrl;
    private String courseTitle;
    //private LocalDateTime createdAt;
    private String courseDescription;

    private int courseTopicCount;
    private int courseSubtopicCount;

    private long courseUpvoteCount;
    private long courseDownvoteCount;
    private long courseCommentCount;
    private boolean published;




    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getCourseTopicCount() {
        return courseTopicCount;
    }

    public void setCourseTopicCount(int courseTopicCount) {
        this.courseTopicCount = courseTopicCount;
    }

    public int getCourseSubtopicCount() {
        return courseSubtopicCount;
    }

    public void setCourseSubtopicCount(int courseSubtopicCount) {
        this.courseSubtopicCount = courseSubtopicCount;
    }

    public long getCourseUpvoteCount() {
        return courseUpvoteCount;
    }

    public void setCourseUpvoteCount(long courseUpvoteCount) {
        this.courseUpvoteCount = courseUpvoteCount;
    }

    public long getCourseDownvoteCount() {
        return courseDownvoteCount;
    }

    public void setCourseDownvoteCount(long courseDownvoteCount) {
        this.courseDownvoteCount = courseDownvoteCount;
    }

    public long getCourseCommentCount() {
        return courseCommentCount;
    }

    public void setCourseCommentCount(long courseCommentCount) {
        this.courseCommentCount = courseCommentCount;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
}


