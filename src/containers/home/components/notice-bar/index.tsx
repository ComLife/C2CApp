import React, { memo } from 'react';
import { Image, Text, View } from 'react-native';
import ImageSet from '../../../../const/image-set';
import styles from './styles';

interface Props {
  text: string;
}

const NoticeBar = memo(({ text }: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={ImageSet.icon_radio} resizeMode="contain" />
      <Text style={styles.text} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
});

export default NoticeBar;
