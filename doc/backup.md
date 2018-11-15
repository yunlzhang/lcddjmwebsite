## 在centos中利用crontab命令结合mongodump来备份mongodb数据


mongodump命令参考 [mogodump](https://docs.mongodb.com/manual/reference/program/mongodump/)



本例备份路径为/home/backup
脚本路径 /home/crontab/backup.sh


#### 1、新建脚本文件 backup.sh

```sh
#!/bin/sh
# dump 命令执行路径，根据mongodb安装路径而定
DUMP=/usr/bin/mongodump
# 临时备份路径
OUT_DIR=/home/backup/mongod_bak/mongod_bak_now
# 压缩后的备份存放路径
TAR_DIR=/home/backup/mongod_bak/mongod_bak_list
# 当前系统时间
DATE=`date +%Y-%m-%d`
# 数据库账号
DB_USER=your user
# 数据库密码
DB_PASS=your password
# 数据库名字
DB_NAMD=collection name
# 代表删除7天前的备份，即只保留近 7 天的备份
DAYS=7
# 最终保存的数据库备份文件
TAR_BAK="mongod_bak_$DATE.tar.gz"
cd $OUT_DIR
rm -rf $OUT_DIR/*
mkdir -p $OUT_DIR/$DATE
$DUMP -h 127.0.0.1:27017 -u $DB_USER -p $DB_PASS -d $DB_NAME -o $OUT_DIR/$DATE
# 压缩格式为 .tar.gz 格式
tar -zcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE
# 删除 7 天前的备份文件
find $TAR_DIR/ -mtime +$DAYS -delete

exit

```

#### 2、执行chmod命令 将.sh文件变成可执行文件
```
chmod -x ./backup.sh
```

#### 3、添加crontab任务

```
    crontab -e 

    # 加入

    * 1 * * *  /home/crontab/backup.sh

    # 保存退出
```
一图了解crontab

![](https://images0.cnblogs.com/blog/34483/201301/08090352-4e0aa3fe4f404b3491df384758229be1.png)

#### 4、重启crontab服务
```
service crontab restart
```


bingo,done!