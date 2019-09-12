/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState } from 'react';
import { AppState, DeviceEventEmitter, Image, Keyboard, ScrollView, Text, TextInput as TextInputRN, TouchableOpacity, View } from 'react-native';
import { StateProps } from './interfaces';
import { connect } from 'react-redux';
import outerStyles from './styles';
import { Button, TextInput } from 'space-ui';
import Imgs from '../../../const/image-set';
import { SafeAreaView } from 'space-ui';
import UIColor from '../../../const/colors';
import mapDispatchToProps from './map-dispatch-to-props';
import useInterval from '../../../components/use-interval';
import { useNavigation } from '../../../routes/navigation-service';
import { EasyToast } from '../../../components/EasyToast/toast';
import { EasyShowLD, LoadingDialog } from '../../../components/easyShowLD/EasyShow';
import LocalStore from '../../../utils/local-store';

const Register = (props: any) => {
  const styles = outerStyles();
  const param = useNavigation().getParam('param');
  const [phone, setPhone] = useState('');
  const [noteCode, setNoteCode] = useState('');
  const [password, setPassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [waitTime, setWaitTime] = useState(0);
  const [isRegister, setIsRegister] = useState(false);
  const navigation = useNavigation();
  const [backgroundTime, setBackgroundTime] = useState(0);
  const [isComfir, setIsComfir] = useState(false);
  const [country, setCountry] = useState('');
  const [areaCode, setAreaCode] = useState('');

  useEffect(() => {
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

    props.removeCapitalInitData();
  }, []);

  // useEffect(() => {
  //   const areaCodeListener = DeviceEventEmitter.addListener('refresh_areaCode', res => {
  //     // 收到监听后想做的事情
  //     if (res.view === 'Register') {
  //       setAreaCode(res.code);
  //       setCountry(res.country);
  //     }
  //   });
  //   return () => areaCodeListener.remove();
  // });

  useEffect(() => {
    console.log('register=', props);
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'background') {
        // 即将切到后台
        setBackgroundTime(new Date().getTime() / 1000);
      }
      if (nextAppState === 'active') {
        const leftTime = new Date().getTime() / 1000 - backgroundTime;
        let waitTimeCopy = Math.floor(waitTime - leftTime);
        waitTimeCopy = waitTimeCopy <= 0 ? 0 : waitTimeCopy;
        // @ts-ignore
        setWaitTime(waitTimeCopy);
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  });

  const onPhoneChange = (text: string) => {
    setPhone(text);
  };
  const onNoteCodeChange = (text: string) => {
    setNoteCode(text);
  };
  const onPwdChange = (text: string) => {
    setPassword(text);
  };
  const onNextPwdChange = (text: string) => {
    setNextPassword(text);
  };

  useInterval(
    () => {
      setWaitTime(waitTime - 1);
    },
    // @ts-ignore
    waitTime ? 1000 : null,
  );

  const nextIsPress = !(phone && noteCode ? true : false);
  const comfirIsPress = !(password && nextPassword ? true : false);

  const onBackClick = () => {
    if (isRegister) {
      setIsRegister(false);
      setPassword('');
      setNextPassword('');
      setIsComfir(false);
    } else {
      navigation.goBack();
    }
  };

  const onGetCodePress = () => {
    Keyboard.dismiss();
    EasyShowLD.loadingShow('发送中');
    // eslint-disable-next-line @typescript-eslint/camelcase
    props.registerCodeRequest({ auth_type: 1, auth_data: `+${areaCode}-${phone}` });
  };

  useEffect(() => {
    if (props.registerCodeData && props.registerCodeData.code) {
      if (props.registerCodeData.code === '1') {
        console.log('注册短信验证码code变化后的情况');
        EasyShowLD.loadingClose();
        EasyToast.show('验证码发送成功，请注意查收');
        setWaitTime(60);
        props.removeRegMessCode();
      } else {
        // 提示错误
        console.log('注册短信验证码错误提示=', props.registerCodeData.msg);
        EasyShowLD.loadingClose();
        EasyToast.show(props.registerCodeData.msg);
        props.removeRegMessCode();
      }
    }
  }, [props.registerCodeData]);

  const onComfirClick = () => {
    Keyboard.dismiss();
    if (password !== nextPassword) {
      return;
    }
    setIsComfir(true);
    props.registerResetRequest({ type: 1, phone: `+${areaCode}-${phone}`, password, code: noteCode });
  };
  useEffect(() => {
    if (props.registerConfirmData && props.registerConfirmData.code) {
      if (props.registerConfirmData.code !== '1') {
        new LocalStore().saveLocalRepository('account', phone);
        new LocalStore().saveLocalRepository('areaCode', areaCode);
        new LocalStore().saveLocalRepository('country', country);
        setIsComfir(false);
      }
    }
  }, [props.registerConfirmData]);

  const btnText = props.isFetching ? '确认中...' : '确认';
  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableOpacity style={styles.backTouch} onPress={onBackClick}>
          <Image source={Imgs.back} />
        </TouchableOpacity>
        {!isRegister ? (
          <View style={styles.registerView}>
            <Text style={styles.titleHeaderText}>注册</Text>
            <TouchableOpacity style={styles.countryView} onPress={() => navigation.navigate('Internationalization', { view: 'Register' })}>
              <Text style={styles.phoneHeader}>{country}</Text>
              <Text style={styles.phoneHeader}>{`+${areaCode}`}</Text>
              <Image source={Imgs.icon_choice} />
            </TouchableOpacity>
            <TextInput
              style={styles.codeInput}
              autoCapitalize="none"
              onChangeText={onPhoneChange}
              keyboardType={'numeric'}
              value={phone}
              placeholderTextColor={UIColor.colorB3}
              placeholder={'手机号'}
            />
            <View style={styles.inputDiving} />
            <View style={styles.codeView}>
              <TextInput
                style={styles.noteCodeInput}
                autoCapitalize="none"
                onChangeText={onNoteCodeChange}
                keyboardType={'numeric'}
                value={noteCode}
                placeholderTextColor={UIColor.colorB3}
                placeholder={'验证码'}
              />
              {waitTime === 0 ? (
                <Text style={[styles.codeText, { color: phone ? UIColor.colorA1 : UIColor.colorB3 }]} onPress={phone ? onGetCodePress : undefined}>
                  获取验证码
                </Text>
              ) : (
                <Text style={styles.codeText}>{`${waitTime}s`}</Text>
              )}
            </View>

            <View style={styles.inputDiving} />
            <Button
              style={styles.loginButton}
              disabled={nextIsPress}
              textStyle={styles.btnText}
              onPress={() => setIsRegister(true)}
              disableColor={UIColor.disPressColor}>
              下一步
            </Button>
            <View style={styles.registerTextView}>
              <Text style={styles.registerText}>已有账号？</Text>
              <Text style={styles.onRegisterText} onPress={() => props.navigation.goBack()}>
                去登录
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.registerView}>
            <Text style={styles.titleHeaderText}>设置密码</Text>
            <TextInputRN
              style={styles.codeInput}
              autoCapitalize="none"
              onChangeText={onPwdChange}
              secureTextEntry
              value={password}
              placeholder={'请输入密码'}
            />
            <View style={styles.inputDiving} />
            <TextInputRN
              style={styles.passInput}
              autoCapitalize="none"
              onChangeText={onNextPwdChange}
              secureTextEntry
              value={nextPassword}
              placeholder={'请再次输入密码'}
            />
            <View style={styles.inputDiving} />
            <Button
              disabled={comfirIsPress || isComfir}
              style={styles.loginButton}
              textStyle={styles.btnText}
              onPress={onComfirClick}
              disableColor={UIColor.disPressColor}>
              {btnText}
            </Button>
          </View>
        )}
        <LoadingDialog />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { registerData, registerConfirmData } = state;
  return {
    registerCodeData: registerData,
    registerConfirmData: registerConfirmData,
    isFetching: registerData.isFetching,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
