import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, TextInput } from 'space-ui';
import UIColor from '../../const/colors';
import { setRatio, setText } from '../../utils/screen-util';

const outerStyles = () => {
  return StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    secretKeyView: {
      paddingHorizontal: setRatio(20),
      backgroundColor: UIColor.whiteColor,
    },
    // eslint-disable-next-line react-native/no-unused-styles
    title: {
      fontSize: setText(22),
      color: UIColor.importantTextColor,
      marginTop: setRatio(20),
      marginBottom: setRatio(20),
    },
    // eslint-disable-next-line react-native/no-unused-styles
    inputView: {
      height: setRatio(70),
      borderColor: UIColor.colorB3,
      borderWidth: setRatio(1),
      flexDirection: 'row-reverse',
      alignItems: 'center',
      backgroundColor: UIColor.whiteColor,
      marginBottom: setRatio(20),
    },
    // eslint-disable-next-line react-native/no-unused-styles
    input: {
      flex: 1,
      paddingHorizontal: setRatio(15),
    },
    // eslint-disable-next-line react-native/no-unused-styles
    rightText: {
      fontSize: setText(22),
      color: UIColor.colorA1,
      marginRight: setRatio(15),
    },
  });
};

interface Props {
  style?: any; // inputbox样式
  title?: string; // 标题文本
  titleStyle?: any; // 标题样式
  inputViewStyle?: any; // 输入框view的样式
  onPressClick?: Function; // 点击文本的回调事件
  inputStyle?: any; // 输入框的样式
  clickText?: string; // 点击文本
  editableBool?: boolean; // 文本框否可编辑的
  secureTextEntryBool?: boolean; // 是否密钥显示
  placeholderText?: string;
  inputValue?: string;
  inputClick?: any;
}

const GoogleSet = (props: Props) => {
  const styles = outerStyles();
  const {
    style,
    title,
    titleStyle,
    inputViewStyle,
    onPressClick,
    inputStyle,
    clickText,
    editableBool,
    secureTextEntryBool,
    placeholderText,
    inputValue,
    inputClick,
  } = props;

  return (
    <View style={[styles.secretKeyView, style]}>
      {title ? <Text style={[styles.title, titleStyle]}>{title}</Text> : null}
      <View style={[styles.inputView, inputViewStyle]}>
        <TouchableOpacity onPress={onPressClick ? () => onPressClick() : () => 'any'}>
          {clickText ? <Text style={styles.rightText}>{clickText}</Text> : null}
        </TouchableOpacity>
        <TextInput
          style={[styles.input, inputStyle]}
          editable={editableBool ? true : false}
          value={inputValue}
          keyboardType={'numeric'}
          secureTextEntry={secureTextEntryBool ? false : true}
          placeholder={placeholderText}
          onChangeText={inputClick ? (value: string) => inputClick(value) : () => 'any'}
        />
      </View>
    </View>
  );
};

export default GoogleSet;
