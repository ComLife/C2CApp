import React, { memo, useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Dropdown from '../../../../../components/dropdown';
import Imgs from '../../../../../const/image-set';
import { DEVICE_HEIGHT, DEVICE_WIDTH, moreHeight, setRatio } from '../../../../../utils/screen-util';
import { toNumber } from '../../../../../utils/digital';

interface Props {
  isOpenPricePanel: any;
  initPriceText: string;
  priceData: any;
  onPrice: any;
  onColse: any;
  onBack: any;
  eventY: string;
}

const LeftHeader = memo((props: Props) => {
  const { isOpenPricePanel, initPriceText, priceData, onPrice, onColse, onBack, eventY } = props;
  const [tmpEventY, setTmpEventY] = useState('0');
  const top = moreHeight + setRatio(225);

  const isTop = () => {
    if (toNumber(tmpEventY) < 0) {
      setTmpEventY('0');
      return;
    }
    if (Platform.OS === 'ios') {
      return top - toNumber(tmpEventY);
    } else {
      if (DEVICE_HEIGHT > 850) {
        return top - setRatio(25) - toNumber(tmpEventY);
      } else if (DEVICE_HEIGHT > 660) {
        return top - setRatio(60) - toNumber(tmpEventY);
      } else {
        return top - setRatio(50) - toNumber(tmpEventY);
      }
    }
  };

  const openDropdown = () => {
    if (isOpenPricePanel) {
      return <Dropdown data={priceData} onColse={onColse} leftValue={setRatio(24)} topValue={isTop()} onBack={onBack} />;
    }
  };
  useEffect(() => {
    setTmpEventY(eventY);
  }, [eventY]);
  return (
    <View style={styles.leftHeaderBg}>
      <TouchableOpacity onPress={onPrice} style={styles.leftHeaderTouch}>
        <Text style={styles.leftHeaderText}>{initPriceText + '  '}</Text>
        <Image source={Imgs.icon_dropdown_2} />
      </TouchableOpacity>
      {openDropdown()}
    </View>
  );
});

export default LeftHeader;
