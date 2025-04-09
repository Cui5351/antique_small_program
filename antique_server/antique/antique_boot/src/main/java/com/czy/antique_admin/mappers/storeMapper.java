package com.czy.antique_admin.mappers;

import com.czy.antique_admin.dao.*;
import com.czy.antique_admin.entity.GoodsSearch;
import com.czy.antique_admin.entity.billsCondition;
import com.czy.antique_admin.entity.storeCondition;
import com.czy.antique_admin.entity.userLogin;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface storeMapper {
    List<goods> GetGoodsAll(storeCondition condition);
    List<goods> GetGoodsAll2(storeCondition condition);
    List<goods> getGoodsAllUser(storeCondition condition);
    bills GetGoodsBills(billsCondition condition);
    goods GetGoodsInfoById(int id);
    List<Store> GetStoreNames();

    int AddStoreItem(goods good);

    int AddStorePic(goods good);
    int EditStoreItem(goods good);

    void DelStoreItem(int id);

    int AddStore(Store store) throws Exception;

    List<goods_pic> GetStorePics(int id);


    List<Store> getAllStore(storeCondition condition);

    List<bills> buyGoodsAll(billsCondition condition);
    List<billsToExcel> buyGoodsAllToExcel(billsCondition condition);
    List<billsToExcel> buyGoodsToExcelById(List<String> ids);

    void editBuyGoodsState2(editGoods goods);

    void orderBill(order order) throws Exception;

    int reduceRepository(order order);

    Store login(userLogin userLogin) throws Exception;
    int AccountExist(Store store);
    List<Store> getAllStoreAccount(storeCondition condition);
    int DelStore(Integer id);
    Store getStoreById(int store);
    void editStoreById(Store store) throws NoSuchAlgorithmException,Exception;
    String isRoot(String id);
    void DeleteGoodsPic(int id);
    void AddShops(Shops shops);
    int GoodsExist(Shops shops);
    void SetDate(Shops shops);
    void DelShop(Shops shops);
    List<goods> myShops(String openid);
    Integer GoodsExistInShops(String openid,int shopId);
    List<goods> GetGoodsBySale(GoodsSearch condition);
    List<String> GetGoodsLabelByName(String name);

    void AddStoreCarouselPic(Store store);

    List<goods_pic> GetStoreCarouselPics(int id);
    void DeleteStoreCarouselPic(int id);
    List<storeRank> GetStoreRank();
}
