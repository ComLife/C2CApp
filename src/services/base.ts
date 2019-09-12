import Request from '../api/request';
import {
  bannerList,
  baseAuths,
  compareVersion,
  emergentNotice,
  login,
  loginpwdCode,
  loginpwdReset,
  register,
  registerCode,
  tradepwd,
  tradepwdCode,
  tradepwdReset,
} from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSigString, getSignWithRSAAndAES } from '../utils/signature';

export default new (class BaseService extends Request {
  // 登录
  login(params = {}) {
    console.log('login req:', params);
    Config.headers.signature = login.needSign ? getSigString(params) : '';
    Config.headers.sign = login.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = login.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + login.path,
      data: body,
    })();
  }

  // 比较版本
  compareVersion(params = {}) {
    console.log('compareVersion req:', Config.httpPrefix + Config.baseUrl + compareVersion.path, params);
    Config.headers.sign = compareVersion.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = compareVersion.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + compareVersion.path,
      data: body,
    })();
  }

  // 紧急通知
  emergentNotice(params = {}) {
    console.log('emergentNotice req:', params);
    Config.headers.sign = emergentNotice.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = emergentNotice.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + emergentNotice.path,
      data: body,
    })();
  }

  // 找回密码验证码获取
  loginpwdCode(params = {}) {
    console.log('loginpwdCode req:', params);
    Config.headers.sign = loginpwdCode.encryptRequest ? getSigString(params) : '';
    const body = loginpwdCode.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + loginpwdCode.path,
      data: body,
    })();
  }

  // 找回密码重置
  loginpwdReset(params = {}) {
    console.log('loginpwdReset req:', params);
    Config.headers.signature = loginpwdReset.needSign ? getSigString(params) : '';
    Config.headers.sign = loginpwdReset.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = loginpwdReset.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + loginpwdReset.path,
      data: body,
    })();
  }

  // 注册验证码获取
  registerCode(params = {}) {
    console.log('registerCode req:', params);
    Config.headers.sign = registerCode.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = registerCode.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + registerCode.path,
      data: body,
    })();
  }

  // 注册密码重置
  register(params = {}) {
    console.log('register req:', params);
    Config.headers.sign = register.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = register.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + register.path,
      data: body,
    })();
  }

  // 重置资金密码验证码获取
  getTradepwdCode(params = {}) {
    // console.log('bannerList req:', params);
    Config.headers.sign = tradepwdCode.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = tradepwdCode.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + tradepwdCode.path,
      data: body,
    })();
  }

  // 重置资金密码的密码重置
  TradepwdReset(params = {}) {
    // console.log('bannerList req:', params);
    Config.headers.signature = tradepwdReset.needSign ? getSigString(params) : '';
    Config.headers.sign = tradepwdReset.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = tradepwdReset.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + tradepwdReset.path,
      data: body,
    })();
  }

  // 初始化资金密码
  Tradepwd(params = {}) {
    Config.headers.signature = tradepwd.needSign ? getSigString(params) : '';
    Config.headers.sign = tradepwd.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = tradepwd.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + tradepwd.path,
      data: body,
    })();
  }

  // banner 列表
  bannerList(params = {}) {
    console.log('bannerList req:', Config.httpPrefix + Config.baseUrl + bannerList.path, params);
    Config.headers.sign = bannerList.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = bannerList.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + bannerList.path,
      data: body,
    })();
  }

  // 初始化信息
  baseAuths(params = {}) {
    Config.headers.sign = baseAuths.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = baseAuths.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + baseAuths.path,
      data: body,
    })();
  }
})();
