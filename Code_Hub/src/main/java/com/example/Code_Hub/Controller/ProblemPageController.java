package com.example.Code_Hub.Controller;

import com.example.Code_Hub.Model.*;
import com.example.Code_Hub.RelationID.SolvedId;
import com.example.Code_Hub.Repository.*;
import org.apache.catalina.servlets.WebdavServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Transactional
@RestController
public class ProblemPageController {

    @Autowired
    private ProblemRepo problemRepo;

    @Autowired
    private SolvedRepo solvedRepo;

    @Autowired
    private WebsiteRepo websiteRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private FallInRepo fallInRepo;

    @Autowired
    private SolverRepo solverRepo;


    @GetMapping("/getProblems")
    public ResponseEntity<?> updated(Model model)
    {
        List<Problem> problems = problemRepo.findAll();
        List<Solved> solveds = solvedRepo.findAll();
        List<Website> websites = websiteRepo.findAll();
        List<Category> categories = categoryRepo.findAll();
        List<FallIn> fallIns = fallInRepo.findAll();

        model.addAttribute("problems",problems);
        model.addAttribute("solveds",solveds);
        model.addAttribute("websites",websites);
        model.addAttribute("categories",categories);
        model.addAttribute("fallIns",fallIns);
        return ResponseEntity.ok(model);
    }

    @PostMapping("/submitSolutionLink")
    public ResponseEntity<?> submitSolutionLink(@RequestParam("username") String username,
                                                @RequestParam("problem") Long problem_id,
                                                @RequestParam("solutionLink") String solutionLink)
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
                Problem problem = problemRepo.findById(problem_id).orElse(null);
                if(problem!=null){
                    Solved solved = new Solved();
                    solved.setProblem(problem);
                    solved.setSolver(solver);
                    solved.setSolution_link(solutionLink);
                    solvedRepo.save(solved);
                    break;
                }
                else{
                    return ResponseEntity.badRequest().body("Could not find the problem");
                }
            }
        }
        if(flag==0){
            return ResponseEntity.badRequest().body("No Such Username");
        }
        else return ResponseEntity.ok("Link Updated Successfully");
    }

    @PostMapping("/deleteSolutionLink")
    public ResponseEntity<?> deleteSolutionLink(@RequestParam("username") String username,
                                                @RequestParam("problem") Long problem_id)
    {
        if (username == null || problem_id == null) {
            // Handle missing parameters
            return ResponseEntity.badRequest().body("parameter null");
        }
        System.out.println(username);
        List<Solved> solved = solvedRepo.findAll();
        for(Solved solved1 : solved){
            Solver solver= solved1.getSolver();
            Problem problem = solved1.getProblem();
            if(solver.getUser_name().equals(username) && problem.getProb_id().equals(problem_id)){
                SolvedId solvedId = new SolvedId(username,problem_id);
                solvedRepo.deleteById(solvedId);
                return ResponseEntity.ok("Solution Link Removed for");
            }
        }

        return ResponseEntity.badRequest().body("Error yet");
    }

    @PostMapping("/deleteProblem")
    public ResponseEntity<?> deleteProblem(@RequestParam("problem") Long problem_id)
    {
        Problem problem = problemRepo.findById(problem_id).orElse(null);
        if(problem==null){
            return ResponseEntity.badRequest().body("Could not find this problem");
        }
        else{
            problemRepo.deleteById(problem_id);
            return ResponseEntity.ok("Deleted the problem");
        }
    }
}
