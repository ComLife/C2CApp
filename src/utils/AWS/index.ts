/**
 * AWS上传图片功能
 */

import LocalStore from '../../utils/local-store';
import { DeviceEventEmitter, Dimensions, PixelRatio } from 'react-native';

import { RNS3 } from './RNS3';
import Request from '../../api/request';
import { emergentNotice, getToken } from '../../../src/api/path';
import Config from '../../const/config';
import axios, { Method } from 'axios';
const { progressEnv, httpPrefix, baseAwsUrl } = Config;

// AWS访问地址
export const awsUrl = progressEnv === 'dev' || progressEnv === 'test' ? 'http://34.92.21.194:18060' : `${httpPrefix}static.${baseAwsUrl}`;
// BUCKET
const bucket = progressEnv === 'dev' || progressEnv === 'pre' || progressEnv === 'test' ? 'wallet' : 'K4EZu1AK8g2nc';
// token过期时间
const expiredSecond = 3600 * 12;

// Store中KEy
const AWSAccessKey = 'AWS_accessKey';
const AWSSecretKey = 'AWS_secretKey';
const AWS_CACHEIMAGES = 'AWS_CACHEIMAGES';

// 屏幕宽度
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const SCREEN_WIDTH = ScreenWidth * PixelRatio.get();
const SCREEN_HEIGHT = ScreenHeight * PixelRatio.get();

export default class AWS {
  static accessKey: any = null;

  static secretKey: any = null;

  // 缓存图片本地信息
  static cacheImages: any = {};

  // 上传图片过程
  static uploadInfos: any = {};

