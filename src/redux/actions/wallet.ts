import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { walletService } from '../../services';

export const getWalletTypeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_WALLET_TYPE, { isFetching: true }));
    const result = await walletService.getWalletType(reqParam);
    return dispatch(createAction(types.GET_WALLET_TYPE, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_WALLET_TYPE, exceptionPayload));
  }
};

export const getViewWalletRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_VIEW_WALLET, { isFetching: true }));
    const result = await walletService.getViewWallet(reqParam);
    return dispatch(createAction(types.GET_VIEW_WALLET, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_VIEW_WALLET, exceptionPayload));
  }
};

export const getWalletTransferRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_WALLET_TRANSFER, { isFetching: true }));
    const result = await walletService.getWalletTransferRequest(reqParam);
    return dispatch(createAction(types.GET_WALLET_TRANSFER, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_WALLET_TRANSFER, exceptionPayload));
  }
};

export const getCloudWalletAssetsRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_WALLET_CLOUDASSETS, { isFetching: true }));
    const result = await walletService.getCloudWalletAssetsRequest(reqParam);
    return dispatch(createAction(types.GET_WALLET_CLOUDASSETS, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_WALLET_CLOUDASSETS, exceptionPayload));
  }
};

export const getCloudWalletTypeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_CLOUD_WALLET_TYPE, { isFetching: true }));
    const result = await walletService.getCloudWalletTypeRequest(reqParam);
    return dispatch(createAction(types.GET_CLOUD_WALLET_TYPE, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_CLOUD_WALLET_TYPE, exceptionPayload));
  }
};

export const getAllCloudWalletTypeRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_ALL_CLOUD_WALLET_TYPE, { isFetching: true }));
    const result = await walletService.getAllCloudWalletTypeRequest(reqParam);
    return dispatch(createAction(types.GET_ALL_CLOUD_WALLET_TYPE, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_ALL_CLOUD_WALLET_TYPE, exceptionPayload));
  }
};

export const getCloudWalletCashRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_CLOUD_WALLET_CASH, { isFetching: true }));
    const result = await walletService.getCloudWalletCashRequest(reqParam);
    return dispatch(createAction(types.GET_CLOUD_WALLET_CASH, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_CLOUD_WALLET_CASH, exceptionPayload));
  }
};

export const getCloudWalletCarryRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_CLOUD_WALLET_CARRY, { isFetching: true }));
    const result = await walletService.getCloudWalletCarryRequest(reqParam);
    return dispatch(createAction(types.GET_CLOUD_WALLET_CARRY, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_CLOUD_WALLET_CARRY, exceptionPayload));
  }
};

export const SetCurreyDefult = (newValue: any) => {
  return { type: types.RECHARGE_CURENCY, payload: newValue };
};
export const getReceiveaddressRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await walletService.getReceiveaddress(reqParam);
    return dispatch(createAction(types.RECEIVEADDRESS, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.RECEIVEADDRESS, exceptionPayload));
  }
};
