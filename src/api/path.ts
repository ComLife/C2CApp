// NOTICE: needSign 表示是否需要验签（默认为 false）
// encryptRequest 表示是否需要对 request body 加密（默认为 false）
// decryptResponse 表示是否需要对 response body 解密（默认为 false）

interface Props {
  path: string;
  needSign?: boolean;
  encryptRequest?: boolean;
  decryptResponse?: boolean;
}

// 登录
export const login: Props = { path: '/api/base/login', encryptRequest: true, decryptResponse: true };
// 比较版本
export const compareVersion: Props = { path: '/api/base/emergent/version' };
// 紧急通知
export const emergentNotice: Props = { path: '/api/base/emergent/notice' };
// 获取数字货币类型
export const getWalletType: Props = { path: '/api/walllet/getwallettype' };
// 历史K线
export const klineHistory: Props = { path: '/bbs/api/kline/history' };
// 找回密码验证码
export const loginpwdCode: Props = { path: '/api/base/loginpwd/code' };
// 密码确认修改
export const loginpwdReset: Props = { path: '/api/base/loginpwd/reset', needSign: true, encryptRequest: true };
// 注册验证码
export const registerCode: Props = { path: '/api/base/register/code' };
// 注册
export const register: Props = { path: '/api/base/register' };
// 请求token
export const getToken: Props = { path: '/api/user/getStsToken' };
// 认证信息
export const getAuth: Props = { path: '/api/user/getauth', decryptResponse: true };
// 认证开关
export const getAuthOnoff: Props = { path: '/api/user/auth/onoff' };
// 法币交易额度接口
export const getAuthenQuota: Props = { path: '/api/user/getlimit' };
// banner 列表
export const bannerList: Props = { path: '/api/banner/list' };
// 认证接口
export const auth: Props = { path: '/api/user/auth', decryptResponse: true };
// 添加自选交易对
export const addCollection: Props = { path: '/bbs/api/wallettype/addcollection' };
// 删除自选交易对
export const deleteCollection: Props = { path: '/bbs/api/wallettype/deletecollection' };
// 自选交易对联想输入查询
export const searchWalletType: Props = { path: '/bbs/api/wallettype/optional/searchwallettype' };
// 重置资金密码获取验证码
export const tradepwdCode: Props = { path: '/api/base/tradepwd/code' };
// 重置资金密码里的设置密码
export const tradepwdReset: Props = { path: '/api/base/tradepwd/reset', needSign: true, encryptRequest: true };
// 注册时的资金密码设置
export const tradepwd: Props = { path: '/api/user/tradepwd', needSign: true, encryptRequest: true };
// 上传图片接口
export const uploadImgAuth: Props = { path: '/api/user/checkIdCardImgAuth' };
// 上传人脸图片接口
export const uploadfaceAuth: Props = { path: 'api/user/uploadSelfPhotoAuth' };
// 保存图片接口
export const uploadsaveAuth: Props = { path: '/api/user/saveIdCardImg' };
// 谷歌认证密钥
export const googleGetsecretkey: Props = { path: '/api/googleauth/getsecretkey' };
// 谷歌认证短信验证码
export const getGoogleCode: Props = { path: '/api/googleauth/sendmsgcode' };
// 检测用户是否开启谷歌验证
export const googleCheckOpen: Props = { path: '/api/googleauth/checkopen' };
// 开启谷歌认证
export const openGoogleAuth: Props = { path: '/api/googleauth/operategoogleauth' };
// 关闭谷歌认证
export const closeGoogleAuth: Props = { path: '/api/googleauth/closegoogleauth' };
// 用户钱包列表
export const getViewWallet: Props = { path: '/bbs/api/wallet/viewwallet' };
// 钱包划转
export const getWalletTransfer: Props = { path: '/bbs/api/wallet/transfer' };
// 云钱包资产列表
export const getCloudWalletAssets: Props = { path: '/api/cloudWallet/assets', encryptRequest: true };
// 客户端-云钱包配置列表
export const cloudWalletTypeCloud: Props = { path: '/api/walllet/type/cloud' };
// 客户端-云钱包全部配置列表
export const cloudAllWalletTypeCloud: Props = { path: '/api/walllet/type/cloud/all' };
// 云端钱包转账
export const cloudTransfer: Props = { path: '/api/cloudWallet/transfer', needSign: true, encryptRequest: true };
// 云钱包商户转账
export const merchantTransfer: Props = { path: '/api/cloudWallet/merch/transfer', needSign: true, encryptRequest: true };
// 充值
export const receiveaddress: Props = { path: '/api/cloudWallet/receiveaddress' };
// 历史委托
export const historyEntrust: Props = { path: '/bbs/api/entrust/gethistory' };
// 历史委托
export const dealEntrust: Props = { path: '/bbs/api/entrust/getdealentrust' };
// 币币日志列表
export const bbWalletLogList: Props = { path: '/bbs/api/wallet/transfer/log' };
// 法币日志列表
export const ruleWalletLogList: Props = { path: '/api/cloudWallet/bbs/findloglist' };
// 交易详情
export const entrustDetail: Props = { path: '/bbs/api/entrust/gethistorydeal' };
// 获取电话和uid的接口
export const baseAuths: Props = { path: '/api/base/auths' };
// 获取电话和uid的接口
export const checktradepwd: Props = { path: '/api/user/checktradepwd' };
