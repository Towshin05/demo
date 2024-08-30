package com.example.Code_Hub.Repository;

import com.example.Code_Hub.Model.Solved;
import com.example.Code_Hub.RelationID.SolvedId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SolvedRepo extends JpaRepository<Solved, SolvedId> {
}
