import React, { Fragment, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DivisorLine, SafeAreaView } from 'space-ui';
import { useNavigation } from '../../../../../routes/navigation-service';
import outerStyles from './styles';
import UIColor from '../../../../../const/colors';
interface Props {
  onPressClose: () => void;
  onChooseItem: (item: any, index: number) => void;
  data: any;
}
const AssetsPopup = (props: Props) => {
  const styles = outerStyles();
  const { navigate, getScreenProps, isFirstRouteInParent, isFocused, state } = useNavigation();

  const showBtns = () => {
    // @ts-ignore
    return props.data.map((item, index) => (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => props.onChooseItem(item, index)}>
        <View style={styles.chooseView1} key={index}>
          <Text style={styles.chooseText}>{item.coin}</Text>
          {/*{index !== props.data.length - 1 ? <DivisorLine height={2} backgroundColor={UIColor.colorB4} /> : null}*/}
        </View>
        <View style={styles.chooseView3}></View>
      </TouchableOpacity>
    ));
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.blackView} onPress={props.onPressClose}>
      <View style={styles.bottomView} />
      <View style={styles.chooseView}>{showBtns()}</View>
    </TouchableOpacity>
  );
};
export default AssetsPopup;
