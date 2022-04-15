package com.bilibili.user_info_analysis.controller;

import com.bilibili.user_info_analysis.common.Result;
import com.bilibili.user_info_analysis.entity.*;
import com.bilibili.user_info_analysis.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * GenderInfoController
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@RestController
@RequestMapping("/user")
public class UserInfoController {
    @Autowired
    private GenderInfoRepository genderInfoRepository;

    @Autowired
    private FansInfoRepository fansInfoRepository;

    @Autowired
    private FollowingInfoRepository followingInfoRepository;

    @Autowired
    private LevelInfoRepository levelInfoRepository;

    @Autowired
    private VipInfoRepository vipInfoRepository;

    @Autowired
    private SchoolInfoRepository schoolInfoRepository;

    @RequestMapping("/getGenderInfo")
    private Result getGenderInfo() {
        List<UserGenderInfo> res = genderInfoRepository.findAll();
        return Result.succeed(res, "成功");
    }

    @RequestMapping("/getFansInfo")
    private Result getFansInfo() {
        List<UserFansInfo> res = fansInfoRepository.findAll();
        return Result.succeed(res, "成功");
    }

    @RequestMapping("/getFollowingInfo")
    private Result getFollowingInfo() {
        List<UserFollowingInfo> res = followingInfoRepository.findAll();
        return Result.succeed(res, "成功");
    }

    @RequestMapping("/getLevelInfo")
    private Result getLevelInfo() {
        List<UserLevelInfo> res = levelInfoRepository.findAll();
        return Result.succeed(res, "成功");
    }


    @RequestMapping("/getVipInfo")
    private Result getVipInfo() {
        List<UserVipInfo> res = vipInfoRepository.findAll();
        return Result.succeed(res, "成功");
    }

    @RequestMapping("/getSchoolInfo")
    private Result getSchoolInfo() {
        List<UserSchoolInfo> res = schoolInfoRepository.findAll();
        return Result.succeed(res, "成功");
    }
}

