import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { baseService } from '../../services';

export const bannerListRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_BANNER_LIST, { isFetching: true }));
    const result = await baseService.bannerList(reqParam);
    return dispatch(createAction(types.GET_BANNER_LIST, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_BANNER_LIST, exceptionPayload));
  }
};

export const compareVersionRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_COMPARE_VERSION, { isFetching: true }));
    const result = await baseService.compareVersion(reqParam);
    return dispatch(createAction(types.GET_COMPARE_VERSION, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_COMPARE_VERSION, exceptionPayload));
  }
};

export const emergentNoticeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_EMERGENT_NOTICE, { isFetching: true }));
    const result = await baseService.emergentNotice(reqParam);
    return dispatch(createAction(types.GET_EMERGENT_NOTICE, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_EMERGENT_NOTICE, exceptionPayload));
  }
};

export const tradepwdCodeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await baseService.getTradepwdCode(reqParam);
    console.log('tradepwdCodeRequest=', result, reqParam);
    return dispatch(createAction(types.TRADEPWD_CODE, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.TRADEPWD_CODE, exceptionPayload));
  }
};

// 移除资金密码重置的code
export const removeCapitalCode = () => {
  return { type: types.REMOVE_TRADEPWD_CODE };
};

export const tradepwdResetRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.TRADEPWD_RESET, { isFetching: true }));
    const result = await baseService.TradepwdReset(reqParam);
    console.log('tradepwdResetRequest=', result, reqParam);
    return dispatch(createAction(types.TRADEPWD_RESET, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.TRADEPWD_RESET, exceptionPayload));
  }
};

// 移除资金密码重置的code
export const removeCapitalResetData = () => {
  return { type: types.REMOVE_TRADEPWD_RESET };
};

export const tradepwdRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await baseService.Tradepwd(reqParam);
    console.log('tradepwdRequest=', result, reqParam);
    return dispatch(createAction(types.RTRADEPWD_PWDINIT, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.RTRADEPWD_PWDINIT, exceptionPayload));
  }
};

// 移除资金密码初始化的code
export const removeCapitalInitData = () => {
  return { type: types.REMOVE_RTRADEPWD_PWDINIT };
};

// 移除资金密码初始化的code
export const removeCapitalInitCode = () => {
  return { type: types.REMOVE_TRADEPWD_CODE };
};

export const baseAuthsRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await baseService.baseAuths(reqParam);
    return dispatch(createAction(types.BASE_AUTHS, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.BASE_AUTHS, exceptionPayload));
  }
};
