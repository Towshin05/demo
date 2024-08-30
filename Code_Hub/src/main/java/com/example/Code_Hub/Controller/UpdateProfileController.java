package com.example.Code_Hub.Controller;

import com.example.Code_Hub.Model.Solver;
import com.example.Code_Hub.Repository.SolverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/updateSolverProfile")
public class UpdateProfileController {
    @Autowired
    SolverRepo solverRepo;

    @PostMapping
    public ResponseEntity<?> update(@RequestParam String user_name,
                                    @RequestParam(value = "fullName") String name,
                                    @RequestParam(value = "email") String email,
                                    @RequestParam(value = "institution") String institution,
                                    @RequestParam(value = "address") String address,
                                    @RequestParam(value = "password") String password,
                                    @RequestParam(value = "confirmPassword") String confirm,
                                    @RequestParam(value = "bio") String bio){

        if(!confirm.equals(password)){
            return ResponseEntity.badRequest().body("Password and Confirm password must match!");
        }
        if(confirm.length()<6){
            return  ResponseEntity.badRequest().body("Password must be at least six characters.");
        }
        if(confirm.length()>10){
            return  ResponseEntity.badRequest().body("Password cannot be more than ten characters.");
        }
        List<Solver> all = solverRepo.findAll();
        for(Solver solver:all){
            if(solver.getUser_name().equals(user_name)){
                solver.setUser_name(user_name);
                solver.setName(name);
                solver.setEmail_address(email);
                solver.setInstitution(institution);
                solver.setAddress(address);
                solver.setPassword(password);
                solver.setIntroduction(bio);
                solverRepo.save(solver);
                return ResponseEntity.ok(solver);
            }
        }
        return ResponseEntity.badRequest().body("User not found.");
    }
}
