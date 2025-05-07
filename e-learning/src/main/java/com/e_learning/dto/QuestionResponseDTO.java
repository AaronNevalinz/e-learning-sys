package com.e_learning.dto;

import java.util.List;

public class QuestionResponseDTO {
    private Long id;
    private String content;
    private Boolean multipleAnswersAllowed;
    private List<AnswerOptionResponseDTO> answerOptions;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getMultipleAnswersAllowed() {
        return multipleAnswersAllowed;
    }

    public void setMultipleAnswersAllowed(Boolean multipleAnswersAllowed) {
        this.multipleAnswersAllowed = multipleAnswersAllowed;
    }

    public List<AnswerOptionResponseDTO> getAnswerOptions() {
        return answerOptions;
    }

    public void setAnswerOptions(List<AnswerOptionResponseDTO> answerOptions) {
        this.answerOptions = answerOptions;
    }
}

