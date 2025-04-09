package com.czy.antique_admin.services;

import com.czy.antique_admin.dao.MessageVo;
import com.czy.antique_admin.mappers.MyAiMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AIServiceImp implements com.czy.antique_admin.mappers.MyAiMapper {
    @Autowired
    private MyAiMapper myAiMapper;
    @Override
    public List<MessageVo> getChatMemory(String id) {
//        查询redis
        myAiMapper.getChatMemory(id);
        return null;
    }

}
