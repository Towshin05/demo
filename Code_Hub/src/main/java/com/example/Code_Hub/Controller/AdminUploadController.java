package com.example.Code_Hub.Controller;

import com.example.Code_Hub.Model.*;
import com.example.Code_Hub.Repository.*;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping
public class AdminUploadController {
    @Autowired
    WebsiteRepo websiteRepo;
    @Autowired
    ProblemRepo problemRepo;
    @Autowired
    CategoryRepo categoryRepo;
    @Autowired
    FallInRepo fallInRepo;

    @GetMapping("/getWebandCats")
    public ResponseEntity<?> getWebandCats(Model model)
    {
        List<Website> websites = websiteRepo.findAll();
        List<Category> categories = categoryRepo.findAll();

        model.addAttribute("websites",websites);
        model.addAttribute("categories",categories);
        return ResponseEntity.ok(model);
    }


    @PostMapping("/adminUploadNewProblem")
    public ResponseEntity<?> uploadProblem (@RequestParam (value = "id", required = false) Long id,
                                            @RequestParam (value = "problem-name") String problemName,
                                            @RequestParam (value = "problem-link") String problemLink,
                                            @RequestParam (value = "problem-platform") String platform,
                                            @RequestParam (value = "problem-category") List<String> categories,
                                            @RequestParam (value = "problem-level") String level,
                                            @RequestParam (value = "solution-link") String solutionLink){

        Long problemId;
        if(id!=null){
            problemId = id;
        }
        else{
            List<Problem> all = problemRepo.findAll();
            long currentID = (long) all.size();
            problemId = currentID + 1L;
        }

        Problem problem = new Problem();
        problem.setProb_id(problemId);
        problem.setTitle(problemName);
        problem.setLink(problemLink);

        List<Website> websites = websiteRepo.findAll();
        for(Website web : websites){
            if(web.getWeb_name().equals(platform)){
                problem.setWebsite(web);
                break;
            }
        }
        if(level.equals("Easy")){
            problem.setLevel(1);
        }
        else if(level.equals("Medium")){
            problem.setLevel(2);
        }
        else{
            problem.setLevel(3);
        }
        if(solutionLink!=null && !solutionLink.equals("")){
            problem.setTutorial_link(solutionLink);
        }
        problemRepo.save(problem);

        for(String catName:categories){
            Category category = categoryRepo.findByCatName(catName);
            FallIn falls = new FallIn();
            falls.setProblem(problem);
            falls.setCategory(category);
            fallInRepo.save(falls);
        }
        return ResponseEntity.ok("Problem has been uploaded successfully!");
    }
}

