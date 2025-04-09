package com.czy.antique_admin.entity;

import lombok.Data;

@Data
public class AntiqueCondition {
    private String name;
    private String location;
    private String account;
    private Integer id;

    private int page;
    private int pageSize;
}
