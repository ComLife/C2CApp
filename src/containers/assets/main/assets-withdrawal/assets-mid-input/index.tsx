import React, { Fragment, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, DivisorLine, SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import { setRatio } from '../../../../../utils/screen-util';
import Imgs from '../../../../../const/image-set';
import UIColor from '../../../../../const/colors';
import { sub, toNumberByString } from '../../../../../utils/digital';

interface Props {
  currency: any; //币种信息 'BTC'
  inPutSweepString: string; // 地址
  inPutPhoneString: string; // 手机
  inPutRemarksString: string; // 备注
  inPutCoinNumberstring: string; // 提币数量
  inPutTransferNumberstring: string; // 转账数量
  onPressChooseCoin: () => void; //选择币种
  onPressPhone: (string: string) => void; // 手机号输入回调
  onPressSweep: (string: string) => void; // 提币地址输入回调
  onPressRemarks: (string: string) => void; // 备注输入回调
  onPressCoinNumber: (string: string) => void; // 提币数量
  onPressTransferNumber: (string: string) => void; // 转账数量
  onPressScanning: () => void; // 扫码
  onPressTotal: () => void; //全部按钮
  onPressConfirm: () => void; // 提币/转账按钮
  headerIndex: number; // 当前tab 索引
  currentCurrency: any; // 当前可用币种数量
}

const AssetsMidInput = (props: Props) => {
  console.log('AssetsMidInput', props.currency);
  const styles = outerStyles();

  const onPressPhone = (string: string) => {
    if (props.headerIndex === 0) {
      if (props.onPressSweep) {
        props.onPressSweep(string);
      }
    } else {
      if (props.onPressPhone) {
        props.onPressPhone(string);
      }
    }
  };
  const onPressRemarks = (string: string) => {
    if (props.onPressRemarks) {
      props.onPressRemarks(string);
    }
  };
  const onPressNumber = (string: string) => {
    if (props.headerIndex === 0) {
      if (props.onPressCoinNumber) {
        props.onPressCoinNumber(string);
      }
    } else {
      if (props.onPressTransferNumber) {
        props.onPressTransferNumber(string);
      }
    }
  };
  const isCanNext = () => {
    if (props.headerIndex === 0) {
      return props.inPutSweepString && props.inPutCoinNumberstring;
    }
    return props.inPutPhoneString && props.inPutTransferNumberstring;
  };

  const code = props.currency && props.currency.code ? props.currency.code : '';
  const minerfeeMin = props.currency && props.currency.minerfeeMin1 ? props.currency.minerfeeMin1 : '0';
  const leftMiner = props.currency && props.currency.leftMiner ? props.currency.leftMiner : '0';
  const minerfeeMax = props.currency && props.currency.minerfeeMax1 ? props.currency.minerfeeMax1 : '0';
  const minerfee = props.currency && props.currency.minerfee1 ? props.currency.minerfee1 : '0';
  const mallfee = props.currency && props.currency.mallfee1 ? props.currency.mallfee1 : '0';
  const inputValue = props.headerIndex === 0 ? toNumberByString(props.inPutCoinNumberstring) : toNumberByString(props.inPutTransferNumberstring);
  const value = props.headerIndex === 0 ? sub(inputValue, minerfee) : sub(inputValue, mallfee);
  const currentCurrency = props.currentCurrency && props.currentCurrency.realAmount ? props.currentCurrency.realAmount : '0';
  const isEos = props.currency && props.currency.id === 5 ? true : false;
  return (
    <View>
      <View style={props.headerIndex === 0 && isEos ? styles.body : styles.body1}>
        <View style={styles.baseView}>
          <Text style={styles.titleView}>币种选择</Text>
          <View style={styles.endView1}>
            <TouchableOpacity style={styles.buttonView} onPress={props.onPressChooseCoin}>
              <View style={styles.touchableView}>
                <View>
                  <Text style={styles.titleView1}>{code}</Text>
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
          <Text style={styles.titleView}>{props.headerIndex === 0 ? '提币地址' : '账户名'}</Text>
          <TextInput
            style={styles.input}
            placeholder={props.headerIndex === 0 ? '请输入地址' : '请输入手机号'}
            value={props.headerIndex === 0 ? props.inPutSweepString : props.inPutPhoneString}
            onChangeText={(value: string) => onPressPhone(value)}
            placeholderTextColor={UIColor.secondTextColor}
          />
          {props.headerIndex === 0 ? (
            <View style={styles.endView1}>
              <TouchableOpacity style={styles.buttonView1} onPress={props.onPressScanning}>
                <Image style={styles.imageView1} source={Imgs.icon_qb} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={styles.lineView} />
        {props.headerIndex === 0 && isEos ? (
          <View style={styles.baseView}>
            <Text style={styles.titleView}>备注</Text>
            <TextInput
              style={styles.input}
              placeholder="请输入"
              value={props.inPutRemarksString}
              onChangeText={(value: string) => onPressRemarks(value)}
              placeholderTextColor={UIColor.secondTextColor}
            />
          </View>
        ) : null}
        {props.headerIndex === 0 && isEos ? <View style={styles.lineView} /> : null}
        <View style={styles.baseView1}>
          <Text style={styles.titleView5}>{props.headerIndex === 0 ? '提币数量' : '转账数量'}</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入"
            value={props.headerIndex === 0 ? props.inPutCoinNumberstring : props.inPutTransferNumberstring}
            onChangeText={(value: string) => onPressNumber(value)}
            placeholderTextColor={UIColor.secondTextColor}
            keyboardType="numeric"
          />
          <View style={styles.endView}>
            <Text style={styles.titleView3}>{code}</Text>
            <TouchableOpacity onPress={props.onPressTotal}>
              <Text style={styles.titleView4}>全部</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lineView} />
        <Text style={styles.titleView2}>
          当前可用:{currentCurrency}
          {code}
        </Text>
      </View>
      <View style={[styles.tipsBaseView, { marginTop: setRatio(58) }]}>
        <Text style={styles.tipsView}>
          {props.headerIndex === 0 ? '最低提币金额为' : '最低转账金额为'}
          <Text style={styles.tipsView1}>{minerfeeMin}</Text>
          <Text style={styles.tipsView}>{code}</Text>
        </Text>
      </View>
      <View style={[styles.tipsBaseView, { marginTop: setRatio(13) }]}>
        <Text style={styles.tipsView3}>
          {props.headerIndex === 0 ? '每日最高可提币' : '每日最高可转账:'}
          <Text style={styles.tipsView1}>{leftMiner + '/' + minerfeeMax}</Text>
          <Text style={styles.tipsView}>{code}</Text>
        </Text>
      </View>
      <View style={[styles.tipsBaseView, { marginTop: setRatio(13) }]}>
        <Text style={styles.tipsView3}>
          {props.headerIndex === 0 ? '提币手续费:' : '转账手续费:'}
          <Text style={styles.tipsView1}>{props.headerIndex === 0 ? minerfee : mallfee}</Text>
          <Text style={styles.tipsView}>{code}</Text>
        </Text>
      </View>
      <View style={[styles.tipsBaseView, { marginTop: setRatio(30) }]}>
        <Text style={styles.tipsView4}>
          {'实际到账:'}
          <Text style={styles.tipsView2}>{inputValue === 0 ? '0' : value}</Text>
          <Text style={styles.tipsView2}>{code}</Text>
        </Text>
      </View>
      <Button style={props.headerIndex === 0 && isEos ? styles.confirmButton : styles.confirmButton1} disabled={!isCanNext()} onPress={props.onPressConfirm}>
        {props.headerIndex === 0 ? '确认提币' : '确认转账'}
      </Button>
    </View>
  );
};

export default AssetsMidInput;
