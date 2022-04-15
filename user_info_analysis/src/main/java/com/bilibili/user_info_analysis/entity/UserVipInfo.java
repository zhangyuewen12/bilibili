package com.bilibili.user_info_analysis.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * UserVipInfo
 *
 * @author zhangyuewen
 * @since 2022/3/28
 **/
@Entity
@Data
@Table(name = "user_vip_info")
public class UserVipInfo {
    @Id
    private int id;
    private String is_vip;
    private String is_year_vip;
    private int count_n;
}
