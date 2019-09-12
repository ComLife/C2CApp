import React, { useEffect, useRef, useState } from 'react';
import { AppState, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createSelector } from 'reselect';
import { Button, SafeAreaView } from 'space-ui';
import { useNavigation } from '../../routes/navigation-service';
import UIColor from '../../const/colors';
import outerStyles from './styles';
import useInterval from '../../components/use-interval';
import mapDispatchToProps from './map-dispatch-to-props';
import { connect } from 'react-redux';
import { Props, StateProps } from './interfaces';
import Header from '../../components/header';
import { EasyToast } from '../../components/EasyToast/toast';

const CapitalPwd = (props: any) => {
  const styles = outerStyles();
  const [bindCode, setBindCode] = useState('');
  const [prePassword, setPrePassword] = useState('');
  const [nextPassword, setNextPassword] = useState('');
  const [waitTime, setWaitTime] = useState(0);
  const inputEl1 = useRef(null);
  const inputEl2 = useRef(null);
  const inputEl3 = useRef(null);
  const navigation = useNavigation();
  const uid = props.baseData ? props.baseData.uid : '';
  const phone = props.baseData ? props.baseData.phone : '';
  const [backgroundTime, setBackgroundTime] = useState(0);

  console.log('CapitalPwd', props);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    props.baseAuthsRequest({ user_id: props.userInfo.data.uid });
  }, []);

  useEffect(() => {
    console.log('CapitalPwd=', props);
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

  useInterval(
    () => {
      setWaitTime(waitTime - 1);
    },
    // @ts-ignore
    waitTime ? 1000 : null,
  );

  // 获取验证码
  const requestCode = () => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    props.tradepwdCodeRequest({ user_id: uid, auth_type: 1 });
  };
  useEffect(() => {
    if (props.capitalCodeData && props.capitalCodeData.code) {
      if (props.capitalCodeData.code === '1') {
        console.log('资金密码重置获取验证码的情况');
        setWaitTime(60);
        EasyToast.show('验证码发送成功，请注意查收');
        props.removeCapitalCode();
      } else {
        // 提示错误
        console.log('忘记密码后错误提示=', props.capitalCodeData.msg);
        EasyToast.show(props.capitalCodeData.msg);
        props.removeCapitalCode();
      }
    }
  }, [props.capitalCodeData]);

  const renderCodeTouch = () =>
    waitTime === 0 ? (
      <TouchableOpacity activeOpacity={0.5} style={styles.leftPos} onPress={() => requestCode()}>
        <Text style={styles.leftTimeText}>获取验证码</Text>
      </TouchableOpacity>
    ) : (
      <Text style={[styles.leftTimeText, styles.leftPos]}>{`(${waitTime}s)`}</Text>
    );

  const updatetradepwdRequest = () => {
    console.log('重置资金密码提交');
    // @ts-ignore
    inputEl1.current && inputEl1.current.blur();
    // @ts-ignore
    inputEl2.current && inputEl2.current.blur();
    // @ts-ignore
    inputEl3.current && inputEl3.current.blur();
    if (prePassword.length === nextPassword.length && prePassword === nextPassword) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      props.tradepwdResetRequest({ password: nextPassword, user_id: uid, auth_type: 1, rand_code: bindCode });
    } else {
      EasyToast.show('两次输入资金密码不一致');
      // 提示： 两次输入资金密码不一致
    }
  };

  useEffect(() => {
    if (props.capitalResetData && props.capitalResetData.code) {
      if (props.capitalResetData.code === '1') {
        console.log('资金密码重置获取验证码的情况');
        setWaitTime(60);
        EasyToast.show('设置成功');
        props.removeCapitalResetData();
        navigation.goBack();
      } else {
        // 提示错误
        console.log('忘记密码后错误提示=', props.capitalResetData.msg);
        EasyToast.show(props.capitalResetData.msg);
        props.removeCapitalResetData();
      }
    }
  }, [props.capitalResetData]);

  const reg = /^(\w{3})\w+(\w{2})/;
  // const str = props.baseData.phone;
  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={false}>
        <Header title={'重置资金密码'} onClick={() => navigation.goBack()} />
        <View style={styles.container}>
          {!props.isGoogleOpen ? (
            <View style={styles.noticeView}>
              <View style={styles.noticeTextBox}>
                <Text style={styles.noticeText1}>点击获取验证码，输入由</Text>
                <Text style={styles.noticeText2}>{phone.replace(reg, '$1******$2')}</Text>
                <Text style={styles.noticeText1}>收到的</Text>
              </View>
              {/* eslint-disable-next-line react-native/no-inline-styles */}
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.noticeText2}>验证码，</Text>
                <Text style={styles.noticeText1}>完成身份验证</Text>
              </View>
            </View>
          ) : (
            <View style={styles.noticeView}>
              <Text style={styles.noticeText1}>点击获取验证码，请输入由谷歌验证器中生成的6位谷歌验证码，完成身份验证</Text>
            </View>
          )}
          <View style={styles.DivingLine} />
          <View style={styles.testView}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                ref={inputEl1}
                placeholder={props.isGoogleOpen ? '请输入谷歌验证码' : '请输入短信验证码'}
                keyboardType={'numeric'}
                onChangeText={text => setBindCode(text)}
              />
              {!props.isGoogleOpen ? renderCodeTouch() : null}
            </View>
          </View>
          <View style={styles.testView}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                ref={inputEl2}
                placeholder="请输入6位数字资金密码"
                keyboardType={'numeric'}
                maxLength={6}
                placeholderTextColor={UIColor.colorB3}
                secureTextEntry
                onChangeText={prePassword => setPrePassword(prePassword)}
              />
            </View>
          </View>
          <View style={styles.testView}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                ref={inputEl3}
                placeholder="请确认6位数字资金密码"
                keyboardType={'numeric'}
                maxLength={6}
                secureTextEntry
                placeholderTextColor={UIColor.colorB3}
                onChangeText={nextPassword => {
                  setNextPassword(nextPassword);
                }}
              />
            </View>
          </View>
          <Text style={styles.tipsText}>提示：重置资金密码后24小时内禁止提币</Text>
          <Button
            disabled={!(bindCode && prePassword !== '' && nextPassword !== '')}
            style={styles.button}
            onPress={() => updatetradepwdRequest()}
            disableColor={UIColor.disPressColor}>
            {props.isFetching ? '提 交 中...' : '提 交'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.capitalResetData,
    (state: Record<string, any>) => state.capitalCodeData,
    (state: Record<string, any>) => state.isGoogleOpen,
    (state: Record<string, any>) => state.baseAuthData,
    (state: Record<string, any>) => state.userInfo,
  ],
  (capitalResetData, capitalCodeData, isGoogleOpen, baseAuthData, userInfo) => {
    return {
      isFetching: capitalResetData.isFetching,
      capitalResetData: capitalResetData,
      capitalCodeData: capitalCodeData,
      isGoogleOpen: isGoogleOpen.isOpen,
      baseData: baseAuthData.data,
      userInfo: userInfo,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CapitalPwd);
