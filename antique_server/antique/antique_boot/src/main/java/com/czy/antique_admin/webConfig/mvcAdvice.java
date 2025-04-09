package com.czy.antique_admin.webConfig;

import com.czy.antique_admin.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
@Slf4j
public class mvcAdvice{
    @ExceptionHandler
    public Result Exception(Exception e){
        return Result.error(e.getMessage());
    }
    public void handle(){

    }
    @ExceptionHandler
    public Result SQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException e){
        log.info("{}",e.getMessage());
        return Result.error(e.getMessage());
    }

//    SQLIntegrityConstraintViolationException
}
