#!/bin/sh

####################################
# 上传IPA文件
####################################

jsonValue=''
ipa=$1
### 方法简要说明：
### 1. 是先查找一个字符串：带双引号的key。如果没找到，则直接返回defaultValue。
### 2. 查找最近的冒号，找到后认为值的部分开始了，直到在层数上等于0时找到这3个字符：,}]。
### 3. 如果有多个同名key，则依次全部打印（不论层级，只按出现顺序）
### @author lux feary
###
### 3 params: json, key, defaultValue
function getJsonValuesByAwk() {
    awk -v json="$1" -v key="$2" -v defaultValue="$3" 'BEGIN{
        foundKeyCount = 0
        while (length(json) > 0) {
            # pos = index(json, "\""key"\""); ## 这行更快一些，但是如果有value是字符串，且刚好与要查找的key相同，会被误认为是key而导致值获取错误
            pos = match(json, "\""key"\"[ \\t]*?:[ \\t]*");
            if (pos == 0) {if (foundKeyCount == 0) {print defaultValue;} exit 0;}

            ++foundKeyCount;
            start = 0; stop = 0; layer = 0;
            for (i = pos + length(key) + 1; i <= length(json); ++i) {
                lastChar = substr(json, i - 1, 1)
                currChar = substr(json, i, 1)

                if (start <= 0) {
                    if (lastChar == ":") {
                        start = currChar == " " ? i + 1: i;
                        if (currChar == "{" || currChar == "[") {
                            layer = 1;
                        }
                    }
                } else {
                    if (currChar == "{" || currChar == "[") {
                        ++layer;
                    }
                    if (currChar == "}" || currChar == "]") {
                        --layer;
                    }
                    if ((currChar == "," || currChar == "}" || currChar == "]") && layer <= 0) {
                        stop = currChar == "," ? i : i + 1 + layer;
                        break;
                    }
                }
            }

            if (start <= 0 || stop <= 0 || start > length(json) || stop > length(json) || start >= stop) {
                if (foundKeyCount == 0) {print defaultValue;} exit 0;
            } else {
                print substr(json, start, stop - start);
            }

            json = substr(json, stop + 1, length(json) - stop)
        }
    }'
}

# 登录373
function login373(){
	echo '\n==================登录==================\n'
	curl 'https://373hao.com/user/login/signin?user=otcsign&pwd=E1d4UuH5RefNl' -c cookie.txt
}

# 上传373
function upload373(){
	echo '\n==================上传==================\n'
	curl "https://373hao.com/user/upload?m=edit&code=CeIFNN" -F "file=@$ipa" -H "Content-Type:multipart/form-data;Expect" -v -i -F 'm=edit' -F 'code=CeIFNN' -b cookie.txt
}

# 确认签名
function confirmSign(){
	echo '\n==================签名==================\n'
	curl "https://373hao.com/user/app/save_info?code=CeIFNN&cid=89&push=1&remark=&newbundleid=wallet.app.otc.sadfne" -b cookie.txt
}

# 下载IPA
function downloadIPA(){
	echo '\n==================确认签名状态==================\n'
	while :
	do
		retJson=$(curl "https://373hao.com/user/app/status?code=CeIFNN" -b cookie.txt)
		status=$(getJsonValuesByAwk "$retJson" "status")
		pub_url=$(getJsonValuesByAwk "$retJson" "pub_url")
		result=$(echo $retJson | grep "\"status\":\"SIGNED\"")
		if [[ "$result" != "" ]]
		then
			break
		fi
	done
	downloadUrl=$(sed -e 's/^"//' -e 's/"$//' <<<"$pub_url")
	echo '\n==================下载安装包================== $pub_url\n'
	curl -O $downloadUrl
	echo '\n==================下载完成==================\n'
}

# 先删除当前文件夹内的ipa包
find . -type f -name '*.ipa' | xargs rm

cp -r $ipa ./

#login373
#upload373
#confirmSign
#downloadIPA
