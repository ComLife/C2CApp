#!/bin/sh

#  autoPackage.sh
#  ******************** Android 一键式打包并上传到fir生成二维码并直接扫描安装 ********************

env=$1
appName=$2
versionNo=$3
script_path=$(pwd)

# 预先定义对应的环境变量
environmentVariables() {
# 打包时间初始值
SECONDS=0
# 当前的路径
pwd
#安卓项目工程路径
android_project_path="$script_path/../android"
# 安卓apk目录路径
apk_dir_path="$android_project_path/app/build/outputs/apk/release"
# apk 路径
apk_path="$apk_dir_path/$appName-v$versionNo.apk"
# fir账户的token,这个token换成自己fir账号生成的token即可
firim_token="39731ba2155608dc20acc79ff777f339"
}

apkBuild() {
# 删除 apk/release 目录
rm -rf $apk_dir_path
cd "$android_project_path"
echo "\033[37;45m打包开始！！！ 🎉  🎉  🎉   \033[0m"
sleep 1
yarn jetify
# 执行安卓打包脚本
cd ../android
./gradlew clean
./gradlew assembleRelease
echo "apkPath" $apk_path
# 检查 apk 文件是否存在
if [ -f "$apk_path" ]; then
echo "$apk_path"
echo "\033[37;45m打包成功 🎉  🎉  🎉   \033[0m"
sleep 1
else
echo "\033[37;45m没有找到对应的apk文件 😢 😢 😢   \033[0m"
exit 1
fi
}

# 预览apk信息
previewIPAInfo() {
echo "\033[37;43m*************************  step4:预览apk信息 💩 💩 💩  *************************  \033[0m"
fir info $apk_path
sleep 1
}

# 将apk目录下的app-LSW-release.apk 上传到fir
publishIPAToFir() {
echo "\033[37;43m*************************  step5:上传中 🚀 🚀 🚀  *************************  \033[0m"
echo "\033[37;43m*************************  step4:预览用户登录信息 💩 💩 💩  *************************  \033[0m"
fir login "$firim_token"
fir publish $apk_path -Q
echo "\033[37;43m*************************  step6:上传完成 🚀 🚀 🚀  *************************  \033[0m"
# 输出总用时
echo "\033[37;46m总用时: ${SECONDS}s 👄 👄 👄 \033[0m"
open $apk_dir_path
}

# 上传文件
uploadAPK() {
    echo "\033[37;43m*************************  step5:生产环境上传中 🚀 🚀 🚀  *************************  \033[0m"
    "$script_path/upload.sh" $apk_path "/home/devuser/app_download/$1/android/$appName/"
    echo "\033[37;43m*************************  step6:上传完成 🚀 🚀 🚀  *************************  \033[0m"
    # 输出总用时
    echo "\033[37;46m总用时: ${SECONDS}s 👄 👄 👄 \033[0m"
}

environmentVariables
apkBuild

if [[ $env == "dev" || $env == "test" ]]
then
    previewIPAInfo
    publishIPAToFir
elif [ $env == "pre" ]
then
    uploadAPK pre
elif [ $env == "pro" ]
then
    uploadAPK prod
fi
