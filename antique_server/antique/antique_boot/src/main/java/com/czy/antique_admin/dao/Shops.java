package com.czy.antique_admin.dao;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class Shops {
    @NotNull
    private String openid;
    @NotNull
    private int shopId;
}
