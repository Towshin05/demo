package com.example.Code_Hub.RelationID;

import java.io.Serializable;

public class SolvedId implements Serializable {
    private String solver; // Corresponds to the problem foreign key
    private Long problem;  // Corresponds to the category foreign key

    public SolvedId() {
    }

    public SolvedId(String solver, Long problem) {
        this.solver = solver;
        this.problem = problem;
    }

    public String getSolver() {
        return solver;
    }

    public void setSolver(String solver) {
        this.solver = solver;
    }

    public Long getProblem() {
        return problem;
    }

    public void setProblem(Long problem) {
        this.problem = problem;
    }

    @Override
    public String toString() {
        return "SolvedId{" +
                "solver=" + solver +
                ", problem=" + problem +
                '}';
    }
}

