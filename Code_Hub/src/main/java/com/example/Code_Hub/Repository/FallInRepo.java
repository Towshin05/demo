package com.example.Code_Hub.Repository;

import com.example.Code_Hub.Model.FallIn;
import com.example.Code_Hub.RelationID.FallInId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FallInRepo extends JpaRepository<FallIn,FallInId> {
    @Query(value = "SELECT * FROM fall_in WHERE prob_id = :prob_id", nativeQuery = true)
    List<FallIn> findByProblem_Prob_id(@Param("prob_id") Long prob_id);


}
