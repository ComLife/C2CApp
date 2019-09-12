export interface Props {
  coinWallet: any;
  currency: any;
  cloudWallet: any;
  coinWalletTotalPrice: number;
  coinWalletTotalRMBPrice: number;
  cloudWalletTotalPrice: number;
  cloudWalletTotalRMBPrice: number;
  currencyDeful: any;
  CloudWalletAssets: any;
  ReceiveaddressData: any;
  currencyDefaultData: any;
  coinTotalPrice: any;
  coinTotalRMBPrice: any;
  userInfoData: Record<string, any>;
}

export interface DispatchProps {
  getViewWalletRequest: Function;
  getCloudWalletAssetsRequest: Function;
  getCloudWalletTypeRequest: Function;
  SetCurreyDefult: Function;
  dispatch: Function;
}

export interface StateProps {
  userInfo: Record<string, any>;
  getViewWallet: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletAssets: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
  ReceiveaddressData: {
    code: string;
  };
  currencyDefaultData: any;
}
