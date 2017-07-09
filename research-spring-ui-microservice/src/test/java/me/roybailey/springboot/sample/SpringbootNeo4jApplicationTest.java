package me.roybailey.springboot.sample;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringBootNeo4jApplication.class)
@TestPropertySource(locations = "classpath:application-test.properties")
public class SpringbootNeo4jApplicationTest {

	@Test
	public void contextLoads() {
	}

}
