import React, { memo } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import ImageSet from '../../../../const/image-set';
import styles from './styles';

interface Props {
  source?: ImageSourcePropType;
}

const SloganBar = memo(({ source }: Props) => {
  const imageSource = source || ImageSet.slogan_1;
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={imageSource} resizeMode="stretch" />
    </View>
  );
});

export default SloganBar;
