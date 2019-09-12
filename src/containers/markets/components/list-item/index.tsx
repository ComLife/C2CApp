import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'space-ui';
import { formatKMUnit, formatNumberBase, formatPositiveSymbol, isPriceDown } from '../../../../utils/digital';
import styles from './styles';

interface Props {
  item: {
    baseCurrency?: string;
    paymentCurrency?: string;
    newestPrice?: string;
    twentyfourGain?: string;
    twentyfourTurnover?: string;
    newesRmbPrice?: string;
  };
  onItemPress?: (event: Record<string, any>) => void;
}

const ListItem = memo((props: Props) => {
  const { item, onItemPress } = props;
  if (!item) {
    return null;
  }

  const onPress = () => {
    onItemPress && onItemPress(item);
  };
  const baseCurrency = item.baseCurrency || '--'; // 基础货币
  const paymentCurrency = item.paymentCurrency || '--'; // 计价货币
  const newestPrice = item.newestPrice && item.newestPrice !== '0' ? item.newestPrice : '--';
  // const newesRmbPrice = item.newesRmbPrice && item.newesRmbPrice !== '0' ? `≈ ￥${formatNumberBase(item.newesRmbPrice)}` : '--';
  const twentyfourGain = formatPositiveSymbol(item.twentyfourGain); // 涨跌幅
  const twentyfourTurnover = formatKMUnit(item.twentyfourTurnover); // 24小时交易量

  const btnStyle = StyleSheet.flatten([styles.buttonWrapper, isPriceDown(item.twentyfourGain) && styles.buttonRed]);

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={styles.leftColWrapper}>
          <View style={styles.leftRo1Wrapper}>
            <Text style={[styles.boldText]}>{baseCurrency}</Text>
            <Text style={[styles.grayText, styles.coinName]}>{` / ${paymentCurrency}`}</Text>
          </View>
          {/*` ${twentyfourTurnover}`*/}
          {/*<View style={styles.leftRo2Wrapper}>*/}
          {/*  <Text style={[styles.grayText]}>{'--'}</Text>*/}
          {/*  <Text style={styles.grayText}>{'--'}</Text>*/}
          {/*</View>*/}
        </View>
        <View style={styles.middleColWrapper}>
          <Text style={[styles.boldText]}>{newestPrice}</Text>
          {/*<Text style={[styles.grayText, styles.marginTo12]}>{newesRmbPrice}</Text>*/}
        </View>
        <View style={styles.rightColWrapper}>
          {/*<Button style={btnStyle} textStyle={styles.buttonText}>*/}
          {/*  {twentyfourGain}*/}
          {/*</Button>*/}
          <View style={[btnStyle, styles.textViewStyle]}>
            <Text style={styles.buttonText}>{twentyfourGain}</Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
});

export default ListItem;
