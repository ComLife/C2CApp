#!/usr/bin/expect 

##############################################
#	如果没有安装expect请安装expect
#	脚本执行命令如下
# 	upload.sh localUrl remoteUrl
###############################################

set timeout 10  

#  本地地址
set localUrl [lindex $argv 0]  
#  远程地址
set remoteUrl [lindex $argv 1]  

#服务器密码
set password CZuDjisC5bHNOEIow=
#服务器用户名
set serverUserName devuser
#服务器地址
set serverIp 120.79.147.165

#实现远程上传
spawn scp "$localUrl" "$serverUserName@$serverIp:$remoteUrl"
set timeout 300 
expect "$serverUserName@$serverIp's password:"
set timeout 300 
send "$password\r"
set timeout 300 
send "exit\r"
expect eof