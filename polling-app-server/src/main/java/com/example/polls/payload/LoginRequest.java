package com.example.polls.payload;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
@Getter
@Setter
 public class LoginRequest {
    @NotBlank
    private String usernameOrEmail;

    @NotBlank
    private String password;

}
