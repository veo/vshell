# vshell 2.0 
**CobaltStrike难用？来试试vshell吧**

[English](https://github.com/veo/vshell/blob/main/README_en.md)

vshell 是一款go编写的主机群管理工具（RAT）

使用蚁剑控制台及插件管理主机

基本框架为

client <-> vshell <-> 蚁剑

注意：蚁剑连接类型 CUSTOM，如乱码编码类型可选GBK

# Options
```
-LPORT                  Listen PORT (default 10080)
-WPORT                  Web Port (default 10081)
-USER                   Web User (default "admin")
-PWD                    Web Pass (default "vshell")
```
# WEB界面
![](img/README/2022-01-25-16-05-24.png)
![](img/README/2022-01-25-16-06-13.png)


# 控制台功能：

## 1.蚁剑控制台所有已有功能
```
1.文件上传/下载
2.文件复制/粘贴/预览/新建/删除
2.控制台编辑文件
3.虚拟终端
4.数据库操作（暂时只支持mysql）
5.修改文件时间戳
6.WGET下载
...
```


## 2.蚁剑插件 vshell
```
1.基本信息
2.主机列表
3.杀软识别
4.开机启动服务管理
5.屏幕截图
6.Procdump
7.浏览器数据获取
8.socks5代理（上线即代理，不需要额外配置）
9.漏洞测试
10.内存运行（支持exe和shellcode两种模式，支持内存上线 Metasploit 或 CobaltStrike等，支持运行mimikatz）
11.管道仿冒技术提权（msf 中的 getsystem）
12.卸载vshell
```
![](img/README/2021-10-05-17-26-54.png)
![](img/README/2021-10-12-16-49-35.png)

## 3.后台运行
所有版本直接运行即可后台运行
