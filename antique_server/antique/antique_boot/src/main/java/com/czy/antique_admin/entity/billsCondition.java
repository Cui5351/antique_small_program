package com.czy.antique_admin.entity;

import lombok.Data;

@Data
public class billsCondition {
    private String store;
    private String name;
    private String uuid;
    private String state2;
    private String store_id;
    private String user_id;
    private String openid;
    private String start;
    private String end;

    private int page;
    private int pageSize;
}
