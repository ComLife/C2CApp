import * as types from '../action-types';

const initialState = { gesture: '0', touch: '0' };

interface Props {
  type: string;
  payload: {};
}

export function loginMode(state = initialState, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GESTURE_LOGIN:
      console.log('gesture', payload);
      return { ...state, gesture: payload };
    case types.TOUCH_LOGIN:
      return { ...state, touch: payload };
    default:
      return state;
  }
}
