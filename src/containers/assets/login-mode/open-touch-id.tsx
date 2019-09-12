/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment, useEffect, useState } from 'react';
import { checkTouchID, showTouchID } from './check-touch';
import LocalStore from '../../../utils/local-store';
import Gesture from './gesture';
import TouchId from './touch-id';
import { AppState, DeviceEventEmitter } from 'react-native';
import { store } from '../../../redux/store';
import { sendWrapper } from '../../../utils/websocket-util';
import { LOGOUT } from '../../../redux/action-types';
import WebSocket from '../../../services/websocket';
import { DispatchProps, Props } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';
import { connect } from 'react-redux';

let isOne = true;
let isOpen = true;
let isChange = true;
let isGesture = false;

const OpenTouchId = (props: DispatchProps & Props & any) => {
  const [openGestrue, setOpenGestrue] = useState(false); //打开手势
  const [openTouch, setOpenTouch] = useState(false); //打开指纹或人脸
  const [one, setOne] = useState(true); //判断是否第一次登录
  const navigation = props.nav;

  const sendWebSocketInit = () => {
    const bbsInit = { msgType: 'bbs_init', msgData: { collectionCodes: '' } };
    WebSocket.getInstance().send(sendWrapper(bbsInit));
  };

  const loginOut = () => {
    props.resetState(LOGOUT);
    sendWebSocketInit();
  };

  const setIsOne = (bool: boolean) => {
    isOne = bool;
  };

  const touchIdLogin = (bool: boolean, value = '') => {
    if (bool) {
      setOpenTouch(false);
      isOne = false;
      isGesture = false;
      isOpen = true;
    } else {
      if (value === '000') {
        isOpen = true;
        new LocalStore().saveLocalRepository('touch', '-1');
        setOpenTouch(false);
        isOne = true;
        loginOut();
      }
    }
  };

  const gestrueLogin = (bool: boolean, value = '') => {
    if (bool) {
      setOpenGestrue(false);
      if (value === '000') {
        loginOut();
      }
    }
  };

  useEffect(() => {
    //初始化
    checkTouchID();
    const touchId = DeviceEventEmitter.addListener('touchId', touchIdLogin);
    if (one) {
      new LocalStore().fetchLocalRepository('gesture').then((res: any) => {
        if (res !== '-1') {
          setOpenGestrue(true);
        }
      });
      new LocalStore().fetchLocalRepository('touch').then((res: any) => {
        if (res !== '-1') {
          setOpenTouch(true);
        }
      });
    }
    setOne(false);

    return () => {
      touchId && touchId.remove();
    };
  }, []);

  store.subscribe(() => {
    if (store.getState().loginMode.gesture === '3') {
      setOpenGestrue(false);
    } else if (store.getState().loginMode.touch === '3') {
      setOpenTouch(false);
    }
  });

  AppState.addEventListener('change', newState => {
    if (newState !== null && newState === 'active') {
      new LocalStore().fetchLocalRepository('touch').then((res: any) => {
        if (res !== '-1' && isOpen && !isChange && isGesture && !isOne) {
          isOpen = false;
          setTimeout(() => {
            showTouchID();
          }, 200);
        }
      });
    } else if (newState !== null && (newState === 'inactive' || newState === 'background')) {
      //DeviceEventEmitter.emit('closePlane');
      new LocalStore().fetchLocalRepository('gesture').then((res: any) => {
        if (res !== '-1') {
          setOpenGestrue(true);
          DeviceEventEmitter.emit('closePlane');
        }
      });
      new LocalStore().fetchLocalRepository('touch').then((res: any) => {
        if (res !== '-1') {
          isGesture = true;
          isChange = false;
          setOpenTouch(true);
          DeviceEventEmitter.emit('closePlane');
        }
      });
    }
  });

  const isOpenGestrue = () => {
    if (openGestrue) {
      return <Gesture type={'1'} navigate={navigation} gestrueLogin={gestrueLogin} />;
    }
    return;
  };

  const isOpenTouch = () => {
    if (openTouch) {
      return <TouchId type={'1'} navigation={navigation} touchIdLogin={touchIdLogin} isOne={isOne} setIsOne={setIsOne} />;
    }
  };

  return (
    <Fragment>
      {isOpenGestrue()}
      {isOpenTouch()}
    </Fragment>
  );
};

export default connect(
  null,
  mapDispatchToProps,
)(OpenTouchId);
