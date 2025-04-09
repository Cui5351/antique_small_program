package com.czy.antique_admin.dao;

import lombok.Data;

import java.util.List;

@Data
public class Communitys {
    private String avatar;
    private String name;
    private String content;
    private int browse;
    private String send_date;
    private String place;
    private String uuid;
    private String show_moment;
    private List<String> src;
    private String mask;
    private String duration;
    private String type;
    private String comment_count;
}
