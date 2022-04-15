package com.bilibili.user_info_analysis.repository;

import com.bilibili.user_info_analysis.entity.UserLevelInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * LevelInfoRepository
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Repository
public interface LevelInfoRepository extends JpaRepository<UserLevelInfo,Integer> {
}
