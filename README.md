# 操作步骤

##  一、 启动大数据相关服务
```commandline
1. start-dfs.sh

2. start-yarn.sh

启动hive元数据服务
hive --service metastore &
启动hiveserve2服务
$HIVE_HOME/bin/hiveserver2 &
启动Beeline
beeline 
!connect jdbc:hive2://localhost:10000
```
## 二 、运行 python3 spiderBiliUsrInfo.py
> 如缺少相关包，请先使用 pip3 install .. 下载
## 2.0 生成数据在data/data.csv

## 3.0 Hive 服务操作
1. 上传数据到HDFS
    hdfs dfs -put data.csv /tmp/
2. 加载数据到Hive
    Load data inpath ''
```odpsql
1.0 建立数据库，表
create database if not exists bilibili;

CREATE TABLE  if not exists `bilibili_user_info` (
  `mid` int ,
  `name` varchar(45),
  `sex` varchar(45) ,
  `rank` varchar(45) ,
  `level` varchar(45) ,
  `coins` int,
  `jointime` varchar(45) ,
  `birthday` varchar(45),
  `school` varchar(300) ,
  `is_vip` varchar(10) ,
  `is_year_vip` varchar(10),
  `userFollowing` int ,
  `userFans` int ,
  `archiveview` int ,
  `article` int
)
row format DELIMITED fields terminated by '\t'
stored as textfile;
2. 将数据文件上传到HDFS
hdfs dfs -put data.csv /tmp/
3. 数据转载到Hive中。
LOAD DATA INPATH '/tmp/data.csv' OVERWRITE INTO TABLE bilibili.bilibili_user_info;
```

## 4.0 数据分析

### 4.1 分析B站男女比例
```odpsql
drop table if exists user_gender_info;
create table user_gender_info as
select  sex, count(1) as p_count
from 
(
select * from bilibili_user_info
where sex ='男' OR sex = '女' OR sex='保密'
) A
group by sex

+-----------------------+---------------------------+
| user_gender_info.sex  | user_gender_info.p_count  |
+-----------------------+---------------------------+
| 保密                    | 40842                     |
| 女                     | 656                       |
| 男                     | 2674                      |
```
### 4.2 分析B站会员办理情况
```odpsql
drop table if exists user_vip_info;
create table if not exists user_vip_info as 
select 
is_vip,
is_year_vip,
count(1) as c_1
from 
bilibili_user_info
group by 
is_vip,
is_year_vip;

+-----------------------+----------------------------+--------------------+
| user_vip_info.is_vip  | user_vip_info.is_year_vip  | user_vip_info.c_1  |
+-----------------------+----------------------------+--------------------+
| N                     | N                          | 28709              |
| Y                     | N                          | 963                |
| Y                     | Y                          | 14500              |
+-----------------------+----------------------------+--------------------+

```
### 4.3 分析B站人员学校情况
```odpsql
drop table if exists user_school_info;
create table user_school_info as 
select school,count(1)  as school_count 
from bilibili_user_info 
where school != '' 
group by school;

select * from user_school_info order by school_count desc limit 10;

+--------------------------+--------------------------------+
| user_school_info.school  | user_school_info.school_count  |
+--------------------------+--------------------------------+
| 上海交通大学                   | 19                             |
| 北京大学                     | 14                             |
| 清华大学                     | 12                             |
| 华中科技大学                   | 12                             |
| 浙江大学                     | 11                             |
| 同济大学                     | 8                              |
| 武汉大学                     | 8                              |
| 中国科学技术大学                 | 8                              |
| 复旦大学                     | 8                              |
| 深圳大学                     | 7                              |
+--------------------------+--------------------------------+
```

