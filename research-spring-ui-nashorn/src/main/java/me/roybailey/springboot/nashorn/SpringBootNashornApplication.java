package me.roybailey.springboot.nashorn;

import me.roybailey.springboot.sample.SpringBootNeo4jApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;


@SpringBootApplication
@Import(SpringBootNeo4jApplication.class)
public class SpringBootNashornApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SpringBootNashornApplication.class, args);
	}

}