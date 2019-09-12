import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
import Imgs from '../../../const/image-set';

interface Props {
  titleText: string; //背景色
  onClick: any;
}

const PesrsonalItem = memo((props: Props) => {
  const styles = outerStyles();

  const { titleText, onClick } = props;

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.itemBg}>
        <Text style={styles.itemText}>{titleText || '安全中心'}</Text>
        <View style={styles.itemView}>
          <Image style={styles.itemImage} source={Imgs.back} />
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default PesrsonalItem;
