import Request from '../api/request';
import {
  cloudAllWalletTypeCloud,
  cloudTransfer,
  cloudWalletTypeCloud,
  getCloudWalletAssets,
  getViewWallet,
  getWalletTransfer,
  getWalletType,
  merchantTransfer,
  receiveaddress,
  tradepwdReset,
} from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSigString, getSignWithRSAAndAES } from '../utils/signature';

export default new (class WalletService extends Request {
  // 获取钱包类型
  getWalletType(params = {}) {
    console.log('getWalletType req:', params);
    Config.headers.sign = getWalletType.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getWalletType.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + getWalletType.path,
      data: body,
    })();
  }

  getViewWallet(params = {}) {
    console.log('getWalletType req:', params);
    Config.headers.sign = getViewWallet.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getViewWallet.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + getViewWallet.path,
      data: body,
    })();
  }

  getWalletTransferRequest(params = {}) {
    console.log('getWalletTransferRequest req:', params, Config.httpPrefix + Config.baseBBSUrl + getWalletTransfer.path);
    Config.headers.sign = getWalletTransfer.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getWalletTransfer.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + getWalletTransfer.path,
      data: body,
    })();
  }

  getCloudWalletAssetsRequest(params = {}) {
    console.log('getCloudWalletAssetsRequest req:', Config.httpPrefix + Config.baseUrl + getCloudWalletAssets.path, params);
    Config.headers.sign = getCloudWalletAssets.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = getCloudWalletAssets.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + getCloudWalletAssets.path,
      data: body,
    })();
  }

  getCloudWalletTypeRequest(params = {}) {
    console.log('getCloudWalletTypeRequest req:', Config.httpPrefix + Config.baseUrl + cloudWalletTypeCloud.path, params);
    Config.headers.sign = cloudWalletTypeCloud.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = cloudWalletTypeCloud.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + cloudWalletTypeCloud.path,
      data: body,
    })();
  }

  getAllCloudWalletTypeRequest(params = {}) {
    console.log('getAllCloudWalletTypeRequest req:', Config.httpPrefix + Config.baseUrl + cloudAllWalletTypeCloud.path, params);
    Config.headers.sign = cloudAllWalletTypeCloud.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = cloudAllWalletTypeCloud.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + cloudAllWalletTypeCloud.path,
      data: body,
    })();
  }
  getCloudWalletCashRequest(params = {}) {
    console.log('getCloudWalletCashRequest req:', params, Config.baseUrl + cloudTransfer.path);
    Config.headers.signature = cloudTransfer.needSign ? getSigString(params) : '';
    Config.headers.sign = cloudTransfer.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = cloudTransfer.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + cloudTransfer.path,
      data: body,
    })();
  }
  getCloudWalletCarryRequest(params = {}) {
    console.log('getCloudWalletCarryRequest req:', params, Config.baseUrl + merchantTransfer.path);
    Config.headers.signature = merchantTransfer.needSign ? getSigString(params) : '';
    Config.headers.sign = merchantTransfer.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = merchantTransfer.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + merchantTransfer.path,
      data: body,
    })();
  }
  getReceiveaddress(params = {}) {
    Config.headers.sign = receiveaddress.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = receiveaddress.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + receiveaddress.path,
      data: body,
    })();
  }
})();
