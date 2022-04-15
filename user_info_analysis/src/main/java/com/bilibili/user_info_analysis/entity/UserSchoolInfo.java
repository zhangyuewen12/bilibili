package com.bilibili.user_info_analysis.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * UserSchoolInfo
 *
 * @author zhangyuewen
 * @since 2022/3/28
 **/
@Entity
@Data
@Table(name = "user_school_info")
public class UserSchoolInfo {
    @Id
    private int id;
    private String schoolName;
    private int count_n;
}
