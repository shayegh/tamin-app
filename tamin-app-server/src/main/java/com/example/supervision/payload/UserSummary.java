package com.example.supervision.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class UserSummary {
    private Long id;
    private String username;
    private String name;
    private String brchName;
    private String unitName;


    public UserSummary(Long id, String username, String name) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

}
