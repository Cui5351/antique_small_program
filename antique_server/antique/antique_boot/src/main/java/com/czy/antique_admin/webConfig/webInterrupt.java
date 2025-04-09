package com.czy.antique_admin.webConfig;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.AccessLog;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@Slf4j
@Component
public class webInterrupt implements HandlerInterceptor {
    @Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//    log.info("header={}",request.getHeaders("referer").nextElement());
//    log.info("header1 = {}",request.getHeader("Referer"));
//    log.info("header2 = {}",request.getHeader("referer"));
    return HandlerInterceptor.super.preHandle(request, response, handler);
}
}
