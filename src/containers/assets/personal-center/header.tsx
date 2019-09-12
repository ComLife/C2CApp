import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
import Imgs from '../../../const/image-set';

interface Props {
  onBack?: any; //背景色
  image?: any; //图片
  title?: string; //文字
}

const Header = memo((props: Props) => {
  const styles = outerStyles();

  const { onBack, image, title } = props;

  return (
    <View style={styles.headerBg}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={onBack} style={styles.headerTouch}>
          <View style={styles.headerViewTouch}>
            <Image style={styles.headerBack} source={Imgs.back} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.headerView1}>
        <Text style={styles.headerText}>{title || '未登录'}</Text>
        <View style={styles.headerLogoView}>
          <Image style={styles.headerLogo} source={image || Imgs.app_logo} />
        </View>
      </View>
    </View>
  );
});

export default Header;
