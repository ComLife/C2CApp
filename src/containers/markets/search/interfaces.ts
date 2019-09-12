export interface Props {
  userInfo: Record<string, any>;
  searchDataList: [];
  baseCurrencyCode: string;
  paymentCurrencyCode: string;
  searchFetching: boolean;
  localCollection: Record<string, string>[];
  collectionList: Record<string, string>[];
  collectionListCallBack: any;
}

export interface DispatchProps {
  addCollectionRequest: Function;
  deleteCollectionRequest: Function;
  searchWalletTypeRequest: Function;
  resetState: Function;
}

export interface StateProps {
  localCollection: Record<string, string>[];
  searchWalletType: Record<string, any>;
  userInfo: {
    data: Record<string, any>;
  };
  collectionList: Record<string, string>[];
  collectionListCallBack: any;
}
