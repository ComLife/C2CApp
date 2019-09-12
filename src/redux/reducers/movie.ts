import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

export function movies(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_MOVIES:
      return { ...state, ...payload };
    case types.REMOVE_MOVIES:
      return {};
    default:
      return state;
  }
}
