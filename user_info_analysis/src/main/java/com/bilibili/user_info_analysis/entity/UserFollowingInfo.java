package com.bilibili.user_info_analysis.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * FollowingInfo
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Data
@Entity
@Table(name = "user_following_info")
public class UserFollowingInfo {
    @Id
    int id;
    String followingLevel;
    int count_n;
}
