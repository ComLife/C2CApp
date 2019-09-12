export interface Props {
  userData: any;
  getAuthenOnoff: any;
}

export interface DispatchProps {
  resetState: Function;
}

export interface StateProps {
  userInfo: {
    data: Record<string, any>;
  };
  getAuthenOnoff: any;
}
