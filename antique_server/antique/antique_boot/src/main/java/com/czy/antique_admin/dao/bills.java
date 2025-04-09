package com.czy.antique_admin.dao;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@ApiModel("商品购买实体类")
public class bills {
    @ApiModelProperty("商品唯一标识")
    private String uuid;
    private String store;
    @ApiModelProperty("商品状态（待发货，待收货，已完成，已取消）")
    private String state2;
    @ApiModelProperty("show,hid")
    private String state;
    @DateTimeFormat(fallbackPatterns = "YYYY-MM-dd")
    private String date;
    private String name;
    private String src;
    private float money;
    private int count;
    @ApiModelProperty("用户名")
    private String user;
    private float transport_money;
    private int id;

    private String realName;
    private String tel;
    private String address;

    private String avatar_src;
    private String goods_id;
    private String StoreTel;

    private String store_id;
}
