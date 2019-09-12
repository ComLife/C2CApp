/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import { createAction, exceptionPayload } from './utils';
import * as types from '../action-types';
import { baseService, userService } from '../../services';
import Config from '../../const/config';
import { getDecryptWithAES } from '../../utils/signature';

export const loginRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.LOGIN, { isFetching: true }));
    const originResp: any = await baseService.login(reqParam);
    const decryptResult = getDecryptWithAES(originResp.result);
    const result = JSON.parse(decryptResult);
    const { data } = result;
    if (result && data) {
      Config.headers.token = data.token || '';
      Config.headers.uid = data.uid || '';
      Config.encrypt_pwd = data.encrypt_pwd || '';
    }
    return dispatch(createAction(types.LOGIN, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.LOGIN, exceptionPayload));
  }
};

export const removeLoginCode = () => {
  return { type: types.REMOVE_LOGIN_CODE };
};

export const loginSafe = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.LOGIN_SAFE, { isFetching: true }));
    const originResp: any = await baseService.login(reqParam);
    const decryptResult = getDecryptWithAES(originResp.result);
    const result = JSON.parse(decryptResult);
    const { data } = result;
    if (result && data) {
      Config.headers.token = data.token || '';
      Config.headers.uid = data.uid || '';
      Config.encrypt_pwd = data.encrypt_pwd || '';
    }
    return dispatch(createAction(types.LOGIN_SAFE, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.LOGIN_SAFE, exceptionPayload));
  }
};

export const removeLoginSafeCode = () => {
  return { type: types.LOGIN_SAFE };
};

export const registerCodeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result: any = await baseService.registerCode(reqParam);
    return dispatch(createAction(types.REGISTER_CODE, { ...result }));
  } catch {
    return dispatch(createAction(types.REGISTER_CODE, exceptionPayload));
  }
};

// 移除注册的短信验证码的code
export const removeRegMessCode = () => {
  return { type: types.REMOVE_MESS_CODE };
};

export const registerResetRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.REGISTER_RESET), { isFetching: true });
    const result = await baseService.register(reqParam);
    // @ts-ignore
    const { data } = result;
    if (result && data) {
      Config.headers.token = data.token || '';
      Config.headers.uid = data.uid || '';
      Config.encrypt_pwd = data.encrypt_pwd || '';
    }
    return dispatch(createAction(types.REGISTER_RESET, { ...result, isFetching: false }));
  } catch {
    return dispatch(createAction(types.REGISTER_RESET, exceptionPayload));
  }
};

// 移除注册密码确认的code
export const removeRegPassCode = () => {
  return { type: types.REMOVE_PASS_CODE };
};

export const forgotPwdCodeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.LOGINPWD_CODE), { isFetching: true });
    const result = await baseService.loginpwdCode(reqParam);
    return dispatch(createAction(types.LOGINPWD_CODE, { ...result, isFetching: false }));
  } catch {
    return dispatch(createAction(types.LOGINPWD_CODE, exceptionPayload));
  }
};

// 移除忘记密码的短信验证码的code
export const removeForgotMessCode = () => {
  return { type: types.REMOVE_FORGOT_MESS_CODE };
};

export const forgotPwdResetRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.LOGINPWD_RESET), { isFetching: true });
    const result = await baseService.loginpwdReset(reqParam);
    console.log('forgotPwdCodeRequest', reqParam);
    return dispatch(createAction(types.LOGINPWD_RESET, { ...result, isFetching: false }));
  } catch {
    return dispatch(createAction(types.LOGINPWD_RESET, exceptionPayload));
  }
};

// 移除忘记密码的确认密码的code
export const removeForgotComfireCode = () => {
  return { type: types.REMOVE_FORGOT_COMFIRE_CODE };
};

export const getAuthRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.AUTH, { isFetching: true }));
    const resultResp: any = await userService.getAuthRequest(reqParam);
    const decryptResult = getDecryptWithAES(resultResp.result);
    const result = JSON.parse(decryptResult);
    return dispatch(createAction(types.AUTH, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.AUTH, exceptionPayload));
  }
};

export const getAuthOnoffRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.AUTHONOFF, { isFetching: true }));
    const result = await userService.getAuthOnoffRequest(reqParam);
    return dispatch(createAction(types.AUTHONOFF, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.AUTHONOFF, exceptionPayload));
  }
};

export const getAuthQuotaRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.AUTHEN_QUETA, { isFetching: true }));
    const result = await userService.getAuthenQuota(reqParam);
    return dispatch(createAction(types.AUTHEN_QUETA, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.AUTHEN_QUETA, exceptionPayload));
  }
};

export const authRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.AUTH_API, { isFetching: true }));
    const resultResp: any = await userService.authRequest(reqParam);
    const decryptResult = getDecryptWithAES(resultResp.result);
    const result = JSON.parse(decryptResult);
    return dispatch(createAction(types.AUTH_API, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.AUTH_API, exceptionPayload));
  }
};

export const getTokenRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GETTOKEN, { isFetching: true }));
    const result = await userService.getToken(reqParam);
    return dispatch(createAction(types.GETTOKEN, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GETTOKEN, exceptionPayload));
  }
};

export const getUpLoadImgAuth = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.UPLOAD_IMG_AUTH, { isFetching: true }));
    const result = await userService.getUpLoadImgAuth(reqParam);
    return dispatch(createAction(types.UPLOAD_IMG_AUTH, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.UPLOAD_IMG_AUTH, exceptionPayload));
  }
};

export const getUpLoadFaceAuth = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.UPLOAD_FACE_AUTH, { isFetching: true }));
    const result = await userService.getUpLoadFaceAuth(reqParam);
    return dispatch(createAction(types.UPLOAD_FACE_AUTH, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.UPLOAD_FACE_AUTH, exceptionPayload));
  }
};

export const getUpLoadSaveAuth = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.UPLOAD_SAVE_AUTH, { isFetching: true }));
    const result = await userService.getUpLoadSaveAuth(reqParam);
    return dispatch(createAction(types.UPLOAD_SAVE_AUTH, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.UPLOAD_SAVE_AUTH, exceptionPayload));
  }
};

export const checktradepwdRequest = (reqParam: {}, callback?: any) => async (dispatch: Function) => {
  try {
    const result: any = await userService.checktradepwd(reqParam);
    console.log('checktradepwdRequest==', result);
    if (result.code === '1') {
      Config.capitalpass = true;
    } else {
      Config.capitalpass = false;
    }
    callback(result);
    return dispatch(createAction(types.CHECKTRADEPWD, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.CHECKTRADEPWD, exceptionPayload));
  }
};
