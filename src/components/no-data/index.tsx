import React, { memo } from 'react';
import { Image, StyleProp, Text, View, ViewStyle } from 'react-native';
import ImageSet from '../../const/image-set';
import styles from './styles';

interface Props {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
}

const NoDataHolder = memo((props: Props) => {
  const { style, text = '暂无数据' } = props;
  const mergedStyle = [styles.container, style];
  const textStyle = [styles.text, { color: props.textColor }];
  return (
    <View style={mergedStyle}>
      <Image source={ImageSet.img_miss} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
});

export default NoDataHolder;
