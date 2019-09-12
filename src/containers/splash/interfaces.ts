export interface Props {
  isInstalled?: string;
  userInfo: Record<string, any>;
  marketInfoData?: Record<string, any>;
}

export interface DispatchProps {
  loginRequest: Function;
  getCloudWalletTypeRequest: Function;
  getAllCloudWalletTypeRequest: Function;
  bannerListRequest: Function;
  getAuthRequest: Function;
  storeState: Function;
  resetState: Function;
  compareVersionRequest: Function;
  getAuthOnoffRequest: Function;
}

export interface StateProps {
  userInfo: Record<string, any>;
  appConfig: Record<string, string>;
  compareVersion: {
    msg: any;
    code: string;
    data: any;
  };
}
