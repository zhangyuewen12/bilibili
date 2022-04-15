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
shcool_name varchar(20),
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