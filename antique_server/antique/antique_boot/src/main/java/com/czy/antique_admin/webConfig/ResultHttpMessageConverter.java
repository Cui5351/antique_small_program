package com.czy.antique_admin.webConfig;

import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.AbstractHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import com.czy.antique_admin.result.Result;

import java.io.IOException;

public class ResultHttpMessageConverter extends AbstractHttpMessageConverter<Result> {

    public ResultHttpMessageConverter() {
        super(MediaType.APPLICATION_JSON); // 假设返回 JSON 数据，可根据实际情况修改
    }

    @Override
    protected boolean supports(Class<?> clazz) {
        return Result.class.isAssignableFrom(clazz);
    }

    @Override
    protected Result readInternal(Class<? extends Result> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        // 读取逻辑，根据实际情况实现
        return null;
    }

    @Override
    protected void writeInternal(Result result, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        // 写入逻辑，根据实际情况实现
        outputMessage.getBody().write(result.toString().getBytes());
    }
}