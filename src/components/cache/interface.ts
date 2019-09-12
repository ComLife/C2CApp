export interface Props {}

export interface DispatchProps {
  storeState: Function;
}

export interface StateProps {
  userInfo: Record<string, any>;
  appConfig: Record<string, string>;
}
