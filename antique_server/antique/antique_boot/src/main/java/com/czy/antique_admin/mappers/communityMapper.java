package com.czy.antique_admin.mappers;

import com.czy.antique_admin.dao.Communitys;
import com.czy.antique_admin.dao.HotCommunity;
import com.czy.antique_admin.dao.work;
import com.czy.antique_admin.entity.CommunityCondition;

import java.util.List;

public interface communityMapper {
    List<HotCommunity> GetCommunityHot();
    List<Communitys> GetAllCommunity(CommunityCondition condition);
    List<work> GetSrcByUuid(String uuid);
    void UpdateCommunityStatus(Communitys communitys);
    void DeleteCommunity(String uuid);
}
