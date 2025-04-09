package com.czy.antique_admin.controller;

import ch.qos.logback.core.util.MD5Util;
import com.czy.antique_admin.dao.*;
import com.czy.antique_admin.entity.*;
import com.czy.antique_admin.result.Result;
import com.czy.antique_admin.services.antiqueServiceImp;
//import com.github.pagehelper.PageHelper;
//import com.github.pagehelper.PageInfo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/admin/Antique")
@CrossOrigin
@Slf4j
public class antiqueController {
    @Autowired
    private antiqueServiceImp antiqueServiceImp;
    @PostMapping("/AddAntique")
    public Result AddAntique(@RequestBody Antique antique) throws NoSuchAlgorithmException,Exception {
        if(CheckTel(antique.getPassword()))
            throw new Exception("密码格式错误");
        if(CheckAccount(antique.getAccount()))
            throw new Exception("账户格式错误");
//        对密码进行md5加密
        MD5Util md5Util = new MD5Util();
        antique.setPassword(md5Util.asHexString(md5Util.md5Hash(antique.getPassword())));

        int result = antiqueServiceImp.insertAntique(antique);
        return Result.success(result);
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
    @GetMapping("/GetAntiqueAll")
    public Result GetAntiqueAll( AntiqueCondition antiqueCondition){
        PageHelper.startPage(antiqueCondition.getPage(),antiqueCondition.getPageSize());
        List<Antique> records = antiqueServiceImp.GetAntiqueAll(antiqueCondition);
        PageInfo<Antique> antiqueList = new PageInfo<Antique>(records);
        return Result.success(antiqueList);
    }
    @GetMapping("/FindAntiqueById")
    public Result FindAntiqueById(@RequestParam int id){
//        根据id拿到具体的博物馆信息，包含关联的商铺
        Antique antique = antiqueServiceImp.FindAntiqueById(id);
        return Result.success(antique);
    }
    @GetMapping("/GetAntiqueCollect")
    public Result GetAntiqueCollect(AntiqueCollectCondition antiqueCollectCondition){
        PageHelper.startPage(antiqueCollectCondition.getPage(),antiqueCollectCondition.getPageSize());
        List<antiqueCollect> records = antiqueServiceImp.GetAntiqueCollect(antiqueCollectCondition);
        PageInfo<antiqueCollect> collectList = new PageInfo<antiqueCollect>(records);
        return Result.success(collectList);
    }

    @PostMapping("/login")
    public Result login(@RequestBody Antique antique) throws Exception {
        Antique result = antiqueServiceImp.userLogin(antique);
        return Result.success(result);
    }
    @PostMapping("/AddAntiqueCollect")
    public Result AddAntiqueCollect(@RequestBody antiqueCollect antiqueCollect) throws Exception {
        antiqueServiceImp.AddAntiqueCollect(antiqueCollect);
        return Result.success();
    }
    @GetMapping("/GetCollectById")
    public Result GetCollectById(@RequestParam int id){
        antiqueCollect antiqueCollect = antiqueServiceImp.GetCollectById(id);
        return Result.success(antiqueCollect);
    }
    @PutMapping("/EditCollectById")
    public Result EditCollectById(@RequestBody antiqueCollect antiqueCollect){
        antiqueServiceImp.EditCollectById(antiqueCollect);
        return Result.success();
    }
    @PutMapping("/EditAntiqueById")
    public Result EditAntiqueById(@RequestBody Antique antique) throws Exception {
        if(antique.getPassword() != null){
            // md5加密
            MD5Util md5Util = new MD5Util();
            antique.setPassword(md5Util.asHexString(md5Util.md5Hash(antique.getPassword())));
        }
        antiqueServiceImp.EditAntiqueById(antique);
        return Result.success();
    }

    @PutMapping("/DelAntiqueCollect")
    public Result DelAntiqueCollect(@RequestBody antiqueCollect antiqueCollect){
        antiqueServiceImp.delAntiqueCollect(antiqueCollect);
        return Result.success();
    }

    @GetMapping("/GetAntiqueRandom")
    public Result GetAntiqueRandom(){
        List<Antique> antiques = antiqueServiceImp.GetAntiqueRandom();
        return Result.success(antiques);
    }
    @GetMapping("/GetAntiqueById")
    public Result GetAntiqueById(@RequestParam String id){
        Antique antiques = antiqueServiceImp.GetAntiqueById(id);
        return Result.success(antiques);
    }
//    @GetMapping("/GetAntiqueCollect")
//    public Result GetAntiqueCollect(AntiqueCollectCondition condition){
//        PageHelper.startPage(condition.getPage(),condition.getPageSize());
//
//    }

//    根据省份来获取博物馆信息
    @GetMapping("/GetAntiqueByProvince")
    public Result GetAntiqueByProvince(@RequestParam String province){
        List<Antique> antiques = antiqueServiceImp.GetAntiqueByProvince(province);
        return Result.success(antiques);
    }

    @GetMapping("/GetStoreForAntique")
        public Result GetStoreForAntique(@RequestParam int page,@RequestParam int pageSize){
        PageHelper.startPage(page,pageSize);
        List<Store> stores = antiqueServiceImp.GetAllStoreForAntique();
        PageInfo<Store> result = new PageInfo<>(stores);
        return Result.success(result);
    }
    @DeleteMapping("/DelAntique")
    public Result DelAntique(@RequestParam String id,@RequestParam String user_id) throws Exception{
        antiqueServiceImp.DelAntique(id,user_id);
        return Result.success();
    }
//    获取
    @GetMapping("/GetMyBindStoreById")
    public Result GetMyBindStoreById(@RequestParam int user_id){
        List<Store> result = antiqueServiceImp.GetMyBindStoreById(user_id);
        return Result.success(result);
    }
//    添加
    @PutMapping("/AddAntiqueBindStore")
    public Result AddAntiqueBindStore(@RequestBody Id id){
        antiqueServiceImp.AddAntiqueBindStore(id.getId(),id.getUser_id());
        return Result.success();
    }
    //    删除
    @PutMapping("/DelAntiqueBindStore")
    public Result DelAntiqueBindStore(@RequestBody Id id){
        antiqueServiceImp.DelAntiqueBindStore(id.getId());
        return Result.success();
    }

//    根据博物馆id来获取相对应的部分商品
    @GetMapping("/GetAntiqueStoreGoods")
    public Result GetAntiqueStoreGoods(@RequestParam int id){
        List<goods> list = antiqueServiceImp.GetAntiqueStoreGoods(id);
        return Result.success(list);
    }

    @GetMapping("/GetAntiqueByName")
    public Result GetAntiqueByName(@RequestParam String name){
        Antique antique = antiqueServiceImp.GetAntiqueByName(name);
        return Result.success(antique);
    }
    @GetMapping("/GetMuseumBindStoreById")
    public Result GetMuseumBindStoreById(@RequestParam int id){
        List<Store> result = antiqueServiceImp.GetMuseumBindStoreById(id);
        return Result.success(result);
    }
}
