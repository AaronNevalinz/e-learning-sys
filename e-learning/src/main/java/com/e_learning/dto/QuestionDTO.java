package com.e_learning.dto;


import java.util.List;

public class QuestionDTO {
    private String content;
    private Boolean multipleAnswersAllowed = false;
    private List<AnswerOptionDTO> answerOptions;
    // Getters and Setters

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

    public List<AnswerOptionDTO> getAnswerOptions() {
        return answerOptions;
    }

    public void setAnswerOptions(List<AnswerOptionDTO> answerOptions) {
        this.answerOptions = answerOptions;
    }
}