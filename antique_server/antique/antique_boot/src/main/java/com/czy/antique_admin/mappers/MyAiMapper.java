package com.czy.antique_admin.mappers;

import com.czy.antique_admin.dao.MessageVo;

import java.util.List;

public interface MyAiMapper {
    List<MessageVo> getChatMemory(String id);
}
