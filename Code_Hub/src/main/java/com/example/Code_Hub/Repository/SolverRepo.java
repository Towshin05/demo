package com.example.Code_Hub.Repository;

import com.example.Code_Hub.Model.Solver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolverRepo extends JpaRepository<Solver, Long> {
}
