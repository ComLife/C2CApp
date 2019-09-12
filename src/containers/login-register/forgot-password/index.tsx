/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState } from 'react';
import { AppState, Image, Keyboard, ScrollView, Text, TextInput as TextInputRN, TouchableOpacity, View } from 'react-native';
import { createSelector } from 'reselect';
import mapDispatchToProps from './map-dispatch-to-props';
import { connect } from 'react-redux';
import { SafeAreaView, TextInput } from 'space-ui';
import outerStyles from './styles';
import { Button } from 'space-ui';
import Imgs from '../../../const/image-set';
import UIColor from '../../../const/colors';
import useInterval from '../../../components/use-interval';
import { useNavigation } from '../../../routes/navigation-service';
import { StateProps } from './interfaces';
import { EasyToast } from '../../../components/EasyToast/toast';
import { EasyShowLD, LoadingDialog } from '../../../components/easyShowLD/EasyShow';
import LocalStore from '../../../utils/local-store';
import { setRatio, setText } from '../../../utils/screen-util';

const ForgotPassword = (props: any) => {
  const styles = outerStyles();
  const param = useNavigation().getParam('param');
  const [phone, setPhone] = useState(''); // 手机号
  const [noteCode, setNoteCode] = useState(''); // 验证码
  const [password, setPassword] = useState(''); // 密码
  const [nextPassword, setNextPassword] = useState(''); // 确认密码
  const [isVerify, setIsVerify] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const [backgroundTime, setBackgroundTime] = useState(0);
  const [country, setCountry] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    console.log('ForgotPassword=', props);
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
  }, []);

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

  const onPressGetCode = () => {
    Keyboard.dismiss();
    EasyShowLD.loadingShow('发送中...');
    // eslint-disable-next-line @typescript-eslint/camelcase
    props.forgotPwdCodeRequest({ auth_type: 1, auth_data: `+${areaCode}-${phone}` });
  };
  useEffect(() => {
    if (props.pwdResetData && props.pwdResetData.code) {
      if (props.pwdResetData.code === '1') {
        console.log('忘记密码后code的情况');
        EasyShowLD.loadingClose();
        EasyToast.show('验证码发送成功，请注意查收');
        setWaitTime(60);
        props.removeForgotMessCode();
      } else {
        // 提示错误
        console.log('忘记密码后错误提示=', props.pwdResetData.msg);
        EasyShowLD.loadingClose();
        EasyToast.show(props.pwdResetData.msg);
        props.removeForgotMessCode();
      }
    }
  }, [props.pwdResetData]);

  const onComfirClick = () => {
    Keyboard.dismiss();
    if (password !== nextPassword) {
      console.log('两次密码不一致，请重新输入');
      EasyToast.show('两次密码不一致，请重新输入');
      return;
    }
    // eslint-disable-next-line @typescript-eslint/camelcase
    props.forgotPwdResetRequest({ auth_type: 1, auth_data: `+${areaCode}-${phone}`, password: password, rand_code: noteCode });
  };

  useEffect(() => {
    if (props.pwdComfireData && props.pwdComfireData.code) {
      if (props.pwdComfireData.code === '1') {
        console.log('忘记密码后code的情况');
        EasyToast.show('密码修改成功');
        new LocalStore().saveLocalRepository('areaCode', areaCode);
        new LocalStore().saveLocalRepository('country', country);
        navigation.navigate('Login');
        props.removeForgotComfireCode();
      } else {
        // 提示错误
        console.log('忘记密码后错误提示=', props.pwdComfireData.msg);
        EasyToast.show(props.pwdComfireData.msg);
        props.removeForgotComfireCode();
      }
    }
  }, [props.pwdComfireData]);

  const nextIsPress = !(phone && noteCode ? true : false);
  const comfirIsPress = !(password && nextPassword ? true : false);

  const onBackClick = () => {
    if (isVerify) {
      setIsVerify(false);
      setPassword('');
      setNextPassword('');
    } else {
      navigation.goBack();
    }
  };

  const btnText = props.isFetching ? '确认中...' : '确认';
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={false}>
        <TouchableOpacity style={styles.backTouch} onPress={onBackClick}>
          <Image source={Imgs.back} />
        </TouchableOpacity>
        {!isVerify ? (
          <View style={styles.passwordSetView}>
            <Text style={styles.titleHeaderText}>找回密码</Text>
            <TouchableOpacity style={styles.countryView} onPress={() => navigation.navigate('Internationalization', { view: 'ForgotPassword' })}>
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
                <Text style={[styles.codeText, { color: phone ? UIColor.colorA1 : UIColor.colorB3 }]} onPress={phone ? onPressGetCode : undefined}>
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
              onPress={() => setIsVerify(true)}
              disableColor={UIColor.disPressColor}>
              下一步
            </Button>
          </View>
        ) : (
          <View style={styles.passwordSetView}>
            <Text style={styles.titleHeaderText}>设置新密码</Text>
            <TextInputRN
              style={[styles.codeInput, { marginTop: setRatio(80) }]}
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
              placeholderTextColor={UIColor.colorB3}
              placeholder={'请再次输入密码'}
            />
            <View style={styles.inputDiving} />
            <Button disabled={comfirIsPress} style={styles.loginButton} textStyle={styles.btnText} onPress={onComfirClick} disableColor={UIColor.disPressColor}>
              {btnText}
            </Button>
          </View>
        )}
        <LoadingDialog />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.pwdResetData, (state: Record<string, any>) => state.pwdComfireData],
  (pwdResetData, pwdComfireData) => {
    return {
      isFetching: pwdResetData.isFetching,
      pwdResetData: pwdResetData,
      pwdComfireData: pwdComfireData,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
