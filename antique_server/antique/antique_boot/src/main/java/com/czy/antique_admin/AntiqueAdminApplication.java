package com.czy.antique_admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@MapperScan("com.czy.antique_admin.mappers")
public class AntiqueAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(AntiqueAdminApplication.class, args);
    }

}
