package com.example.supervision.model;/*
 * Created by Mojtaba Shayegh (shayegh@gmail.com) on ۲۷/۰۲/۲۰۲۰
 */

import lombok.Data;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
public class Privilege {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "privileges")
    private Collection<Role> roles;
}
