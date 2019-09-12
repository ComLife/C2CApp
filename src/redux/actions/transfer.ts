import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { getBbLog } from '../../services';
// 查看BB日志列表
export const getBbLogList = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await getBbLog.getBbLogList(reqParam);
    console.log('getBbLogList=', result, reqParam);
    return dispatch(createAction(types.CHECK_BB_LOG, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.CHECK_BB_LOG, exceptionPayload));
  }
};
