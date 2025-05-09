package com.e_learning.dto;

import java.util.List;

public class TestSubmissionDTO {
    private Long questionId;
    //private List<Long> selectedAnswerIds;
    private Long selectedAnswerId;
    private Long userId; // <-- Add this to carry the user reference

    public TestSubmissionDTO() {}

    public TestSubmissionDTO(Long questionId, Long selectedAnswerId, Long userId) {
        this.questionId = questionId;
        this.selectedAnswerId = selectedAnswerId;
        this.userId = userId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getSelectedAnswerId() {
        return selectedAnswerId;
    }

    public void setSelectedAnswerId(Long selectedAnswerId) {
        this.selectedAnswerId = selectedAnswerId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
