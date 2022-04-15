package com.bilibili.user_info_analysis.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> implements Serializable {

    private T datas;
    private Integer code;
    private String msg;

    public static <T> Result<T> of(T datas, Integer code, String msg) {
        return new Result<>(datas, code, msg);
    }

    public static <T> Result<T> succeed(String msg) {
        return of(null, 200, msg);
    }

    public static <T> Result<T> succeed(T model, String msg) {
        return of(model, 200, msg);
    }

    public static <T> Result<T> succeed(T model) {
        return of(model, 200, "");
    }


    public static <T> Result<T> failed(String msg) {
        return of(null, 400, msg);
    }

    public static <T> Result<T> failed(T model, String msg) {
        return of(model, 400, msg);
    }
}

