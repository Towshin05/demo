package com.example.Code_Hub.Repository;

import com.example.Code_Hub.Model.FallIn;
import com.example.Code_Hub.Model.Solver;
import com.example.Code_Hub.Model.Website;
import com.example.Code_Hub.RelationID.FallInId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebsiteRepo extends JpaRepository<Website, Long> {
}
