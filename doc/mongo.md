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


附：

[mongodb官方地址](https://www.mongodb.com/)