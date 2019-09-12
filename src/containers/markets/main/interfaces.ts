export interface Props {
  routes: Record<string, string>[];
  marketDataList: [];
  userInfo: any;
  localCollection: any;
}

export interface StateProps {
  marketListInfo: Record<string, any>;
  paymentCurrencys: Record<string, any>;
  userInfo: Record<string, any>;
  localCollection: Record<string, any>;
}
