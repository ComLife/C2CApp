import React, { Fragment, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Imgs from '../../../../const/image-set';
import { getHideText } from '../../../../utils/wallet-utils';
import outerStyles from './styles';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  totalPrice: number;
  totalRmb: number;
  titleString: string;
  onPressShow: (index: number, isShow: boolean) => void;
  index: number;
  isShow: boolean;
}

const AssetsItem = (props: Props) => {
  const styles = outerStyles();
  const [isShow, setIsShow] = useState(props.isShow);

  const onCheckIsShow = () => {
    setIsShow(!isShow);
    if (props.onPressShow) props.onPressShow(props.index, !isShow);
  };

  const totalPrice = props.totalPrice ? props.totalPrice + '' : '0';
  const totalRmbPrice = props.totalRmb ? props.totalRmb + '' : '0';
  return (
    <View style={props.index === 0 ? styles.body : styles.body1}>
      {props.index === 0 ? (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(41,77,187)', 'rgb(69,134,224)']} style={styles.linearGradientBg} />
      ) : (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['rgb(113,104,233)', 'rgb(172,146,246)']} style={styles.linearGradientBg} />
      )}
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{props.titleString}</Text>
        <TouchableOpacity onPress={onCheckIsShow}>
          <Image style={styles.imageView} source={isShow ? Imgs.icon_hidden : Imgs.icon_hidden_2} />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText1}>{isShow ? totalPrice : getHideText(totalPrice)}</Text>
      <Text style={styles.titleText2}>{isShow ? '≈¥' + totalRmbPrice : '≈¥' + getHideText(totalRmbPrice)}</Text>
    </View>
  );
};

export default AssetsItem;
