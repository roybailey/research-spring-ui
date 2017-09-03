package me.roybailey.springboot.preact.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Slf4j
@Controller
public class DefaultController {

    /**
     * Forward all requests to Single Page App bundle (index.html)
     */
    @RequestMapping("/{path:[^\\.]+}/**")
    public String forward() {
        return "forward:/app";
    }

}
