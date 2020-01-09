package com.example.supervision.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * Created by Shayegh@gmail.com on ۰۹/۰۱/۲۰۲۰ - ۱۱:۰۰ قبل‌ازظهر.
 */
@Getter
@Setter
public class ChangePassRequest {
    @NotNull
    private long userId;
    @NotBlank
    private String oldPass;
    @NotBlank
    private String newPass;
}
