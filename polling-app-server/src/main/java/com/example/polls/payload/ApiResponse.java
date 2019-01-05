package com.example.polls.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by rajeevkumarsingh on 19/08/17.
 */
@Getter
@Setter
@AllArgsConstructor
public class ApiResponse {
    private Boolean success;
    private String message;

}
