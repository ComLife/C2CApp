import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

interface Data {
  data: {
    dataList: [];
  };
}

export function entrustHistory(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.ENTRUST_HISTORY:
      console.log('ENTRUST_HISTORY ====', payload);
      return { ...state, ...payload };
    case types.MORE_ENTRUST_HISTORY:
      // @ts-ignore
      // if (payload.code === '1') {
      //   // @ts-ignore
      //   const dataList: Data = state.data.dataList.concat(payload.data.data.list);
      //   return { ...state, ...payload, dataList };
      // } else {
      //   return { ...state };
      // }
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function entrustDeal(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.ENTRUST_DEAL:
      console.log('ENTRUST_DEAL ====', payload);
      return { ...state, ...payload };
    case types.MORE_ENTRUST_DEAL:
      // @ts-ignore
      if (payload.code === '1') {
        // @ts-ignore
        const dataList: Data = state.data.dataList.concat(payload.data.data.list);
        return { ...state, ...payload, dataList };
      } else {
        return { ...state };
      }

    default:
      return state;
  }
}

export function entrustDetail(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.ENTRUST_DETAIL:
      return { ...state, ...payload };
    default:
      return state;
  }
}
