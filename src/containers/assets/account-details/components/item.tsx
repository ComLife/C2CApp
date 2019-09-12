import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
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
  rightViewText?: any; //文字
  bottomText?: any; //下方文字
  btnTextColor?: string; //按钮字的颜色
  type?: boolean; //判断是否显示最下面一条
}
const Item = memo((props: Props) => {
  const styles = outerStyles();
  const {
    bgColor,
    bgHeight,
    bgRadiusSize,
    horizontal,
    leftTopText,
    leftBottomText,
    rightTopText,
    leftMidText,
    rightBottomText,
    rightViewColor,
    rightViewText,
    bottomText,
    type,
  } = props;
  const bgStyle = [
    styles.bg,
    {
      backgroundColor: bgColor,
      height: bgHeight || setRatio(140),
      borderRadius: bgRadiusSize,
      // paddingHorizontal: horizontal || setRatio(24),
    },
  ];
  const rightColor = [
    styles.bottomItemText,
    {
      color: rightViewColor || Colors.colorA2,
    },
  ];
  const btnText = [styles.bottomHeaderText2, { color: rightViewColor || Colors.colorA2 }];
  const midText = [styles.buttonsText, { color: Colors.colorB1 }];

  const isOpen = () => {
    if (type) {
      return <Text style={styles.bottomHeaderText2}>{rightBottomText || '价格：2342.23'}</Text>;
    }
    return;
  };

  return (
    <View style={bgStyle}>
      <View style={styles.leftView}>
        <Text style={styles.bottomItemText}>{leftTopText || '2019-05-14'}</Text>
        <View style={styles.bottomItemText1}>
          <Text style={styles.bottomItemText}>{leftBottomText || '20:00:21'}</Text>
        </View>
      </View>
      <View style={styles.midView}>
        <Text style={midText}>{rightTopText || 'ETH/EUSD'}</Text>
        <Text style={rightColor}>{leftMidText || '价格：2342.23'}</Text>
      </View>
      <View style={styles.bottomView}>
        <Text style={btnText}>{rightViewText || 'ETH/EUSD'}</Text>
        <Text style={styles.bottomHeaderText2}>{bottomText || '价格：2342.23'}</Text>
        {isOpen()}
      </View>
    </View>
  );
});

export default Item;
