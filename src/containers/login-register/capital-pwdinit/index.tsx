import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView, TextInput } from 'space-ui';
import { useNavigation } from '../../../routes/navigation-service';
import UIColor from '../../../const/colors';
import outerStyles from './styles';
import { StateProps } from './interfaces';
import Imgs from '../../../const/image-set';
import mapDispatchToProps from './map-dispatch-to-props';
import { EasyToast } from '../../../components/EasyToast/toast';

const CapitalPwdInit = (props: any) => {
  const styles = outerStyles();
  const [password, setPassword] = useState('');
  const [passwordSure, setPasswordSure] = useState('');
  const [isSetPass, setIsSetPass] = useState(false);
  const [passCopy, setPassCopy] = useState('');
  const { goBack, navigate } = useNavigation();
  const input = useRef(null);

  const passBox = (length: number) => {
    return (
      <View style={styles.passBox} key={length}>
        {passCopy.length > length ? <Text style={styles.passText}>*</Text> : <View />}
        <View style={[styles.passBoxBot, { backgroundColor: passCopy.length > length ? UIColor.colorA1 : UIColor.disPressColor }]} />
      </View>
    );
  };

  const passBoxView = () => {
    let passBoxArr = [];
    for (let i = 0; i < 6; i++) {
      passBoxArr.push(passBox(i));
    }
    return passBoxArr;
  };

  const onFocuse = () => {
    Keyboard.dismiss();
    if (input) {
      // @ts-ignore
      input && input.current.blur();
      // @ts-ignore
      input && input.current.focus();
    }
  };

  const onBackClick = () => {
    if (isSetPass) {
      setIsSetPass(false);
      setPasswordSure('');
      setPassword('');
    } else {
      goBack();
    }
  };

  // 资金密码
  const checkFundPassword = (str: string) => {
    // 6位数字
    const reg = /^\d{6}$/;
    if (!reg.test(str)) {
      // isToast && EasyToast.show('密码限制为6位数字,', 'error');
      return false;
    }
    return true;
  };

  const nextTep = () => {
    if (password === passwordSure && passwordSure) {
      //提示: 设置中...
      Keyboard.dismiss();
      props.tradepwdRequest({ password });
    } else if (passwordSure.length === 6) {
      setPasswordSure('');
      EasyToast.show('两次输入的密码不一致,请重新设置!');
      //提示：'两次输入的密码不一致,请重新设置!';
    }

    if (password.length === 6) {
      if (checkFundPassword(password)) {
        setIsSetPass(true);
      } else {
        setPasswordSure('');
        EasyToast.show('资金密码包含非数值字符');
        //提示：'资金密码包含非数值字符';
      }
    }
  };

  useEffect(() => {
    setPassCopy(isSetPass ? passwordSure : password);
    nextTep();
  }, [passwordSure, password, passCopy, isSetPass]);

  useEffect(() => {
    console.log('props.capitalInitData=', props.capitalInitData);
    if (props.capitalInitData && props.capitalInitData.code) {
      if (props.capitalInitData.code === '1') {
        console.log('忘记密码后code的情况');
        navigate('Frame');
        props.removeCapitalInitCode();
      } else {
        // 提示错误
        console.log('忘记密码后错误提示=', props.capitalInitData.msg);
        EasyToast.show(props.capitalInitData.msg);
        setIsSetPass(false);
        setPasswordSure('');
        setPassword('');
        props.removeCapitalInitCode();
      }
    }
  }, [props.capitalInitData]);

  const onPwdChange = (text: string) => {
    setPassword(text);
  };

  const onSurePwdChange = (text: string) => {
    setPasswordSure(text);
  };

  return (
    <SafeAreaView>
      <ScrollView scrollEnabled={false} style={styles.scrollView}>
        <TouchableOpacity style={styles.backTouch} onPress={() => onBackClick()}>
          <Image source={Imgs.back} />
        </TouchableOpacity>
        <View style={styles.capitalView}>
          <Text style={styles.titleHeaderText}>设置资金密码</Text>
          {isSetPass ? <Text style={styles.tipText}>请再次输入资金密码</Text> : <Text style={styles.tipText}>请设置资金密码，用于支付验证</Text>}
          <TouchableOpacity style={styles.passBoxView} activeOpacity={1} onPress={onFocuse}>
            {passBoxView()}
          </TouchableOpacity>
          {!isSetPass ? (
            <TextInput style={styles.textInput} onChangeText={onPwdChange} keyboardType={'numeric'} ref={input} autoFocus value={password} maxLength={6} />
          ) : (
            <TextInput
              style={styles.textInput}
              onChangeText={onSurePwdChange}
              ref={input}
              autoFocus
              value={passwordSure}
              keyboardType={'numeric'}
              maxLength={6}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateProps) => {
  const { capitalInitData } = state;
  return {
    capitalInitData: capitalInitData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CapitalPwdInit);
