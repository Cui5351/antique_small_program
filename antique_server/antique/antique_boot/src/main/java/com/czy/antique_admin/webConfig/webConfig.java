package com.czy.antique_admin.webConfig;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
import java.util.logging.Logger;

@CrossOrigin
@SpringBootConfiguration
@Configuration
public class webConfig implements WebMvcConfigurer {
    @Autowired
    private webInterrupt webInterrupt;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        WebMvcConfigurer.super.addResourceHandlers(registry);
        registry.addResourceHandler("/static/**").
                addResourceLocations("C:\\Users\\86130\\Desktop\\财务管理模块\\antique_admin\\src\\main\\resources\\static\\");
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(webInterrupt);
        WebMvcConfigurer.super.addInterceptors(registry);
    }
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new ResultHttpMessageConverter());
    }
}
