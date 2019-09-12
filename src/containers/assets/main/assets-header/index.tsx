import React, { Fragment, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';
import { getHideText } from '../../../../utils/wallet-utils';
interface Props {
  totalPrice: string | number;
  totalRMBPrice: string | number;
  onPress: () => void;
  isShow: boolean;
}

const AssetsHeader = (props: Props) => {
  const styles = outerStyles();

  const onAboutPress = () => {};

  const onAuthenticationPress = () => {};

  const onGestrue = () => {};

  const onCheckIsShow = () => {};

  return (
    <View style={styles.body}>
      <View style={styles.bodyView}>
        <View style={styles.bodyView1}>
          <Text style={styles.titleText}>总资产</Text>
          <Text style={styles.titleText1}>{props.isShow ? props.totalPrice : getHideText('')}</Text>
          <Text style={styles.titleText2}>USDT</Text>
          <Text style={styles.titleText3}>≈¥{props.isShow ? props.totalRMBPrice : getHideText('')}</Text>
        </View>
        <View style={styles.endView}>
          <TouchableOpacity style={styles.buttonView} onPress={props.onPress}>
            <View style={styles.buttonChildView}>
              <Image style={styles.imageView} source={Imgs.icon_set} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AssetsHeader;
