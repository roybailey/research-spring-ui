package me.roybailey.springboot.nashorn.controller;

import com.google.common.base.Charsets;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.common.io.Resources;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;
import javax.script.ScriptEngineManager;
import java.io.*;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

import jdk.nashorn.api.scripting.NashornScriptEngine;

import org.springframework.http.MediaType;


@Slf4j
@Controller
@CrossOrigin
@RequestMapping(path = "/public", produces = MediaType.TEXT_HTML_VALUE)
public class NashornController {

    private NashornScriptEngine nashorn;

    public String loadClasspath(String filename) {
        URL url = Resources.getResource(filename);
        String script = null;
        try {
            script = Resources.toString(url, Charsets.UTF_8);
        } catch (IOException err) {
            err.printStackTrace();
        }
        return script;
    }

    Reader read(String path) {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }

    // sets up React and the Component
    @PostConstruct
    public void initReact() throws Throwable {
        nashorn = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
        // React depends on the "global" variable
        nashorn.eval("var global = this");
        // eval react.js
        nashorn.eval(read("static/assets/nashorn-polyfill.js"));
        //nashorn.eval(read("static/assets/core.min.js"));
        //nashorn.eval(read("static/assets/babel-polyfill.js"));
        //nashorn.eval(read("static/assets/react-16.0/react.production.min.js"));
        //nashorn.eval(read("static/assets/react-16.0/react-dom.production.min.js"));
        nashorn.eval(read("static/assets/react-15.6/react.js"));
        nashorn.eval(read("static/assets/react-15.6/react-dom.js"));
        nashorn.eval(read("static/assets/react-15.6/react-dom-server.js"));
        // This would also be an external JS file
        nashorn.eval(read("static/assets/ReactTest.js"));
    }

    public String render(String method, Map<String, Object> model) {
        try {
            Object html = nashorn.invokeFunction(method, model);
            return String.valueOf(html);
        } catch (Exception e) {
            throw new IllegalStateException("failed to render react component", e);
        }
    }

    public String renderTable(String title, List<Map<String, Object>> records) {
        Map<String, Object> model = new HashMap<>();
        model.put("title", title);
        model.put("records", records);
        return render("renderTable", model);
    }

    /**
     * Delegate to Nashorn to render React page using service data.
     */
    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> dashboard() {
        List<Map<String, Object>> records = ImmutableList.of(
                ImmutableMap.of("name", "Anna", "age", 34),
                ImmutableMap.of("name", "Burt", "age", 47),
                ImmutableMap.of("name", "Carl", "age", 29)
        );
        String html = renderTable("Hello React from Server", records);
        return ResponseEntity.ok("<html><body>" + html + "</body></html>");
    }

}
