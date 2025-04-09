package com.czy.antique_admin.controller;

import com.czy.antique_admin.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.czy.antique_admin.services.financeServiceImp;

import java.time.LocalDateTime;
import java.util.Date;

@RestController
@RequestMapping("/admin/Finance")
@CrossOrigin
@Slf4j
public class financeController {
    @Autowired
    private financeServiceImp financeServiceImp;
    @GetMapping("/GetBillsStatistics")
    public Result GetBillsStatistics(){
        return Result.success(financeServiceImp.GetBillsStatistics());
    }
//    总计订单
    @GetMapping("/GetTotalStoreStatics")
    public Result GetTotalStatics(String start, String end){
//        if(start == null || end == null){
//            LocalDateTime localDateTime = LocalDateTime.now();
//            start = localDateTime.getYear() + "-01-01";
//            end = localDateTime.getYear() + "-12-31";
//        }
        return Result.success(financeServiceImp.GetTotalStoreStatics(start,end));
    }

//    区域年订单（传入两个年份）
    @GetMapping("/GetYearStoreStatics")
    public Result GetYearStoreStatics(String start, String end){
        if(start == null || end == null){
//            设置为最近4年
            LocalDateTime localDateTime = LocalDateTime.now();
            start = String.valueOf(localDateTime.getYear() - 4);
            end = String.valueOf(localDateTime.getYear());
        }
        return Result.success(financeServiceImp.GetYearStoreStatics(start,end));
    }


//    年订单（传入年份，返回12个月数据）
    @GetMapping("/GetYearStoreStaticsByYear")
    public Result GetYearStoreStaticsByYear(String year) {
        if (year == null) {
//            设置为今年
            LocalDateTime localDateTime = LocalDateTime.now();
            year = String.valueOf(localDateTime.getYear());
        }
        return Result.success(financeServiceImp.GetYearStoreStaticsByYear(year));
    }
}
