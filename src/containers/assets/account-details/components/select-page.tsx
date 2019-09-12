import React, { memo, useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View, ViewComponent } from 'react-native';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';
import Dropdown from '../../../../components/dropdown';
import { DEVICE_HEIGHT, DEVICE_WIDTH, moreHeight, setRatio, setText } from '../../../../utils/screen-util';

interface Props {
  onColse: any; //退出
  // showData: any; //数据
  onBack: any; //点击回调
  initDate: string; //初始的天数
  initCoin: string; //初始的币种
  initType: string; //初始的类型
  openPanel: any; //是否打开面板
  isOpenPanel: boolean; //是否打开面板
  allType: any; //数据
  allCoin: any; //数据
  recentDate: any; //数据
}

const SelectPage = memo((props: Props) => {
  const styles = outerStyles();

  const { allType, allCoin, recentDate, onColse, onBack, initDate, initCoin, initType, openPanel, isOpenPanel } = props;

  const [type, setType] = useState(0);
  // const btn1 = [styles.buttonsBtn, { backgroundColor: btnBg1 || Colors.colorA2 }];
  // const bgBtnText1 = [styles.buttonsText, { color: btnTextBg1 || Colors.whiteColor }];
  // const btn2 = [styles.buttonsBtn, { backgroundColor: btnBg2 || Colors.colorA3, marginLeft: setRatio(42) }];
  // const bgBtnText2 = [styles.buttonsText, { color: btnTextBg2 || Colors.whiteColor }];
  //
  // const rightTextColor1 = [styles.buttonsRightText1, { color: rightColor1 || Colors.colorA2 }];
  // const rightTextColor2 = [styles.buttonsRightText2, { color: rightColor2 || Colors.colorB2 }];

  const openDropdown = () => {
    let tmp = [{}];
    let left = setRatio(23);
    const top = moreHeight + setRatio(164);
    const isTop = () => {
      if (Platform.OS === 'ios') {
        return top;
      } else {
        return top - setRatio(50);
      }
    };
    if (type === 1) {
      tmp = recentDate;
      left = setRatio(24);
    } else if (type === 2) {
      tmp = allCoin;
      left = ((DEVICE_WIDTH - setRatio(48)) / 3) * 2 - setRatio(150);
    } else if (type === 3) {
      tmp = allType;
      left = DEVICE_WIDTH - setRatio(24) - setRatio(150);
    }
    if (isOpenPanel) {
      return <Dropdown data={tmp} onColse={onColse} leftValue={left} topValue={isTop()} onBack={onBack} />;
    }
  };

  return (
    <View>
      <View style={styles.selectView}>
        <TouchableOpacity
          style={styles.selectBtnView}
          onPress={() => {
            openPanel(1);
            setType(1);
          }}>
          <Text style={styles.selectText}>{initDate}</Text>
          <Image style={styles.selectImage} source={Imgs.icon_next} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectBtnView1}
          onPress={() => {
            openPanel(2);
            setType(2);
          }}>
          <Text style={styles.selectText}>{initCoin}</Text>
          <Image style={styles.selectImage} source={Imgs.icon_next} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.selectBtnView2}
          onPress={() => {
            openPanel(3);
            setType(3);
          }}>
          <Text style={styles.selectText}>{initType}</Text>
          <Image style={styles.selectImage} source={Imgs.icon_next} />
        </TouchableOpacity>
      </View>
      <View style={styles.div} />
      {openDropdown()}
    </View>
  );
});

export default SelectPage;
