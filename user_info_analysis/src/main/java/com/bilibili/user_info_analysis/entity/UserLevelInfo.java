package com.bilibili.user_info_analysis.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * LevelInfo
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Data
@Entity
@Table(name = "user_level_info")
public class UserLevelInfo {
    @Id
    int id;
    String levelKind;
    int count_n;
}
