#vshell
vshell is a Remote Administation tool written in Go (RAT)

use [AntSword](https://github.com/AntSwordProject/antSword) control host

The basic framework is

client <-> teamserver <-> AntSword

AntSword Shell type choose CUSTOM

# Options
## client
```
-PWD                    PassWord (default "vshell")
-RHOST                  Team Server IP (default "255.255.255.255")
-RPORT                  Team Server Port (default "10080")

```
## teamserver

```
-LPORT                  Listen PORT (default 10080)
-MINPORT                MinAccess Port (default 28000)
-MPORT                  Monitor Port (default 10081)
-MPWD                   Monitor PassWord (default "veo")

```

# 功能：

## 1.AntSword main function

File upload / download, command execution, database operation, modification of file timestamp, etc

The database only supports mysql. Too much support will cause the client file to be too large. For other databases, please use socks5 proxy to connect

## 2.AntSword Plugins

ScreenShot, Procdump, HackBrowserData, Memoryrun, socks5 Proxy, Service add

![](img/README/2021-10-05-17-26-19.png)
![](img/README/2021-10-05-17-26-54.png)
![](img/README/2021-10-05-17-32-10.png)
![](img/README/2021-10-05-17-32-41.png)

## 3.Parameter hiding, process name hiding（not support windows）
The parameters and names of the process will be hidden to prevent simple traceability to the teamserver IP. The whole process under Darwin will be hidden

#note
use replaceteamserverip.sh can change TeamServer IP in program
