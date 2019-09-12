export interface Props {
  userInfo: any;
  authInfo: any;
  checktradPWD: any;
  buyData: any;
  sellData: any;
  baseCurrency: string;
  basicsMin: number;
  callAuction: number;
  dealMax: number;
  newesRmbPrice: string;
  newestPrice: string;
  openTime: number;
  paymentCurrency: string;
  status: number;
  systemTime: number;
  tradingMax: string;
  tradingMin: string;
  twentyfourGain: string;
  valuationMin: number;
  baseBalanceData: string;
  paymentBalanceData: string;
  orderInMsgId: string;
  entrustResult: boolean;
  errorHint: string;
  revokeEntrustOrderReplyData: any;
  revokeResult: string;
  userEntrustOrdersData: any;
  currency: [];
  getAuthenOnoff: any;
}

export interface DispatchProps {
  getAuthRequest: Function;
  dispatch: Function;
  checktradepwdRequest: Function;
  resetState: Function;
}

export interface StateProps {
  orderBook: {
    msgData?: {
      buy?: [];
      sell?: [];
    };
  };

  revokeEntrustOrderReply: {
    msgData?: {
      revokeResult?: boolean;
    };
  };

  userEntrustOrders: { msgData?: {} };

  marketInfo: {
    msgData?: {
      baseCurrency?: string;
      basicsMin?: number;
      callAuction?: number;
      dealMax?: number;
      newesRmbPrice?: string;
      newestPrice?: string;
      openTime?: number;
      paymentCurrency?: string;
      status?: number;
      systemTime?: number;
      tradingMax?: string;
      tradingMin?: string;
      twentyfourGain?: string;
      valuationMin?: number;
    };
  };
  userAvailablefunds: {
    msgData?: {
      baseBalance?: string;
      paymentBalance?: string;
    };
  };
  createEntrustOrderReply: {
    inMsgId?: string;
    msgData?: {
      entrustResult?: boolean;
      errorHint?: string;
    };
  };

  entrustHistory: any;
  entrustDeal: any;
  userInfo: {
    data?: any;
    isFetching: boolean;
    code: string;
    msg: string;
  };
  entrustDetail: any;
  getAuthRequest: any;
  checktradPWD: any;
  getCloudWalletType: {
    msg: any;
    code: string;
    data: any;
  };
  getAuthenOnoff: any;
}
