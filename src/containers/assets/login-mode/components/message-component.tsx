import React, { Fragment, PureComponent } from 'react';
import { Image, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from '../styles';
import Imgs from '../../../../const/image-set';

interface Props {
  midImage?: any; // 中间的图片
  messageText?: string; // 文本信息
  messageColor?: string; // 左边文本颜色
  isTouchOpen?: boolean; // 是否显示左边文字
  touchFunc?: any; // 点击后回调
  touchText?: string; // 显示的文字
}
export default function MessageComponent(props: Props) {
  const styles = outerStyles();
  const { midImage, messageText, messageColor, isTouchOpen, touchFunc, touchText } = props;
  const showMessageText = () => {
    if (messageText) {
      return (
        <View style={styles.messageBgView1}>
          <Text style={[styles.messageText, { color: messageColor }]}>{messageText}</Text>
        </View>
      );
    } else {
      return (
        <Fragment>
          <View style={styles.messageBgView1} />
          <View style={styles.messageView} />
        </Fragment>
      );
    }
  };

  const showTouchId = () => {
    if (isTouchOpen) {
      return (
        <View style={styles.messageView1}>
          <TouchableOpacity style={styles.messageTouch} activeOpacity={0.6} onPress={touchFunc}>
            <Image source={Imgs.fingerprint_landing_img02} style={styles.messageImage} />
          </TouchableOpacity>
          <Text style={styles.messageText1}>{touchText || '点击唤起指纹验证'}</Text>
        </View>
      );
    }
    return;
  };

  return (
    <View>
      <View style={styles.messageBgView} />
      <View style={styles.messageBgView1}>
        <Image source={midImage || Imgs.app_logo} style={styles.logoImage} />
      </View>
      {showMessageText()}
      {touchText === '点击唤起指纹验证' ? showTouchId() : null}
    </View>
  );
}
