import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import { screenWidth, setRatio } from '../../../../utils/screen-util';
import Imgs from '../../../../const/image-set';
import { AUTH_LEVEL } from '../../../../const/enum-set';
import UIColor from '../../../../const/colors';
const datas = [
  {
    name: '123',
    text: '初级认证后，',
    text2: '初级认证',
    text3: '初级认证需要输入您的证件信息',
    text4: '认证成功',
    text5: '认证失败，请重新认证',
    text6: '审核中',
    image: Imgs.verification_img02,
  },
  {
    name: '123',
    text: '中级认证后，',
    text2: '中级认证',
    text3: '中级认证需要拍摄上传身份证正反面',
    text4: '认证成功',
    text5: '认证失败，请重新认证',
    text6: '审核中',
    image: Imgs.verification_img03,
  },
  {
    name: '123',
    text: '高级认证后，',
    text2: '高级认证',
    text3: '高级认证需要上传手持身份证正面和纸条的照片',
    text4: '认证成功',
    text5: '认证失败，请重新认证',
    text6: '审核中',
    image: Imgs.verification_img04,
  },
];

interface Props {
  onPress?: () => void;
  level: number;
  index: number;
  name: string;
  authenticationStatus: any;
  authenticationContext: string;
}

const AuthenticationComFrame = ({ authenticationContext, authenticationStatus, name, index, level, onPress }: Props) => {
  const styles = outerStyles();
  console.log('AuthenticationComFrame', level);

  const onClick = () => {
    if (onPress) {
      onPress();
    }
  };

  // 审核中
  const examine = () => {
    return (
      <View style={styles.midLeftView}>
        <Text style={styles.midText3}>{datas[index].text2}</Text>
        <Text style={[styles.midText4, { color: UIColor.colorD2 }]}>{datas[index].text6}</Text>
      </View>
    );
  };

  // 失败
  const failed = () => {
    return (
      <View style={styles.midLeftView}>
        <Text style={styles.midText3}>{datas[index].text2}</Text>
        <Text style={[styles.midText4, { color: UIColor.colorA3 }]}>{datas[index].text5}</Text>
      </View>
    );
  };

  // 认证成功
  const success = () => {
    return (
      <View style={styles.midLeftView}>
        <Text style={styles.midText3}>{datas[index].text2}</Text>
        <Text style={[styles.midText4, { color: UIColor.colorA2 }]}>{datas[index].text4}</Text>
      </View>
    );
  };

  // 未认证
  const normal = () => {
    return (
      <View style={styles.midLeftView}>
        <Text style={styles.midText3}>{datas[index].text2}</Text>
        <Text style={[styles.midText4, { color: UIColor.secondTextColor }]}>{datas[index].text3}</Text>
      </View>
    );
  };

  // 判断
  const authen = () => {
    console.log('authenticationStatus', authenticationStatus);
    if (authenticationStatus === AUTH_LEVEL.Authentication0) return normal();
    if (index === 0) {
      return authenticationStatus >= AUTH_LEVEL.Authentication1 ? success() : normal();
    }
    if (index === 1) {
      return authenticationStatus >= AUTH_LEVEL.Authentication22 ? success() : normal();
    }
    if (index === 2) {
      if (authenticationStatus === AUTH_LEVEL.Authentication31) {
        return failed();
      }
      if (authenticationStatus === AUTH_LEVEL.Authentication30) {
        return examine();
      }
      if (authenticationStatus === AUTH_LEVEL.Authentication32) {
        return success();
      }
      if (authenticationStatus === AUTH_LEVEL.Authentication22) {
        return normal();
      }
      return normal();
    }
  };

  return (
    <View>
      <View style={[level === index ? styles.midView2 : level >= index ? styles.midView : styles.midView1, { marginTop: setRatio(60) }]}>
        <TouchableOpacity onPress={() => (level !== index ? null : onClick())} activeOpacity={level !== index ? 1.0 : 0.5} key={name}>
          <View style={styles.viewChild}>
            {authen()}
            <View style={styles.midLeftView1}>
              <View style={styles.viewChildvv}>
                <Image
                  source={Imgs.verification_img01}
                  style={{
                    width: setRatio(230),
                    height: setRatio(120),
                  }}
                />
                <Image source={datas[index].image} style={styles.imageView} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.viewChildvvv}>
        <Text style={styles.midText}>
          <Text style={styles.midText1}>{datas[index].text}</Text>
          <Text style={styles.midText2} numberOfLines={2}>
            {authenticationContext}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AuthenticationComFrame;
