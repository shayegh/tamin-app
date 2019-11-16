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

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }

 }
