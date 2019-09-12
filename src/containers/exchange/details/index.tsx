import React, { useEffect, useMemo, useState } from 'react';
import { Image, InteractionManager, StatusBar, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ScrollView } from 'react-navigation';
import { Button, DivisorLine, SafeAreaView } from 'space-ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { screenWidth, setRatio, setText } from '../../../utils/screen-util';
import { DispatchProps, Props, StateProps } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';
import SummaryBar from './components/summary-bar';
import CycleBar from './components/cycle-bar';
import TabDepth from './components/tab-depth';
import { useNavigation } from '../../../routes/navigation-service';
import ImageSet from '../../../const/image-set';
import Colors from '../../../const/colors';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import CustomTabBar from '../transation-search/customTabBar';
import Header from './components/header';
import TabRecord from './components/tab-record';
import ChartView from './components/chart-view';
import styles from './styles';
import { REMOVE_CALLBACK_COLLECTION } from '../../../redux/action-types';

const cycleTypes = ['minute1_kline', 'minute5_kline', 'minute15_kline', 'hour1_kline', 'hour4_kline', 'day1_kline', 'week1_kline', 'month1_kline'];
const cycleItems = ['1分钟', '5分钟', '15分钟', '1小时', '4小时', '日线', '周线', '月线', '全屏'];

