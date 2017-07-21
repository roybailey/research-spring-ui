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
import java.util.concurrent.atomic.AtomicInteger;
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
                response = ResponseEntity.ok(toD3Format(movieList.iterator()));
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


    private Map<String, Object> toD3Format(Iterator<Movie> movies) {
        List<Map<String, Object>> nodes = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> links = new ArrayList<Map<String, Object>>();
        Map<Long, Integer> people = new HashMap<>();
        AtomicInteger index = new AtomicInteger();
        while (movies.hasNext()) {
            Movie row = movies.next();
            nodes.add(ImmutableMap.of(
                    "id", index.get(),
                    "title", row.getTitle(),
                    "label", "movie"));
            int target = index.getAndIncrement();
            row.getActors().forEach((actor) -> {
                Integer source = people.get(actor.getId());
                if (source == null) {
                    source = index.getAndIncrement();
                    Map<String, Object> actorD3Node = ImmutableMap.of(
                            "id", source,
                            "title", actor.getName(),
                            "label", "actor");
                    nodes.add(actorD3Node);
                    people.put(actor.getId(), source);
                }
                links.add(ImmutableMap.of(
                        "source", source,
                        "target", target,
                        "type", "actedIn",
                        "weight", Math.min(3, row.getActors().size())));
            });
            row.getDirectors().forEach((director) -> {
                Integer source = people.get(director.getId());
                if (source == null) {
                    source = index.getAndIncrement();
                    Map<String, Object> actorD3Node = ImmutableMap.of(
                            "id", source,
                            "title", director.getName(),
                            "label", "director");
                    nodes.add(actorD3Node);
                    people.put(director.getId(), source);
                }
                links.add(ImmutableMap.of(
                        "source", source,
                        "target", target,
                        "type", "directed"));
            });
        }
        return ImmutableMap.of("nodes", nodes, "links", links);
    }

}
