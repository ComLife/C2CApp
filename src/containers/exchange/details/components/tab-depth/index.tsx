import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { setRatio } from '../../../../../utils/screen-util';
import { division, formatNumberBase, multiplication, toNumber } from '../../../../../utils/digital';
import { orderBy } from 'lodash';
import NoDataHolder from '../../../../../components/no-data';
import styles from './styles';

interface Props {
  data: {
    buy: Record<string, any>[];
    sell: Record<string, any>[];
  };
  basicsMin: number;
  currencyTypes: string[];
  tabLabel?: string;
  onPress?: (event: number) => void;
}

// 盘口（深度）Tab
const TabDepth = memo((props: Props) => {
  const { data } = props;
  if (!data) {
    return <NoDataHolder style={styles.container} />;
  }

  const title1 = `数量(${props.currencyTypes[0]})`;
  const title2 = `价格(${props.currencyTypes[1]})`;
  const TRACK_BAR_TOTAL_WIDTH = 288;

  const renderLeftItem = (item: Record<string, string>, index: number) => {
    if (!item || index > 9) {
      return null;
    }
    const bgBar = {
      width: setRatio(+item.accumulativeTotal),
    };
    const entrustNum = formatNumberBase(item.entrustNum, props.basicsMin);
    const entrustPrice = formatNumberBase(item.entrustPrice, props.basicsMin);
    return (
      <View key={index}>
        <View style={[styles.dataItemWrapper]}>
          <Text style={styles.price1Text}>{entrustNum}</Text>
          <Text style={styles.count2Text1}>{entrustPrice}</Text>
        </View>
        <View style={[styles.kLineStyle, bgBar]} />
      </View>
    );
  };

  const renderLeftView = () => {
    const buyList = data.buy || [];
    let tmpBuy = 0;
    for (let i = 0; i < buyList.length; i++) {
      tmpBuy += toNumber(buyList[i].entrustNum);
    }
    for (let i = 0; i < buyList.length; i++) {
      const tmp = division(buyList[i].entrustNum, tmpBuy);
      const width = multiplication(TRACK_BAR_TOTAL_WIDTH, tmp, 0);
      buyList[i].accumulativeTotal = width <= 2 ? 2 : width; // 为了美观强行设置为 2
    }
    return <View style={styles.priceLeftRight}>{buyList.map((item, index) => renderLeftItem(item, index))}</View>;
  };

  const renderRightItem = (item: Record<string, string>, index: number) => {
    if (!item || index > 49) {
      return null;
    }
    const bgBar = { width: setRatio(+item.accumulativeTotal) };
    const entrustPrice = formatNumberBase(item.entrustPrice, props.basicsMin);
    const entrustNum = formatNumberBase(item.entrustNum, props.basicsMin);
    return (
      <View key={index}>
        <View style={[styles.dataItemWrapper]}>
          <Text style={styles.count2Text}>{entrustPrice}</Text>
          <Text style={styles.price2Text}>{entrustNum}</Text>
        </View>
        <View style={[styles.kLineStyle1, bgBar]} />
      </View>
    );
  };

  const renderRightView = () => {
    const tmpSellList = data.sell || [];
    let sellList = [];
    let tmpSell = 0;
    if (tmpSellList.length > 10) {
      sellList = tmpSellList.slice(tmpSellList.length - 10, tmpSellList.length);
    } else {
      sellList = tmpSellList.slice(0);
    }
    // console.log('sellList', orderBy(sellList, ['entrustPrice'], ['asc']));
    sellList = orderBy(sellList, ['entrustPrice'], ['asc']);
    //
    // sellList.push(tmp);

    for (let i = 0; i < sellList.length; i++) {
      tmpSell += toNumber(sellList[i].entrustNum);
    }
    for (let i = 0; i < sellList.length; i++) {
      const tmp = division(sellList[i].entrustNum, tmpSell);
      const width = multiplication(TRACK_BAR_TOTAL_WIDTH, tmp, 0);
      sellList[i].accumulativeTotal = width <= 2 ? 2 : width; // 为了美观设置为 2
    }
    return <View style={styles.priceLeftRight}>{sellList.map((item, index) => renderRightItem(item, index))}</View>;
  };

  const renderTitle = () => (
    <View style={styles.titleWrapper}>
      <Text style={styles.titleText}>{title1}</Text>
      <Text style={styles.titleText}>{title2}</Text>
      <Text style={styles.titleText}>{title1}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderTitle()}
      <View style={styles.priceWrapper}>
        {renderLeftView()}
        {renderRightView()}
      </View>
    </View>
  );
});

export default TabDepth;
