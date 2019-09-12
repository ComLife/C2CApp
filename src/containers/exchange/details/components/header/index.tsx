import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
import { screenWidth, setRatio, statusBarHeight } from '../../../../../utils/screen-util';
import Imgs from '../../../../../const/image-set';
import UIColor from '../../../../../const/colors';

interface Props {
  leftComponent?: any; // header左边控件
  rightComponent?: any; // header右方控件
  titleComponent?: any; // 标题控件
  onPressLeft?: () => void; // 左边点击事件
  onPressRight?: () => void; // 右边点击事件
  leftTitle?: string; // 左边文本信息
  rightTitle?: string; // 右边文本信息
  title?: string; // 中间文本信息
  backgroundColor?: string; // 背景颜色
  rightTextStyle?: any; // 右边文字文本颜色
  navigation?: any;
  borderBottomWidth?: number; // 顶部导航底部宽度
  leftImage?: number; // 顶部左边返回按钮图片
  titleColor?: string; // 字体颜色
}

const Header = ({
  rightTextStyle,
  borderBottomWidth,
  titleColor,
  rightComponent,
  leftComponent,
  titleComponent,
  rightTitle,
  backgroundColor,
  onPressRight,
  title,
  navigation,
  leftImage,
  onPressLeft,
  leftTitle,
}: Props) => {
  const styles = outerStyles();
  /**
   * 渲染规则
   * 1. leftComponent，rightComponent，titleComponent高于本身的优先级
   */
  return (
    <View style={[styles.header, { backgroundColor: backgroundColor || UIColor.whiteColor, height: setRatio(70) }]}>
      <View style={[styles.header]}>
        <View style={styles.leftOut}>
          {leftComponent ||
            (leftTitle !== undefined ? (
              <TouchableOpacity style={styles.touchOpa} activeOpacity={0.5} onPress={() => (onPressLeft ? onPressLeft() : navigation.goBack())}>
                <View style={styles.touchOpaView}>
                  <Image source={leftImage || Imgs.back} style={styles.leftImage} />
                  <Text style={styles.leftText}>{leftTitle}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.touchOpa} />
            ))}
        </View>
        <View style={styles.center}>
          {titleComponent || <Text style={[styles.headerTitle, { color: titleColor || UIColor.importantTextColor }]}>{title}</Text>}
        </View>
        <View style={styles.rightOut}>
          {rightComponent ||
            (rightTitle ? (
              <TouchableOpacity style={styles.rightTouchOpa} activeOpacity={0.5} onPress={onPressRight}>
                <Text style={[styles.rightText, rightTextStyle]}>{rightTitle}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.leftOut} />
            ))}
        </View>
      </View>
    </View>
  );
};

export default Header;
