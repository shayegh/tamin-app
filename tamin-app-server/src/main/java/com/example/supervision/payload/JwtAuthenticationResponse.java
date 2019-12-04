package com.example.supervision.payload;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by rajeevkumarsingh on 19/08/17.
 */
@Getter
@Setter
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String roles;

    public JwtAuthenticationResponse(String accessToken, String roles) {
        this.accessToken = accessToken;
        this.roles = roles;
    }

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

 }
