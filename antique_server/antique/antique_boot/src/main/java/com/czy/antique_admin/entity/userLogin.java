package com.czy.antique_admin.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class userLogin {
    @NotNull
    @NotBlank
    public String username;
    @NotNull
    @NotBlank
    public String password;
}
