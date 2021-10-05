#/bin/bash

ip="192.168.1.1"
echo ${#ip}
for (( i=${#ip}; i < 15; i++ ))
do
  ip=$ip"x"
done
iphex=`echo $ip|xxd -p -c 9999|sed "s/0a//g"`
xxd -p -c 9999 client_windows_amd64.exe | tr -s '\n' ','| sed "s/,//g" | sed "s/3235352e3235352e3235352e323535/$iphex/g" |xxd -p -r - client_windows_amd64.exe