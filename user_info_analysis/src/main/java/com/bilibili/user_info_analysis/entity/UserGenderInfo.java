package com.bilibili.user_info_analysis.entity;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.*;

/**
 * GenderInfo
 *
 * @author zhangyuewen
 * @since 2022/3/22
 **/
@Data
@Entity
@Table(name = "user_gender_info")
public class UserGenderInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;
    String genderKind;
    int count_n;
}
