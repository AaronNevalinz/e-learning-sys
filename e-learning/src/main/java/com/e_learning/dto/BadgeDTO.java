package com.e_learning.dto;

public class BadgeDTO {
    private String name;
    private String icon;
    private String description;

    // Constructor, Getters, and Setters
    public BadgeDTO(String name, String icon) {
        this.name = name;
        this.icon = icon;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
