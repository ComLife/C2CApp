import React, { Fragment, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { DivisorLine, SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import Imgs from '../../../../const/image-set';
import UIColor from '../../../../const/colors';
import { addition } from '../../../../utils/digital';
import { getHideText } from '../../../../utils/wallet-utils';

interface Props {
  walletType: string;
  balance: number;
  freezeAmount: number;
  isShow: boolean;
}

const AssetsTableItem = (props: Props) => {
  const styles = outerStyles();

  const onAboutPress = () => {};

  const onAuthenticationPress = () => {};

  const onGestrue = () => {};

  const onCheckIsShow = () => {};

  const value = addition(props.balance, props.freezeAmount);
  return (
    <View style={styles.body}>
      <Text style={styles.titleText}>{props.walletType}</Text>
      <View style={styles.titleView}>
        <View style={styles.titleChildView}>
          <Text style={styles.titleText1}>可用</Text>
        </View>
        <View style={styles.titleChildView1}>
          <Text style={styles.titleText1}>冻结</Text>
        </View>
        <View style={styles.titleChildView2}>
          <Text style={styles.titleText1}>总计</Text>
        </View>
      </View>
      <View style={styles.titleView1}>
        <View style={styles.titleChildView}>
          <Text numberOfLines={1} style={styles.titleText2}>
            {props.isShow ? props.balance : getHideText('')}
          </Text>
        </View>
        <View style={styles.titleChildView1}>
          <Text numberOfLines={1} style={styles.titleText2}>
            {props.isShow ? props.freezeAmount : getHideText('')}
          </Text>
        </View>
        <View style={styles.titleChildView2}>
          <Text numberOfLines={1} style={styles.titleText2}>
            {props.isShow ? value : getHideText('')}
          </Text>
        </View>
      </View>
      <View style={styles.lineView} />
      {/*<DivisorLine height={2} backgroundColor={UIColor.colorB4} />*/}
      {/*<View style={} />*/}
    </View>
  );
};

export default AssetsTableItem;
