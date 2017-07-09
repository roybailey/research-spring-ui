package me.roybailey.springboot.thymeleaf;

import me.roybailey.springboot.sample.SpringBootNeo4jApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

//http://www.thymeleaf.org/doc/articles/layouts.html
@SpringBootApplication
@Import(SpringBootNeo4jApplication.class)
public class SpringBootThymeleafApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SpringBootThymeleafApplication.class, args);
	}

}