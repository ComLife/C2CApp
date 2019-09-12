import * as types from '../action-types';

interface Props {
  type: string;
  payload: Record<string, any>;
}

// 计价货币对应市场数据
export function marketListInfo(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.MARKET_LIST_INFO:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 交易对单条市场数据
export function marketInfo(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.MARKET_INFO:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 交易对撮合队列数据
export function orderBook(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.ORDERBOOK:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 交易对成交数据
export function turnOverRecord(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.TURNOVERRECORD:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 计价货币种类
export function paymentCurrencys(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.PAYMENT_CURRENCYS:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function klinePush(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.KLINE_PUSH:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 匹配中的委托订单
export function userEntrustOrders(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.USER_ENTRUST_ORDERS:
      return { ...state, ...payload };
    case types.USER_ENTRUST_ORDERS_REMOVE:
      return {};
    default:
      return state;
  }
}

// 当前个人资产
export function userAvailablefunds(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.USER_AVAILABLEFUNDS:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 获取自选交易对
export function collectionList(state = [], action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.COLLECTION_LIST:
      return payload.msgData;
    case types.REMOVE_COLLECTION:
      return [];
    default:
      return state;
  }
}

// 获取自选交易对
export function collectionListCallBack(state = [], action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.ADD_COLLECTION:
      return { ...state, ...payload };
    case types.DELETE_COLLECTION:
      return { ...state, ...payload };
    case types.REMOVE_CALLBACK_COLLECTION:
      return {};
    default:
      return state;
  }
}

// 委托下单返回信息
export function createEntrustOrderReply(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.CREATE_ENTRUST_ORDER_REPLY:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 撤消委托下单返回信息
export function revokeEntrustOrderReply(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.REVOKE_ENTRUST_ORDER_REPLY:
      return { ...state, ...payload };
    case types.RECEIVE_REVOKE_ENTRUST_ORDER_REPLY:
      return {};
    default:
      return state;
  }
}

// 涨幅榜信息推送
export function increaseTopReply(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.BBS_INCREASETOP_R:
      return { ...state, ...payload };
    default:
      return state;
  }
}

// 单条成交数据推送
export function turnoverrecordAdd(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.TURNOVERRECORD_ADD:
      return { ...state, ...payload };
    default:
      return state;
  }
}
