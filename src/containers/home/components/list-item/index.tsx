import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'space-ui';
import { formatKMUnit, formatNumberBase, formatPositiveSymbol, isPriceDown } from '../../../../utils/digital';
import styles from './styles';

interface Props {
  item: Record<string, any>;
  isLast: boolean;
  onItemPress?: (event: Record<string, string>) => void;
}

const ListItem = memo((props: Props) => {
  const { item, isLast, onItemPress } = props;
  if (!item) {
    return null;
  }

  const onPress = () => {
    onItemPress && onItemPress(item);
  };

  const data1 = item.baseCurrency || '--';
  const data2 = item.paymentCurrency || '--';
  const data3 = '24H量';
  const data4 = formatKMUnit(item.twentyfourTurnover);
  const data5 = item.newestPrice && item.newestPrice !== '0' ? item.newestPrice : '--';
  const data6 = item.newesRmbPrice && item.newesRmbPrice !== '0' ? `≈ ￥${formatNumberBase(item.newesRmbPrice)}` : '--';
  const data7 = formatPositiveSymbol(item.twentyfourGain); // 24小时交易量

  const btnStyle = StyleSheet.flatten([styles.buttonWrapper, isPriceDown(item.twentyfourGain) && styles.buttonRed]);

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.leftColWrapper}>
          <View style={styles.leftRo1Wrapper}>
            <Text style={[styles.boldText]}>{data1}</Text>
            <Text style={[styles.grayText, styles.coinName]}>{` / ${data2}`}</Text>
          </View>
          <View style={styles.leftRo2Wrapper}>
            <Text style={[styles.grayText]}>{data3}</Text>
            <Text style={styles.grayText}>{` ${data4}`}</Text>
          </View>
        </View>
        <View style={styles.middleColWrapper}>
          <Text style={[styles.boldText]}>{data5}</Text>
          <Text style={[styles.grayText, styles.marginTo12]}>{data6}</Text>
        </View>
        <View style={styles.rightColWrapper}>
          {/*<Button style={btnStyle} textStyle={styles.buttonText}>*/}
          {/*  {data7}*/}
          {/*</Button>*/}
          <View style={[btnStyle, styles.textViewStyle]}>
            <Text style={styles.buttonText}>{data7}</Text>
          </View>
        </View>
      </View>
      {!isLast && <View style={styles.line} />}
    </TouchableOpacity>
  );
});

export default ListItem;
