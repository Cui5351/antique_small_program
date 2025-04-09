package com.czy.antique_admin.controller;

import ch.qos.logback.core.util.MD5Util;
import com.czy.antique_admin.dao.Store;
import com.czy.antique_admin.entity.userLogin;
import com.czy.antique_admin.result.Result;
import com.czy.antique_admin.services.storeServiceImp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@Slf4j
public class login {
    @Autowired
    private storeServiceImp storeServiceImp;
//    @PostMapping("/login")
//    public Result login(@RequestBody userLogin user) throws Exception {
//        System.out.println(user.getUsername());
//        System.out.println(user.getPassword());
////        查询账户是否存在
//        MD5Util md5 = new MD5Util();
//        String password = md5.asHexString(md5.md5Hash(user.getPassword()));
//        log.info("{}",password);
//        user.setPassword(password);
//         Store store = storeServiceImp.login(user);
//         return Result.success(store);
//    }
}
