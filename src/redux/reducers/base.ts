import * as types from '../action-types';

interface Props {
  type: string;
  payload: {};
}

export function compareVersion(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_COMPARE_VERSION:
      return { ...state, ...payload };
    case types.REMOVE_COMPARE_VERSION:
      return {};
    default:
      return state;
  }
}

export function emergentNotice(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_EMERGENT_NOTICE:
      return { ...state, ...payload };
    case types.REMOVE_EMERGENT_NOTICE:
      return {};
    default:
      return state;
  }
}

export function bannerList(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.GET_BANNER_LIST:
      return { ...state, ...payload };
    case types.REMOVE_BANNER_LIST:
      return {};
    default:
      return state;
  }
}

export function capitalResetData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.TRADEPWD_RESET:
      return { ...state, ...payload };
    case types.REMOVE_TRADEPWD_RESET:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function capitalInitData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.RTRADEPWD_PWDINIT:
      return { ...state, ...payload };
    case types.REMOVE_RTRADEPWD_PWDINIT:
      return {};
    default:
      return state;
  }
}

export function capitalCodeData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.TRADEPWD_CODE:
      return { ...state, ...payload };
    case types.REMOVE_TRADEPWD_CODE:
      return { ...state, code: '' };
    default:
      return state;
  }
}

export function baseAuthData(state = {}, action: Props) {
  const { type, payload = {} } = action;
  switch (type) {
    case types.BASE_AUTHS:
      return { ...state, ...payload };
    case types.REMOVE_BASE_AUTHS:
      return { ...state, code: '' };
    default:
      return state;
  }
}
