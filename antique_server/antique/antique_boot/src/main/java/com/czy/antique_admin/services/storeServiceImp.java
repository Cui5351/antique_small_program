package com.czy.antique_admin.services;

import ch.qos.logback.core.util.MD5Util;
import com.czy.antique_admin.dao.*;
import com.czy.antique_admin.entity.GoodsSearch;
import com.czy.antique_admin.entity.billsCondition;
import com.czy.antique_admin.entity.storeCondition;
import com.czy.antique_admin.entity.userLogin;
import com.czy.antique_admin.mappers.storeMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@Transactional
public class storeServiceImp implements storeMapper {
    @Autowired
    private storeMapper storeMapper;
    @Override
    public List<goods> GetGoodsAll(storeCondition condition) {
        // 查询该账户是否是超级管理员
        List<goods> goodsList = storeMapper.GetGoodsAll(condition);
//        if(role.equals("超级管理员"))
//        冒泡排序


        return goodsList;
    }

    @Override
    public List<goods> GetGoodsAll2(storeCondition condition) {
            List<goods> goodsList = storeMapper.GetGoodsAll2(condition);
            return goodsList;
    }

    @Override
    public List<goods> getGoodsAllUser(storeCondition condition) {
        List<goods> goodsList = storeMapper.GetGoodsAll(condition);
        return goodsList;
    }

    @Override
    public bills GetGoodsBills(billsCondition condition) {
        bills b = storeMapper.GetGoodsBills(condition);
        return b;
    }

    public String isRoot(String id){
         String role = storeMapper.isRoot(id);
         return role;
    }

    @Override
    public void DeleteGoodsPic(int id) {
        storeMapper.DeleteGoodsPic(id);
    }

    @Override
    public void AddShops(Shops shops) {
//        查看是否已存在
        if(GoodsExist(shops) > 0){
//            更新日期
//            SetDate(shops);
            // 删除购物车
            DelShop(shops);
            return;
        }
        storeMapper.AddShops(shops);
    }
    public void DelShop(Shops shops){
        storeMapper.DelShop(shops);
    }

    public void SetDate(Shops shops){
        storeMapper.SetDate(shops);
    }

    @Override
    public List<goods> myShops(String openid) {
        return storeMapper.myShops(openid);
    }

    @Override
    public Integer GoodsExistInShops(String openid,int shopId) {
        return storeMapper.GoodsExistInShops(openid,shopId);
    }

    @Override
    public List<goods> GetGoodsBySale(GoodsSearch condition) {
        return storeMapper.GetGoodsBySale(condition);
    }

    @Override
    public List<String> GetGoodsLabelByName(String name) {
        return storeMapper.GetGoodsLabelByName(name);
    }

    public int GoodsExist(Shops shops){
        return storeMapper.GoodsExist(shops);
    }

    public goods GetGoodsInfoById(int id){
        goods g = storeMapper.GetGoodsInfoById(id);
        if(g == null)
            return null;
//        根据store名称来拿pic
        g.setSrc(GetStorePics(g.getId()));
        return g;
    }

    @Override
    public List<Store> GetStoreNames() {
         List<Store> names = storeMapper.GetStoreNames();
        return names;
    }

    @Override
    public int AddStoreItem(goods good) {
        good.setSale(0);
        storeMapper.AddStoreItem(good);
        AddStorePic(good);
        return good.getId();
    }

    @Override
    public int AddStorePic(goods good) {
        good.getSrc().forEach(item -> {
            good.setUrl(item.getSrc());
            storeMapper.AddStorePic(good);
        });
        return 0;
    }
    public void AddStoreCarouselPic(Store store) {
        store.getCarousel().forEach(item -> {
            store.setUrl(item.getSrc());
            storeMapper.AddStoreCarouselPic(store);
        });
    }

    @Override
    public List<goods_pic> GetStoreCarouselPics(int id) {
        return storeMapper.GetStoreCarouselPics(id);
    }

    @Override
    public void DeleteStoreCarouselPic(int id) {
        storeMapper.DeleteStoreCarouselPic(id);
    }

    @Override
    public List<storeRank> GetStoreRank() {
        return storeMapper.GetStoreRank();
    }

