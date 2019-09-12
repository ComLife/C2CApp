import React, { memo, useEffect, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import Dropdown from '../../../../../components/dropdown';
import styles from './styles';
import Imgs from '../../../../../const/image-set';
import { DEVICE_HEIGHT, DEVICE_WIDTH, moreHeight, setRatio } from '../../../../../utils/screen-util';
import { toNumber } from '../../../../../utils/digital';

interface Props {
  onDepth: any; //回调
  onChange: any; //切换场景回调
  isDropdown: boolean; //是否打开面板
  depthNum: string; //当前精度的值
  precisionTextData: any; //重设后的值
  onColse: any; //关闭
  btnImage: any; //图片
  onBack: any;
  eventY: string;
}

const RightBottom = memo((props: Props) => {
  const { onDepth, onChange, isDropdown, depthNum, precisionTextData, onColse, btnImage, onBack, eventY } = props;

  const [tmpEventY, setTmpEventY] = useState('0');
  const left = DEVICE_WIDTH - setRatio(232);

  const top = moreHeight + setRatio(230) + setRatio(396) + setRatio(80);

  const isTop = () => {
    if (toNumber(tmpEventY) < 0) {
      setTmpEventY('0');
      return;
    }
    if (DEVICE_HEIGHT - top + toNumber(tmpEventY) <= setRatio(70) * 6) {
      if (Platform.OS === 'ios') {
        return moreHeight + setRatio(230) + setRatio(396) - setRatio(70) * 6 - toNumber(tmpEventY);
      } else {
        if (DEVICE_HEIGHT > 850) {
          return moreHeight + setRatio(230) + setRatio(396) - setRatio(70) * 6 - setRatio(15) - toNumber(tmpEventY);
        } else if (DEVICE_HEIGHT > 700) {
          return moreHeight + setRatio(230) + setRatio(396) - setRatio(70) * 6 + setRatio(50) - toNumber(tmpEventY);
        } else {
          return moreHeight + setRatio(230) + setRatio(396) - setRatio(70) * 6 - setRatio(45) - toNumber(tmpEventY);
        }
      }
    } else {
      if (Platform.OS === 'ios') {
        return top - toNumber(tmpEventY);
      } else {
        if (DEVICE_HEIGHT > 850) {
          return top - setRatio(30) - toNumber(tmpEventY);
        } else if (DEVICE_HEIGHT > 660) {
          return top - setRatio(60) - toNumber(tmpEventY);
        } else {
          return top - setRatio(50) - toNumber(tmpEventY);
        }
      }
    }
  };

  useEffect(() => {
    setTmpEventY(eventY);
  }, [eventY]);

  const openDropdown = () => {
    if (isDropdown) {
      return <Dropdown data={precisionTextData} onColse={onColse} leftValue={left} topValue={isTop()} onBack={onBack} />;
    }
  };

  return (
    <View style={styles.rightBottomBg}>
      <TouchableOpacity style={styles.rightBottomLeftTouch} onPress={onDepth}>
        <Text style={styles.rightHeaderText}>{depthNum}</Text>
        <Image source={Imgs.icon_dropdown_2} />
      </TouchableOpacity>
      {openDropdown()}
      <TouchableOpacity style={styles.rightBottomRightTouch} onPress={onChange}>
        <Image source={btnImage} />
      </TouchableOpacity>
    </View>
  );
});

export default RightBottom;
