package me.roybailey.springboot.sample.controller;

import feign.Feign;
import feign.Headers;
import feign.Logger;
import feign.RequestLine;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.JUnitBDDSoftAssertions;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;


@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.properties")
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MovieGraphTest {

    @LocalServerPort
    int port;

    @Rule
    public TestName name = new TestName();

    @Rule
    public final JUnitBDDSoftAssertions softly = new JUnitBDDSoftAssertions();

    @Headers("Accept: application/json")
    public interface Neo4jMovieApi {

        @RequestLine("GET /api/movie?format=d3")
        Map<String, Object> getMovieGraph();

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

    @Test
    public void test1_MovieGraphApi() {
        Map<String, Object> response = api.getMovieGraph();
        softly.then(response).hasSize(2);

        List<Map<String, Object>> nodes = (List<Map<String, Object>>) response.get("nodes");
        List<Map<String, Object>> links = (List<Map<String, Object>>) response.get("links");
        softly.then(nodes).isNotNull();
        softly.then(links).isNotNull();
        nodes.stream()
                .forEach((node) -> softly.then(node).containsKeys("title","label"));
        links.stream()
                .forEach((link) -> softly.then(link).containsKeys("source","target","type"));
    }
}
