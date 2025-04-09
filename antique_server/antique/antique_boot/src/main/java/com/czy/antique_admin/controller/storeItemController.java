package com.czy.antique_admin.controller;

import com.alibaba.excel.EasyExcel;
import com.czy.antique_admin.dao.*;
import com.czy.antique_admin.entity.GoodsSearch;
import com.czy.antique_admin.entity.billsCondition;
import com.czy.antique_admin.entity.storeCondition;
import com.czy.antique_admin.result.Result;
import com.czy.antique_admin.services.storeServiceImp;
import com.czy.antique_admin.webConfig.CustomCellWriteWidthConfig;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/admin/StoreItem")
@CrossOrigin
@Slf4j
@Transactional
public class storeItemController {
    @Autowired
    private storeServiceImp storeServiceImp;

    @GetMapping("/list")
    public Result getGoodsAll(storeCondition condition) throws Exception {
        if(condition.getUser_id() == null){
            throw new Exception("请重新登录");
        }
        if(!storeServiceImp.isRoot(condition.getUser_id()).equals("超级管理员")){
            condition.setStore_id(condition.getUser_id());
        }
        PageHelper.startPage(condition.getPage(),condition.getPageSize());
        List<goods> records = storeServiceImp.GetGoodsAll(condition);
        PageInfo<goods> goodList = new PageInfo<goods>(records);
        return Result.success(goodList);
    }
    @GetMapping("/list2")
    public Result GetGoodsAll2(storeCondition condition) throws Exception {
        if(condition.getUser_id() == null){
            throw new Exception("请重新登录");
        }
        if(!storeServiceImp.isRoot(condition.getUser_id()).equals("超级管理员")){
            condition.setStore_id(condition.getUser_id());
        }
        PageHelper.startPage(condition.getPage(),condition.getPageSize());
        List<goods> records = storeServiceImp.GetGoodsAll2(condition);
        PageInfo<goods> goodList = new PageInfo<goods>(records);
        return Result.success(goodList);
    }
    @GetMapping("/UserList")
    public Result getGoodsAllUser(storeCondition condition) throws Exception {
        PageHelper.startPage(condition.getPage(),condition.getPageSize());
        List<goods> records = storeServiceImp.getGoodsAllUser(condition);
        PageInfo<goods> goodList = new PageInfo<goods>(records);
        return Result.success(goodList);
    }

    @GetMapping("/findById")
    public Result getGoods(@RequestParam int id){
        goods g = storeServiceImp.GetGoodsInfoById(id);
        if(g == null){
            return Result.error("该商品已下架");
        }
        return Result.success(g);
    }

//    新增商品
    @PostMapping("/add")
    public Result addStoreItem(@RequestBody goods good){
        int result = storeServiceImp.AddStoreItem(good);
        if(result != -1){
            return Result.success();
        }else {
            return Result.error("数据插入失败");
        }
    }

    @PostMapping("/edit")
    public Result EditStoreItem(@RequestBody goods good){
        int result  = storeServiceImp.EditStoreItem(good);
        return Result.success(result);
    }

    @PostMapping("/delete")
    public Result DelStoreItem(@RequestBody goods goods){
        log.info("info:{}",goods);
        storeServiceImp.DelStoreItem(goods.getId());
        return Result.success();
    }
    @DeleteMapping("/DeleteGoodsPic")
    public Result DeleteGoodsPic(@RequestParam int id){
        storeServiceImp.DeleteGoodsPic(id);
        return Result.success();
    }

