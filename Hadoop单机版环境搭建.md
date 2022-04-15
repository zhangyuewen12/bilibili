# 一、前置条件
Hadoop 的运行依赖 JDK，需要预先安装，安装步骤见
Linux 下 JDK 的安装

# 二、配置免密登录
Hadoop 组件之间需要基于 SSH 进行通讯。

## 2.1 配置映射

配置 ip 地址和主机名映射
```
vim /etc/hosts
# 文件末尾增加
192.168.43.202  hadoop001
```

## 2.2 生成公私钥
执行下面命令行生成公匙和私匙
```
ssh-keygen -t rsa
```

# 2.3 授权
进入 ~/.ssh 目录下，查看生成的公匙和私匙，并将公匙写入到授权文件：
```
[root@@hadoop001 sbin]#  cd ~/.ssh
[root@@hadoop001 .ssh]# ll
-rw-------. 1 root root 1675 3 月  15 09:48 id_rsa
-rw-r--r--. 1 root root  388 3 月  15 09:48 id_rsa.pub
```

```
# 写入公匙到授权文件
[root@hadoop001 .ssh]# cat id_rsa.pub >> authorized_keys
[root@hadoop001 .ssh]# chmod 600 authorized_keys
```

# 三、Hadoop(HDFS)环境搭建
## 3.1 下载并解压
下载 Hadoop 安装包，这里我下载的是 CDH 版本的，下载地址为：http://archive.cloudera.com/cdh5/cdh/5/

```
# 解压
tar -zvxf hadoop-2.6.0-cdh5.15.2.tar.gz 
```
## 3.2 配置环境变量
```
# vi /etc/profile
```
配置环境变量：
```
export HADOOP_HOME=/usr/app/hadoop-2.6.0-cdh5.15.2
export  PATH=${HADOOP_HOME}/bin:$PATH
```
执行 source 命令，使得配置的环境变量立即生效：
```
# source /etc/profile
```
## 3.3 修改Hadoop配置
进入 ${HADOOP_HOME}/etc/hadoop/ 目录下，修改以下配置：  
1. hadoop-env.sh
```
# JDK安装路径
export  JAVA_HOME=/usr/java/jdk1.8.0_201/
```
2. core-site.xml
```
<configuration>
    <property>
        <!--指定 namenode 的 hdfs 协议文件系统的通信地址-->
        <name>fs.defaultFS</name>
        <value>hdfs://hadoop001:8020</value>
    </property>
    <property>
        <!--指定 hadoop 存储临时文件的目录-->
        <name>hadoop.tmp.dir</name>
        <value>/home/hadoop/tmp</value>
    </property>
</configuration>
```
3. hdfs-site.xml  
指定副本系数和临时文件存储位置:   
```
<configuration>
    <property>
        <!--由于我们这里搭建是单机版本，所以指定 dfs 的副本系数为 1-->
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>
```
4. slaves  
配置所有从属节点的主机名或 IP 地址，由于是单机版本，所以指定本机即可
```
hadoop001
```
## 3.4 关闭防火墙  
不关闭防火墙可能导致无法访问 Hadoop 的 Web UI 界面  
```
# 查看防火墙状态
sudo firewall-cmd --state
# 关闭防火墙:
sudo systemctl stop firewalld.service
```
## 3.5 初始化
第一次启动 Hadoop 时需要进行初始化，进入 ${HADOOP_HOME}/bin/ 目录下，执行以下命令：
```
[root@hadoop001 bin]# ./hdfs namenode -format
```
## 3.6 启动HDFS
进入 ${HADOOP_HOME}/sbin/ 目录下，启动 HDFS：  
```
[root@hadoop001 sbin]# ./start-dfs.sh
```

## 3.7 验证是否启动成功
方式一：执行 jps 查看 NameNode 和 DataNode 服务是否已经启动：
```
[root@hadoop001 hadoop-2.6.0-cdh5.15.2]# jps
9137 DataNode
9026 NameNode
9390 SecondaryNameNode
```
方式二：查看 Web UI 界面，端口为 50070：
[!images](https://camo.githubusercontent.com/0db25aac074ca94e1fe7987e991b0614f5fe9e3b08df3682717f8f2bcdc1f040/68747470733a2f2f67697465652e636f6d2f68656962616979696e672f426967446174612d4e6f7465732f7261772f6d61737465722f70696374757265732f6861646f6f70e5ae89e8a385e9aa8ce8af812e706e67)