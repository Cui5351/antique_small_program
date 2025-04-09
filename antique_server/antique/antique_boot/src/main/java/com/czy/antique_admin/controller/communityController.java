package com.czy.antique_admin.controller;

import com.czy.antique_admin.dao.Communitys;
import com.czy.antique_admin.dao.HotCommunity;
import com.czy.antique_admin.entity.CommunityCondition;
import com.czy.antique_admin.result.Result;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.czy.antique_admin.services.communityServiceImp;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/Community")
@Slf4j
@Transactional
public class communityController {
    @Autowired
    private communityServiceImp communityServiceImp;
    @GetMapping("/GetAllCommunity")
    public Result GetAllCommunity(CommunityCondition communityCondition){
        PageHelper.startPage(communityCondition.getPage(),communityCondition.getPageSize());
        List<Communitys> communitys = communityServiceImp.GetAllCommunity(communityCondition);
        PageInfo<Communitys> result = new PageInfo<>(communitys);
        return Result.success(result);
    }
    @GetMapping("/GetCommunityHot")
    public Result GetCommunityHot(){
        List<HotCommunity> list = communityServiceImp.GetCommunityHot();
        return Result.success(list);
    }
    @PostMapping("/UpdateCommunityStatus")
    public Result UpdateCommunityStatus(@RequestBody Communitys communitys){
        communityServiceImp.UpdateCommunityStatus(communitys);
        return Result.success();
    }
    @DeleteMapping("/DeleteCommunity")
    public Result DeleteCommunity(@RequestParam String uuid){
        communityServiceImp.DeleteCommunity(uuid);
        return Result.success();
    }
}
