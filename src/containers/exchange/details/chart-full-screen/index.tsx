/* eslint-disable @typescript-eslint/camelcase */
import React, { memo, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Colors from '../../../../const/colors';
import { useNavigation } from '../../../../routes/navigation-service';
import ChartView from '../components/chart-view';
import SideMenuBar from '../components/side-menu-bar';
import BottomCycleBar from '../components/bottom-cycle-bar';
import { Props } from './interfaces';
import styles from './styles';

const cycleItems = {
  minute1_kline: '1分钟',
  minute5_kline: '5分钟',
  minute15_kline: '15分钟',
  hour1_kline: '1小时',
  hour4_kline: '4小时',
  day1_kline: '日线',
  week1_kline: '周线',
  month1_kline: '月线',
};

const ChartFullScreen = memo((props: Props) => {
  const { goBack, getParam } = useNavigation();
  const [mainArg, setMainArg] = useState('');
  const [subArg, setSubArg] = useState('');
  const [cycleKey, setCycleKey] = useState(getParam('cycleType', 'hour4_kline'));

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(Colors.colorB10);
    return () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(Colors.whiteColor);
    };
  }, []);

  const onBackPress = () => {
    goBack();
  };

  const onMainArgPress = (value: string) => {
    setMainArg(value);
  };

  const onSubArgPress = (value: string) => {
    setSubArg(value);
  };

  const onCycleKeyPress = (value: string) => {
    setCycleKey(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fullScreen}>
        <ChartView
          klineType={cycleKey}
          symbol={`${props.baseCurrency}/${props.paymentCurrency}`}
          requestSymbol={`${props.baseCurrency}-${props.paymentCurrency}`}
          valuationMin={props.valuationMin}
          mainArg={mainArg}
          subArg={subArg}
        />
        <SideMenuBar onBack={onBackPress} mainArg={mainArg} subArg={subArg} onMainArgPress={onMainArgPress} onSubArgPress={onSubArgPress} />
      </View>
      <BottomCycleBar items={cycleItems} initKey={cycleKey} onPress={onCycleKeyPress} />
    </SafeAreaView>
  );
});

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.marketInfo],
  marketInfo => {
    const marketInfoData = marketInfo.msgData;
    return {
      marketInfoData,
      baseCurrency: (marketInfoData && marketInfoData.baseCurrency) || '--',
      paymentCurrency: (marketInfoData && marketInfoData.paymentCurrency) || '--',
      valuationMin: (marketInfoData && marketInfoData.valuationMin) || 4,
      basicsMin: (marketInfoData && marketInfoData.basicsMin) || 4,
    };
  },
);

export default connect(
  mapStateToProps,
  null,
)(ChartFullScreen);
