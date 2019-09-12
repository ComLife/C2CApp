import React from 'react';
import { Text, View } from 'react-native';
import { formatNumberBase, formatPositiveSymbol } from '../../../../../utils/digital';
import styles from './styles';

interface Props {
  data?: Record<string, any>;
}

export default function SummaryBar(props: Props) {
  const { data = {} } = props;
  const data1 = data.newestPrice && data.newestPrice !== '0' ? data.newestPrice : '--';
  const data2 = data.newesRmbPrice && data.newesRmbPrice !== '0' ? formatNumberBase(data.newesRmbPrice) : '--';
  const data3 = formatPositiveSymbol(data.twentyfourGain);
  const isGreen = data.twentyfourGain > 0;
  // right
  const data4 = data.twentyfourLowestPrice || '--';
  const data5 = data.twentyfourHighestPrice || '--';
  const data6 = data.twentyfourTurnover || '--';
  const data7 = data.paymentCurrency || '--';
  const data8 = data.baseCurrency || '--';
  return (
    <View>
      <View style={styles.backGroundView} />
      <View style={styles.container}>
        <View style={styles.leftWrapper}>
          <Text style={isGreen ? styles.latestText1 : styles.latestText}>{data1}</Text>
          <View style={styles.leftRow2Wrapper}>
            <Text style={styles.leftRow2LeftText}>{`≈ ￥${data2}`}</Text>
            <Text style={isGreen ? styles.leftRow2RightText1 : styles.leftRow2RightText}>{data3}</Text>
          </View>
        </View>
        <View style={styles.rightWrapper}>
          <Text style={styles.rightText}>{`低(24h) ${data4} ${data7}`}</Text>
          <Text style={styles.rightText}>{`高(24h) ${data5} ${data7}`}</Text>
          <Text style={styles.rightText}>{`量(24h) ${data6} ${data8}`}</Text>
        </View>
      </View>
    </View>
  );
}
