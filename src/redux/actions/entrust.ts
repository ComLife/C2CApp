import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { entrustService } from '../../services';
// 获取历史委托信息
export const historyEntrustRequest = (reqParam: {}, callBack?: any) => async (dispatch: Function) => {
  try {
    const result = await entrustService.entrustHistry(reqParam);
    callBack(result);
    return dispatch(createAction(types.ENTRUST_HISTORY, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.ENTRUST_HISTORY, exceptionPayload));
  }
};
// 获取跟多历史委托信息
export const moreHistoryEntrustRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await entrustService.entrustHistry(reqParam);
    return dispatch(createAction(types.MORE_ENTRUST_HISTORY, { ...result }));
  } catch (e) {
    // return dispatch(createAction(types.ENTRUST_HISTORY, exceptionPayload));
    console.log('moreHistoryEntrustRequest err');
  }
};

// 获取交易记录
export const dealEntrustRequest = (reqParam: {}, callBack?: any) => async (dispatch: Function) => {
  try {
    const result = await entrustService.entrustDeal(reqParam);
    callBack(result);
    return dispatch(createAction(types.ENTRUST_DEAL, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.ENTRUST_DEAL, exceptionPayload));
  }
};

// 获取跟多交易记录
export const moreDealEntrustRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await entrustService.entrustDeal(reqParam);
    return dispatch(createAction(types.MORE_ENTRUST_DEAL, { ...result }));
  } catch (e) {
    // return dispatch(createAction(types.ENTRUST_DEAL, exceptionPayload));
    console.log('moreDealEntrustRequest err');
  }
};

// 获取交易详情
export const entrustDetailRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await entrustService.entrustDetail(reqParam);
    return dispatch(createAction(types.ENTRUST_DETAIL, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.ENTRUST_DETAIL, exceptionPayload));
  }
};