  // 上传图片
  //@ts-ignore
  static upload(fileResponse, chatInfo, startCallBack) {
    if (!AWS.accessKey || !AWS.secretKey) {
      // 参数不存在
      const url = Config.httpPrefix + Config.baseUrl + getToken.path;
      axios
        .post(url, { expiredSecond }, { headers: Config.headers })
        .then(function(response: any) {
          if (response.code === '1') {
            //@ts-ignore
            const { accessKey, secretKey } = res.data;
            AWS.storeKeys(accessKey, secretKey);
            //@ts-ignore
            AWS.upload(fileResponse, chatInfo);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      return;
    }
    const fileName = fileResponse.uri.toLowerCase();
    const ext = fileName.split('.')[1];
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: fileResponse.uri,
      name: `${new Date().valueOf()}.${ext}`,
      type: `image/${ext}`,
    };
    const { uid } = Config;
    const { accessKey } = AWS;
    const { secretKey } = AWS;
    const options = {
      keyPrefix: `chat/${uid}/`,
      bucket,
      region: 'us-east-1',
      accessKey,
      secretKey,
      awsUrl,
      successActionStatus: 201,
    };
    const targetUrl = `${bucket}/${options.keyPrefix}${file.name}`;
    AWS.cacheImages[targetUrl] = fileResponse.uri;
    AWS.storeCacheImages();
    if (!AWS.uploadInfos[chatInfo.orderId]) {
      AWS.uploadInfos[chatInfo.orderId] = [];
    }
    const uploadingData = {
      tempId: new Date().valueOf() * 1000 + Math.floor(Math.random() * 1000), // 临时ID
      chatInfo, // 聊天内容
      localUri: fileResponse.uri, // 本地图片路径
      targetUrl, // 上传的图片路径
      progressCallBacks: [], // 进度返回调用
      endCallBacks: [], // 结束调用
    };
    AWS.uploadInfos[chatInfo.orderId].push(uploadingData);

    console.log('file ', file, 'options', options);
    AWS.rns3Update(file, options, uploadingData);
    startCallBack && startCallBack();
  }

  // 普通上传图片
  //@ts-ignore
  static normalUpload(fileResponse, startCallBack, completeCallBack, progressCallBack?) {
    console.log('normalUpload2222222222222', AWS.accessKey, AWS.secretKey, fileResponse);
    if (!AWS.accessKey || !AWS.secretKey) {
      // 参数不存在
      const url = Config.httpPrefix + Config.baseUrl + getToken.path;
      axios
        .post(url, { expiredSecond }, { headers: Config.headers })
        .then(function(response: any) {
          if (response.data.code === '1') {
            //@ts-ignore
            const { accessKey, secretKey } = response.data.data;
            AWS.storeKeys(accessKey, secretKey);
            AWS.normalUpload(fileResponse, startCallBack, completeCallBack, progressCallBack);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      return;
    }
    console.log('normalUpload22222222');
    const fileName = fileResponse.uri.toLowerCase();
    const lastIndex = fileName.lastIndexOf('.');
    const ext = fileName.substring(lastIndex + 1);
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      uri: fileResponse.uri,
      name: `${new Date().valueOf()}.${ext}`,
      type: `image/${ext}`,
    };
    const { uid } = Config.headers;
    const { accessKey } = AWS;
    const { secretKey } = AWS;
    const options = {
      keyPrefix: `image/${uid}/`,
      bucket,
      region: 'us-east-1',
      accessKey,
      secretKey,
      awsUrl,
      successActionStatus: 201,
    };
    console.log('file ', file, 'options', options);
    AWS.rns3NormalUpdate(file, options, completeCallBack, progressCallBack);
    startCallBack && startCallBack();
  }

  // RNS上传
  //@ts-ignore
  static rns3Update(file, options, uploadingData) {
    RNS3.put(file, options)
      //@ts-ignore
      .progress(e => {
        AWS.uploadProgress(uploadingData, e.loaded / e.total);
      })
      //@ts-ignore
      .then(resp => {
        console.log('rns3Update resp ', resp);
        if (resp.status === 403) {
          // 参数不存在
          AWS.deleteUploadInfo(uploadingData);
          const url = Config.httpPrefix + Config.baseUrl + getToken.path;
          axios
            .post(url, { expiredSecond }, { headers: Config.headers })
            .then(function(response: any) {
              if (response.code === '1') {
                const { accessKey, secretKey } = response.data;
                AWS.storeKeys(accessKey, secretKey);
                options.accessKey = accessKey;
                options.secretKey = secretKey;
                AWS.rns3Update(file, options, uploadingData);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          return;
        }
        if (resp.status !== 201) throw new Error('Failed to upload image to S3');
        AWS.uploadCompleted(uploadingData, resp);
      })
      //@ts-ignore
      .catch(e => {
        const url = Config.httpPrefix + Config.baseUrl + getToken.path;
        axios
          .post(url, { expiredSecond }, { headers: Config.headers })
          .then(function(response: any) {
            if (response.code === '1') {
              const { accessKey, secretKey } = response.data;
              AWS.storeKeys(accessKey, secretKey);
              options.accessKey = accessKey;
              options.secretKey = secretKey;
              AWS.rns3Update(file, options, uploadingData);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
  }

  // RNS上传
  //@ts-ignore
  static rns3NormalUpdate(file, options, completeCallBack, progressCallBack) {
    RNS3.put(file, options)
      //@ts-ignore
      .progress(e => {
        progressCallBack && progressCallBack(e.loaded / e.total);
      })
      //@ts-ignore
      .then(resp => {
        console.log('rns3Update resp ', resp);
        if (resp.status === 403) {
          // 参数不存在
          const url = Config.httpPrefix + Config.baseUrl + getToken.path;
          axios
            .post(url, { expiredSecond }, { headers: Config.headers })
            .then(function(response: any) {
              if (response.code === '1') {
                //@ts-ignore
                const { accessKey, secretKey } = res.data;
                AWS.storeKeys(accessKey, secretKey);
                options.accessKey = accessKey;
                options.secretKey = secretKey;
                AWS.rns3NormalUpdate(file, options, completeCallBack, progressCallBack);
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          return;
        }
        if (resp.status !== 201) throw new Error('Failed to upload image to S3');
        const { key } = resp.body.postResponse;
        const bucket1 = resp.body.postResponse.bucket;
        completeCallBack && completeCallBack(`${awsUrl}/${bucket1}/${key}`);
      })
      //@ts-ignore
      .catch(e => {
        //@ts-ignore
        const url = Config.httpPrefix + Config.baseUrl + getToken.path;
        axios
          .post(url, { expiredSecond }, { headers: Config.headers })
          .then(function(response: any) {
            if (response.code === '1') {
              //@ts-ignore
              const { accessKey, secretKey } = res.data;
              AWS.storeKeys(accessKey, secretKey);
              options.accessKey = accessKey;
              options.secretKey = secretKey;
              AWS.rns3NormalUpdate(file, options, completeCallBack, progressCallBack);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
  }

  // 获取小图片，默认为200x200的
  static getSmallUrl(uri: any) {
    return AWS.getCustomSizeUrl(uri, 200, 200);
  }

  // 获取正常的大图
  static getBigUrl(uri: any) {
    return AWS.getCustomSizeUrl(uri, SCREEN_WIDTH, SCREEN_HEIGHT);
    // return `${awsUrl}/${bucket}/${uri}`;
  }

  // 获取自定义尺寸图片
  static getCustomSizeUrl(uri: any, width: any, height: any) {
    const splits = uri.split('.');
    const fileName = `${splits[0]}_${width}x${height}.${splits[1]}`;
    return `${awsUrl}/${fileName}`;
  }

  // 获取bucket图片
  static getBucketImage(uri: any) {
    return `${awsUrl}/${bucket}/${uri}`;
  }

  // 获取普通上传图片自定义图片
  //@ts-ignore
  static getNormalCustomSizeUrl(uri, width, height) {
    const lastIndex = uri.lastIndexOf('.');
    const ext = uri.substring(lastIndex + 1);
    const pre = uri.substring(0, lastIndex);
    const fileName = `${pre}_${width}x${height}.${ext}`;
    return fileName;
  }

  // 上传图片完成时发送消息
  //@ts-ignore
  static uploadCompleted(uploadingData, resp) {
    // 完成订单成功过后，需要移除上传图片的信息
    const { chatInfo } = uploadingData;
    // 删除信息
    AWS.deleteUploadInfo(uploadingData);

    const { key } = resp.body.postResponse;
    const bucket1 = resp.body.postResponse.bucket;
    chatInfo.msgBody = `${bucket1}/${key}`; // JSON.stringify(this.msgBody);
    // chatInfo.msgType = CHAT_MSG_TYPE.IMAGE;
    // 发送消息
    // DeviceEventEmitter.emit(DeviceEventName.chat, { msgType: 'chat', msgData: chatInfo });
  }

  // 删除上传数据记录
  //@ts-ignore
  static deleteUploadInfo(uploadingData) {
    const { chatInfo } = uploadingData;
    // 删除信息
    const datas = AWS.uploadInfos[chatInfo.orderId];
    //@ts-ignore
    datas.splice(datas.findIndex(item => item.tempId === uploadingData.tempId), 1);
  }

  // 上传进度条调用
  //@ts-ignore
  static uploadProgress(uploadingData, progress) {
    const { progressCallBacks } = uploadingData;
    //@ts-ignore
    progressCallBacks.forEach(callback => {
      callback && callback(progress);
    });
  }

  // 添加上传进图条回调
  //@ts-ignore
  static addProgressCallBack(callback, tempId) {
    Object.keys(AWS.uploadInfos).some(key => {
      const orderInfo = AWS.uploadInfos[key];
      //@ts-ignore
      const info = orderInfo.find(item => item.tempId === tempId);
      if (info) {
        info.progressCallBacks.push(callback);
        return true;
      }
      return false;
    });
  }

  // 移除上传进度条回调
  //@ts-ignore
  static removePorogressCallBack(callback, tempId) {
    Object.keys(AWS.uploadInfos).some(key => {
      const orderInfo = AWS.uploadInfos[key];
      //@ts-ignore
      const info = orderInfo.find(item => item.tempId === tempId);
      if (info) {
        //@ts-ignore
        const index = info.progressCallBacks.findIndex(item => item === callback);
        if (index >= 0) {
          info.progressCallBacks.splice(index, 1);
          return true;
        }
      }
      return false;
    });
  }

  // 通过订单获取当前上传中数据
  //@ts-ignore
  static getOrderUploading(orderId) {
    return AWS.uploadInfos[orderId];
  }

  // 将cacheImage进行缓存
  static storeCacheImages() {
    new LocalStore().saveLocalRepository(AWS_CACHEIMAGES, AWS.cacheImages);
  }

  // 清楚cacheImages
  static clearCacheImages() {
    new LocalStore().removeLocalRepository(AWS_CACHEIMAGES);
  }

  // 缓存上传中状态
  static _storeUploadInfos() {}

  // 获得本地缓存图片信息
  //@ts-ignore
  static getCacheImageUri(uri) {
    return AWS.cacheImages[uri];
  }

  // 保存key
  //@ts-ignore
  static storeKeys(accessKey, secretKey) {
    AWS.accessKey = accessKey;
    AWS.secretKey = secretKey;
    new LocalStore().saveLocalRepository(AWSAccessKey, AWS.accessKey);
    new LocalStore().saveLocalRepository(AWSSecretKey, AWS.secretKey);
  }

  // 删除指定的缓存图片信息(失效时调用)
  //@ts-ignore
  static deleteCacheImage(uri) {
    if (AWS.cacheImages[uri]) {
      delete AWS.cacheImages[uri];
      AWS.storeCacheImages();
    }
  }
}

// 从缓存里面读取key
new LocalStore().fetchLocalRepository(AWSAccessKey).then(_accessKey => {
  AWS.accessKey = _accessKey;
});
new LocalStore().fetchLocalRepository(AWSSecretKey).then(_secretKey => {
  AWS.secretKey = _secretKey;
});
new LocalStore().fetchLocalRepository(AWS_CACHEIMAGES).then(_cacheImages => {
  AWS.cacheImages = _cacheImages || {};
  console.log('AWS._cacheImages  ', AWS.cacheImages);
});
