package me.roybailey.springboot.react.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Slf4j
@Controller
@CrossOrigin
@RequestMapping(path = "/app", produces = MediaType.TEXT_HTML_VALUE)
public class ReactAppController {

    /**
     * Return application bundle.
     */
    @GetMapping(value = "/about", produces = MediaType.TEXT_HTML_VALUE)
    public String app() {
        log.info("app request");
        return "forward:/app/index.html";
    }

    /**
     * Return application bundle.
     @GetMapping(value = "{path:(?!index\\.html).*$}/**", produces = MediaType.TEXT_HTML_VALUE)
     public String app() {
     log.info("app request");
     return "forward:/app/index.html";
     }
     */

}
