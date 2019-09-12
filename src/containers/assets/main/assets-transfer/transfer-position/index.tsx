import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DivisorLine, SafeAreaView } from 'space-ui';
import { useNavigation } from '../../../../../routes/navigation-service';
import outerStyles from './styles';
import { screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
import UIColor from '../../../../../const/colors';
// @ts-ignore
import { AUTH_LEVEL, ERROR_CODE } from '../../../../const/enum-set';
import Imgs from '../../../../../const/image-set';
interface Props {
  onChange: () => void;
  title1: string;
  title2: string;
}

const AssetsTransfer = (props: Props) => {
  const styles = outerStyles();
  const onPressChoose = () => {
    props.onChange();
  };

  return (
    <View style={styles.body}>
      <View style={styles.leftView}>
        <Image style={styles.imageView} source={Imgs.img_transfer} />
      </View>
      <View style={styles.midView}>
        <View style={styles.midTopView}>
          <Text style={styles.titleView}>从</Text>
          <Text style={styles.titleView1}>{props.title1}</Text>
        </View>
        <DivisorLine height={setRatio(2)} backgroundColor={UIColor.colorB4} />
        <View style={styles.midBottomView}>
          <Text style={styles.titleView}>到</Text>
          <Text style={styles.titleView1}>{props.title2}</Text>
        </View>
      </View>
      <View style={styles.endView}>
        <TouchableOpacity onPress={onPressChoose}>
          <Image style={styles.imageView1} source={Imgs.icon_conversion} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AssetsTransfer;
