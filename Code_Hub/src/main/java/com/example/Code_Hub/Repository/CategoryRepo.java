package com.example.Code_Hub.Repository;

import com.example.Code_Hub.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo extends JpaRepository<Category,Long> {

    @Query("SELECT c FROM Category c WHERE c.cat_name = :catName")
    Category findByCatName(@Param("catName") String catName);
}
