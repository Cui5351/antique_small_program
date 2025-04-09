package com.czy.antique_admin.services;

import com.czy.antique_admin.dao.Communitys;
import com.czy.antique_admin.dao.HotCommunity;
import com.czy.antique_admin.dao.work;
import com.czy.antique_admin.entity.CommunityCondition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.czy.antique_admin.mappers.communityMapper;

import java.util.List;

@Service
public class communityServiceImp implements communityMapper {
    @Autowired
    private communityMapper communityMapper;
    @Override
    public List<HotCommunity> GetCommunityHot() {
        return communityMapper.GetCommunityHot();
    }

    @Override
    public List<Communitys> GetAllCommunity(CommunityCondition condition) {
        List<Communitys> result = communityMapper.GetAllCommunity(condition);
        result.forEach(item -> {
            List<work> src = GetSrcByUuid(item.getUuid());
            if(src.size() > 0){
                List<String> srcList = src.stream().map(work::getSrc).toList();
    //            设置src
                item.setSrc(srcList);
    //            设置mask
                item.setMask(src.get(0).getMask());
    //            根据srcList[0]的后缀来设置type，后缀为.mp4设置v,否则为p
                item.setType(src.get(0).getSrc().substring(src.get(0).getSrc().lastIndexOf(".") + 1).equals("mp4") ? "v" : "p");
    //            设置duration
                item.setDuration(src.get(0).getDuration());
            }
        });
//        根据uuid来拿到资源
        return result;
    }

    @Override
    public List<work> GetSrcByUuid(String uuid) {
        return communityMapper.GetSrcByUuid(uuid);
    }

    @Override
    public void UpdateCommunityStatus(Communitys communitys) {
        communityMapper.UpdateCommunityStatus(communitys);
    }

    @Override
    public void DeleteCommunity(String uuid) {
        communityMapper.DeleteCommunity(uuid);
    }
}
