package com.bilibili.user_info_analysis.repository;

import com.bilibili.user_info_analysis.entity.UserFansInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * FansInfoRepository
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Repository
public interface FansInfoRepository extends JpaRepository<UserFansInfo,Integer> {
}
