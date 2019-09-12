import React, { memo, useEffect, useRef, useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'space-ui';
import styles from './styles';
import Imgs from '../../../../../const/image-set';
import Colors from '../../../../../const/colors';
import { inputLimit } from '../../../../../utils/input-limit';

interface Props {
  onJian: any; //-号回调
  onJia: any; //+号回调
  midText?: string; //中间的字
  baseCurrency?: string; //第三个box里的字
  bottomText?: string; //下方的字
  isInput?: boolean; //输入框是否可以输入
  oneInputValue: string; //第一个输入框里的值
  setOneInputValue: any; //第一个输入框的回调
  initText: string; //第二个输入框的默认值
  twoInputValue: string; //第二个输入框的值
  setTwoInputValue: any; //第二个输入框的值
  paymentCurrency: string; //计价货币
  marketPrice: string;
  isBlur: any;
  isBuy: boolean;
  valuationMin: number;
  basicsMin: number;
}

const LeftMiddle = memo((props: Props) => {
  const input1 = useRef(null);
  const input2 = useRef(null);

  const {
    onJian,
    onJia,
    midText,
    baseCurrency,
    bottomText,
    isInput,
    oneInputValue,
    setOneInputValue,
    initText,
    twoInputValue,
    setTwoInputValue,
    paymentCurrency,
    marketPrice,
    isBlur,
    isBuy,
    valuationMin,
    basicsMin,
  } = props;

  const tmpValuationMin = valuationMin === -1 ? 0 : valuationMin;
  const tmpBasicsMin = basicsMin === -1 ? 0 : basicsMin;

  const onBlur = () => {
    Keyboard.dismiss();
    // @ts-ignore
    input1 && input1.current.blur();
    // @ts-ignore
    input2 && input2.current.blur();
  };

  useEffect(() => {
    if (isBlur) {
      // setTimeout(() => {
      onBlur();
      // }, 100);
    }
  }, [isBlur]);

  const showOneValue = (value: string) => {
    setOneInputValue(inputLimit(value, tmpValuationMin));
  };

  const showTwoValue = (value: string) => {
    setTwoInputValue(inputLimit(value, tmpBasicsMin));
  };

  const isCurrency = () => {
    return isBuy ? paymentCurrency : baseCurrency;
  };

  return (
    <View style={styles.leftMidBg}>
      <View style={styles.midTopView}>
        <View style={styles.midBox1}>
          <TextInput
            style={styles.input}
            placeholder={marketPrice}
            value={oneInputValue}
            onChangeText={value => {
              showOneValue(value);
            }}
            placeholderTextColor={Colors.colorB1}
            editable={isInput}
            keyboardType="numeric"
            ref={input1}
            maxLength={10}
          />
        </View>
        <View style={styles.midBox2}>
          <TouchableOpacity style={styles.midTouch} onPress={isInput ? onJian : null} activeOpacity={isInput ? 0.6 : 1}>
            <Image source={Imgs.icon_jian} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.midTouch} onPress={isInput ? onJia : null} activeOpacity={isInput ? 0.6 : 1}>
            <Image source={Imgs.icon_jia} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.midTextView1}>
        <Text style={styles.midText1}>{midText ? midText : ''}</Text>
      </View>
      <View style={styles.midBox3}>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder={initText}
          value={twoInputValue}
          onChangeText={value => {
            showTwoValue(value);
          }}
          placeholderTextColor={Colors.colorB3}
          ref={input2}
          autoCorrect
          maxLength={10}
        />
        <View style={styles.midBox3View}>
          <Text style={styles.leftHeaderText}>{baseCurrency || 'BTC'}</Text>
        </View>
      </View>
      <View style={styles.midTextView1}>
        <Text style={styles.midText1}>{bottomText ? '可用 ' + bottomText + ' ' + isCurrency() : '可用 0 USDT'}</Text>
      </View>
    </View>
  );
});

export default LeftMiddle;
