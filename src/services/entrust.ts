import Request from '../api/request';
import { dealEntrust, entrustDetail, historyEntrust } from '../api/path';
import Config from '../const/config';
import { getEncryptWithAES, getSignWithRSAAndAES } from '../utils/signature';
export default new (class BaseService extends Request {
  // 获取历史委托
  entrustHistry(params = {}) {
    Config.headers.sign = historyEntrust.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = historyEntrust.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + historyEntrust.path,
      data: body,
    })();
  }

  // 获取交易记录数据
  entrustDeal(params = {}) {
    Config.headers.sign = dealEntrust.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = dealEntrust.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + dealEntrust.path,
      data: body,
    })();
  }

  // 获取交易记录详情
  entrustDetail(params = {}) {
    Config.headers.sign = entrustDetail.encryptRequest ? getSignWithRSAAndAES() : '';
    const body = entrustDetail.encryptRequest ? getEncryptWithAES(params) : params;
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + entrustDetail.path,
      data: body,
    })();
  }
})();
