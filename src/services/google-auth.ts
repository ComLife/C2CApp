import Request from '../api/request';
import { closeGoogleAuth, getGoogleCode, googleCheckOpen, googleGetsecretkey, openGoogleAuth } from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSignWithRSAAndAES } from '../utils/signature';
export default new (class BaseService extends Request {
  // 获取谷歌密钥
  GoogleKey(params = {}) {
    Config.headers.sign = googleGetsecretkey.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = googleGetsecretkey.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + googleGetsecretkey.path,
      data: body,
    })();
  }

  // 获取谷歌认证的短信验证码
  GetGoogleCode(params = {}) {
    Config.headers.sign = getGoogleCode.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getGoogleCode.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + getGoogleCode.path,
      data: body,
    })();
  }

  // 获取谷歌认证的短信验证码
  GetGoogleIsOpen(params = {}) {
    Config.headers.sign = googleCheckOpen.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = googleCheckOpen.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + googleCheckOpen.path,
      data: body,
    })();
  }

  // 开启谷歌认证
  openGoogleAuth(params = {}) {
    Config.headers.sign = openGoogleAuth.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = openGoogleAuth.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + openGoogleAuth.path,
      data: body,
    })();
  }

  // 关闭谷歌认证
  closeGoogleAuth(params = {}) {
    Config.headers.sign = closeGoogleAuth.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = closeGoogleAuth.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + closeGoogleAuth.path,
      data: body,
    })();
  }
})();
