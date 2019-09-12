import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { formatHHmmss } from '../../../../../utils/date-time';
import NoDataHolder from '../../../../../components/no-data';
import styles from './styles';
import { formatNumberBase } from '../../../../../utils/digital';
import Colors from '../../../../../const/colors';

interface Props {
  data?: Record<string, string | number>[];
  currencyTypes: string[];
  basicsMin: number;
  onPress?: (event: number) => void;
  tabLabel?: string;
}

// 成交记录 Tab
const TabRecord = memo((props: Props) => {
  const { data } = props;
  if (!data || !data.length) {
    return <NoDataHolder style={styles.container} textColor={Colors.whiteColor} />;
  }

  const title1 = `时间`;
  const title2 = `价格(${props.currencyTypes[1]})`;
  const title3 = `数量(${props.currencyTypes[0]})`;

  const renderItem = (item: Record<string, string | number>, index: number) => {
    if (!item) {
      return null;
    }
    const priceStyle = item.triggerPart === 1 ? styles.redText : styles.greenText;
    const time = item.time ? formatHHmmss(item.time) : '--';
    const amount = formatNumberBase(item.amount, props.basicsMin);
    return (
      <View key={index} style={styles.dataItemWrapper}>
        <Text style={[styles.itemText]}>{time}</Text>
        <Text style={[styles.itemText, priceStyle]}>{item.price}</Text>
        <Text style={[styles.itemText, styles.rightText]}>{amount}</Text>
      </View>
    );
  };

  const renderTitle = () => (
    <View style={styles.titleWrapper}>
      <Text style={styles.titleText}>{title1}</Text>
      <Text style={[styles.titleText, styles.centerText]}>{title2}</Text>
      <Text style={[styles.titleText, styles.rightText]}>{title3}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderTitle()}
      {data.map((item, index) => renderItem(item, index))}
    </View>
  );
});

export default TabRecord;
