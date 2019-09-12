import Request from '../api/request';
import { ruleWalletLogList } from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSignWithRSAAndAES } from '../utils/signature';

export default new (class RuleLogService extends Request {
  // 查看日志
  getRuleLogList(params = {}) {
    console.log('ruleWalletLogList req:', Config.httpPrefix + Config.baseUrl + ruleWalletLogList.path, params);
    Config.headers.sign = ruleWalletLogList.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = ruleWalletLogList.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseUrl + ruleWalletLogList.path,
      data: body,
    })();
  }
})();
