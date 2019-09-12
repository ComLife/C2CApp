import React, { Fragment, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DivisorLine, TextInput } from 'space-ui';
import { useNavigation } from '../../../../../routes/navigation-service';
import outerStyles from './styles';
import UIColor from '../../../../../const/colors';
import { setRatio } from '../../../../../utils/screen-util';
// @ts-ignore
import { AUTH_LEVEL, ERROR_CODE } from '../../../../const/enum-set';
import Imgs from '../../../../../const/image-set';
interface Props {
  inPutString: string;
  onPressInput: (string: string) => void;
  onPressChoose: () => void;
  currency: any;
  onPressAll: () => void;
  currencyCoin: number;
}
const AssetsInput = (props: Props) => {
  const styles = outerStyles();
  console.log('AssetsInput', props.currency);
  const onPressinput = (string: string) => {
    if (props.onPressInput) {
      props.onPressInput(string);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.baseView}>
        <Text style={styles.titleView}>币种选择</Text>
        <View style={styles.endView1}>
          <TouchableOpacity style={styles.buttonView} onPress={props.onPressChoose}>
            <View style={styles.touchableView}>
              <View>
                <Text style={styles.titleView1}>{props.currency && props.currency.code ? props.currency.code : '暂无支持币种'}</Text>
              </View>
              <View>
                <Image style={styles.imageView} source={Imgs.icon_next} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lineView} />
      <View style={styles.baseView}>
        <Text style={styles.titleView}>划转数量</Text>
        <TextInput
          style={styles.input}
          placeholder="请输入"
          value={props.inPutString}
          onChangeText={(value: string) => onPressinput(value)}
          placeholderTextColor={UIColor.secondTextColor}
        />
        <View style={styles.endView}>
          <Text style={styles.titleView3}>{props.currency && props.currency.code ? props.currency.code : ''}</Text>
          <TouchableOpacity onPress={props.onPressAll}>
            <Text style={styles.titleView4}>全部</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lineView} />
      <Text style={styles.titleView2}>
        {'最多可转:'}
        {props.currencyCoin}
        {props.currency && props.currency.code ? props.currency.code : ''}
      </Text>
    </View>
  );
};

export default AssetsInput;
