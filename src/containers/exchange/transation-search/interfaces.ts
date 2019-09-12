export interface Props {
  routes: [];
  scenes: {};
  paymentCurrencyList: [];
  marketDataList: [];
}

export interface StateProps {
  marketListInfo: {
    msgData: [];
  };
  paymentCurrencys: {
    msgData: [];
  };
  collectionList: Record<string, any>;
  scenes: {};
}
