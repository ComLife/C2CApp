import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Colors from '../../../../const/colors';
import { setRatio } from '../../../../utils/screen-util';

interface Props {
  bgColor?: string; //背景色
  bgHeight?: number; //背景高度，默认100
  bgRadiusSize?: number; //是否圆角
  horizontal?: number; //左右边距，不传为全长
  divColor?: string; //左边线颜色
  leftImage?: boolean; //是否有图片（还有点问题,待实图出来在做）
  leftTopText?: string; //文字
  leftMidText?: string; //文字
  leftBottomText?: string; //文字
  rightTopText?: string; //文字
  rightBottomText?: string; //文字
  rightViewColor?: string; //右方的面板底色
  rightViewText?: string; //文字
  btnTextColor?: string; //按钮字的颜色
  closeOrder?: any; //回调
  index: number; //下标
}
const BottomHeader = memo((props: Props) => {
  const {
    bgColor,
    bgHeight,
    bgRadiusSize,
    horizontal,
    divColor,
    leftTopText,
    leftBottomText,
    rightTopText,
    leftMidText,
    rightBottomText,
    rightViewColor,
    rightViewText,
    btnTextColor,
    closeOrder,
    index,
  } = props;
  const bgStyle = [
    styles.bg,
    {
      backgroundColor: bgColor,
      height: bgHeight || setRatio(125),
      borderRadius: bgRadiusSize,
      paddingHorizontal: horizontal || setRatio(24),
    },
  ];
  const rightColor = [
    styles.rightView,
    {
      backgroundColor: rightViewColor || Colors.colorA1,
    },
  ];
  const btnText = [styles.buttonsText, { color: btnTextColor || Colors.whiteColor }];
  const div = [styles.leftImageView, { backgroundColor: divColor || Colors.colorA2 }];

  return (
    <View style={bgStyle}>
      <View style={div} />
      <View style={styles.leftView}>
        <Text style={styles.bottomItemText}>{leftTopText || '2019-05-14'}</Text>

        <View style={styles.bottomItemText1}>
          <Text style={styles.bottomItemText}>{leftBottomText || '20:00:21'}</Text>
        </View>
      </View>
      <View style={styles.midView}>
        <Text style={styles.bottomHeaderTitle}>{rightTopText || 'ETH/EUSD'}</Text>
        <Text style={styles.bottomHeaderText2}>{leftMidText || '价格：2342.23'}</Text>
        <Text style={styles.bottomHeaderText2}>{rightBottomText || '数量：0.00/10000'}</Text>
      </View>
      <TouchableOpacity style={rightColor} onPress={() => closeOrder(index)}>
        <Text style={btnText}>{rightViewText || '撤单'}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default BottomHeader;
