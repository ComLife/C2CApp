import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { createSelector } from 'reselect';
import { Button, SafeAreaView } from 'space-ui';
import outerStyles from './styles';
import UIColor from '../../../../const/colors';
import Imgs from '../../../../const/image-set';
import { ERROR_CODE } from '../../../../const/enum-set';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props } from './interfaces';
import { useNavigation } from '../../../../routes/navigation-service';
import { EasyShowLD, LoadingDialog } from '../../../../components/easyShowLD/EasyShow';
import { EasyToast } from '../../../../components/EasyToast/toast';
import { REMOVE_AUTH_API } from '../../../../redux/action-types';
import Header from '../header';

const AuthenticationPrimary = (props: DispatchProps & Props) => {
  const { goBack, getParam } = useNavigation();
  const [idCard, setIdCard] = useState('');
  const [name, setName] = useState('');
  const styles = outerStyles();
  const authInfo = getParam('authInfo');
  const onAuthPress = () => {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard)) {
      // EasyToast.show('请输入正确的身份证号');
      return;
    }
    EasyShowLD.loadingShow('保存中...');
    props.authRequest({ realName: name, authCode: idCard.toLocaleUpperCase() });
  };

  useEffect(() => {
    if (!props.userAuthInfo || !props.userAuthInfo.code) return;
    if (props.userAuthInfo.code === ERROR_CODE.SUCCESS) {
      goBack();
      EasyShowLD.loadingClose();
    } else {
      EasyShowLD.loadingClose();
      EasyToast.show(props.userAuthInfo.msg);
      // props.userAuthInfoMsg && Alert.alert(props.userAuthInfoMsg);
    }
    props.resetState(REMOVE_AUTH_API);
  }, [props.userAuthInfo]);

  const isCanNext = () => {
    return name && idCard;
  };

  const onName = (text: string) => {
    setName(text);
  };

  const onCard = (text: string) => {
    setIdCard(text);
  };

  const renderAuth = () => {
    // @ts-ignore
    return (
      <View
        style={
          authInfo && authInfo.authCode ? [styles.container, { backgroundColor: UIColor.colorB5 }] : [styles.container, { backgroundColor: UIColor.whiteColor }]
        }>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>真实姓名</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入您的真实姓名"
            value={name}
            onChangeText={(username: string) => onName(username)}
            placeholderTextColor={UIColor.secondTextColor}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputText}>身份证号</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入您的身份证号"
            value={idCard}
            onChangeText={(card: string) => onCard(card)}
            placeholderTextColor={UIColor.secondTextColor}
          />
        </View>
        <View style={styles.buttonView1}>
          <Button style={styles.authButton} disabled={!isCanNext()} onPress={onAuthPress}>
            完 成
          </Button>
        </View>
      </View>
    );
  };

  const renderDetail = () => {
    let str1 = '';
    if (authInfo) {
      str1 = authInfo.authCode.replace(/(\d{2})(\d+)(\d{2})/, (x: any, y: string, z: { length: number }, p: string) => {
        let i = '';
        while (i.length < z.length) {
          i += '*';
        }
        return y + i + p;
      });
    }
    return (
      <View
        style={
          authInfo && authInfo.authCode ? [styles.container, { backgroundColor: UIColor.colorB5 }] : [styles.container, { backgroundColor: UIColor.whiteColor }]
        }>
        <View style={styles.detailView}>
          <View style={styles.detailView1}>
            <Text style={styles.inputText}>实名认证</Text>
          </View>
          <View style={styles.detailView2}>
            <Text style={styles.infoText}> {authInfo ? authInfo.realName : ''} </Text>
            <Text />
            <Text style={styles.infoText}> {str1} </Text>
          </View>
          <View style={styles.detailView3}>
            <Image source={Imgs.icon_duihao} resizeMode="contain" />
            <Text style={styles.colorA1}>认证成功</Text>
          </View>
        </View>
      </View>
    );
  };

  const onBack = () => {
    goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: UIColor.whiteColor }} forceInset={{ top: 'always', bottom: 'never' }}>
      <Header title="初级认证" leftTitle="" leftImage={Imgs.back} onPressLeft={onBack} />
      <View style={styles.baseView}>
        <View style={[styles.baseView1, { backgroundColor: authInfo && authInfo.authCode ? UIColor.colorB5 : UIColor.whiteColor }]} />
        {authInfo && authInfo.authCode ? renderDetail() : renderAuth()}
        {/*<Alert />*/}
        <LoadingDialog />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.userAuthInfo],
  userAuthInfo => {
    return {
      userAuthInfo: userAuthInfo,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationPrimary);
