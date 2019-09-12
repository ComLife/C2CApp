import React, { memo } from 'react';
import { GestureResponderEvent, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  title?: string;
  icon: ImageSourcePropType;
  onPress?: (event: GestureResponderEvent) => void;
  imageStyle?: any;
}

const HeaderBar = memo((props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} activeOpacity={0.7} style={styles.rightIcon} onPress={props.onPress}>
        <Image source={props.icon} style={props.imageStyle} />
      </TouchableOpacity>
    </View>
  );
});

export default HeaderBar;
