package com.e_learning.dto;

import java.util.List;

public class TestSubmissionDTO {
    private Long questionId;
    private List<Long> selectedAnswerIds;
    private Long userId; // <-- Add this to carry the user reference

    public TestSubmissionDTO() {}

    public TestSubmissionDTO(Long questionId, List<Long> selectedAnswerIds, Long userId) {
        this.questionId = questionId;
        this.selectedAnswerIds = selectedAnswerIds;
        this.userId = userId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public List<Long> getSelectedAnswerIds() {
        return selectedAnswerIds;
    }

    public void setSelectedAnswerIds(List<Long> selectedAnswerIds) {
        this.selectedAnswerIds = selectedAnswerIds;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
