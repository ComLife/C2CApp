export interface Props {
  userInfo: Record<string, any>;
  bannerList: Record<string, string>[];
  dispatch: Function;
  increaseList: [];
  currency: any;
  currencyAll: any;
  compareVersion: any;
}

export interface DispatchProps {
  emergentNoticeRequest: Function;
  getWalletTypeRequest: Function;
  compareVersionRequest: Function;
  getCloudWalletTypeRequest: Function;
  getAllCloudWalletTypeRequest: Function;
}

export interface StateProps {
  getAllCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
  bannerList: {
    // msg: any;
    // code: string;
    data: any;
  };
  userInfo: {
    data: Record<string, any>;
  };
  increaseTopReply: Record<string, any>;
  getCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
  compareVersion: {
    msg: any;
    code: string;
    data: any;
  };
}
