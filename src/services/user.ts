import Request from '../api/request';
import { auth, checktradepwd, getAuth, getAuthOnoff, getAuthenQuota, getToken, uploadImgAuth, uploadfaceAuth, uploadsaveAuth } from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSignWithRSAAndAES } from '../utils/signature';

export default new (class UserService extends Request {
  // 获取token
  getToken(params = {}) {
    console.log('getToken req:', params);
    Config.headers.sign = getToken.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getToken.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + getToken.path,
      data: body,
    })();
  }

  // 获取认证信息
  getAuthRequest(params = {}) {
    console.log('getAuthRequest req:', params);
    Config.headers.sign = getAuth.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getAuth.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + getAuth.path,
      data: body,
    })();
  }

  // 获取认证开关
  getAuthOnoffRequest(params = {}) {
    console.log('getAuthOnoffRequest req:', params);
    Config.headers.sign = getAuthOnoff.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getAuthOnoff.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + getAuthOnoff.path,
      data: body,
    })();
  }

  // 获取法币额度
  getAuthenQuota(params = {}) {
    console.log('getAuthenQuota req:', params);
    Config.headers.sign = getAuthenQuota.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getAuthenQuota.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + getAuthenQuota.path,
      data: body,
    })();
  }

  // 认证接口
  authRequest(params = {}) {
    console.log('authRequest req:', params);
    Config.headers.sign = auth.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = auth.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + auth.path,
      data: body,
    })();
  }
  // 中级认证审核接口
  getUpLoadImgAuth(params = {}) {
    console.log('getUpLoadImgAuth req:', params);
    Config.headers.sign = uploadImgAuth.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = uploadImgAuth.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + uploadImgAuth.path,
      data: body,
    })();
  }
  // 高级认证人脸审核接口
  getUpLoadFaceAuth(params = {}) {
    console.log('getUpLoadFaceAuth req:', params);
    Config.headers.sign = uploadfaceAuth.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = uploadfaceAuth.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + uploadfaceAuth.path,
      data: body,
    })();
  }
  // 认证图片存储接口
  getUpLoadSaveAuth(params = {}) {
    console.log('getUpLoadSaveAuth req:', params);
    Config.headers.sign = uploadsaveAuth.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = uploadsaveAuth.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + uploadsaveAuth.path,
      data: body,
    })();
  }

  checktradepwd(params = {}) {
    console.log('getUpLoadSaveAuth req:', params);
    Config.headers.sign = checktradepwd.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = checktradepwd.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + checktradepwd.path,
      data: body,
    })();
  }
})();
