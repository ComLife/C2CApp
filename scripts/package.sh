#!/bin/sh

# dev(开发环境) | test(测试环境) | pre(预发布环境) | pro(生产环境)
env=test
version=1.0.3
appName='C2CApp'

script_path=$(pwd)
fixPackage(){
echo '开始执行更正包信息'
node "fix-package.ts" $env $version
}

iosBuild(){
echo '开始执行 iOS 打包'
cd AutoPackageScript
sh autoPackageScript.sh $env $appName
sleep 1
}

androidBuild(){
echo '开始执行 Android 打包'
cd $script_path
sh autoPackage.sh $env $appName $version
sleep 1
}

fixPackage
iosBuild
androidBuild
