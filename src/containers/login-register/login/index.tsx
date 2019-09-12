/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, Image, Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props, StateProps } from './interfaces';
import outerStyles from './styles';
import { Button, SafeAreaView } from 'space-ui';
import Imgs from '../../../const/image-set';
import UIColor from '../../../const/colors';
import { useNavigation } from '../../../routes/navigation-service';
import { EasyToast } from '../../../components/EasyToast/toast';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import LocalStore from '../../../utils/local-store';

const Login = (props: DispatchProps & Props) => {
  const styles = outerStyles();
  const param = useNavigation().getParam('param');
  const { navigate, goBack } = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [areaCode, setAreaCode] = useState('');

  const onPhoneChange = (text: string) => {
    setPhone(text);
  };

  const onPwdChange = (text: string) => {
    setPassword(text);
  };

  useEffect(() => {
    new LocalStore().fetchLocalRepository('account').then((res: any) => {
      if (res) {
        setPhone(res);
      }
    });
    if (param) {
      setAreaCode(param.code);
      setCountry(param.country);
    } else {
      new LocalStore().fetchLocalRepository('country').then(
        (res: any) => {
          if (res) {
            setCountry(res);
          }
        },
        () => {
          setCountry('中国大陆');
        },
      );
      new LocalStore().fetchLocalRepository('areaCode').then(
        (res: any) => {
          if (res) {
            setAreaCode(res);
          }
        },
        () => {
          setAreaCode('86');
        },
      );
    }
  }, []);

  // useEffect(() => {
  //   const areaCodeListener = DeviceEventEmitter.addListener('refresh_areaCode', res => {
  //     // 收到监听后想做的事情
  //     if (res.view === 'Login') {
  //       setAreaCode(res.code);
  //       setCountry(res.country);
  //     }
  //   });
  //   return () => areaCodeListener.remove();
  // });

  const onLoginPress = () => {
    WebSocket.getInstance().close();
    WebSocket.getInstance().reconnect();
    Keyboard.dismiss(); // 把弹出的键盘收回去，同时使当前的文本框失去焦点。
    props.loginRequest({ phone: `+${areaCode}-${phone}`, password, encrypt_flag: false });
  };

  const sendWebSocketInit = () => {
    const bbsInit = { msgType: 'bbs_init', msgData: { collectionCodes: '' } };
    WebSocket.getInstance().send(sendWrapper(bbsInit));
  };

  useEffect(() => {
    if (props.loginCode === '1') {
      new LocalStore().saveLocalRepository('gesture', '-1');
      new LocalStore().saveLocalRepository('touch', '-1');
      new LocalStore().saveLocalRepository('account', phone);
      new LocalStore().saveLocalRepository('areaCode', areaCode);
      new LocalStore().saveLocalRepository('country', country);
      sendWebSocketInit();
      if (props.logAction) {
        navigate('CapitalPwdInit');
        props.removeLoginCode();
      } else {
        props.checktradepwdRequest();
        props.baseAuthsRequest({ user_id: props.userInfo.data.uid });
        navigate('Frame');
        props.removeLoginCode();
      }
    } else {
      // @ts-ignore
      if (props.loginCode !== '') {
        // @ts-ignore
        EasyToast.show(props.loginMsg);
      }
      props.removeLoginCode();
    }
  }, [props.loginCode]);

  const isDisabled = !(phone && password ? true : false);
  const btnText = props.loginFetching ? '登录中...' : '登录';

  // 取消时间
  const cancelClick = () => {
    // if (Config.headers.uid) {
    //   goBack();
    // } else {
    //   navigate('Home');
    // }
    navigate('Home');
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
        <TouchableOpacity style={styles.leftImage} onPress={cancelClick}>
          <Image source={Imgs.back} />
        </TouchableOpacity>
        <View style={styles.loginView}>
          <Image source={Imgs.icon_logo} style={styles.titleHeaderImage} />
          <TouchableOpacity style={styles.countryView} onPress={() => navigate('Internationalization', { view: 'Login' })}>
            <Text style={styles.phoneHeader}>{country}</Text>
            <Text style={styles.phoneHeader}>{`+${areaCode}`}</Text>
            <Image source={Imgs.icon_choice} />
          </TouchableOpacity>
          <TextInput
            style={styles.codeInput}
            autoCapitalize="none"
            onChangeText={onPhoneChange}
            keyboardType={'numeric'}
            placeholder={'手机号'}
            value={phone}
            placeholderTextColor={UIColor.colorB3}
          />

          <View style={styles.inputDiving} />
          <TextInput
            style={styles.passInput}
            autoCapitalize="none"
            onChangeText={onPwdChange}
            secureTextEntry
            placeholderTextColor={UIColor.colorB3}
            placeholder={'密码'}
          />
          <View style={styles.inputDiving} />
          <Button onPress={onLoginPress} disabled={isDisabled} style={styles.loginButton} textStyle={styles.btnText} disableColor={UIColor.disPressColor}>
            {btnText}
          </Button>
          <Text style={styles.forgotPassText} onPress={() => navigate('ForgotPassword')}>
            忘记密码
          </Text>
          <View style={styles.registerTextView}>
            <Text style={styles.registerText}>还没注册账号？</Text>
            <Text style={styles.onRegisterText} onPress={() => navigate('Register')}>
              去注册
            </Text>
          </View>
          <View style={styles.registerTextView1} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.userInfo],
  userInfo => {
    return {
      userInfo: userInfo,
      loginFetching: userInfo.isFetching,
      loginCode: userInfo.code,
      loginMsg: userInfo.msg,
      logAction: userInfo.action,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