    @Override
    public int EditStoreItem(goods good) {
        int result = 0;
        result = storeMapper.EditStoreItem(good);
        if(good.getSrc() != null  && good.getSrc().size() >= 1){
            // 查看id是否存在
            // 如果没有id那么就增加，其他的删除
            good.getSrc().forEach(item -> {
                if(item.getId() == null){
                    // 增加
                    good.setUrl(item.getSrc());
                    storeMapper.AddStorePic(good);
                }
            });
        }

        return result;
    }

    @Override
    public void DelStoreItem(int id) {
        storeMapper.DelStoreItem(id);
    }

    @Override
    public int AddStore(Store store) throws Exception {
        // 查看账户是否存在
        if(AccountExist(store) >= 1){
            throw new Exception("该账户已被注册");
        }
        MD5Util md5Util = new MD5Util();
        // 进行md5加密
        store.setPassword(md5Util.asHexString(md5Util.md5Hash(store.getPassword())));
        int result = storeMapper.AddStore(store);
        AddStoreCarouselPic(store);
        return result;
    }


    @Override
    public List<goods_pic> GetStorePics(int id) {
        List<goods_pic> result = storeMapper.GetStorePics(id);
        return result;
    }

    @Override
    public List<Store> getAllStore(storeCondition condition) {
        List<Store> store = storeMapper.getAllStore(condition);
        return store;
    }

    @Override
    public List<bills> buyGoodsAll(billsCondition condition) {
        List<bills> result = storeMapper.buyGoodsAll(condition);
        return result;
    }
    @Override
    public List<billsToExcel> buyGoodsAllToExcel(billsCondition condition) {
        List<billsToExcel> result = storeMapper.buyGoodsAllToExcel(condition);
        return result;
    }

    @Override
    public List<billsToExcel> buyGoodsToExcelById(List<String> ids) {

        List<billsToExcel> result = storeMapper.buyGoodsToExcelById(ids);
        log.info("size={}",result.size());
        return result;
    }

    @Override
    public void editBuyGoodsState2(editGoods goods) {
        storeMapper.editBuyGoodsState2(goods);
    }

    @Override
    public void orderBill(order order) throws Exception {
        // 增加bills
        storeMapper.orderBill(order);
        // 修改库存
        int result = storeMapper.reduceRepository(order);
        if(result <= 0){
            throw new Exception("商品库存不足");
        }
    }

    @Override
    public int reduceRepository(order order) {
        int result = storeMapper.reduceRepository(order);
        return result;
    }

    @Override
    public Store login(userLogin userLogin) throws Exception {
        Store store = new Store();
        store.setAccount(userLogin.getUsername());
        if(AccountExist(store) <= 0){
            throw new Exception("用户不存在");
        }
        Store result = storeMapper.login(userLogin);
        if(result == null){
            throw new Exception("用户密码错误");
        }
        log.info("store={}",result);

        return result;
    }

    @Override
    public int AccountExist(Store store) {
        return storeMapper.AccountExist(store);
    }

    @Override
    public List<Store> getAllStoreAccount(storeCondition condition) {
        List<Store> store = storeMapper.getAllStoreAccount(condition);
        return store;
    }

    @Override
    public int DelStore(Integer id) {
        return storeMapper.DelStore(id);
    }

    @Override
    public Store getStoreById(int id) {
        Store store = storeMapper.getStoreById(id);
        store.setCarousel(GetStoreCarouselPics(id));
        return store;
    }

    @Override
    public void editStoreById(Store store) throws NoSuchAlgorithmException,Exception {
        if(AccountExist(store) >= 1){
            throw new Exception("该账户已被注册");
        }
        if(store.getPassword() != null){
            MD5Util md5Util = new MD5Util();
            store.setPassword(md5Util.asHexString(md5Util.md5Hash(store.getPassword())));
        }
        if(store.getCarousel() != null && store.getCarousel().size() >= 1){
            // 查看id是否存在
            // 如果没有id那么就增加，其他的删除
            store.getCarousel().forEach(item -> {
                if(item.getId() == null){
                    // 增加
                    store.setUrl(item.getSrc());
                    storeMapper.AddStoreCarouselPic(store);
                }
            });
        }
//        如果其他的几个都为空，那就不修改
        if(!(store.getName() == null && store.getDescription() == null
                && store.getSrc() == null && store.getAccount() == null
        && store.getPassword() == null && store.getRole() == null && store.getTel() == null))
        storeMapper.editStoreById(store);
    }

}
