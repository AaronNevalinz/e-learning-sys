package com.e_learning.dto;

public class AnswerOptionResponseDTO {
    private Long id;
    private String answerText;
    private Boolean isCorrect;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }


    public Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
    }
}

