package com.czy.antique_admin.entity;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommunityCondition {
    private String content;
    private String status;
    private String userName;
//    分页
    @NotNull
    private Integer page;
    @NotNull
    private Integer pageSize;
}
