package com.czy.antique_admin.dao;

import lombok.Data;

import java.util.List;

@Data
public class goods {
//    store,name,description,money,transport_money,sale,depository
    private int id;
    private String store;
    private String name;
    private List<goods_pic> src;
    private String url;

    private String description;
    private float money;
    private float transport_money;
    private Integer sale;
    private Integer depository;
    private Integer store_id;
    private String tel;
}

