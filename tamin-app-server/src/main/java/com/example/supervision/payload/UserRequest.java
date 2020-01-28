package com.example.supervision.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Created by Shayegh@gmail.com on ۲۶/۰۱/۲۰۲۰ - ۰۱:۳۸ بعدازظهر.
 */
@Getter
@Setter
public class UserRequest {

    @NotBlank
    @Size(min = 4, max = 40)
    private String name;

    @NotBlank
    @Size(min = 3, max = 15)
    private String username;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    private String brchName;

    @NotBlank
    private String unitName;

    private String role;
}
