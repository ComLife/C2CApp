import * as types from '../action-types';

export const changeTheme = (newValue: string) => {
  return { type: types.CHANGE_THEME, payload: newValue };
};

export const changeLanguage = (newValue: string) => {
  return { type: types.CHANGE_LANGUAGE, payload: newValue };
};

export const resetState = (type: string) => {
  return { type, payload: {} };
};

export const storeState = (type: string, payload: Record<string, any>) => {
  return { type, payload };
};
