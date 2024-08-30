package com.example.Code_Hub.Controller;

import com.example.Code_Hub.Model.Problem;
import com.example.Code_Hub.Model.Solved;
import com.example.Code_Hub.Model.Solver;
import com.example.Code_Hub.Model.Website;
import com.example.Code_Hub.Repository.ProblemRepo;
import com.example.Code_Hub.Repository.SolvedRepo;
import com.example.Code_Hub.Repository.SolverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/solverProfile")
public class SolverProfileController {
    @Autowired
    SolverRepo solverRepo;
    @Autowired
    SolvedRepo solvedRepo;
    @Autowired
    ProblemRepo problemRepo;
    @GetMapping
    public ResponseEntity<Map<String, Object>> solverInfo(@RequestParam String user_name){

        Map<String, Object> response = new HashMap<>();
        List<Solver> solvers = solverRepo.findAll();

        for(Solver solver:solvers){
            if(solver.getUser_name().equals(user_name)){
                response.put("solver", solver);

                Map<String, Long> totalByWebs = new HashMap<>();
                List<Solved> solved = solvedRepo.findAll();
                Long cnt= 0L;
                for(Solved solved1 : solved){
                    Solver solver2= solved1.getSolver();
                    if(solver2.getUser_name().equals(user_name)){
                        cnt++;
                        Problem prob = solved1.getProblem();
                        Website web = prob.getWebsite();
                        String website = web.getWeb_name();
                        totalByWebs.put(website, totalByWebs.getOrDefault(website, 0L)+1);
                    }
                }
                response.put("problemSolved", cnt);
                response.put("totalByWeb", totalByWebs);
                break;
            }
        }

        return ResponseEntity.ok(response);
    }
}
