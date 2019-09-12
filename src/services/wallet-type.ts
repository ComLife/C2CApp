import Request from '../api/request';
import { addCollection, deleteCollection, searchWalletType } from '../api/path';
import Config from '../const/config';

export default new (class WalletTypeService extends Request {
  // 添加自选交易对
  addCollection(params = {}) {
    console.log('addCollection req:', Config.httpPrefix + Config.baseBBSUrl + addCollection.path, params);
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + addCollection.path,
      data: params,
    })();
  }

  // 删除自选交易对
  deleteCollection(params = {}) {
    console.log('删除自选交易对 req:', Config.httpPrefix + Config.baseBBSUrl + deleteCollection.path, params);
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + deleteCollection.path,
      data: params,
    })();
  }

  // 自选交易对联想输入查询
  searchWalletType(params = {}) {
    console.log('自选交易对联想输入查询 req:', Config.httpPrefix + Config.baseBBSUrl + searchWalletType.path, params);
    return this.request({
      url: Config.httpPrefix + Config.baseBBSUrl + searchWalletType.path,
      data: params,
    })();
  }
})();
