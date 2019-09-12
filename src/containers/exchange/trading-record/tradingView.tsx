import React, { Fragment, memo, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { DivisorLine, FlatList } from 'space-ui';
import outerStyles from './styles';
import UIColor from '../../../const/colors';
import { EasyShowLD } from '../../../components/easyShowLD/EasyShow';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import NoDataHolder from '../../../components/no-data';
import { useNavigation } from '../../../routes/navigation-service';
import mapDispatchToProps from './map-dispatch-to-props';
import { connect } from 'react-redux';
import { DEVICE_HEIGHT, setRatio } from '../../../utils/screen-util';
import { formatHHmmss, formatYYYYMMDD } from '../../../utils/date-time';
import { createSelector } from 'reselect';

const TradingItem = memo((props: any) => {
  console.log('TradingItem=', props);
  const { navigate } = useNavigation();
  const [refreshing, setRfreshing] = useState(false);
  const styles = outerStyles();
  const renderListEmptyComponent = () => <NoDataHolder style={{ paddingVertical: setRatio(DEVICE_HEIGHT / 2) }} />;

  //取消订单回调
  const closeOrder = (item: any) => {
    // const tmpOrder: any = curOrder[index];
    EasyShowLD.loadingShow('撤消中...');

    const accuracy = {
      msgType: 'revoke_entrust_order',
      msgData: {
        orderId: item.orderId,
        paymentCurrency: props.marketInfoMsgData.paymentCurrency,
        baseCurrency: props.marketInfoMsgData.baseCurrency,
        tradeType: item.tradeType,
        entrustType: item.entrustType,
        entrustPrice: item.entrustPrice,
        entrustNum: item.entrustNum,
      },
    };
    WebSocket.getInstance().send(sendWrapper(accuracy));
  };

  const lookDetail = async (item: any) => {
    await props.entrustDetailRequest({ tradeType: item.tradeType, entrustOrderId: item.orderId });
    navigate('TradingDetail', { data: item });
  };

  const tailView = (item: any) => {
    if (props.type === 'k1') {
      return (
        <TouchableOpacity style={styles.rightView} onPress={() => closeOrder(item)}>
          <Text style={styles.buttonsText}>{'撤销'}</Text>
        </TouchableOpacity>
      );
    } else if (props.type === 'k2') {
      let stateText = '已下单';
      let stateTextColor = UIColor.colorA1;
      if (item.orderStatus === 0) {
        stateText = '委托中';
      } else if (item.orderStatus === 1) {
        stateText = '已完成';
      } else if (item.orderStatus === 2 || item.orderStatus === 4) {
        stateText = '部分成交撤单';
      } else if (item.orderStatus === 3 || item.orderStatus === 5) {
        stateText = '已撤单';
        stateTextColor = UIColor.colorB1;
      }
      return (
        <View style={styles.buttonView}>
          <Text style={[styles.buttonsText, { color: stateTextColor }]}>{stateText}</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.rightView} onPress={() => lookDetail(item)}>
          <Text style={styles.buttonsText}>{'查看详情'}</Text>
        </TouchableOpacity>
      );
    }
  };

  const dealItem = ({ item, index }: any) => {
    const date = new Date(item.time);
    const leftTopText = formatYYYYMMDD(date);
    const leftBottomText = formatHHmmss(date);
    const rightTopText = props.marketInfoMsgData.baseCurrency + '/' + props.marketInfoMsgData.paymentCurrency;
    const leftMidText = '价格: ' + item.entrustPrice;
    const rightBottomText = '数量: ' + item.dealNum + '/' + item.entrustNum;
    return (
      <Fragment>
        <View style={styles.bg} key={index}>
          <View style={[styles.leftImageView, { backgroundColor: item.tradeType ? UIColor.colorA3 : UIColor.colorA2 }]} />
          <View style={styles.leftView}>
            <Text style={styles.bottomItemText}>{leftTopText}</Text>
            <Text style={styles.bottomItemText}>{leftBottomText}</Text>
          </View>
          <View style={styles.midView}>
            <Text style={styles.bottomHeaderTitle}>{rightTopText}</Text>
            <Text style={styles.bottomHeaderText2}>{leftMidText}</Text>
            <Text style={styles.bottomHeaderText2}>{rightBottomText}</Text>
          </View>
          {tailView(item)}
        </View>
        <DivisorLine height={setRatio(2)} backgroundColor={UIColor.colorB4} />
      </Fragment>
    );
  };

  const detail = (item: any) => {
    console.log('detail = ', item);
  };

  // useEffect(() => {
  //   if (props.type === 'k1') {
  //     if (props.dataList.length > 10) {
  //       setCurOrder(props.dataList.slice(0, 10));
  //     } else {
  //       setCurOrder(props.dataList.slice(0));
  //     }
  //   }
  // }, []);

  const handleRefresh = async () => {
    if (props.type !== 'k1') {
      setRfreshing(true);
      await props.entrustRequest(1, false);
      setRfreshing(false);
    }
  };

  const loadData = () => {
    if (props.page < props.allPage) {
      props.entrustRequest(props.page + 1, true);
    }
  };

  const footer = () => {
    if (props.page < props.allPage) {
      return (
        <View style={styles.footerView}>
          <ActivityIndicator size="small" />
        </View>
      );
    } else {
      return <View style={styles.footerView} />;
    }
  };

  return (
    <FlatList
      style={styles.flatList}
      data={props.dataList}
      keyExtractor={(item, index) => index + ''}
      renderItem={dealItem}
      onEndReachedThreshold={0.1} // 距离底部多少刷新
      ListEmptyComponent={renderListEmptyComponent}
      ListFooterComponent={footer} //footer尾部组件
      refreshing={refreshing}
      onRefresh={() => {
        handleRefresh();
      }}
      onEndReached={() => {
        loadData();
      }}
    />
  );
});

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.entrustDetail, (state: Record<string, any>) => state.entrustHistory],
  (entrustDetail, entrustHistory) => {
    return {
      entrustDetail: entrustDetail,
      entrustHistory: entrustHistory.data,
    };
  },
);

// export default TradingItem;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradingItem);
