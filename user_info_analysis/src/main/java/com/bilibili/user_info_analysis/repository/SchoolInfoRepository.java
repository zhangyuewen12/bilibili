package com.bilibili.user_info_analysis.repository;

import com.bilibili.user_info_analysis.entity.UserSchoolInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * SchoolInfoRepository
 *
 * @author zhangyuewen
 * @since 2022/3/28
 **/
@Repository
public interface SchoolInfoRepository extends JpaRepository<UserSchoolInfo,Integer> {

    @Query("select u from UserSchoolInfo u order by count_n")
    Page<UserSchoolInfo> findInOrder(Pageable pageable);
}
