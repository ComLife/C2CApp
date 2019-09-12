import * as types from '../action-types';

export const gestureLogin = (newValue: string) => {
  return { type: types.GESTURE_LOGIN, payload: newValue };
};

export const touchLogin = (newValue: string) => {
  return { type: types.TOUCH_LOGIN, payload: newValue };
};
