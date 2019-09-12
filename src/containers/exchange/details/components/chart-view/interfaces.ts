import ChartView from './index';
import React from 'react';

export interface Props {
  klineHistory: any;
  klineType: string;
  requestSymbol: string;
  symbol: string;
  valuationMin: number;
  klinePush: {
    msgType: string;
    msgId: number;
    msgData: {
      Symbol: string;
      klines: any[];
    };
  };
  turnoverrecordAdd: any;
  mainArg?: string; // 主图指标
  subArg?: string; // 副图指标
}

export interface DispatchProps {
  klineHistoryRequest: Function;
  resetState: Function;
}

export interface StateProps {
  klineHistory: {
    data?: any;
    isFetching: boolean;
    code: string;
    msg: string;
  };
  klinePush: {
    msgType: string;
    msgId: number;
    msgData: {
      Symbol: string;
      klines: any[];
    };
  };
  turnoverrecordAdd: {
    msgType: string;
    msgId: number;
    msgData: any[];
  };
}
