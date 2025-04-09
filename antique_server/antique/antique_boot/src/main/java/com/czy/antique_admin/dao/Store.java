package com.czy.antique_admin.dao;

import lombok.Data;

import java.util.List;

@Data
public class Store {
    private Integer id;
    private String name;
    private String description;
    private String src;
    private String account;
    private String password;
    private String create_date;
    private String role;
    private String bindAntique;
    private String tel;
    private String url;
    private List<goods_pic> carousel;
}
