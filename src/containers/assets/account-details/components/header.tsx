import React from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';

interface Props {
  onBack?: any; //背景色
  title?: string; //文字
  onClick?: any; //K线回调
}

export default function Header(props: Props) {
  const styles = outerStyles();

  const { onBack, title, onClick } = props;

  return (
    <View style={styles.headerBg}>
      <TouchableOpacity onPress={onBack} style={styles.touch}>
        <Image source={Imgs.back} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View />
    </View>
  );
}
