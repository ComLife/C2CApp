import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

export function chenkBbLog(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.CHECK_BB_LOG:
      return { ...state, ...payload };
    case types.REMOVE_CHECK_BB_LOG:
      return {};
    default:
      return state;
  }
}
