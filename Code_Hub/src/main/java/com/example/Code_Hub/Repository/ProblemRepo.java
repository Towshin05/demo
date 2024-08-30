package com.example.Code_Hub.Repository;

import com.example.Code_Hub.Model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepo extends JpaRepository<Problem, Long> {
    @Query("SELECT MAX(p.prob_id) FROM Problem p")
    Long findMaxId();
}
