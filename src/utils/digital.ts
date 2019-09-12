import Decimal, { Numeric } from 'decimal.js-light';
Decimal.set({ precision: 30, rounding: Decimal.ROUND_HALF_UP, toExpPos: 18, toExpNeg: -9 });
const million = 1000000; // 百万
const kilo = 1000;

/**
 * 格式化币种交易量
 * @param input 入参支持：string | number | Decimal
 * @param dp 小数位数，默认 2 位小数
 * @note 大于等于百万就显示 xx M，大于等于千就显示 xx K，默认显示两位小数
 */
export const formatKMUnit = (input: Numeric | undefined, dp = 2) => {
  if (!input) {
    return '--';
  }
  try {
    const decimal = new Decimal(input);
    if (decimal.greaterThanOrEqualTo(million)) {
      return `${decimal.dividedBy(million).toDecimalPlaces(dp)}M`;
    }
    if (decimal.greaterThanOrEqualTo(kilo)) {
      return `${decimal.dividedBy(kilo).toDecimalPlaces(dp)}K`;
    }
    if (decimal.lessThanOrEqualTo(0)) {
      return '--';
    }
    return `${input}`;
  } catch {
    return '--';
  }
};

/**
 * 格式化小数 12 -> 12, 12.00 -> 12, 12.30 -> 12.3, 12.345 -> 12.35
 * @param input 入参支持：string | number | Decimal
 * @param dp 小数位数，默认 2 位小数
 * @note 如果输入的非数字参数，直接返回 0
 */
export const formatNumberBase = (input: Numeric, dp = 2) => {
  if (!input) {
    return 0;
  }
  try {
    return new Decimal(input).toDecimalPlaces(dp).toNumber();
  } catch {
    return 0;
  }
};

/**
 * 格式化正号+百分比 12 -> +12%, -32 -> -32%, '' -> -- , 0 -> --
 * @param input
 * @param defaultValue
 */
export const formatPositiveSymbol = (input: Numeric | undefined, defaultValue = '--') => {
  let result = defaultValue;
  if (input) {
    if (Number.parseFloat(`${input}`) > 0) {
      result = `+${input}%`;
    } else {
      result = `${input}%`;
    }
  }
  return result;
};

/**
 * 绿涨红跌的判断(价格是否下跌)
 * @param input
 */
export const isPriceDown = (input: Numeric | undefined) => {
  if (!input) {
    return false;
  }
  return Number.parseFloat(`${input}`) < 0;
};

/**
 * 字符串转数字 (保留精度)
 * @param input 入参支持：string | number | Decimal
 */
export const toNumber = (input: Numeric | undefined) => {
  if (!input) {
    return 0;
  }
  try {
    return new Decimal(input).toNumber();
  } catch {
    return 0;
  }
};

/**
 * 字符串转数字 (保留精度)
 * @param input 入参支持：string | number | Decimal 对字符串做特殊处理
 */
export const toNumberByString = (input: Numeric) => {
  if (typeof String(input) && input === '') {
    return 0;
  }
  return new Decimal(input).toNumber();
};

// 除法
export const division = (x: any, y: any, fixed = 8, rm = Decimal.ROUND_HALF_UP) => {
  if (Number.isNaN(x) || Number.isNaN(y) || +y === 0) {
    return 0;
  }
  const value = new Decimal(x)
    .div(y)
    .toDecimalPlaces(fixed, rm)
    .toString();
  return value;
};

// 乘法
export const multiplication = (x: any, y: any, fixed = 8, rm = Decimal.ROUND_HALF_UP) => {
  if (Number.isNaN(x) || Number.isNaN(y) || y === 0) {
    return 0;
  }
  const value = new Decimal(x)
    .mul(y)
    .toDecimalPlaces(fixed, rm)
    .toString();
  return value;
};

// 加法
export const addition = (x: any, y: any, fixed = 8, rm = Decimal.ROUND_HALF_UP) => {
  if (Number.isNaN(x) || Number.isNaN(y)) {
    return '0';
  }
  const value = new Decimal(x)
    .add(y)
    .toDecimalPlaces(fixed, rm)
    .toString();
  return value;
};

// 减法
export const sub = (x: any, y: any, fixed = 8, rm = Decimal.ROUND_HALF_UP) => {
  if (Number.isNaN(x) || Number.isNaN(y)) {
    return 0;
  }
  const value = new Decimal(x)
    .sub(y)
    .toDecimalPlaces(fixed, rm)
    .toString();
  return value;
};
