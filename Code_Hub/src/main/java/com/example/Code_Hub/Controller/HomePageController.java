package com.example.Code_Hub.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;

@Controller
public class HomePageController {

    @GetMapping("/home")
    public String home() {
        return "/homepage.html";
    }

}
