import Request from '../api/request';
import { klineHistory } from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSignWithRSAAndAES } from '../utils/signature';

export default new (class KLineService extends Request {
  // 历史K线
  history(params = {}) {
    console.log('klineHistory req:', params);
    Config.headers.sign = klineHistory.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = klineHistory.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + klineHistory.path,
      data: body,
    })();
  }
})();
