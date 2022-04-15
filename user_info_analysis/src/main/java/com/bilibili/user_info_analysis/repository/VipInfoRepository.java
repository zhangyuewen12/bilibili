package com.bilibili.user_info_analysis.repository;

import com.bilibili.user_info_analysis.entity.UserVipInfo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * VipInfoRepository
 *
 * @author zhangyuewen
 * @since 2022/3/28
 **/
public interface VipInfoRepository extends JpaRepository<UserVipInfo,Integer> {
}
