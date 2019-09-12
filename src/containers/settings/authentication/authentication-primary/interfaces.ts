export interface Props {
  userAuthInfo: any;
}

export interface DispatchProps {
  getAuthRequest: Function;
  authRequest: Function;
  resetState: Function;
}

export interface StateProps {
  userAuthInfo: {
    msg: string;
    code: string;
    data: any;
  };
}
