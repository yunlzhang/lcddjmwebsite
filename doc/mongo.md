# mongodb 安装

## window系统

* 下载monggodb [https://www.mongodb.com/download-center?jmp=nav#community](https://www.mongodb.com/download-center?jmp=nav#community)安装mongodb(不建议装在c盘)
* 将mongodb安装目录下的的bin文件添加至环境变量中
* 启动服务 命令窗口输入mongod

* 安装mongodb服务，开机自动运行
        
    在mongodb安装目录下新建mongod.cfg文件

    ```
    #请将路径换成自己本机的
    systemLog:
        destination: file    
        path: D:\MongoDB\log\mongod.log
    storage:
        dbPath: D:\MongoDB\db
    ```
    以管理员方式打开命令行，输入
    ```
    "D:\MongoDB\bin\mongod.exe" --config "D:MongoDB\mongod.cfg" --install
    ```
    启动服务
    ```
    net start MongoDB
    ```
    停止服务
    ```
    net stop MongoDB
    ```
    移除服务
    ```
    "D:\MongoDB\bin\mongod.exe" --remove
    ```

## mac 安装mongodb

使用curl方式安装
```
# 进入 /usr/local
cd /usr/local

# 下载
sudo curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.2.tgz

# 解压
sudo tar -zxvf mongodb-osx-x86_64-3.4.2.tgz

# 重命名为 mongodb 目录

sudo mv mongodb-osx-x86_64-3.4.2 mongodb
```
安装完成后，我们可以把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中：
```
export PATH=/usr/local/mongodb/bin:$PATH
```



## mongodb具体使用

服务器搜索mongodb  mongod安装目录

```
->whereis mongo    ||      whereis mongod  

```

mongodb配置文件

```
# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# Where and how to store data.
storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# how the process runs
processManagement:
  fork: true  # fork and run in background
  pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile
  timeZoneInfo: /usr/share/zoneinfo

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1,(服务器公网Ip)  # Listen to local interface only, comment to listen on all interfaces.

security:
  authorization: enabled #是否开启验证，不想开启就设成disabled

#operationProfiling:

#replication:

#sharding:

#auditLog:

#snmp:

## Enterprise-Only Options

```


## mongodb 启动与关闭

```
# mongodb已配置文件启动

mongod --config   configPath

# mongodb 关闭  查看mongodb的启动端口号， ps -axu | grep mongo   安全停止mongodb

kill -2 XXXX

kill -4 XXXX

#mongod命令shutdown 方式安全停止
use admin

db.shudownServer()


```


## mongdb 忘记账号与密码

```
（1）kill -2 XXXX 关闭mongo进程

（2）已非验证方式启动mongdb  修改 mongoconfig  security.authenrization:disabled

 (3) use admin
    db.system.users.find()
    db.system.users.remove({})
 (4)创建新的管理员账号
    db.create({({user:"xxxx",pwd:"xxxxxxxxxxxxxxxxx",roles:[{"role":"userAdminAnyDatabase","db":"admin"}]}})

```



附：

[mongodb官方地址](https://www.mongodb.com/)