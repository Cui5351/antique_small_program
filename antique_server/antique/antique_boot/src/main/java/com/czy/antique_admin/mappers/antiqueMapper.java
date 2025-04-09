package com.czy.antique_admin.mappers;

import com.czy.antique_admin.dao.*;
import com.czy.antique_admin.entity.AntiqueCollectCondition;
import com.czy.antique_admin.entity.AntiqueCondition;
import com.czy.antique_admin.entity.userLogin;

import java.util.List;

public interface antiqueMapper {
    int insertAntique(Antique antique) throws Exception;
    List<Antique> GetAntiqueAll(AntiqueCondition antiqueCondition);
    int userExist(String account);
    Antique userLogin(Antique antique) throws Exception;
    List<antiqueCollect> GetAntiqueCollect(AntiqueCollectCondition antiqueCollectCondition);
    int AddAntiqueCollect(antiqueCollect antiqueCollect) throws Exception;
    Integer AntiqueCollectExist(antiqueCollect antiqueCollect);
    Antique FindAntiqueById(int id);
    antiqueCollect GetCollectById(int id);
    void EditCollectById(antiqueCollect antiqueCollect);
    void delAntiqueCollect(antiqueCollect antiqueCollect);
    void EditAntiqueById(Antique antique) throws Exception;
    List<Antique> GetAntiqueRandom();
    Antique GetAntiqueById(String id);
    List<Antique> GetAntiqueByProvince(String province);

    List<Integer> GetAllAntiqueId();

    List<Antique>GetAntiqueRandomById(int id);
    List<Store> GetAllStoreForAntique();
    List<Store> GetMyBindStoreById(int id);
    void AddAntiqueBindStore(int id,int user_id);
    void DelAntiqueBindStore(int id);
    List<goods> GetAntiqueStoreGoods(int id);
    void DelAntique(String id,String userId) throws Exception;
    Antique GetAntiqueByName(String name);
    List<Store> GetMuseumBindStoreById(int id);

}
