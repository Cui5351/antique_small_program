package com.czy.antique_admin.dao;

import lombok.Data;

@Data
public class Antique {
    private Integer id;
    private String name;
    private String description;
    private String location;
    private String account;
    private String role;
    private String password;
    private String avatar;
    private String create_time;
    private String book_url;
    private String tel;

}
