import React, { memo } from 'react';
import { Image } from 'react-native';
import ImageSet from '../../../../const/image-set';
import styles from './styles';

const HomeLogo = memo((props: any) => {
  return <Image style={styles.container} source={ImageSet.home_logo} />;
});
export default HomeLogo;
