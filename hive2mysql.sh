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
