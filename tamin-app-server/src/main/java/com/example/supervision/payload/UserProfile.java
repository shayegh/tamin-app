package com.example.supervision.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@AllArgsConstructor
public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private String email;
    private Instant joinedAt;
    private String brchName;
    private String unitName;

}
