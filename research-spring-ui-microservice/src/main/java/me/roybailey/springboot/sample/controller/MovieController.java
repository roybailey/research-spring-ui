package me.roybailey.springboot.sample.controller;

import com.google.common.base.Throwables;
import com.google.common.collect.ImmutableMap;
import lombok.extern.slf4j.Slf4j;
import me.roybailey.springboot.sample.domain.Movie;
import me.roybailey.springboot.sample.domain.Person;
import me.roybailey.springboot.sample.repository.MovieRepository;
import org.parboiled.common.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Slf4j
@Controller
@RequestMapping(path = "/api")
public class MovieController {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieController(MovieRepository repo) {
        this.movieRepository = repo;
    }


    @ResponseBody
    @GetMapping(path = "/movie")
    public ResponseEntity<?> getAllMovies(
            @RequestParam(value = "format", required = false) String format
    ) {
        ResponseEntity<?> response;
        try {
            Iterable<Movie> movies = movieRepository.findAll();
            List<Movie> movieList = StreamSupport.stream(movies.spliterator(), false)
                    .collect(Collectors.toList());
            if ("d3".equalsIgnoreCase(format)) {
                List<Map<String, Object>> d3ready = movieList.stream()
                        .map((movie) -> ImmutableMap.of(
                                "id", movie.getId(),
                                "movie", movie.getTitle(),
                                "cast", movie.getActors().stream()
                                        .map(Person::getName)
                                        .collect(Collectors.toList())))
                        .collect(Collectors.toList());
                response = ResponseEntity.ok(toD3Format(d3ready.iterator()));
            } else {
                response = ResponseEntity.ok(movieList);
            }
        } catch (Exception err) {
            response = ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Throwables.getStackTraceAsString(err));
        }
        return response;
    }


    @ResponseBody
    @GetMapping(path = "/movie/{id}")
    public ResponseEntity<?> getMovie(@PathVariable Long id) {
        Movie movie = movieRepository.findOne(id);
        return ResponseEntity.ok(movie);
    }


    @ResponseBody
    @PostMapping(path = "/movie")
    public ResponseEntity<?> upsertMovie(@RequestBody(required = true) Movie movie) {
        movieRepository.save(movie);
        return ResponseEntity.ok(movie);
    }


    @ResponseBody
    @DeleteMapping(path = "/movie/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Long id) {
        movieRepository.delete(id);
        return ResponseEntity.ok().build();
    }


    private Map<String, Object> toD3Format(Iterator<Map<String, Object>> result) {
        List<Map<String, Object>> nodes = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> rels = new ArrayList<Map<String, Object>>();
        Map<String, Integer> actors = new HashMap<>();
        int i = 0;
        while (result.hasNext()) {
            Map<String, Object> row = result.next();
            nodes.add(ImmutableMap.of(
                    "id", i,
                    "title", row.get("movie"),
                    "label", "movie"));
            int target = i;
            i++;
            for (Object name : (Collection) row.get("cast")) {
                Integer source = actors.get(name);
                if (source == null) {
                    source = i++;
                    Map<String, Object> actor = ImmutableMap.of(
                            "id", source,
                            "title", name,
                            "label", "actor");
                    nodes.add(actor);
                    actors.put(String.valueOf(name), source);
                }
                rels.add(ImmutableMap.of(
                        "source", source,
                        "target", target,
                        "weight", Math.min(3, ((Collection) row.get("cast")).size())));
            }
        }
        return ImmutableMap.of("nodes", nodes, "links", rels);
    }

}
