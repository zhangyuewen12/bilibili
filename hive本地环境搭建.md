# Hive本地环境搭建

## 一、下载解压

```
tar -xzvf hive-x.y.z.tar.gz
```

## 二、配置HIVE_HOME环境变量

```
export PATH=$HIVE_HOME/bin:$PATH
```

## 三、HDFS上创建目录并赋权限

```shell
$HADOOP_HOME/bin/hadoop fs -mkdir       /tmp
$HADOOP_HOME/bin/hadoop fs -mkdir   -p    /user/hive/warehouse
$HADOOP_HOME/bin/hadoop fs -chmod g+w   /tmp
$HADOOP_HOME/bin/hadoop fs -chmod g+w   /user/hive/warehouse
```

> - you must have Hadoop in your path OR
> - `export HADOOP_HOME=<hadoop-install-dir>`

## 四、下载mysql驱动

打开[MySQL官网](https://dev.mysql.com/downloads/connector/j/)选择 Platform Independent --> Download -> 解压 -> 将mysql-connector-java-8.0.19.jar放入到${HIVE_HOME}/lib目录下

<img src="/Users/zyw/Library/Application Support/typora-user-images/image-20210618144900210.png" alt="image-20210618144900210" style="zoom:50%;" />

## 五、创建数据库

```
在MySQL中创建metastore数据库, 可以通过终端、Navicat等数据库客户端来创建一个数据库。

mysql> create database metastore;

# 可以创建一个用户也可以直接使用root账号，此步骤可以省略
mysql> create user 'hive'@'localhost' identified by '123456';
mysql> grant select,insert,update,delete,alter,create,index,references on metastore.* to 'hive'@'localhost';
mysql> flush privileges;
```





## 六、配置 hive-site.xml

```xml
<property>
<name>javax.jdo.option.ConnectionURL</name>
<value>jdbc:mysql://localhost:3306/hive_metastore?createDatabaseIfNotExist=true</value>
</property>
<property>
<name>javax.jdo.option.ConnectionDriverName</name>
<value>com.mysql.cj.jdbc.Driver</value>
</property>
<!--mysql用户名-->
<property>
<name>javax.jdo.option.ConnectionUserName</name>
<value>root</value>
</property>
<!--mysql密码-->
<property>
<name>javax.jdo.option.ConnectionPassword</name>
<value>root123</value>
</property>
```

## 七、初始化metastore数据库

```shell
${HIVE_HOME}/bin目录下

1.$HIVE_HOME/bin/schematool -dbType <db type> -initSchema
schematool -initSchema -dbType mysql
OR
schematool -initSchema -dbType derby

2.启动hiveserver2

   启动元数据服务
2.1. hive --service metastore &
2.2. $HIVE_HOME/bin/hiveserver2 &

3.启动beeine
 3.1  beeline 
   3.2 !connect jdbc:hive2://localhost:10000
```

> [HiveServer2](https://cwiki.apache.org/confluence/display/Hive/HiveServer2+Overview) (HS2) is a server interface that enables remote clients to execute queries against Hive and retrieve the results (a more detailed intro [here](https://cwiki.apache.org/confluence/display/Hive/HiveServer2+Overview)). The current implementation, based on Thrift RPC, is an improved version of [HiveServer](https://cwiki.apache.org/confluence/display/Hive/HiveServer) and supports multi-client concurrency and authentication. It is designed to provide better support for open API clients like JDBC and ODBC.
>
> 
>
> Starting from Hive 2.1, we need to run the schematool command below as an initialization step. For example, we can use "derby" as db type. 
>
> ```
> $HIVE_HOME/bin/schematool -dbType <db type> -initSchema
> ```



> system...类似的参数要修改掉。