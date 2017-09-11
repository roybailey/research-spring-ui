package me.roybailey.springboot.react.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@Controller
@CrossOrigin
@RequestMapping(path = "/public", produces = MediaType.APPLICATION_JSON_VALUE)
public class SecurityController {

    /**
     * Login requests.
     */
    @PostMapping(value = "/login",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE,MediaType.APPLICATION_JSON_VALUE},
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String,Object>> login(@RequestBody Map<String,Object> body) {
        Map<String,Object> response = new HashMap<>();
        String username = (body.containsKey("username"))? body.get("username").toString() : null;
        log.info("login request: "+body.keySet()+" : "+username);
        if(username == null) {
            username = "guest";
        }
        response.put("username", username);
        if(body.get("username").equals("admin")) {
            response.put("admin", true);
        }
        response.put("isAuthenticated", true);
        log.info("login response: "+response);
        return ResponseEntity.ok(response);
    }

}
