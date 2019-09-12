export interface Props {
  supportCurrencys: any;
  currencysMap: any;
  walletAccount: any;
  bbCoinAccount: any;
  cloudWallet: any;
  getWalletTransfer: any;
}

export interface DispatchProps {
  getWalletTransferRequest: Function;
  resetState: Function;
}

export interface StateProps {
  getWalletTransfer: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletAssets: {
    msg: any;
    code: string;
    data: any;
  };
  getViewWallet: {
    msg: any;
    code: string;
    data: any;
  };
}
