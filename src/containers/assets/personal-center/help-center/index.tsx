/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, Platform, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import { createSelector } from 'reselect';
import { useNavigation } from '../../../../routes/navigation-service';
import outerStyles from '../styles';
import PersonalItem from './item';
import LocalStore from '../../../../utils/local-store';
import VerificationLogin from './verification-login';
import Header from './header';
import { checkTouch, showTouchID } from '../../login-mode/check-touch';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props } from './interfaces';
import { connect } from 'react-redux';
import { EasyToast } from '../../../../components/EasyToast/toast';

const HelpCenter = (props: DispatchProps & Props & any) => {
  const styles = outerStyles();
  const { navigate, goBack } = useNavigation();
  const [gesture, setGesture] = useState(false);
  const [touchId, setTouchId] = useState(false);
  const [openVer, setOpenVer] = useState(false);
  const [type, setType] = useState('0');
  const [isOne, setIsOne] = useState(true);
  const [touchValue, setTouchValue] = useState('0');
  const [isGoogleOpen, setisGoogleOpen] = useState(false);

  const close = (value: string) => {
    // type  为1时手势密码设置登录成功 2 手势取消密码 3 人脸或指纹成功 4 人脸或指纹取消
    if (value === '1') {
      setGesture(true);
    } else if (value === '2') {
      new LocalStore().saveLocalRepository('gesture', '-1');
      EasyToast.show('设置成功');
      setGesture(false);
    } else if (value === '3') {
      showTouchID();
      setTouchId(true);
    } else if (value === '4') {
      new LocalStore().saveLocalRepository('touch', '-1');
      EasyToast.show('设置成功');
      setTouchId(false);
    } else {
      new LocalStore().fetchLocalRepository('gesture').then(res => {
        if (res !== '-1') {
          setGesture(true);
        } else {
          setGesture(false);
        }
      });
      //取出Touch本地值
      new LocalStore().fetchLocalRepository('touch').then(res => {
        if (res !== '-1') {
          setTouchId(true);
        } else {
          setTouchId(false);
        }
      });
    }
    props.removeLoginSafeCode();
    setOpenVer(false);
  };

  const touchIdLogin = (bool: boolean, value = '') => {
    if (bool) {
      setTouchId(true);
      new LocalStore().fetchLocalRepository('touch').then(res => {
        if (res === '-1') {
          setTimeout(() => {
            EasyToast.show('设置成功');
          }, 200);
        }
      });

      if (Platform.OS === 'android') {
        new LocalStore().saveLocalRepository('touch', '1');
      } else {
        new LocalStore().saveLocalRepository('touch', checkTouch);
      }
    } else {
      if (value !== '100') {
        setTimeout(() => {
          EasyToast.show(value);
        }, 200);
      }
      setTouchId(false);
    }
  };

  const gesturePass = (bool: boolean, value = '') => {
    if (bool && value === '1') {
      setGesture(true);
    } else if (bool) {
      setTimeout(() => {
        EasyToast.show('设置成功');
      }, 200);
    } else {
      setGesture(false);
    }
  };

  const closePlane = () => {
    close('');
  };

  useEffect(() => {
    props.getGoolgeIsOpen({ token: props.userInfo.data.token }, (data: any) => {
      if (data.code === '1') {
        setisGoogleOpen(data.data.isOpen);
      }
    });
  }, [props.isGoogleOpen]);

  useEffect(() => {
    const touchIdEmitter = DeviceEventEmitter.addListener('touchId', touchIdLogin);
    const gestureEmitter = DeviceEventEmitter.addListener('gesturePass', gesturePass);
    const closePlaneEmitter = DeviceEventEmitter.addListener('closePlane', closePlane);
    //取出手势本地值
    if (isOne) {
      new LocalStore().fetchLocalRepository('gesture').then(res => {
        if (res !== '-1') {
          setGesture(true);
        }
      });
      //取出Touch本地值
      new LocalStore().fetchLocalRepository('touch').then(res => {
        if (res !== '-1') {
          setTouchId(true);
        }
      });
    }

    setIsOne(false);
    if (Platform.OS !== 'android') {
      setTouchValue(checkTouch);
    } else {
      setTouchValue('1');
    }
    return () => {
      touchIdEmitter && touchIdEmitter.remove();
      gestureEmitter && gestureEmitter.remove();
      closePlaneEmitter && closePlaneEmitter.remove();
    };
  }, []);

  //重置资金密码
  const onReset = () => {
    navigate('CapitalPwd');
  };

  //开启Google认证
  const onOpenGoogle = () => {
    navigate('GoogleAuth');
  };

  //开启手势密码
  const onGesture = () => {
    if (touchId) {
      setOpenVer(false);
      setTimeout(() => {
        EasyToast.show('同时只能开启一个');
      }, 200);
    } else if (gesture === false) {
      setGesture(true);
      setOpenVer(true);
      setType('1');
    } else if (gesture === true) {
      setGesture(false);
      setOpenVer(true);
      setType('2');
    }
  };

  // const openPanel = () => {
  //   EasyToast.show('设置成功');
  // };

  //开启Touch
  const onTouchId = () => {
    if (gesture) {
      setOpenVer(false);
      setTimeout(() => {
        EasyToast.show('同时只能开启一个');
      }, 200);
    } else if (touchId === false) {
      setTouchId(true);
      setOpenVer(true);
      setType('3');
    } else if (touchId === true) {
      setTouchId(false);
      setOpenVer(true);
      setType('4');
    }
  };

  // useEffect(() => {
  //   if (props.loginMode.gesture === '3') {
  //     openPanel();
  //   }
  //   // deps 为 [props.userInfo] 表示 props.userInfo 变化了才执行
  // }, [props.loginMode]);

  const back = () => {
    goBack();
  };

  let data = {};

  if (touchValue === '1') {
    data = { titleText: '指纹解锁', onClick: onTouchId, type: 'btn', isOpen: touchId };
  } else if (touchValue === '2') {
    data = { titleText: '人脸识别', onClick: onTouchId, type: 'btn', isOpen: touchId };
  }

  //数据
  const dataOne = [
    { titleText: '资金密码', onClick: onReset, type: '重置' },
    { titleText: 'Google认证', onClick: onOpenGoogle, type: isGoogleOpen ? '关闭' : '开启' },
    { titleText: '手势密码', onClick: onGesture, type: 'btn', isOpen: gesture },
  ];

  if (touchValue === '1' || touchValue === '2') {
    // @ts-ignore
    dataOne.push(data);
  }

  const itemMap = (item: any, index: number) => {
    return <PersonalItem key={index} titleText={item.titleText} onClick={item.onClick} type={item.type} isOpen={item.isOpen} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'安全中心'} onBack={back} />
      <View style={styles.indexBg}>
        <View style={styles.indexView} />
        {dataOne.map((item, index) => itemMap(item, index))}
        {openVer ? (
          <VerificationLogin
            onClose={close}
            type={type}
            userInfo={props.userInfo}
            dispatchRemoveCode={props.removeLoginSafeCode}
            dispatchSafeCode={props.loginSafe}
            removeLoginCode={props.removeLoginCode}
          />
        ) : null}
      </View>
      {/*{gesToaster ? <Toaster message={{ text: panelText, styles: ToastStyles.error }} /> : null}*/}
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.loginMode, (state: Record<string, any>) => state.userInfo, (state: Record<string, any>) => state.isGoogleOpen],
  (loginMode, userInfo, isGoogleOpen) => {
    return {
      loginMode: loginMode,
      userInfo: userInfo,
      isGoogleOpen: isGoogleOpen.isOpen,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelpCenter);
