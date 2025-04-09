package com.czy.antique_admin.dao;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel
public class antiqueCollect {
    private Integer id;
    private String name;
    private String description;
    @ApiModelProperty("制造时间")
    private String product_date;
    private String src;
    @ApiModelProperty("出土时间")
    private String find_date;
    private String antique_id;
    private String create_time;
}
