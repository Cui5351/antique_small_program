package com.czy.antique_admin.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel
public class AntiqueCollectCondition {
    private Integer id;
    @ApiModelProperty("绑定的博物馆id，必填")
    private Integer antique_id;
    private String name;

    private int page;
    private int pageSize;
}
