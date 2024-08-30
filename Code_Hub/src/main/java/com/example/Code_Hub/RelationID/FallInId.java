package com.example.Code_Hub.RelationID;

import java.io.Serializable;

public class FallInId implements Serializable {
    private Long problem; // Corresponds to the problem foreign key
    private Long category;  // Corresponds to the category foreign key

    public FallInId() {
    }

    public FallInId(Long problem, Long category) {
        this.problem = problem;
        this.category = category;
    }

    public Long getProblem() {
        return problem;
    }

    public void setProblem(Long problem) {
        this.problem = problem;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "FallInId{" +
                "problem=" + problem +
                ", category=" + category +
                '}';
    }
}

