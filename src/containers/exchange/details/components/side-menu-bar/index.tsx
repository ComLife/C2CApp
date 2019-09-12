import React, { memo, useEffect } from 'react';
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from 'react-native';
import ImageSet from '../../../../../const/image-set';
import styles from './styles';

interface Props {
  data?: Record<string, any>;
  onBack?: (event: GestureResponderEvent) => void;
  mainArg: string;
  subArg: string;
  onMainArgPress?: (event: string) => void;
  onSubArgPress?: (event: string) => void;
}

const closeHitSlop = { top: 4, right: 4, bottom: 4, left: 4 };

const mainArgs = ['MA', 'BOLL'];
const subArgs = ['MACD', 'KDJ', 'RSI', 'TRIX'];

const SideMenuBar = memo((props: Props) => {
  const { data = {}, onBack, mainArg, subArg } = props;

  const onMainArgPress = (value: string) => () => {
    props.onMainArgPress && props.onMainArgPress(value);
  };

  const onSubArgPress = (value: string) => () => {
    props.onSubArgPress && props.onSubArgPress(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtnWrap} hitSlop={closeHitSlop} onPress={onBack}>
        <Image source={ImageSet.icon_close} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.textBtnWrap}>
        <Text style={styles.titleText}>主图</Text>
      </TouchableOpacity>
      {mainArgs.map((item: string, index: number) => {
        return (
          <TouchableOpacity key={index} style={styles.textBtnWrap} onPress={onMainArgPress(item)}>
            <Text style={[styles.unselectedText, mainArg === item && styles.selectedText]}>{item}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity activeOpacity={1} style={styles.textBtnWrap}>
        <Text style={styles.titleText}>副图</Text>
      </TouchableOpacity>
      {subArgs.map((item: string, index: number) => {
        return (
          <TouchableOpacity key={index} style={styles.textBtnWrap} onPress={onSubArgPress(item)}>
            <Text style={[styles.unselectedText, subArg === item && styles.selectedText]}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default SideMenuBar;
