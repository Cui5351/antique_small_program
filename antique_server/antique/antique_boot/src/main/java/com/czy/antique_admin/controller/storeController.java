package com.czy.antique_admin.controller;

import ch.qos.logback.core.util.MD5Util;
import com.czy.antique_admin.dao.Store;
import com.czy.antique_admin.dao.goods;
import com.czy.antique_admin.dao.storeRank;
import com.czy.antique_admin.entity.storeCondition;
import com.czy.antique_admin.entity.userLogin;
import com.czy.antique_admin.result.Result;
import com.czy.antique_admin.services.storeServiceImp;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/admin/Store")
@CrossOrigin
@Slf4j
public class storeController {
    @Autowired
    private storeServiceImp storeServiceImp;
    //    查询所有门店的名称
    @GetMapping("/getStoreNames")
    public Result getStoreNames(){
        List<Store> names = storeServiceImp.GetStoreNames();
        return Result.success(names);
    }
    @GetMapping("/getStoreItemById")
    public Result getStoreItemById(){
        return Result.success();
    }
    @GetMapping("/getStoreById")
    public Result getStoreById(@RequestParam int id){
        Store result = storeServiceImp.getStoreById(id);
        return Result.success(result);
    }
    @PutMapping("/editStoreById")
    public Result editStoreById(@RequestBody Store store) throws NoSuchAlgorithmException,Exception {
        storeServiceImp.editStoreById(store);
        return Result.success();
    }
    @PostMapping("/add")
    public Result add(@RequestBody Store store) throws Exception{
//        正则表达式检测传入的参数是否正确
        if(CheckTel(store.getTel())){
            throw new Exception("手机号格式错误");
        }
        if(CheckPassword(store.getPassword())){
            throw new Exception("密码格式错误");
        }
        if(CheckAccount(store.getAccount())){
            throw new Exception("账户格式错误");
        }
        int isSuc = storeServiceImp.AddStore(store);
        return Result.success(isSuc);
    }
    private Boolean CheckTel(String tel){
        return !tel.matches("^1[3-9]\\d{9}]");
    }
    private Boolean CheckAccount(String account){
        return !account.matches("\\w{6,30}");
    }
    private Boolean CheckPassword(String password){
        return !password.matches("\\w{6,30}");
    }
    @GetMapping("/getAllStore")
    public Result getAllStore(storeCondition condition){
        PageHelper.startPage(condition.getPage(),condition.getPageSize());
        List<Store> data = storeServiceImp.getAllStore(condition);
        PageInfo<Store> stores = new PageInfo<Store>(data);
        return Result.success(stores);
    }
    @GetMapping("/getAllStoreAccount")
    public Result getAllStoreAccount(storeCondition condition){
        PageHelper.startPage(condition.getPage(),condition.getPageSize());
        List<Store> data = storeServiceImp.getAllStoreAccount(condition);
        PageInfo<Store> stores = new PageInfo<Store>(data);
        return Result.success(stores);
    }

    @DeleteMapping("/DelStore")
    public Result DelStore(@RequestParam Integer id){
        storeServiceImp.DelStore(id);
        return Result.success();
    }

    @DeleteMapping("/DeleteStoreCarouselPic")
    public Result DeleteStoreCarouselPic(@RequestParam int id){
        storeServiceImp.DeleteStoreCarouselPic(id);
        return Result.success();
    }
    @PostMapping("/login")
    public Result login(@RequestBody userLogin user) throws Exception {
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
//        查询账户是否存在
        MD5Util md5 = new MD5Util();
        String password = md5.asHexString(md5.md5Hash(user.getPassword()));
        log.info("{}",password);
        user.setPassword(password);
        Store store = storeServiceImp.login(user);
        return Result.success(store);
    }
    @GetMapping("/GetStoreRank")
    public Result GetStoreRank(@RequestParam int store_id){
        int rank = 1;
        List<storeRank> stores = storeServiceImp.GetStoreRank();
        for(int i = 0 ;i < stores.size(); i++){
            if(stores.get(i).getStore_id() == store_id){
                rank = i + 1;
            }
        }
        return Result.success(rank);
    }

}
