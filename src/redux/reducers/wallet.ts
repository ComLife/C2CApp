import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

export function getWalletType(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_WALLET_TYPE:
      return { ...state, ...payload };
    case types.REMOVE_WALLET_TYPE:
      return {};
    default:
      return state;
  }
}

export function getViewWallet(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_VIEW_WALLET:
      return { ...state, ...payload };
    case types.GET_VIEW_WALLET_REMOVE:
      return {};
    default:
      return state;
  }
}

export function getWalletTransfer(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_WALLET_TRANSFER:
      return { ...state, ...payload };
    case types.REMOVE_WALLET_TRANSFER:
      return {};
    default:
      return state;
  }
}

export function getCloudWalletAssets(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_WALLET_CLOUDASSETS:
      return { ...state, ...payload };
    case types.GET_WALLET_CLOUDASSETS_REMOVE:
      return {};
    default:
      return state;
  }
}

export function getCloudWalletType(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_CLOUD_WALLET_TYPE:
      return { ...state, ...payload };
    case types.GET_CLOUD_WALLET_TYPE_REMOVE:
      return {};
    default:
      return state;
  }
}

export function getAllCloudWalletType(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_ALL_CLOUD_WALLET_TYPE:
      return { ...state, ...payload };
    case types.GET_ALL_CLOUD_WALLET_TYPE_REMOVE:
      return {};
    default:
      return state;
  }
}

export function getCloudWalletCash(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_CLOUD_WALLET_CASH:
      return { ...state, ...payload };
    case types.REMOVE_CLOUD_WALLET_CASH:
      return {};
    default:
      return state;
  }
}

export function getCloudWalletCarry(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_CLOUD_WALLET_CARRY:
      return { ...state, ...payload };
    case types.REMOVE_CLOUD_WALLET_CARRY:
      return {};
    default:
      return state;
  }
}

export function searchWalletType(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_SEARCH_WALLET_TYPE:
      return { ...state, ...payload };
    case types.REMOVE_SEARCH_WALLET_TYPE:
      return {};
    default:
      return state;
  }
}

export function currencyDefaultData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.RECHARGE_CURENCY:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function ReceiveaddressData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.RECEIVEADDRESS:
      return { ...state, ...payload };
    case types.REMOVE_RECEIVEADDRESS:
      return {};
    default:
      return state;
  }
}

const isExist = (state: Record<string, string>[], payload: Record<string, string>) => {
  const result = state.filter((r: Record<string, string>) => r.baseCurrency === payload.baseCurrency && r.paymentCurrency === payload.paymentCurrency);
  return result.length > 0;
};

const getNewData = (state: Record<string, string>[], payload: Record<string, string>) => {
  let result = [];
  if (isExist(state, payload)) {
    // remove
    result = state.filter((r: Record<string, string>) => r.baseCurrency !== payload.baseCurrency || r.paymentCurrency !== payload.paymentCurrency);
  } else {
    // add
    result = [...state, { ...payload }];
  }
  return result;
};

const getLocalData = (state: Record<string, string>[], payload: Record<string, string>) => {
  const result: any = [];
  if (payload.msgData && payload.msgData.length > 0) {
    return payload.msgData;
  }
  return result;
};

// 本地收藏的交易对
export function localCollection(state = [], action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.LOCAL_COLLECTION:
      return getNewData(state, payload);
    case types.ASS_LOCAL_COLLECTION:
      console.log('ASS_LOCAL_COLLECTION', state, payload);
      return getLocalData(state, payload);
    default:
      return state;
  }
}

// // 把服务器的交易队赋值本地收藏
// export function assignmentLocalCollection(state = [], action: Props) {
//   const { type, payload = {} } = action;
//   console.log('data.msgType', type, payload);
//   switch (type) {
//     case types.ASS_LOCAL_COLLECTION:
//       return { ...state, ...payload };
//     default:
//       return state;
//   }
// }
