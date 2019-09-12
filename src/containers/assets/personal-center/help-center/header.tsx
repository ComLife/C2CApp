import React, { memo } from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from '../styles';
import Imgs from '../../../../const/image-set';

interface Props {
  onBack?: any; //背景色
  title?: string; //文字
}

const Header = memo((props: Props) => {
  const styles = outerStyles();

  const { onBack, title } = props;

  return (
    <View style={styles.headerBg1}>
      <TouchableOpacity onPress={onBack} style={styles.headerTouch}>
        <View style={styles.headerViewTouch}>
          <Image style={styles.headerBack} source={Imgs.back} />
        </View>
      </TouchableOpacity>
      <View style={styles.headerMid}>
        <Text style={styles.headerText1}>{title || '安全中心'}</Text>
      </View>
      <View style={styles.headerEndView} />
    </View>
  );
});

export default Header;
