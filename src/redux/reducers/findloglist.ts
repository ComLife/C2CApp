import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

export function chenkRuleLog(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.CHECK_RULE_LOG:
      return { ...state, ...payload };
    case types.REMOVE_CHECK_RULE_LOG:
      return {};
    default:
      return state;
  }
}