const ExchangeDetails = (props: DispatchProps & Props) => {
  const { goBack, navigate } = useNavigation();
  const [cycleType, setCycleType] = useState(cycleTypes[0]);
  const [tabIndex, setTabIndex] = useState(0);

  const onCycleBarPress = (cycleIndex: number) => {
    if (cycleItems[cycleIndex] === '全屏') {
      navigate('ChartFullScreen', { cycleType, mainArg: 'MA', subArg: 'MACD' });
    } else {
      setCycleType(cycleTypes[cycleIndex]);
    }
  };

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(Colors.colorB10);
    return () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(Colors.whiteColor);
    };
    // empty-array means don't watch for any updates
  }, []);

  useEffect(() => {
    if (props.collectionListCallBack.code === '1') {
      const msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: '' } };
      WebSocket.getInstance().send(sendWrapper(msgData));
      props.resetState(REMOVE_CALLBACK_COLLECTION);
    }
  }, [props.collectionListCallBack]);

  // 返回
  const onBack = () => {
    goBack();
  };

  const summaryBar = useMemo(() => <SummaryBar data={props.marketInfoData} />, [props.marketInfoData]);

  const cycleBar = useMemo(() => <CycleBar onPress={onCycleBarPress} items={cycleItems} />, []);

  const onBackPress = (type: string) => () => {
    InteractionManager.runAfterInteractions(() => {
      navigate('Exchange', { type });
    });
  };

  const isExist = () => {
    const { collectionListData } = props;
    if (collectionListData.length > 0) {
      const result1 = collectionListData.filter(
        (r: Record<string, string>) => r.baseCurrency === props.baseCurrency && r.paymentCurrency === props.paymentCurrency,
      );
      return result1.length > 0;
    }
    const { localCollection } = props;
    if (localCollection.length > 0) {
      const result = localCollection.filter(
        (r: Record<string, string>) => r.baseCurrency === props.baseCurrency && r.paymentCurrency === props.paymentCurrency,
      );
      return result.length > 0;
    }
  };

  const onHeaderRightPress = () => {
    InteractionManager.runAfterInteractions(() => {
      const reqParams = { baseCurrency: props.baseCurrency, paymentCurrency: props.paymentCurrency };
      const isLogin = !!(props.userInfo && props.userInfo.data);
      if (isExist()) {
        props.deleteCollectionRequest(reqParams, isLogin);
      } else {
        props.addCollectionRequest(reqParams, isLogin);
      }
    });
  };

  const rightComponent = () => {
    const source = isExist() ? ImageSet.icon_collection : ImageSet.icon_collection_2;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onHeaderRightPress}>
        <Image style={styles.imageView} source={source} />
      </TouchableOpacity>
    );
  };

  // 动态计算高度
  let baseH = 50;
  if (tabIndex === 0) {
    baseH = 0;
    if (props.orderBookData && props.orderBookData.buy && props.orderBookData.sell && props.orderBookData.buy.length >= props.orderBookData.sell.length) {
      const number = props.orderBookData.buy.length > 10 ? 10 : props.orderBookData.buy.length;
      baseH = setRatio(95) + setRatio(40) * number;
    } else if (
      props.orderBookData &&
      props.orderBookData.buy &&
      props.orderBookData.sell &&
      props.orderBookData.buy.length <= props.orderBookData.sell.length
    ) {
      const number = props.orderBookData.sell.length > 10 ? 10 : props.orderBookData.sell.length;
      baseH = setRatio(95) + setRatio(40) * number;
    }
  } else {
    if (props.turnOverRecordData && props.turnOverRecordData.length > 0) {
      const number = props.turnOverRecordData.length > 50 ? 50 : props.turnOverRecordData.length;
      baseH = setRatio(95) + setRatio(40) * number;
    } else if (props.turnOverRecordData && props.turnOverRecordData.length === 0) {
      baseH = setRatio(95) + setRatio(160);
    }
  }

  console.log('valuationMin====', cycleType, props.valuationMin);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`${props.baseCurrency}/${props.paymentCurrency}`}
        leftTitle=""
        titleColor={Colors.whiteColor}
        onPressLeft={onBack}
        rightComponent={rightComponent()}
        backgroundColor={Colors.colorB10}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {summaryBar}
        <DivisorLine height={setRatio(2)} backgroundColor={Colors.colorB9} />
        {cycleBar}
        <ChartView
          klineType={cycleType}
          symbol={`${props.baseCurrency}/${props.paymentCurrency}`}
          requestSymbol={`${props.baseCurrency}-${props.paymentCurrency}`}
          valuationMin={props.valuationMin}
        />
        <DivisorLine height={setRatio(15)} backgroundColor={Colors.colorB9} />
        <ScrollableTabView
          style={{ width: screenWidth, height: baseH }}
          onChangeTab={(tab: any) => setTabIndex(tab.i)}
          renderTabBar={() => (
            <CustomTabBar
              style={styles.tabView}
              backgroundColor={Colors.colorB10}
              tabUnderlineDefaultWidth={20}
              tabUnderlineScaleX={3}
              activeColor={Colors.whiteColor}
              inactiveColor={Colors.colorB8}
              textStyle={{ fontSize: setText(22) }}
            />
          )}>
          <TabDepth data={props.orderBookData} tabLabel={'盘口'} basicsMin={props.basicsMin} currencyTypes={[props.baseCurrency, props.paymentCurrency]} />
          <TabRecord
            data={props.turnOverRecordData}
            tabLabel={'成交记录'}
            basicsMin={props.basicsMin}
            currencyTypes={[props.baseCurrency, props.paymentCurrency]}
          />
        </ScrollableTabView>
      </ScrollView>
      <View style={styles.bottomBtnWrapper}>
        <Button style={styles.bottomLeftBtn} fontSize={setText(27)} onPress={onBackPress('buy')}>{`买入`}</Button>
        <Button style={[styles.bottomLeftBtn, styles.bottomRightBtn]} fontSize={setText(27)} onPress={onBackPress('sell')}>{`卖出`}</Button>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.marketInfo,
    (state: Record<string, any>) => state.orderBook,
    (state: Record<string, any>) => state.turnOverRecord,
    (state: Record<string, any>) => state.collectionList,
    (state: Record<string, any>) => state.localCollection,
    (state: Record<string, any>) => state.collectionListCallBack,
  ],
  (userInfo, marketInfo, orderBook, turnOverRecord, collectionList, localCollection, collectionListCallBack) => {
    const marketInfoData = marketInfo.msgData;
    const collectionListData = collectionList;
    return {
      userInfo,
      marketInfoData,
      orderBookData: orderBook.msgData || [],
      turnOverRecordData: turnOverRecord.msgData || [],
      baseCurrency: (marketInfoData && marketInfoData.baseCurrency) || '--',
      paymentCurrency: (marketInfoData && marketInfoData.paymentCurrency) || '--',
      valuationMin: (marketInfoData && marketInfoData.valuationMin) || 4,
      basicsMin: (marketInfoData && marketInfoData.basicsMin) || 4,
      collectionListData,
      localCollection,
      collectionListCallBack,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeDetails);
