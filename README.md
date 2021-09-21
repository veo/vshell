# vshell
vshell 是一款go编写的rat 

文件都是二进制的，只是拿蚁剑进行主机控制

基本框架为

client <-> teamserver <-> 蚁剑

目前仅支持 TCP TLS反连上线的模式

client

![](img/README/2021-09-21-18-06-01.png)

teamserver
![](img/README/2021-09-21-18-04-18.png)

功能：
1.蚁剑马的所有已有功能（文件上传/下载、命令执行、数据库操作、修改文件时间戳等。。。）
命令执行
![](img/README/2021-09-21-18-11-15.png)
文件操作
![](img/README/2021-09-21-18-11-43.png)

数据库操作
![](img/README/2021-09-21-18-13-09.png)
![](img/README/2021-09-21-18-13-59.png)
2.屏幕截屏

![](img/README/2021-09-21-18-15-18.png)

3.获取LSASS进程文件，导入mimikatz


目前就写了这么多