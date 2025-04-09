package com.czy.antique_admin.dao;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.format.DateTimeFormat;
import com.alibaba.excel.annotation.format.NumberFormat;
import lombok.Data;

@Data
public class billsToExcel {
//    @ExcelProperty(value = "id", index = 0)
//    @ExcelProperty(value={"非遗数字典藏货运记录", "id"}, index = 0)
//    private int id;
    @ExcelProperty(value = {"非遗数字典藏货运记录","订单单号"}, index = 0)
    private String uuid;
    @ExcelProperty(value = {"非遗数字典藏货运记录","商店名称"}, index = 1)
    private String store;
    @ExcelProperty(value = {"非遗数字典藏货运记录","商品名称"}, index = 2)
    private String name;
    @ExcelProperty(value = {"非遗数字典藏货运记录","用户名称"}, index = 3)
    private String user;
    @ExcelProperty(value = {"非遗数字典藏货运记录","订单状态"}, index = 4)
    private String state2;
//    private String state;
    @ExcelProperty(value = {"非遗数字典藏货运记录","购买数量"}, index = 5)
    @NumberFormat("#件")
    private int count;
//    @NumberFormat("#.##元")
    @ExcelProperty(value = {"非遗数字典藏货运记录","单价"}, index = 6)
    private float money;
//    @NumberFormat("#.##元")
    @ExcelProperty(value = {"非遗数字典藏货运记录","运费"}, index = 7)
    private float transport_money;
//    @NumberFormat("#.##元")
    @ExcelProperty(value = {"非遗数字典藏货运记录","合计"}, index = 8)
    private float total_money;
    @ExcelProperty(value = {"非遗数字典藏货运记录","下单时间"}, index = 9)
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private String date;
//    private String src;
    @ExcelProperty(value = {"非遗数字典藏货运记录","收货人姓名"}, index = 10)
    private String realName;
    @ExcelProperty(value = {"非遗数字典藏货运记录","收货人电话"}, index = 11)
    private String tel;
    @ExcelProperty(value = {"非遗数字典藏货运记录","收货地址"}, index = 12)
    private String address;

//    private String avatar_src;
//    private String goods_id;
//    private String StoreTel;

//    private String store_id;
}
