import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { googleAuthService } from '../../services';
// 获取谷歌认证的密钥
export const googleSecretKeyRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await googleAuthService.GoogleKey(reqParam);
    console.log('googleSecretKey=', result, reqParam);
    return dispatch(createAction(types.GOOGLE_SECTET_KEY, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.GOOGLE_SECTET_KEY, exceptionPayload));
  }
};
// 移除资金密码初始化的code
export const removeSecretKeyCode = () => {
  return { type: types.REMOVE_GOOGLE_SECTET_KEY_CODE };
};
// 获取谷歌认证的短信验证码
export const getGoolgeCode = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await googleAuthService.GetGoogleCode(reqParam);
    console.log('getGoolgeCode=', result, reqParam);
    return dispatch(createAction(types.GOOGLE_CODE_KEY, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.GOOGLE_CODE_KEY, exceptionPayload));
  }
};
// 移除资金密码初始化的code
export const removeGoogleMessCode = () => {
  return { type: types.REMOVE_GOOGLE_MESS_CODE };
};
// 获取谷歌认证是否开启
export const getGoolgeIsOpen = (reqParam: {}, callback: Function) => async (dispatch: Function) => {
  try {
    const result: any = await googleAuthService.GetGoogleIsOpen(reqParam);
    console.log('getGoolgeCode=', result, reqParam);
    const isOpen = result.data.isOpen;
    callback(result);
    return dispatch(createAction(types.GOOGLE_ISOPEN, { isOpen }));
  } catch (e) {
    return dispatch(createAction(types.GOOGLE_ISOPEN, exceptionPayload));
  }
};
// 开启谷歌认证
export const openGoogleAuthRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result: any = await googleAuthService.openGoogleAuth(reqParam);
    console.log('openGoogleAuthRequest=', result, reqParam);
    const isOpen = result.data;
    dispatch(createAction(types.GOOGLE_ISOPEN, { isOpen }));
    return dispatch(createAction(types.GOOGLE_AUTH_DATA, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.GOOGLE_ISOPEN, exceptionPayload));
  }
};
// 移除谷歌认证开启后的code
export const removeGoogleDataCode = () => {
  return { type: types.REMOVE_GOOGLE_AUTH_DATA };
};
// 关闭谷歌认证
export const closeGoogleAuthRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result: any = await googleAuthService.closeGoogleAuth(reqParam);
    console.log('closeGoogleAuthRequest=', result, reqParam);
    dispatch(createAction(types.GOOGLE_ISOPEN, { isOpen: result.code === '1' ? false : true }));
    return dispatch(createAction(types.CLOSE_GOOGLE_AUTH, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.GOOGLE_ISOPEN, exceptionPayload));
  }
};
// 移除关闭谷歌认证的code
export const removeCloseGoogleCode = () => {
  return { type: types.REMOVE_CLOSE_GOOGLE_AUTH };
};
