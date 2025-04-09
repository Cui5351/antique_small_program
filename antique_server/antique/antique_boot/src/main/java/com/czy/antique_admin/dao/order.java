package com.czy.antique_admin.dao;

import lombok.Data;

@Data
public class order {
    private Address address;
    private String store_id;
    private String name;
    private String openid;
    private Integer count;
    private String src;
    private float money;
    private float transport_money;
    private int id;
//    后端生成
    private String uuid;
}
