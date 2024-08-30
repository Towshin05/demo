package com.example.Code_Hub.Controller;

import com.example.Code_Hub.Model.Solver;
import com.example.Code_Hub.Repository.SolverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@RestController
@RequestMapping("/signUp")
public class SignUpController {

    @Autowired
    private SolverRepo solverRepo;

    @PostMapping
    public ResponseEntity<?> updated(@RequestParam(value = "userName") String userName,
                                       @RequestParam(value = "email") String email,
                                       @RequestParam(value = "upassword") String upassword,
                                       @RequestParam(value = "cpassword") String cpassword,
                                       @RequestParam(value = "policy") String policy,
                                       Model model)
    {
        List<Solver> solvers = solverRepo.findAll();

        for(Solver solver : solvers){
            String username1= solver.getUser_name();
            if(username1.equals(userName)){
                return ResponseEntity.badRequest().body("Sorry! Username already exists");
            }
        }
        Solver solver = new Solver();
        solver.setUser_name(userName);
        solver.setEmail_address(email);
        solver.setPassword(cpassword);
        solverRepo.save(solver);

        Map<String, Object> res = new HashMap<>();
        res.put("solver", solver);
        return ResponseEntity.ok(res);
    }
}
