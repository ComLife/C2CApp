import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

export function klineHistory(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_KLINE_HISTORY:
      return { ...state, ...payload };
    case types.REMOVE_KLINE_HISTORY:
      return {};
    default:
      return state;
  }
}
