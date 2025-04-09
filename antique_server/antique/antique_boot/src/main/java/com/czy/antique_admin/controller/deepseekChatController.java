package com.czy.antique_admin.controller;

import com.czy.antique_admin.dao.MessageVo;
import com.czy.antique_admin.mappers.MyAiMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
//import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping(value = "/admin/AI",produces = "text/html;charset=UTF-8")
@CrossOrigin
@Slf4j
public class deepseekChatController {
    private final ChatClient AI;

    public deepseekChatController(ChatClient ai) {
        AI = ai;
    }

    @Autowired
    private MyAiMapper myAiMapper;

    @Autowired
    private ChatMemory chatMemory;

    @RequestMapping("/chat")
    public Flux<String> chat(@RequestParam String prompt, @RequestParam String id){
//        这里的id是会话ID，设计模式采用 今天日期+openid，每次会话只有当天有效
//        每次发送一次就会增加一次redis里的数据
        String Id = generateId(id);
        return AI.prompt()
                .user(prompt)
                .advisors(a -> a.param(AbstractChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY, Id)) // 设置会话ID
//                .call() 全量返回
                .stream() // 流式返回
                .content();
    }
    public String generateId(String openid) {
        String date = java.time.LocalDate.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd"));
        return date + "_" + openid;
    }

//    根据ID来拿会话数据
    @GetMapping("/GetChatMemory")
    public List<MessageVo> GetChatMemory(@RequestParam String id) {
//        content,isUser
        System.out.println(chatMemory.get(id, 2));
        return myAiMapper.getChatMemory(id);
    }
}
