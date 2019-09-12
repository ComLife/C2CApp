// 钱包币种类型区分
import { addition, division, multiplication, sub, toNumber } from './digital';
import { WALLET_ON_OFF } from '../const/enum-set';
import Decimal from 'decimal.js-light';

// 判断默认币种 根据转账提币
export const getDefaultCurrency = (data: any, type = WALLET_ON_OFF.TRANSFER) => {
  if (!data || data.length === 0) {
    // console.warn('getDefaultCurrency data=======', data);
    return data;
  }
  let currency: any = [];
  data.forEach((value: any) => {
    if (!(value.onoff & type)) {
    } else {
      currency.push(value);
    }
  });
  return currency;
};

// 获取币种的钱包 根据转账提币
export const getDefaultWallet = (data: any, currency: any) => {
  if (!data || !currency || currency.length === 0) {
    // console.warn('getDefaultWallet data=======', data);
    // console.warn('getDefaultWallet currency=======', currency);
    return data;
  }
  let cloudWallet = null;
  Object.values(data).some((value: any) => {
    if (currency.id === value.walletType) {
      cloudWallet = value;
      return true;
    }
    return false;
  });
  return cloudWallet;
};

export const getCurrencysMap = (data: any, isCount = false) => {
  // console.warn('getCurrencysMap data=======', data);
  if (!data) return null;
  const currencysMap = {};
  Object.values(data).forEach((value: any) => {
    // @ts-ignore
    currencysMap[value.code] = value;
    if (isCount) {
      const ratio = (10 ** value.numPrecision).toString();
      value.mallfee1 = division((value.mallfee || 0).toString(), ratio);
      value.minerfee1 = division((value.minerfee || 0).toString(), ratio);
      value.minerfeeMin1 = division((value.minerfeeMin || 0).toString(), ratio);
      value.minerfeeMax1 = division((value.minerfeeMax || 0).toString(), ratio);
      value.userdTotal1 = division((value.userdTotal || 0).toString(), ratio);
      value.minRechargeAmount1 = division((value.minRechargeAmount || 0).toString(), ratio);
      value.leftMiner = sub(value.minerfeeMax1, value.userdTotal1);
    }
  });
  return currencysMap;
};

// 钱包币种类型区分
export const getCloudWallet = (cloudWalletData: any, currencysMap: any, rmbFixed: number = 8, fixed: number = 8) => {
  if (!cloudWalletData || !currencysMap) return [];
  let cloudWallet = cloudWalletData;
  let tempWallets: [][] = [];
  cloudWallet.forEach((value: any) => {
    let { freezeAmount, amount } = value;
    const { walletTypeCode, scaleFlag } = value;
    freezeAmount = freezeAmount ? freezeAmount.toString() : '0';
    amount = amount ? amount.toString() : '0';
    // @ts-ignore
    const currency = currencysMap[walletTypeCode];
    if (currency) {
      const ratio = (10 ** currency.numPrecision).toString();
      value.realAmount = division(amount, ratio, fixed, Decimal.ROUND_FLOOR);
      value.lock = division(freezeAmount, ratio, fixed, Decimal.ROUND_FLOOR);
      value.price = multiplication(toNumber(value.realAmount), toNumber(currency.marketPrice), rmbFixed, Decimal.ROUND_FLOOR);
      value.totalAmount = addition(value.realAmount, value.lock, fixed, Decimal.ROUND_FLOOR);
      value.totalPrice = multiplication(toNumber(value.totalAmount), toNumber(currency.marketPrice), rmbFixed, Decimal.ROUND_FLOOR);
      value.totalDollarPrice = multiplication(toNumber(value.totalAmount), toNumber(currency.marketDollar), fixed, Decimal.ROUND_FLOOR);
      value.isLocal = false;
      tempWallets.push(value);
    }
  });
  return tempWallets;
};

// 云钱包总资产 / USDT
export const getUSDTTotalAmount = (cloudWalletData: any) => {
  if (!cloudWalletData) return 0;
  let totalAmount = '0';
  cloudWalletData.forEach((value: any) => {
    totalAmount = addition(totalAmount, toNumber(value.marketDollar ? value.marketDollar : value.totalDollarPrice), 8, Decimal.ROUND_FLOOR);
  });
  return toNumber(totalAmount);
};

