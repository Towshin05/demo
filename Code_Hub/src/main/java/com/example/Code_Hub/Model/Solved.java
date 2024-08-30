package com.example.Code_Hub.Model;

import com.example.Code_Hub.RelationID.SolvedId;
import jakarta.persistence.*;

@Entity
@Table(name = "solved")
@IdClass(SolvedId.class)
public class Solved {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_name", referencedColumnName = "user_name")
    private Solver solver;

    @Id
    @ManyToOne
    @JoinColumn(name = "prob_id", referencedColumnName = "prob_id")
    private Problem problem;

    @Column(name = "solution_link")
    private String solution_link;

    public Solved() {
    }

    public Solved(Solver solver, Problem problem, String solution_link) {
        this.solver = solver;
        this.problem = problem;
        this.solution_link = solution_link;
    }

    public Solver getSolver() {
        return solver;
    }

    public void setSolver(Solver solver) {
        this.solver = solver;
    }

    public Problem getProblem() {
        return problem;
    }

    public void setProblem(Problem problem) {
        this.problem = problem;
    }

    public String getSolution_link() {
        return solution_link;
    }

    public void setSolution_link(String solution_link) {
        this.solution_link = solution_link;
    }

    @Override
    public String toString() {
        return "Solved{" +
                "solver=" + solver +
                ", problem=" + problem +
                ", solution_link='" + solution_link + '\'' +
                '}';
    }
}
