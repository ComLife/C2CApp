/* eslint-disable @typescript-eslint/camelcase */

export const ERROR_CODE = {
  SUCCESS: '1', // 成功
  TOKEN_FAIL: '403', // Token验证失败
  OTHER_LOGIN: '405', // 其他设备登录,密码必须明文输入
  FOUND_PASSWORD_UNSET: '712', // 资金密码未设置
  LOGIN_AUTH_ERROR: '603', // 登录验证失败
  BINDING_ERROR: '617', // 签约理财未绑定支付宝
  LOGIN_ERROR: '10001', // 用户名密码错误
  SYSTEM_MAINTENANCE: '415', // 系统维护中
};

export const AUTH_LEVEL = {
  Authentication0: '10035', // 未认证
  Authentication2: 0, // 重置0
  Authentication1: 11, // 一级认证通过
  Authentication20: 20, // 二级认证审核中
  Authentication21: 21, // 二级认证失败
  Authentication22: 22, // 二级认证通过
  Authentication30: 30, // 三级认证审核中
  Authentication31: 31, // 三级认证失败
  Authentication32: 32, // 三级认证通过
};

//Wallet 类型
export const WALLET_TRANSFER_TYPE = {
  WALLET_CLOUD: 1, //云钱包
  WALLET_COIN: 2, //币币钱包
  WALLET_LEVER: 3, //杠杆钱包
  WALLET_CONTRACT: 4, //合约钱包
};

// 钱包的开关
export const WALLET_ON_OFF = {
  IMPORT: 0b1, // 导入
  CREATE: 0b10, // 创建
  TRANSFER: 0b100, // 转出
  RECEIVE: 0b1000, // 转入
};

export enum DeviceEventType {
  REFRESH_LOGIN_TOKEN = 'REFRESH_LOGIN_TOKEN',
  RE_LOGIN = 'RE_LOGIN',
}
