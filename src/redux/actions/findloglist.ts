import * as types from '../action-types';
import { createAction, exceptionPayload } from './utils';
import { getRuleLog } from '../../services';
// 查看BB日志列表
export const getRuleLogList = (reqParam: {}) => async (dispatch: Function) => {
  try {
    const result = await getRuleLog.getRuleLogList(reqParam);
    console.log('getRuleLogList=', result, reqParam);
    return dispatch(createAction(types.CHECK_RULE_LOG, { ...result }));
  } catch (e) {
    return dispatch(createAction(types.CHECK_RULE_LOG, exceptionPayload));
  }
};
