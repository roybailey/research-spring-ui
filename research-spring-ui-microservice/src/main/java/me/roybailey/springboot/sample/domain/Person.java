package me.roybailey.springboot.sample.domain;

import lombok.*;
import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@NodeEntity
public class Person {

    @GraphId
    Long id;

    @Getter
    String name;

    @Getter
    Integer born;
}