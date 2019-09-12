import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

export function googleSecret(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GOOGLE_SECTET_KEY:
      return { ...state, ...payload };
    case types.REMOVE_GOOGLE_SECTET_KEY_CODE:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function googleMessCode(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GOOGLE_CODE_KEY:
      return { ...state, ...payload };
    case types.REMOVE_GOOGLE_MESS_CODE:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function googleAuthData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GOOGLE_AUTH_DATA:
      return { ...state, ...payload };
    case types.REMOVE_GOOGLE_AUTH_DATA:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function closeGoogleData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.CLOSE_GOOGLE_AUTH:
      return { ...state, ...payload };
    case types.REMOVE_CLOSE_GOOGLE_AUTH:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function isGoogleOpen(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GOOGLE_ISOPEN:
      return { ...state, ...payload };
    default:
      return state;
  }
}
