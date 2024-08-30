package com.example.Code_Hub.Controller;

import com.example.Code_Hub.Model.Solved;
import com.example.Code_Hub.Model.Solver;
import com.example.Code_Hub.Repository.SolvedRepo;
import com.example.Code_Hub.Repository.SolverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/allSolvers")
public class AllSolversController {
    @Autowired
    SolverRepo solverRepo;
    @Autowired
    SolvedRepo solvedRepo;
    @GetMapping
    public ResponseEntity<Map<String, Object>> allSolvers(){
        List<Solver> all = solverRepo.findAll();

        List<Solved> allSolved = solvedRepo.findAll();
        Map<String, Long> totalSolved = new HashMap<>();
        for(Solved it:allSolved){
            Solver solver = it.getSolver();
            String user_name = solver.getUser_name();
            totalSolved.put(user_name, totalSolved.getOrDefault(user_name, 0L)+1);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("allSolvers", all);
        response.put("totalSolved", totalSolved);
        return ResponseEntity.ok(response);
    }
}
