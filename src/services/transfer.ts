import Request from '../api/request';
import { bbWalletLogList } from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSignWithRSAAndAES } from '../utils/signature';

export default new (class BBLogService extends Request {
  // 查看日志
  getBbLogList(params = {}) {
    console.log('bbWalletLogList req:', Config.httpPrefix + Config.baseBBSUrl + bbWalletLogList.path, params);
    Config.headers.sign = bbWalletLogList.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = bbWalletLogList.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + bbWalletLogList.path,
      data: body,
    })();
  }
})();
