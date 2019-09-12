import axios, { AxiosRequestConfig } from 'axios';
import { DeviceEventEmitter } from 'react-native';
import { DeviceEventType, ERROR_CODE } from '../const/enum-set';
import Config from '../const/config';
import { getDecryptWithAES } from '../utils/signature';

export default class Request {
  private readonly instance = axios.create({ timeout: 30 * 1000 });

  constructor() {
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        console.warn('axios request warn:', error);
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      res => {
        const { data } = res;
        if (data.result) {
          // 加密数据
          const decryptResult = getDecryptWithAES(data.result);
          if (decryptResult) {
            const result = JSON.parse(decryptResult);
            if (result) {
              if (result.code === ERROR_CODE.TOKEN_FAIL) {
                // Token验证失败
                DeviceEventEmitter.emit(DeviceEventType.REFRESH_LOGIN_TOKEN);
              } else if (result.code === ERROR_CODE.OTHER_LOGIN) {
                // 其他设备登录,密码必须明文输入
                DeviceEventEmitter.emit(DeviceEventType.RE_LOGIN);
              } else if (result.code !== ERROR_CODE.SUCCESS) {
                console.warn('加密接口 不成功代码 result:', result);
              }
            }
          }
        } else {
          // 未加密数据
          if (data.code === ERROR_CODE.TOKEN_FAIL) {
            // 拿旧token，换新token
            DeviceEventEmitter.emit(DeviceEventType.REFRESH_LOGIN_TOKEN);
          } else if (data.code === ERROR_CODE.OTHER_LOGIN) {
            // 其他设备登录,密码必须明文输入
            DeviceEventEmitter.emit(DeviceEventType.RE_LOGIN);
          } else if (data.code !== ERROR_CODE.SUCCESS) {
            console.warn('未加密接口 不成功代码:', data);
          }
        }
        return res;
      },
      error => {
        console.warn('axios response warn:', error);
        return Promise.reject(error);
      },
    );
  }

  public request<T>(config: AxiosRequestConfig) {
    config = {
      withCredentials: true,
      method: 'POST',
      headers: Config.headers,
      ...config,
    };
    return () => {
      return this.instance.request<T>(config).then(async res => {
        // console.log('this.instance.request.then======', res.data);
        return res.data;
      });
    };
  }
}
