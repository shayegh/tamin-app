package com.example.supervision.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserIdentityAvailability {
    private Boolean available;

    public UserIdentityAvailability(Boolean available) {
        this.available = available;
    }


}
