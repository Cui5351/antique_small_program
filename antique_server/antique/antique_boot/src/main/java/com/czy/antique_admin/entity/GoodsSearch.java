package com.czy.antique_admin.entity;

import lombok.Data;

@Data
public class GoodsSearch {
    private int page;
    private int pageSize;
    private Integer sale;
    private Integer all;
    private String price;
    private String name;
}
