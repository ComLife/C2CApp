import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { walletTypeService } from '../../services';

// 添加自选交易对
export const addCollectionRequest = (reqParam: {}, isLogin: boolean) => async (dispatch: Function) => {
  try {
    if (!isLogin) {
      dispatch(createAction(types.LOCAL_COLLECTION, reqParam));
    } else {
      dispatch(createAction(types.ADD_COLLECTION, { isFetching: true }));
      const result = await walletTypeService.addCollection(reqParam);
      return dispatch(createAction(types.ADD_COLLECTION, { ...result, reqParam, isFetching: false }));
    }
  } catch (e) {
    return dispatch(createAction(types.ADD_COLLECTION, exceptionPayload));
  }
};

// 删除自选交易对
export const deleteCollectionRequest = (reqParam: {}, isLogin: boolean) => async (dispatch: Function) => {
  try {
    console.log('deleteCollectionRequest123123');
    if (!isLogin) {
      dispatch(createAction(types.LOCAL_COLLECTION, reqParam));
    } else {
      dispatch(createAction(types.DELETE_COLLECTION, { isFetching: true }));
      const result = await walletTypeService.deleteCollection(reqParam);
      return dispatch(createAction(types.DELETE_COLLECTION, { ...result, reqParam, isFetching: false }));
    }
  } catch (e) {
    return dispatch(createAction(types.DELETE_COLLECTION, exceptionPayload));
  }
};

// 自选交易对联想输入查询
export const searchWalletTypeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_SEARCH_WALLET_TYPE, { isFetching: true }));
    const result = await walletTypeService.searchWalletType(reqParam);
    return dispatch(createAction(types.GET_SEARCH_WALLET_TYPE, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_SEARCH_WALLET_TYPE, exceptionPayload));
  }
};
