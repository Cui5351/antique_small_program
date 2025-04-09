package com.czy.antique_admin.services;

import ch.qos.logback.core.util.MD5Util;
import com.czy.antique_admin.dao.*;
import com.czy.antique_admin.entity.AntiqueCollectCondition;
import com.czy.antique_admin.entity.AntiqueCondition;
import com.czy.antique_admin.entity.userLogin;
import com.czy.antique_admin.mappers.antiqueMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@Slf4j
public class antiqueServiceImp implements antiqueMapper {
    @Autowired
    private antiqueMapper antiqueMapper;
    @Autowired
    private storeServiceImp storeServiceImp;
    @Override
    public int insertAntique(Antique antique) throws Exception {
//        检测用户是否存在
        if(userExist(antique.getAccount()) > 0){
            throw new Exception("账户已存在");
        }
        return antiqueMapper.insertAntique(antique);
    }

    @Override
    public List<Antique> GetAntiqueAll(AntiqueCondition antiqueCondition) {
        List<Antique> list = antiqueMapper.GetAntiqueAll(antiqueCondition);
        return list;
    }

    @Override
    public int userExist(String account) {
        int count = antiqueMapper.userExist(account);
        log.info("{}",count);
        return count;
    }

    @Override
    public Antique userLogin(Antique antique) throws Exception {
        log.info("{}",antique.getAccount());
        if(userExist(antique.getAccount()) <= 0){
            throw new Exception("账户不存在");
        }
        MD5Util md5Util = new MD5Util();
        antique.setPassword(md5Util.asHexString(md5Util.md5Hash(antique.getPassword())));
        Antique result = antiqueMapper.userLogin(antique);
        if(result == null){
            throw new Exception("账户密码错误");
        }
        return result;
    }
//    获取所有的Antique


    @Override
    public List<antiqueCollect> GetAntiqueCollect(AntiqueCollectCondition antiqueCollectCondition) {
        List<antiqueCollect> collects = antiqueMapper.GetAntiqueCollect(antiqueCollectCondition);
        return collects;
    }

    @Override
    public int AddAntiqueCollect(antiqueCollect antiqueCollect) throws Exception {
        Integer exist = AntiqueCollectExist(antiqueCollect);
        if(exist >= 1){
            throw new Exception("该藏品已存在");
        }
        return antiqueMapper.AddAntiqueCollect(antiqueCollect);
    }
//    查看是否collect已存在
    public Integer AntiqueCollectExist(antiqueCollect antiqueCollect){
        return antiqueMapper.AntiqueCollectExist(antiqueCollect);
    }

    @Override
    public Antique FindAntiqueById(int id) {
        return antiqueMapper.FindAntiqueById(id);
    }

    @Override
    public antiqueCollect GetCollectById(int id) {
        return antiqueMapper.GetCollectById(id);
    }

    @Override
    public void EditCollectById(antiqueCollect antiqueCollect) {
        antiqueMapper.EditCollectById(antiqueCollect);
    }

    @Override
    public void delAntiqueCollect(antiqueCollect antiqueCollect) {
        antiqueMapper.delAntiqueCollect(antiqueCollect);
    }

    @Override
    public void EditAntiqueById(Antique antique) throws Exception {
//        检查账户是否存在
        if(antique.getAccount() != null){
            // 检查账户是否存在
            if(userExist(antique.getAccount()) > 0){
                throw new Exception("账户已存在");
            }
        }
        antiqueMapper.EditAntiqueById(antique);
    }


    @Override
    public List<Antique> GetAntiqueRandom() {
//        先拿到所有的id，然后再在里面随机抽取两个

        List<Integer> ids = GetAllAntiqueId();
        int num = (new Random()).nextInt(0,ids.size() - 2);
        return antiqueMapper.GetAntiqueRandomById(ids.get(num));
    }

    @Override
    public Antique GetAntiqueById(String id) {
        return antiqueMapper.GetAntiqueById(id);
    }

    @Override
    public List<Antique> GetAntiqueByProvince(String province) {
        List<Antique> antiques = antiqueMapper.GetAntiqueByProvince(province);
        return antiques;
    }

    @Override
    public List<Integer> GetAllAntiqueId() {
        List<Integer> ids = antiqueMapper.GetAllAntiqueId();
        return ids;
    }

    @Override
    public List<Antique> GetAntiqueRandomById(int id) {
        return antiqueMapper.GetAntiqueRandomById(id);
    }

    @Override
    public List<Store> GetAllStoreForAntique() {
        return antiqueMapper.GetAllStoreForAntique();
    }

    @Override
    public List<Store> GetMyBindStoreById(int id) {
        return antiqueMapper.GetMyBindStoreById(id);
    }

    @Override
    public void AddAntiqueBindStore(int id, int user_id) {
        antiqueMapper.AddAntiqueBindStore(id,user_id);
    }

    @Override
    public void DelAntiqueBindStore(int id) {
        antiqueMapper.DelAntiqueBindStore(id);
    }

    @Override
    public List<goods> GetAntiqueStoreGoods(int id) {
        return antiqueMapper.GetAntiqueStoreGoods(id);
    }

    @Override
    public void DelAntique(String id, String userId) throws Exception {
//        查看userId是否是超级管理员
        if(!storeServiceImp.isRoot(userId).equals("超级管理员")){
            throw  new Exception("暂无管理员权限");
        }
        antiqueMapper.DelAntique(id,userId);
    }

    @Override
    public Antique GetAntiqueByName(String name) {
        return antiqueMapper.GetAntiqueByName(name);
    }

    @Override
    public List<Store> GetMuseumBindStoreById(int id) {
//        获取店铺
        List<Store> stores = GetMyBindStoreById(id);
        stores.forEach(item -> {
//            根据item的id拿到轮播图
            item.setCarousel(storeServiceImp.GetStoreCarouselPics(item.getId()));
        });
        return stores;
    }

}
