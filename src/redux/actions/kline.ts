import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { klineService } from '../../services';

export const klineHistoryRequest = (reqParam: {}) => async (dispatch: Function) => {
  try {
    dispatch(createAction(types.GET_KLINE_HISTORY, { isFetching: true }));
    const result = await klineService.history(reqParam);
    return dispatch(createAction(types.GET_KLINE_HISTORY, { ...result, isFetching: false }));
  } catch (e) {
    return dispatch(createAction(types.GET_KLINE_HISTORY, exceptionPayload));
  }
};
