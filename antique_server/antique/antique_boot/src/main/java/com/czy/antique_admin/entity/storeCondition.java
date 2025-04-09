package com.czy.antique_admin.entity;

import lombok.Data;

@Data
public class storeCondition {
    private String store;
    private String name;
    private String account;
    private String id;

    private String store_id;

    private String user_id;

    private int page;
    private int pageSize;
}
