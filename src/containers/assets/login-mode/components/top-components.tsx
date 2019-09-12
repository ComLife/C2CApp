import React, { Fragment, PureComponent } from 'react';
import { Image, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from '../styles';
import Imgs from '../../../../const/image-set';
interface Props {
  onPressLeft?: any; // 左边点击事件
  leftTitle?: string; // 左边文本信息
  leftTitleColor?: string; // 左边文本颜色
  isShowLeftTitle?: boolean; // 是否显示左边文字
}

export default function TopComponents(props: Props) {
  const styles = outerStyles();

  const { onPressLeft, leftTitle, isShowLeftTitle } = props;

  const isOpenLeftText = () => {
    if (isShowLeftTitle) {
      return <Text style={styles.leftText}>{leftTitle || '   账号密码登录'}</Text>;
    }
    return;
  };

  return (
    <View style={styles.bgView}>
      <TouchableOpacity style={styles.touchble} activeOpacity={0.6} onPress={onPressLeft}>
        <Image source={Imgs.back} style={styles.titleImage} />
        {isOpenLeftText()}
      </TouchableOpacity>
    </View>
  );
}
