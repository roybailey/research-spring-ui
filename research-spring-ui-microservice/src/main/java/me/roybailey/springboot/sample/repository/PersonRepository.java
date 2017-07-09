package me.roybailey.springboot.sample.repository;

import me.roybailey.springboot.sample.domain.Person;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface PersonRepository extends GraphRepository<Person> {

    /**
     * Simple auto-derived finder.
     * @param name
     * @return Person object
     */
    Person findByName(String name);

}


