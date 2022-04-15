package com.bilibili.user_info_analysis.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * FansInfo
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Data
@Entity
@Table(name = "user_fans_info")
public class UserFansInfo {
    @Id
    int id;
    String fansLevel;
    int count_n;
}
