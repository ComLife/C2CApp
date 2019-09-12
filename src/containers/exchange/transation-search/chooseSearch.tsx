import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'space-ui';
import NoDataHolder from '../../../components/no-data';
import outerStyles from './styles';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import UIColor from '../../../const/colors';
import { formatNumberBase, formatPositiveSymbol, isPriceDown } from '../../../utils/digital';
import { DEVICE_HEIGHT, setRatio } from '../../../utils/screen-util';

const ChooseSearch = memo((props: any) => {
  const styles = outerStyles();
  const renderListEmptyComponent = () => <NoDataHolder style={{ paddingVertical: setRatio(DEVICE_HEIGHT / 2) }} />;

  const sendCurrency = (item: any) => {
    const msgData = {
      msgType: 'change_currency',
      msgData: { baseCurrency: item.baseCurrency, paymentCurrency: item.paymentCurrency },
    };
    WebSocket.getInstance().send(sendWrapper(msgData));
    props.onClosePress();
  };
  const renderItem = ({ item, index }: any) => {
    const isRed = isPriceDown(item.twentyfourGain);
    const percent = formatPositiveSymbol(formatNumberBase(item.twentyfourGain));
    return (
      <TouchableOpacity onPress={() => sendCurrency(item)}>
        <View style={styles.BBitemView}>
          <View style={styles.BBText}>
            <Text style={styles.BBitemText1}>{item.baseCurrency}</Text>
            <Text style={styles.BBitemText2}>{`/${item.paymentCurrency}`}</Text>
          </View>
          <Text style={[styles.BBCostText, { color: isRed ? UIColor.colorA3 : UIColor.colorA2 }]}>{formatNumberBase(item.newestPrice, 4)}</Text>
          <Text style={[styles.BBCostTextEnd, { color: isRed ? UIColor.colorA3 : UIColor.colorA2 }]}>{percent}</Text>
        </View>
        <View style={styles.line} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={props.marketList}
      keyExtractor={(item, index) => index + ''}
      renderItem={renderItem}
      // refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
      onEndReachedThreshold={0.1} // 距离底部多少刷新
      ListEmptyComponent={renderListEmptyComponent}
      // onRefresh={() => {sudo
      //   this.refresh();
      // }} // 刷新方法,写了此方法，下拉才会出现  刷新控件，使用此方法必须写 refreshing
      // onEndReached={() => {
      //   this.loadData();
      // }}
    />
  );
});

export default ChooseSearch;
