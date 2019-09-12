export interface DispatchProps {
  curreyDefult: Function;
  resetState: Function;
  currency: any;
  currencyDefault: any;
  cloudWallet: any;
  SetCurreyDefult: Function;
  getReceiveaddressRequest: Function;
  ReceiveaddressData: any;
}

export interface StateProps {
  currencyDefaultData: any;
  getCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
  getCloudWalletAssets: any;
  ReceiveaddressData: any;
}
