/* eslint-disable @typescript-eslint/camelcase */
import { REHYDRATE } from 'redux-persist';
import Config from '../../const/config';
import * as types from '../action-types';

interface Props {
  type: string;
  payload: Record<string, any>;
}

export function userInfo(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.LOGIN:
      return { ...state, ...payload };
    case types.LOGIN_SAFE:
      if (payload.code === '1') {
        return { ...state, ...payload };
      }
      return { ...state, safeCode: payload.code, safeMsg: payload.msg };
    case types.REMOVE_LOGIN_SAFE_CODE:
      return { ...state, safeCode: '', safeMsg: '' };
    case REHYDRATE:
      if (payload) {
        const { userInfo = {} } = payload;
        if (userInfo && userInfo.data) {
          Config.headers.uid = userInfo.data.uid;
          Config.headers.token = userInfo.data.token;
          Config.encrypt_pwd = userInfo.data.encrypt_pwd;
        }
        return { ...state, ...userInfo, action: '' };
      }
      return state;
    case types.REMOVE_LOGIN_CODE:
      return { ...state, code: '', action: '' };
    case types.LOGOUT:
      Config.headers.uid = '';
      Config.headers.token = '';
      Config.encrypt_pwd = '';
      return {};
    case types.REGISTER_RESET:
      return { ...state, ...payload, action: 'REGISTER_RESET' };
    default:
      return state;
  }
}

export function getAuthRequest(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.AUTH:
      return { ...state, ...payload };
    case types.REMOVE_AUTH:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function registerData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.REGISTER_CODE:
      return { ...state, ...payload };
    case types.REMOVE_MESS_CODE:
      return { ...state, code: '' };
    case types.REMOVE_MESS_DATA:
      return { ...state, regMessData: {} };
    case types.REMOVE_REGISTER:
      return {};
    default:
      return state;
  }
}

export function registerConfirmData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.REGISTER_RESET:
      return { ...state, ...payload };
    case types.REMOVE_PASS_CODE:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function pwdResetData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.LOGINPWD_CODE:
      return { ...state, ...payload };
    case types.REMOVE_FORGOT_MESS_CODE:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function pwdComfireData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.LOGINPWD_RESET:
      return { ...state, ...payload };
    case types.REMOVE_FORGOT_COMFIRE_CODE:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function getAuthenOnoff(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.AUTHONOFF:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function getAuthenQuota(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.AUTHEN_QUETA:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function userAuthInfo(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.AUTH_API:
      return { ...state, ...payload };
    case types.REMOVE_AUTH_API:
      return {};
    default:
      return state;
  }
}

export function getToken(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GETTOKEN:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function getUpLoadImgAuth(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.UPLOAD_IMG_AUTH:
      return { ...state, ...payload };
    case types.REMOVE_UPLOAD_IMG_AUTH:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function getUpLoadFaceAuth(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.UPLOAD_FACE_AUTH:
      return { ...state, ...payload };
    case types.REMOVE_UPLOAD_FACE_AUTH:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function getUpLoadSaveAuth(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.UPLOAD_SAVE_AUTH:
      return { ...state, ...payload };
    case types.REMOVE_UPLOAD_SAVE_AUTH:
      return {};
    default:
      return state;
  }
}

export function checktradPWD(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.CHECKTRADEPWD:
      return { ...state, ...payload };
    default:
      return state;
  }
}
