/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment, useEffect, useState } from 'react';
import Colors from '../../../const/colors';
import { DeviceEventEmitter, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import { setRatio, setText } from '../../../utils/screen-util';
import GesturePassword from 'react-native-smart-gesture-password';
import { useNavigation } from '../../../routes/navigation-service';
import LocalStore from '../../../utils/local-store';
import TocComponents from './components/top-components';
import MessageComponent from './components/message-component';
import outerStyles from './styles';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props } from './interfaces';

//type为真时 挂起 为假时跳转进入

function Gesture(props: DispatchProps & Props & any) {
  const styles = outerStyles();
  const { type, navigate, gestrueLogin } = props;
  const navigation = useNavigation();
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState('请绘制手势密码');
  const [messageColor, setMessageColor] = useState(Colors.colorA3);
  const [cachedPassword, setCachedPassword] = useState('');
  const [errorNum, setErrorNum] = useState(3);
  const [isOne, setIsOne] = useState(false);
  const [gesture, setGesture] = useState('');

  useEffect(() => {
    //初始化
    if (type) {
      new LocalStore().fetchLocalRepository('gesture').then((res: any) => {
        if (res !== '-1') {
          setGesture(res);
          setCachedPassword(res);
        }
      });
    }

    if (type) {
      setMessage('请绘制手势密码');
    } else {
      setMessage('请设置手势密码');
    }

    return () => {
      //
    };
  }, []);

  const onClose = (bool: boolean) => {
    if (!type) {
      navigation.goBack();
      if (bool === true) {
        DeviceEventEmitter.emit('gesturePass', true);
        props.gestureLogin('3');
        setTimeout(() => {
          props.gestureLogin('0');
        }, 200);
      } else {
        new LocalStore().saveLocalRepository('gesture', '-1');
        DeviceEventEmitter.emit('gesturePass', false);
      }
    } else {
      if (bool === true) {
        props.gestureLogin('3');
        setTimeout(() => {
          props.gestureLogin('0');
        }, 200);
        DeviceEventEmitter.emit('gesturePass', true, '1');
      } else {
        gestrueLogin(true, '000');
        new LocalStore().saveLocalRepository('gesture', '-1');
        navigate.navigate('Login');
      }
    }
  };

  useEffect(() => {
    if (!errorNum) {
      onClose(false);
    }
  }, [errorNum]);

  //看设计图重做(顶部组件)
  const topPanel = () => {
    let isShow = false;
    if (type) {
      isShow = true;
    }

    return (
      <Fragment>
        <TocComponents isShowLeftTitle={isShow} onPressLeft={onClose} />
        <MessageComponent messageText={message} messageColor={messageColor} />
      </Fragment>
    );
    // return <View style={styles.indexView} />;
  };

  //根据文案重做（提示语）
  const messageFinish = (password: string) => {
    if (password.length < 6) {
      setMessage(`至少需要连接6个点,请重新绘制,当前剩余${errorNum - 1}次`);
      setMessageColor(Colors.colorA3);
      setErrorNum(errorNum - 1);
    } else if (!cachedPassword) {
      setMessage('设置成功');
      setMessageColor(Colors.colorA3);
      setIsOne(true);
      setCachedPassword(password);
    } else if (cachedPassword) {
      if (cachedPassword === password) {
        new LocalStore().saveLocalRepository('gesture', password);
        setMessage('设置成功');
        setMessageColor(Colors.colorA3);
        onClose(true);
      } else {
        setMessage(`密码输入不一致,请重新绘制,当前剩余${errorNum - 1}次`);
        setMessageColor(Colors.colorA3);
        setErrorNum(errorNum - 1);
      }
    }
  };
  //根据文案重做（中间提示）
  const reset = () => {
    if (gesture) {
      setMessage('请绘制手势密码');
    } else if (isOne) {
      setMessage('请确认手势密码');
    } else {
      setMessage('请设置手势密码');
    }
    setWarning(false);
    setMessageColor(Colors.colorA3);
  };

  const openGesture = () => {
    return (
      <GesturePassword
        style={{}}
        pointBackgroundColor="#F4F4F4"
        isWarning={warning}
        gestureAreaLength={setRatio(500)} //圆形大小
        color="#A9A9A9"
        activeColor="#00AAEF"
        warningColor="red"
        warningDuration={1500}
        allowCross
        topComponent={topPanel()}
        onFinish={messageFinish}
        onReset={reset}
      />
    );
  };
  return (
    <View style={styles.bg}>
      <SafeAreaView style={styles.container}>{openGesture()}</SafeAreaView>
    </View>
  );
}

export default connect(
  null,
  mapDispatchToProps,
)(Gesture);
