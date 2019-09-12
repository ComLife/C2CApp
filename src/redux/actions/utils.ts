import * as types from '../action-types';

const createAction = (type: string, payload?: any) => ({ type, payload });

const exceptionPayload = { isFetching: false, success: false, code: 500, msg: types.NETWORK_ERROR };

export { createAction, exceptionPayload };
