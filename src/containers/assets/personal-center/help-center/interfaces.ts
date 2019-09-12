export interface Props {
  userName: string;
  dispatch: any;
  loginMode: any;
  userInfo: any;
}

export interface DispatchProps {
  gestureLogin: Function;
  checkTouch: Function;
  removeLoginSafeCode: Function;
  loginSafe: Function;
  removeLoginCode: Function;
}
export interface RenderItemProps {}

export interface StateProps {
  loginMode: {};
  userInfo: {
    data: Record<string, any>;
  };
  isGoogleOpen: any;
}
