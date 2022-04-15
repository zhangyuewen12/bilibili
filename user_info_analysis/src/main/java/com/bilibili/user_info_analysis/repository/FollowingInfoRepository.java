package com.bilibili.user_info_analysis.repository;

import com.bilibili.user_info_analysis.entity.UserFollowingInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * FollowingInfoRepository
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Repository
public interface FollowingInfoRepository extends JpaRepository<UserFollowingInfo,Integer> {
}
