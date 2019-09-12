import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Imgs from '../../../../const/image-set';

interface Props {
  title?: string; //回调
  Text1?: string; //文字
  onClick?: any; //回调
  Text2?: string; //文字
  userInfo: any;
}

const BottomHeader = memo((props: Props) => {
  const { title, onClick, Text2, userInfo } = props;

  const isOpen = () => {
    if (userInfo.data) {
      return (
        <TouchableOpacity style={styles.bottomHeaderTouch} onPress={onClick}>
          <Image source={Imgs.icon_information} style={styles.bottomHeaderImage} />
          <Text style={styles.bottomHeaderText2}>{Text2 || '交易记录'}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.bottomHeaderBg}>
      <Text style={styles.bottomHeaderTitle}>{title || '当前委托'}</Text>
      <View style={styles.bottomHeaderView}>
        {/*<TouchableOpacity style={styles.bottomHeaderTouch} onPress={onAll}>*/}
        {/*<Text style={styles.bottomHeaderText1}>{Text1 || '全部撤销'}</Text>*/}
        {/*</TouchableOpacity>*/}
        {isOpen()}
      </View>
    </View>
  );
});

export default BottomHeader;
