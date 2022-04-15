package com.bilibili.user_info_analysis.repository;

import com.bilibili.user_info_analysis.entity.UserGenderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * GenderInfoRepository
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Repository
public interface GenderInfoRepository extends JpaRepository<UserGenderInfo,Integer> {
    @Override
    Optional<UserGenderInfo> findById(Integer integer);
}