// 云钱包总资产 / rmb
export const getRMBTotalAmount = (cloudWalletData: any) => {
  if (!cloudWalletData) return 0;
  let totalAmount = '0';
  cloudWalletData.forEach((value: any) => {
    totalAmount = addition(totalAmount, toNumber(value.marketPrice ? value.marketPrice : value.totalPrice), 2, Decimal.ROUND_FLOOR);
  });
  return toNumber(totalAmount);
};

// 备注
export const checkRemarks = (str: string, isToast = true) => {
  const reg = new RegExp('(^([\\w\u4E00-\u9FA5\\-\\(\\)\\[\\]【】（）：:]+?( ?)){0,36}$)', 'gi');
  if (!reg.test(str) || str.length > 36) {
    // isToast && EasyToast.show('备注请输入36位以下字符', 'error');
    return false;
  }
  return true;
};

// 根据币种名字字母 分币种
export const groupBy = (array: [], name: string, subLength = 1) => {
  if (!array) return array;
  const groups = {};
  // @ts-ignore 取
  array.forEach(o => {
    const group = JSON.stringify(o[name]);
    let groupSub = group.substr(1, subLength);
    // @ts-ignore
    groups[groupSub] = groups[groupSub] || [];
    // @ts-ignore
    groups[groupSub].push(o);
    // @ts-ignore
  });
  // @ts-ignore 取
  const arrayMap = [];
  Object.keys(groups).map(function(group) {
    // @ts-ignore
    const currencysMap = { key: '', data: [] };
    currencysMap.key = group;
    // @ts-ignore
    currencysMap.data = groups[group];
    arrayMap.push(currencysMap);
  });
  // @ts-ignore 取
  return arrayMap;
};

// 根据输入字母
export const groupByLetter = (array: [], name: string, subLength = 1, inputString = '') => {
  if (!array) return array;
  const groups = {};
  // @ts-ignore 取
  array.forEach((o: any) => {
    const group = JSON.stringify(o[name]);
    let groupSub = group.substr(1, subLength);
    let reg = new RegExp('^' + inputString.toLocaleUpperCase());
    if (reg.test(o.code)) {
      // @ts-ignore
      groups[groupSub] = groups[groupSub] || [];
      // @ts-ignore
      groups[groupSub].push(o);
    }
    // @ts-ignore
  });
  // @ts-ignore 取
  const arrayMap = [];
  Object.keys(groups).map(function(group) {
    // @ts-ignore
    const currencysMap = { key: '', data: [] };
    currencysMap.key = group;
    // @ts-ignore
    currencysMap.data = groups[group];
    arrayMap.push(currencysMap);
  });
  // @ts-ignore 取
  return arrayMap;
};

export const getHideText = (string: string) => {
  let hideText = '******';
  // for (let i = 0; i < string.length; i++) {
  //   const subString = string.substr(i, 1);
  //   if (subString === '.') {
  //     hideText += '.';
  //   } else {
  //     hideText += '*';
  //   }
  // }
  return hideText;
};

export const getCompareAccountIntersectionMap = (marketCurrency: any, firstAccount: any, secondAccount: any) => {
  if (!marketCurrency || !firstAccount || !secondAccount) {
    return [];
  }
  const currencysArray: any = [];
  const currencysMap: any = {};
  const accountMap = {};
  Object.values(marketCurrency).forEach((value: any) => {
    // @ts-ignore
    currencysMap[value.code] = value;
    // console.log('currencyDeful111', currencysMap, value);
  });
  firstAccount.forEach((value: any) => {
    // @ts-ignore
    accountMap[value.walletName] = value;
  });
  secondAccount.forEach((value: any) => {
    // @ts-ignore
    const currency = accountMap[value.walletName];
    if (currency) {
      currencysArray.push(currencysMap[value.walletName]);
    }
  });
  return currencysArray;
};

// 返回修改后的字符串
export const getAbbreviation = (string: string) => {
  const int = Number.parseInt(string, 10);
  if (int >= 1000 && int < 10000) {
    return `${int / 1000}k`;
  }
  if (int >= 10000) {
    return `${int / 10000}w`;
  }
  return `${int}`;
};
