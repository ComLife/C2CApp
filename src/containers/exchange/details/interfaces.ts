export interface Props {
  userInfo: any;
  marketInfoData: Record<string, any>;
  // 深度（盘口）
  orderBookData: {
    buy: Record<string, any>[];
    sell: Record<string, any>[];
  };
  // 成交记录
  turnOverRecordData: Record<string, any>[];
  baseCurrency: string;
  paymentCurrency: string;
  valuationMin: number;
  basicsMin: number;
  collectionListData: Record<string, string>[];
  localCollection: Record<string, string>[];
  collectionListCallBack: any;
}

export interface DispatchProps {
  dispatch: Function;
  addCollectionRequest: Function;
  deleteCollectionRequest: Function;
  resetState: Function;
}

export interface StateProps {
  marketInfo: Record<string, any>;
  orderBook: Record<string, any>;
  turnOverRecord: Record<string, any>;
  collectionList: Record<string, any>;
  localCollection: Record<string, string>[];
  userInfo: {
    data: Record<string, any>;
  };
  collectionListCallBack: any;
}
