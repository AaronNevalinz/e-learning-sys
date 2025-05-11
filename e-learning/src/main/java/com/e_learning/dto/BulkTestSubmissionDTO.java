package com.e_learning.dto;

import java.util.List;

public class BulkTestSubmissionDTO {
    private Long userId;
    private List<TestSubmissionDTO> submissions;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<TestSubmissionDTO> getSubmissions() {
        return submissions;
    }

    public void setSubmissions(List<TestSubmissionDTO> submissions) {
        this.submissions = submissions;
    }
}

