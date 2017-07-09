package me.roybailey.springboot.sample.controller;

import com.google.common.collect.ImmutableMap;
import feign.*;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import lombok.extern.slf4j.Slf4j;
import me.roybailey.springboot.sample.domain.Movie;
import me.roybailey.springboot.sample.service.Neo4jService;
import org.assertj.core.api.JUnitBDDSoftAssertions;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.neo4j.ogm.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;


@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.properties")
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MovieControllerTest {

    @LocalServerPort
    int port;

    @Rule
    public TestName name = new TestName();

    @Rule
    public final JUnitBDDSoftAssertions softly = new JUnitBDDSoftAssertions();

    @Headers("Accept: application/json")
    public interface Neo4jMovieApi {

        @RequestLine("GET /api/movie")
        List<Movie> getAllMovies();

        @RequestLine("GET /api/movie/{id}")
        Movie getMovieById(@Param("id") Long id);

        @Headers("Content-Type: application/json")
        @RequestLine("POST /api/movie")
        Movie saveMovie(Movie movie);

        @RequestLine("DELETE /api/movie/{id}")
        Response deleteMovie(@Param("id") Long id);
    }

    private Neo4jMovieApi api;

    @Before
    public void apiSetup() {
        this.api = Feign.builder()
                .encoder(new JacksonEncoder())
                .decoder(new JacksonDecoder())
                .logLevel(Logger.Level.BASIC)
                .target(Neo4jMovieApi.class, "http://localhost:" + port);
    }

    @Autowired
    Neo4jService neo4jService;

    @Before
    public void graphCleanup() {
        Session session = neo4jService.getNeo4jSessionFactory().openSession();
        session.query("MATCH (m:Movie) WHERE m.title =~ 'TEST.*' DELETE m", ImmutableMap.of());
    }


    @Test
    public void test1_MovieApi() {
        List<Movie> response = api.getAllMovies();
        softly.then(response).hasSize(38);

        Movie expected = response.get(10);
        Movie actual = api.getMovieById(expected.getId());
        softly.then(actual).isEqualToComparingFieldByFieldRecursively(expected);
    }


    @Test
    public void test2_MovieApi_Updates() {
        Movie newMovie = Movie.builder()
                .title("TEST Movie")
                .released(2017)
                .stars(3)
                .build();
        Movie savedMovie = api.saveMovie(newMovie);

        softly.then(savedMovie).isEqualToIgnoringNullFields(newMovie);

        // total should go up by one as we added new movie
        List<Movie> allMovies = api.getAllMovies();
        softly.then(allMovies).hasSize(39);

        savedMovie.setTitle("TEST Movie Updated");
        savedMovie.setReleased(2018);
        savedMovie.setStars(5);
        savedMovie = api.saveMovie(savedMovie);

        // total should remain same as we updated our movie
        allMovies = api.getAllMovies();
        softly.then(allMovies).hasSize(39);

        // validate all values
        Movie actual = api.getMovieById(savedMovie.getId());
        softly.then(actual).isEqualToComparingFieldByFieldRecursively(savedMovie);

        Response deleteMovie = api.deleteMovie(savedMovie.getId());
        softly.then(deleteMovie.status()).isEqualTo(HttpStatus.OK.value());
    }
}
