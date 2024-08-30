package com.example.Code_Hub.Controller;

import com.example.Code_Hub.Model.Admin;
import com.example.Code_Hub.Model.Solver;
import com.example.Code_Hub.Repository.AdminRepo;
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
import java.util.List;

@Transactional
@RestController
public class SignInController {

    @Autowired
    private SolverRepo solverRepo;

    @Autowired
    private AdminRepo adminRepo;

    @PostMapping("/signIn")
    public ResponseEntity<?> updated(@RequestParam(value = "username") String username,
                                     @RequestParam(value = "password") String password,
                                     Model model)
    {
        if (username == null ) {
            // Handle missing parameters
            return ResponseEntity.badRequest().body("ID required");
        }
        System.out.println(username);
        List<Solver> solvers = solverRepo.findAll();

        Integer flag= 0;
        for(Solver solver : solvers){
            String username1= solver.getUser_name();
            String password1= solver.getPassword();
            if(username1.equals(username)){
                flag=1;
                if(password1.equals(password)){
                    return ResponseEntity.ok("Logged In Successfully");
                }
            }
        }
        if(flag==0){
            return ResponseEntity.badRequest().body("No Such Username");
        }
        else{
            return ResponseEntity.badRequest().body("Username and Password does not match");
        }
    }

    @PostMapping("/adminSignIn")
    public ResponseEntity<?> adminSignIn(@RequestParam(value = "password") String password,
                                     Model model)
    {
        List<Admin> admins = adminRepo.findAll();

        String pass = admins.get(0).getPassword();
        System.out.println(pass);
        if(pass.equals(password)){
            return ResponseEntity.ok("Logged In Successfully");
        }
        else{
            return ResponseEntity.badRequest().body("Admin Password does not match");
        }
    }
}
