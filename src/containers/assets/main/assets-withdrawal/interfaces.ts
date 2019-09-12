export interface Props {
  cashCode: any;
  carryCode: any;
  currency: any;
  walletAccount: any;
  cloudWallet: any;
  supportCurrency: any;
}

export interface DispatchProps {
  getCloudWalletCarryRequest: Function;
  getCloudWalletCashRequest: Function;
  resetState: Function;
}

export interface StateProps {
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
  getCloudWalletCash: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletCarry: {
    msg: any;
    code: string;
    data: any;
  };
  getViewWallet: {
    msg: any;
    code: string;
    data: any;
  };
  userInfo: {
    msg: any;
    code: string;
    data: any;
  };
}
