import React, { Fragment, useEffect, useState } from 'react';
import { AppState, Clipboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, SafeAreaView, TextInput } from 'space-ui';
import mapDispatchToProps from './map-dispatch-to-props';
import useInterval from '../../components/use-interval';
import UIColor from '../../const/colors';
import { connect } from 'react-redux';
import outerStyles from './styles';
import InputBox from './input-box';
import { useNavigation } from '../../routes/navigation-service';
import Header from '../../components/header';
import { EasyToast } from '../../components/EasyToast/toast';
import { createSelector } from 'reselect';

const GoogleSet = (props: any) => {
  const styles = outerStyles();
  const [secretKey, setSecretKey] = useState('');
  const [messageCode, setMessageCode] = useState('');
  const [googleCode, setGoogleCode] = useState('');
  const [capitalPass, setCapitalPass] = useState('');
  const [bindCode, setBindCode] = useState('');
  const [waitTime, setWaitTime] = useState(0);
  const [backgroundTime, setBackgroundTime] = useState(0);
  const navigation = useNavigation();
  const Token = props.userInfo.data && props.userInfo.data.token ? props.userInfo.data.token : '';

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

  useInterval(
    () => {
      setWaitTime(waitTime - 1);
    },
    // @ts-ignore
    waitTime ? 1000 : null,
  );
  // 复制文本
  const copyText = () => {
    // 提示复制成功
    EasyToast.show('复制成功');
    Clipboard.setString(secretKey);
  };
  // 获取短信验证码
  const getMessageCode = () => {
    props.getGoolgeCode({ token: Token });
  };
  useEffect(() => {
    if (props.googleMessCode && props.googleMessCode.code) {
      if (props.googleMessCode.code === '1') {
        console.log('谷歌认证验证码的变化情况');
        EasyToast.show('验证码发送成功，请注意查收');
        setWaitTime(60);
        props.removeGoogleMessCode();
      } else {
        // 提示错误
        console.log('谷歌认证短信验证码错误后的变化情况=', props.googleMessCode.msg);
        EasyToast.show(props.googleMessCode.msg);
        props.removeGoogleMessCode();
      }
    }
  });
  // 粘贴文本
  const pasteText = async () => {
    try {
      const content = await Clipboard.getString();
      setGoogleCode(content);
    } catch (e) {
      // 提示错误信息
      // EasyToast.show(e.message);
    }
  };
  // 输入短信验证码
  const changeCode = (value: string) => {
    setMessageCode(value);
  };
  // 输入谷歌验证码
  const changeGoogleCode = (value: string) => {
    setGoogleCode(value);
  };
  // 输入资金密码
  const changeCapitalCode = (value: string) => {
    setCapitalPass(value);
  };
  // 获取密钥
  const getSecretKey = () => {
    props.googleSecretKeyRequest({ token: Token });
  };
  useEffect(() => {
    if (props.googleSecret && props.googleSecret.code) {
      if (props.googleSecret.code === '1') {
        console.log('谷歌认证密钥的变化情况');
        setSecretKey(props.googleSecret.data.secretKey);
        props.removeSecretKeyCode();
      } else {
        // 提示错误
        console.log('谷歌认证密钥错误后的变化情况=', props.googleSecret.msg);
        EasyToast.show(props.googleSecret.msg);
        props.removeSecretKeyCode();
      }
    }
  }, [props.googleSecret]);
  // 关闭谷歌认证
  const closeGoogleAuth = () => {
    props.closeGoogleAuthRequest({ msgCode: bindCode });
  };
  useEffect(() => {
    if (props.closeGoogleData && props.closeGoogleData.code) {
      if (props.closeGoogleData.code === '1') {
        navigation.goBack();
        console.log('关闭谷歌认证的变化情况');
        props.removeCloseGoogleCode();
      } else {
        // 提示EasyToast.show(res.msg);
        console.log('关闭谷歌认证密钥错误后的变化情况=', props.closeGoogleData.msg);
        EasyToast.show(props.closeGoogleData.msg);
        props.removeCloseGoogleCode();
      }
    }
  }, [props.closeGoogleData]);
  // 开启谷歌认证
  const openGoogleAuth = () => {
    props.openGoogleAuthRequest({
      token: Token,
      googleCode,
      paymentCode: capitalPass,
      msgCode: messageCode,
      secretKey,
    });
  };
  useEffect(() => {
    if (props.googleAuthData && props.googleAuthData.code) {
      if (props.googleAuthData.code === '1') {
        console.log('谷歌认证开启的变化情况');
        navigation.goBack();
        props.removeGoogleDataCode();
      } else {
        //提示 EasyToast.show(res.msg);
        console.log('谷歌认证开启错误后的变化情况=', props.googleAuthData.msg);
        EasyToast.show(props.googleAuthData.msg);
        props.removeGoogleDataCode();
      }
    }
  }, [props.googleAuthData]);

  const renderCodeTouch = () =>
    waitTime <= 0 ? (
      <TouchableOpacity activeOpacity={0.5} style={styles.leftPos} onPress={() => getMessageCode()}>
        <Text style={styles.leftTimeText}>获取验证码</Text>
      </TouchableOpacity>
    ) : (
      <Text style={[styles.leftTimeText, styles.leftPos]}>{`(${waitTime}s)`}</Text>
    );

  useEffect(() => {
    console.log('GoogleSet==', props);
    if (!props.isOpen) {
      getSecretKey();
    }
  }, []);

  let authData = [
    {
      title: '密钥',
      placeholderText: '',
      clickText: '复制',
      editableBool: false,
      secureTextEntryBool: true,
      inputValue: secretKey,
      onPressClick: copyText,
    },
    {
      title: '短信验证码',
      placeholderText: '请输入短信验证码',
      clickText: waitTime <= 0 ? '获取验证码' : `${waitTime}s`,
      editableBool: true,
      secureTextEntryBool: true,
      inputValue: messageCode,
      onPressClick: getMessageCode,
      inputClick: changeCode,
    },
    {
      title: '谷歌验证码',
      placeholderText: '请输入谷歌验证码',
      clickText: '粘贴',
      editableBool: true,
      secureTextEntryBool: true,
      onPressClick: pasteText,
      inputValue: googleCode,
      inputClick: changeGoogleCode,
    },
    {
      title: '资金密码',
      placeholderText: '请输入资金密码',
      clickText: '',
      editableBool: true,
      secureTextEntryBool: false,
      inputValue: capitalPass,
      inputClick: changeCapitalCode,
    },
  ];
  const isTouch = !(messageCode && googleCode && capitalPass) ? true : false;
  return (
    <Fragment>
      <SafeAreaView>
        <Header title={'Google认证'} onClick={() => navigation.goBack()} />
        <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
          {!props.isOpen ? (
            <View style={styles.googleBg}>
              <View style={styles.gapView} />
              <View style={styles.authView}>
                {authData.map((item, index) => {
                  return <InputBox {...item} key={index} />;
                })}
              </View>
              <View style={styles.processView}>
                <Text style={styles.processText}>1.安装Google身份验证器，点击右下角”+”号，选择”手动输入验证码”</Text>
                <Text style={styles.processText}>2.复制上面的”秘钥 到Google身份验证器的“秘钥”输入栏，并填写你的账号，点击”完成”</Text>
                <Text style={styles.processText}>3.复制”谷歌验证码”，粘贴到上面的”谷歌验证码”输入栏</Text>
              </View>
              <Button onPress={openGoogleAuth} style={styles.googleBtn} disabled={isTouch} disableColor={UIColor.disPressColor}>
                开启Google认证
              </Button>
            </View>
          ) : (
            <View style={styles.googleCloseView}>
              <View style={styles.noticeView}>
                <Text style={styles.noticeText1}>您的账号已绑定谷歌认证功能！如果您要取消此功能，请输入您的短信验证码</Text>
              </View>
              <View style={styles.testView}>
                <View style={styles.inputView}>
                  <TextInput style={styles.inputbox} placeholder="请输入验证码" keyboardType={'numeric'} onChangeText={(value: string) => setBindCode(value)} />
                  {renderCodeTouch()}
                </View>
              </View>
              <Button onPress={closeGoogleAuth} style={styles.closeGoogleBtn} disabled={!bindCode ? true : false} disableColor={UIColor.disPressColor}>
                关闭Google认证
              </Button>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.isGoogleOpen,
    (state: Record<string, any>) => state.googleSecret,
    (state: Record<string, any>) => state.googleMessCode,
    (state: Record<string, any>) => state.googleAuthData,
    (state: Record<string, any>) => state.closeGoogleData,
    (state: Record<string, any>) => state.userInfo,
  ],
  (isGoogleOpen, googleSecret, googleMessCode, googleAuthData, closeGoogleData, userInfo) => {
    return {
      isOpen: isGoogleOpen.isOpen,
      googleSecret: googleSecret,
      googleMessCode: googleMessCode,
      googleAuthData: googleAuthData,
      closeGoogleData: closeGoogleData,
      userInfo,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GoogleSet);
