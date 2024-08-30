package com.example.Code_Hub.Model;

import com.example.Code_Hub.RelationID.FallInId;
import jakarta.persistence.*;

@Entity
@Table(name = "fall_in")
@IdClass(FallInId.class)
public class FallIn {

    @Id
    @ManyToOne
    @JoinColumn(name = "prob_id", referencedColumnName = "prob_id")
    private Problem problem;

    @Id
    @ManyToOne
    @JoinColumn(name = "cat_id", referencedColumnName = "cat_id")
    private Category category;

    public FallIn() {
    }

    public FallIn(Problem problem, Category category) {
        this.problem = problem;
        this.category = category;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Fall_In{" +
                "problem=" + problem +
                ", category=" + category +
                '}';
    }
}
