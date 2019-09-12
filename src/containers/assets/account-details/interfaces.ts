export interface Props {
  getCloudWalletTypeCode: any;
  getAllCloudWalletTypeCode: any;
  getLogList: any;
  logCode: string;
  getTotalPage: number;
  logMsg: string;
  getLogRuleList: any;
  getRuleTotalPage: number;
}

export interface DispatchProps {
  getCloudWalletTypeRequest: Function;
  getAllCloudWalletTypeRequest: Function;
  getBbLogList: Function;
  getRuleLogList: Function;
  dispatch: Function;
  resetState: Function;
}

export interface StateProps {
  getAllCloudWalletType: {
    data?: {};
  };

  getCloudWalletType: {
    data?: {};
  };
  getRuleLog: {
    msg?: string;
    code?: string;
    data?: { dataList?: any; totalPageCount?: number };
  };
  chenkBbLog: {
    msg?: string;
    code?: string;
    data?: { dataList?: any; totalPageCount?: number };
  };
  chenkRuleLog: {};
}
