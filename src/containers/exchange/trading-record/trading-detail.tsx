import React, { Fragment, memo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Header from '../../../components/header';
import { DivisorLine, SafeAreaView, TextInput } from 'space-ui';
import { useNavigation } from '../../../routes/navigation-service';
import { screenWidth, setRatio } from '../../../utils/screen-util';
import UIColor from '../../../const/colors';
import outerStyles from './styles';
import { connect } from 'react-redux';
import { formatHHmmss, formatYYYYMMDD } from '../../../utils/date-time';
import { createSelector } from 'reselect';

//买入的是基础货币是前面的币种，卖出是后面的币种 tradtype 0:买入 1：卖出

const TradingDetail = memo((props: any) => {
  console.log('TradingDetail=', props);
  const styles = outerStyles();
  const { goBack } = useNavigation();
  const tradingData = props.navigation.getParam('data');
  let totalCommission = 0;
  const onBack = () => {
    goBack();
  };

  // const priceDetail = ['委托价格', '成交均价', '委托数量', '成交数量', '手续费'];

  const entrustDetail = () => {
    const serviceCharge = tradingData.tradeType === 1 ? tradingData.paymentCurrency : tradingData.baseCurrency;

    // for (let i = 0; i < props.entrustDetailData.list.length; i++) {
    //   totalCommission += Number.parseFloat(props.entrustDetailData.list[i].commission);
    // }
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <Fragment>
        <View style={styles.temView}>
          <Text style={styles.priceText}>{`委托价格(${tradingData.paymentCurrency})`}</Text>
          <Text style={styles.priceNumText}>{tradingData.entrustPrice}</Text>
        </View>
        <View style={styles.temView}>
          <Text style={styles.priceText}>{`成交均价(${tradingData.paymentCurrency})`}</Text>
          <Text style={styles.priceNumText}>{tradingData.averagePrice}</Text>
        </View>
        <View style={styles.temView}>
          <Text style={styles.priceText}>{`委托数量(${tradingData.baseCurrency})`}</Text>
          <Text style={styles.priceNumText}>{tradingData.entrustNum}</Text>
        </View>
        <View style={styles.temView}>
          <Text style={styles.priceText}>{`成交数量(${tradingData.baseCurrency})`}</Text>
          <Text style={styles.priceNumText}>{`${tradingData.dealNum}`}</Text>
        </View>
        <View style={styles.temView}>
          <Text style={styles.priceText}>{`手续费(${serviceCharge})`}</Text>
          <Text style={styles.priceNumText}>{props.entrustDetailData.totalCommission}</Text>
        </View>
      </Fragment>
    );
  };

  const entrustTitle = () => {
    const serviceCharge = tradingData.tradeType === 1 ? tradingData.paymentCurrency : tradingData.baseCurrency;
    return (
      <Fragment>
        <View style={styles.entrustTitleView}>
          <View style={styles.dealView}>
            <Text style={styles.entrustTitleText}>成交时间</Text>
          </View>
          <View style={styles.entrustItemView}>
            <Text style={styles.entrustTitleText}>成交价格</Text>
            <Text style={styles.entrustTitleText}>{`(${tradingData.paymentCurrency})`}</Text>
          </View>
          <View style={styles.entrustItemView}>
            <Text style={styles.entrustTitleText}>成交数量</Text>
            <Text style={styles.entrustTitleText}>{`(${tradingData.baseCurrency})`}</Text>
          </View>
          <View style={styles.entrustItemView}>
            <Text style={styles.entrustTitleText}>手续费</Text>
            <Text style={styles.entrustTitleText}>{`(${serviceCharge})`}</Text>
          </View>
        </View>
        <DivisorLine height={setRatio(2)} backgroundColor={UIColor.colorB4} />
      </Fragment>
    );
  };

  const entrustItem = () => {
    return props.entrustDetailData.list.map((item: any, index: number) => {
      const date = new Date(item.time);
      const leftTopText = formatYYYYMMDD(date);
      const leftBottomText = formatHHmmss(date);
      return (
        <Fragment key={index}>
          <View style={styles.entrustItem}>
            <View style={styles.timeView}>
              <Text style={styles.timeText}>{leftTopText}</Text>
              <Text style={styles.timeText}>{leftBottomText}</Text>
            </View>
            <View style={styles.divisionView}>
              <Text style={styles.dataText}>{item.dealPrice}</Text>
            </View>
            <View style={styles.divisionView}>
              <Text style={styles.dataText}>{item.dealNum}</Text>
            </View>
            <View style={styles.divisionView}>
              <Text style={styles.dataText}>{item.commission}</Text>
            </View>
          </View>
          <DivisorLine height={setRatio(2)} backgroundColor={UIColor.colorB4} />
        </Fragment>
      );
    });
  };

  return (
    <SafeAreaView>
      <Header title={'交易详情'} onClick={onBack}></Header>
      <DivisorLine height={setRatio(2)} backgroundColor={UIColor.colorB4} />
      <ScrollView>
        <View style={styles.detailView}>
          <View style={styles.titleView}>
            <Text style={[styles.titleText, { color: UIColor.colorA3 }]}>{tradingData.tradeType === 1 ? '卖出' : '买入'}</Text>
            <Text style={[styles.titleText, { color: UIColor.colorB1 }]}>{`${tradingData.baseCurrency}/${tradingData.paymentCurrency}`}</Text>
          </View>
          <View style={styles.detailTemView}>{entrustDetail()}</View>
          {entrustTitle()}
          {entrustItem()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.entrustDetail],
  entrustDetail => {
    return {
      entrustDetailData: entrustDetail.data,
    };
  },
);

export default connect(
  mapStateToProps,
  null,
)(TradingDetail);
