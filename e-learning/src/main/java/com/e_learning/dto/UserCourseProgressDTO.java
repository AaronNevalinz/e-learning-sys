package com.e_learning.dto;

import java.util.List;

public class UserCourseProgressDTO {
    private Long courseId;
    private String courseTitle;
    private int totalTopics;
    private int completedTopics;
    private double progressPercentage;
    private List<TopicProgressDTO> topics;

    // Getters and Setters
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

    public int getTotalTopics() {
        return totalTopics;
    }

    public void setTotalTopics(int totalTopics) {
        this.totalTopics = totalTopics;
    }

    public int getCompletedTopics() {
        return completedTopics;
    }

    public void setCompletedTopics(int completedTopics) {
        this.completedTopics = completedTopics;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public List<TopicProgressDTO> getTopics() {
        return topics;
    }

    public void setTopics(List<TopicProgressDTO> topics) {
        this.topics = topics;
    }

    // Static nested class
    public static class TopicProgressDTO {
        private Long topicId;
        private String topicTitle;
        private boolean completed;

        // Getters and Setters
        public Long getTopicId() {
            return topicId;
        }

        public void setTopicId(Long topicId) {
            this.topicId = topicId;
        }

        public String getTopicTitle() {
            return topicTitle;
        }

        public void setTopicTitle(String topicTitle) {
            this.topicTitle = topicTitle;
        }

        public boolean isCompleted() {
            return completed;
        }

        public void setCompleted(boolean completed) {
            this.completed = completed;
        }
    }
}