### 4.4 分析B站人员粉丝情况
```odpsql
drop table if exists user_fans_info;
create table user_fans_info as 
select 
user_fans_level,
count(1) as fans_count
from
(
select 
mid,
name,
case 
  when userFans < 100  then 1
  when userFans >=100 and userFans < 500 then 2
  when userFans >=500 and userFans < 1000 then 3
  when userFans >=1000 and userFans < 5000 then 4
  when userfans >=5000  then 5 end user_fans_level
from bilibili_user_info
) as A 
where user_fans_level is not null
group by 
user_fans_level;

+---------------------------------+----------------------------+
| user_fans_info.user_fans_level  | user_fans_info.fans_count  |
+---------------------------------+----------------------------+
| 1                               | 41672                      |
| 2                               | 1436                       |
| 3                               | 337                        |
| 4                               | 449                        |
| 5                               | 278                        |
+---------------------------------+----------------------------+
```
### 4.5 分析B站人员关注情况
```odpsql
drop table if exists user_following_info;
create table user_following_info as 
select 
user_following_level,
count(1) as following_count
from
(
select 
mid,
name,
case 
  when userFollowing < 50  then 1
  when userFollowing >=100 and userFollowing < 300 then 2
  when userFollowing >=300 and userFollowing < 500 then 3
  when userFollowing >=500 and userFollowing < 1000 then 4
  when userFollowing >=1000  then 5 end user_following_level
from bilibili_user_info
) as A 
where user_following_level is not null
group by 
user_following_level;

+-------------------------------------------+--------------------------------------+
| user_following_info.user_following_level  | user_following_info.following_count  |
+-------------------------------------------+--------------------------------------+
| 1                                         | 24811                                |
| 2                                         | 8962                                 |
| 3                                         | 2341                                 |
| 4                                         | 1387                                 |
| 5                                         | 509                                  |
+-------------------------------------------+--------------------------------------+
```
### 4.6 分析B站人员账号登记情况
```odpsql
drop table if exists user_level_info;
create table user_level_info as
select 
level,
count(1) as l_count
from 
bilibili_user_info
group by 
level;

+------------------------+--------------------------+
| user_level_info.level  | user_level_info.l_count  |
+------------------------+--------------------------+
| 0                      | 21                       |
| 1                      | 7859                     |
| 2                      | 3582                     |
| 3                      | 2540                     |
| 4                      | 4686                     |
| 5                      | 14341                    |
| 6                      | 11143                    |
+------------------------+--------------------------+
```

## 三、 mysql操作
```sql
create table if not exists bilibili.user_gender_info
(
id int not null auto_increment,
gender_kind varchar(20),
count_n int,
primary key(id)
);
create table if not exists bilibili.user_level_info
(
id int NOT NULL AUTO_INCREMENT,
level_kind varchar(20),
count_n int,
primary key(id)
);

create table if not exists bilibili.user_fans_info
(
id int not null auto_increment,
fans_level varchar(20),
count_n int,
primary key(id)
);
create table if not exists bilibili.user_following_info
(
id int not null auto_increment,
following_level varchar(20),
count_n int,
primary key(id)
);
create table if not exists bilibili.user_vip_info
(
id int not null auto_increment,
is_vip varchar(20),
is_year_vip varchar(20),
count_n int,
primary key(id)
);
create table if not exists bilibili.user_school_info
(
id int not null auto_increment,
school_name varchar(20),
count_n int,
primary key(id)
);

truncate table user_gender_info;
truncate table user_level_info;
truncate table user_fans_info;
truncate table user_following_info;
truncate table user_vip_info;
truncate table user_school_info;
```


四、hive数据迁移到mysql  hive2mysql.sh 脚本
```shell script
#hive数据导出
hive -e "select * from bilibili.user_fans_info" > /Users/zyw/project/bilibili/data/user_fans_info.txt
hive -e "select * from bilibili.user_following_info" > /Users/zyw/project/bilibili/data/user_following_info.txt
hive -e "select * from bilibili.user_gender_info" > /Users/zyw/project/bilibili/data/user_gender_info.txt
hive -e "select * from bilibili.user_level_info" > /Users/zyw/project/bilibili/data/user_level_info.txt
hive -e "select * from bilibili.user_school_info" > /Users/zyw/project/bilibili/data/user_school_info.txt
hive -e "select * from bilibili.user_vip_info" > /Users/zyw/project/bilibili/data/user_vip_info.txt

#mysql数据导入
mysql -hlocalhost -uroot -p12345678 bilibili  -e "load data INFILE '/Users/zyw/project/bilibili/data/user_fans_info.txt' INTO TABLE bilibili.user_fans_info FIELDS TERMINATED BY '\t' (fans_level,count_n)"
mysql -hlocalhost -uroot -p12345678 bilibili  -e "load data INFILE '/Users/zyw/project/bilibili/data/user_following_info.txt' INTO TABLE bilibili.user_following_info FIELDS TERMINATED BY '\t' (following_level,count_n)"
mysql -hlocalhost -uroot -p12345678 bilibili  -e "load data INFILE '/Users/zyw/project/bilibili/data/user_gender_info.txt' INTO TABLE bilibili.user_gender_info FIELDS TERMINATED BY '\t' (gender_kind,count_n)"
mysql -hlocalhost -uroot -p12345678 bilibili  -e "load data INFILE '/Users/zyw/project/bilibili/data/user_level_info.txt' INTO TABLE bilibili.user_level_info FIELDS TERMINATED BY '\t' (level_kind,count_n)"
mysql -hlocalhost -uroot -p12345678 bilibili  -e "load data INFILE '/Users/zyw/project/bilibili/data/user_school_info.txt' INTO TABLE bilibili.user_school_info FIELDS TERMINATED BY '\t' (shcool_name,count_n)"
mysql -hlocalhost -uroot -p12345678 bilibili  -e "load data INFILE '/Users/zyw/project/bilibili/data/user_vip_info.txt' INTO TABLE bilibili.user_vip_info FIELDS TERMINATED BY '\t' (is_vip,is_year_vip,count_n)"
```
