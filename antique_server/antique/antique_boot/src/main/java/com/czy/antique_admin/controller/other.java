package com.czy.antique_admin.controller;

import com.czy.antique_admin.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@Slf4j
public class other {
//    文件上传
    @PostMapping("/upload")
    public Result fileUpload(@RequestBody MultipartFile storeAvatar) throws IOException {
        String fileName = UUID.randomUUID() + storeAvatar.getOriginalFilename().substring(storeAvatar.getOriginalFilename().lastIndexOf('.') - 1);
        File file = new File("/www/wwwroot/server/antique/pics/" + fileName);
//        File file = new File("C:\\Users\\86130\\Desktop\\财务管理模块\\antique_admin\\src\\main\\resources\\static\\" + fileName);
        storeAvatar.transferTo(file);
        return Result.success("https://www.mengzhiyuan.email/antique/pics/" + fileName);
//        return Result.success("http://localhost/" + fileName);
    }

}