    @GetMapping("/GetBuyGoodsAll")
    public Result buyGoodsAll(billsCondition condition) throws Exception {
        if(condition.getUser_id() == null){
            throw new Exception("请重新登录");
        }
        if(!storeServiceImp.isRoot(condition.getUser_id()).equals("超级管理员")){
            condition.setStore_id(condition.getUser_id());
        }
        PageHelper.startPage(condition.getPage(),condition.getPageSize());
        List<bills> boughtGoods = storeServiceImp.buyGoodsAll(condition);
        PageInfo<bills> list = new PageInfo<>(boughtGoods);
        return Result.success(list);
    }
//    buyGoodsAllToExcel
    @GetMapping("/buyGoodsAllToExcel")
    public Result buyGoodsAllToExcel(billsCondition condition, HttpServletResponse response) throws Exception {
        if(condition.getUser_id() == null){
            throw new Exception("请重新登录");
        }
        if(!storeServiceImp.isRoot(condition.getUser_id()).equals("超级管理员")){
            condition.setStore_id(condition.getUser_id());
        }
        List<billsToExcel> boughtGoods = storeServiceImp.buyGoodsAllToExcel(condition);
//        设置表头
        List<List<String>> head = getHead();
         response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=finance.xlsx");
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        EasyExcel.write(response.getOutputStream())
                .registerWriteHandler(new CustomCellWriteWidthConfig())
                .head(head).sheet("货运记录").doWrite(boughtGoods);
        return Result.success();
    }
    @GetMapping("/buyGoodsToExcelById")
    public Result buyGoodsToExcelById(@RequestParam String ids, HttpServletResponse response) throws Exception {
        List<String> list = Arrays.stream(ids.split(",")).toList();
        List<billsToExcel> boughtGoods = storeServiceImp.buyGoodsToExcelById(list);
//        设置表头
        List<List<String>> head = getHead();
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=finance.xlsx");
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        EasyExcel.write(response.getOutputStream())
                .registerWriteHandler(new CustomCellWriteWidthConfig())
                .head(head).sheet("货运记录").doWrite(boughtGoods);
        return Result.success();
    }
    public List<List<String>> getHead(){
        List<List<String>> head = new ArrayList<>();
        List<String> head1 = new ArrayList<>();
        List<String> head2 = new ArrayList<>();
        List<String> head3 = new ArrayList<>();
        List<String> head4 = new ArrayList<>();
        List<String> head5 = new ArrayList<>();
        List<String> head6 = new ArrayList<>();
        List<String> head7 = new ArrayList<>();
        List<String> head8 = new ArrayList<>();
        List<String> head9 = new ArrayList<>();
        List<String> head10 = new ArrayList<>();
        List<String> head11 = new ArrayList<>();
        List<String> head12 = new ArrayList<>();
        List<String> head13 = new ArrayList<>();
        List<String> head14 = new ArrayList<>();
        head1.add("id");
        head2.add("订单单号");
        head3.add("商铺名称");
        head4.add("商品名称");
        head5.add("用户名称");
        head6.add("订单状态");
        head7.add("购买数量");
        head8.add("单价");
        head9.add("运费");
        head10.add("合计");
        head11.add("下单时间");
        head12.add("收货人姓名");
        head13.add("收货人电话");
        head14.add("收货人地址");
        Collections.addAll(head,head2,head3,head4,head5,head6,head7,head8,head9,head10,head11,head12,head13,head14);
        return head;
    }
    @GetMapping("/GetGoodsBills")
    public Result GetBuyGoodsAllUser(billsCondition condition) {
        bills boughtGoods = storeServiceImp.GetGoodsBills(condition);
        return Result.success(boughtGoods);
    }
    @PutMapping("/editBuyGoodsState2")
    public Result editBuyGoodsState2(@RequestBody editGoods goods){
        storeServiceImp.editBuyGoodsState2(goods);
        return Result.success();
    }
    public static String generateOrderNumber() {
        // 获取当前时间
        LocalDateTime now = LocalDateTime.now();
        // 定义时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        // 格式化时间
        String timePart = now.format(formatter);
        // 生成随机字符串
        String randomPart = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        // 组合订单单号
        return "FYZJ" + timePart + randomPart;
    }
    @PostMapping("/order")
    public Result order(@RequestBody order orderData) throws Exception {
        // 生成uuid
//        String uuid =  UUID.randomUUID().toString();
        orderData.setUuid(generateOrderNumber());
        storeServiceImp.orderBill(orderData);
        return Result.success();
    }
    @PostMapping("/AddShops")
    public Result AddShops(@RequestBody Shops shops){
        storeServiceImp.AddShops(shops);
        return Result.success();
    }
    @GetMapping("/GetMyShops")
    public Result GetMyShops(billsCondition billsCondition){
        if(billsCondition.getOpenid() == null)
            return Result.error("请重新登录");
        PageHelper.startPage(billsCondition.getPage(),billsCondition.getPageSize());
        List<goods> shops = storeServiceImp.myShops(billsCondition.getOpenid());
        PageInfo<goods> result = new PageInfo<>(shops);
        return Result.success(result);
    }
    @PostMapping("/ShopsOrder")
    public Result ShopsOrder(@RequestBody shopsOrder shopsOrder){
        shopsOrder.getOrders().forEach(item ->{
            item.setUuid(generateOrderNumber());
            try {
                storeServiceImp.orderBill(item);
            } catch (Exception e) {
                throw new RuntimeException("下单失败");
            }
        });
        return Result.success();
    }

//    查看是否存在购物车
    @GetMapping("/GoodsExistInShops")
    public Result GoodsExistInShops(@RequestParam String openid,@RequestParam int shopId){
        Integer result = storeServiceImp.GoodsExistInShops(openid,shopId);
        return Result.success(result);
    }
//    根据销量拿到商铺
    @GetMapping("/GetGoodsBySale")
    public Result GetGoodsBySale(GoodsSearch condition){
        PageHelper.startPage(condition.getPage(),condition.getPageSize());
        List<goods> result = storeServiceImp.GetGoodsBySale(condition);
        PageInfo<goods> list = new PageInfo<>(result);
        return Result.success(list);
    }
//    根据输入商品模糊查询
@GetMapping("/GetGoodsLabelByName")
public Result GetGoodsLabelByName(@RequestParam String name){
    List<String> result = storeServiceImp.GetGoodsLabelByName(name);
    return Result.success(result);
}
}
