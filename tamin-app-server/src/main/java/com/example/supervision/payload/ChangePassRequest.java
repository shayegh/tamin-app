package com.example.supervision.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * Created by Shayegh@gmail.com on ۰۹/۰۱/۲۰۲۰ - ۱۱:۰۰ قبل‌ازظهر.
 */
@Getter
@Setter
public class ChangePassRequest {
    @NotBlank
    private String userName;
    @NotBlank
    private String oldPass;
    @NotBlank
    private String newPass;
}
