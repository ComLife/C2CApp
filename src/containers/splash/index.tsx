/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus, DeviceEventEmitter, Platform, StatusBar, Text, View } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import { Sentry } from 'react-native-sentry';
import { createSelector } from 'reselect';
import { Indicator } from 'space-ui';
import { useNavigation } from '../../routes/navigation-service';
import WebSocket from '../../services/websocket';
import { ab2json, sendWrapper } from '../../utils/websocket-util';
import { I18n } from '../../localization/i18n';
import LocalStore from '../../utils/local-store';
import { DeviceEventType, ERROR_CODE } from '../../const/enum-set';
import {
  ASS_LOCAL_COLLECTION,
  BBS_COLLECTION_LIST,
  BBS_INCREASETOP_R,
  GET_CLOUD_WALLET_TYPE_REMOVE,
  GET_VIEW_WALLET_REMOVE,
  GET_WALLET_CLOUDASSETS_REMOVE,
  LOGOUT,
  MARKET_INFO,
  MARKET_LIST_INFO,
  ORDERBOOK,
  USER_ENTRUST_ORDERS_REMOVE,
} from '../../redux/action-types';
import { store } from '../../redux/store';
import Config from '../../const/config';
import DelayStore from '../../utils/delay-store';
import Forced from '../../components/forced';
import Colors from '../../const/colors';
import { EasyToast } from '../../components/EasyToast/toast';
import { DispatchProps, Props, StateProps } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';
import styles from './styles';

let timer1: any = null;
let timer2: any = null;
const TIMEOUT = 800;

const Splash = (props: DispatchProps & Props & StateProps) => {
  SplashScreen.hide();

  const { navigate } = useNavigation();

  const onRefreshLoginToken = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    const { data } = store.getState().userInfo;
    if (data && data.userName && data.encrypt_pwd) {
      props.loginRequest({ phone: data.userName, password: data.encrypt_pwd, encrypt_flag: true });
    }
  };

  const resetStateItems = () => {
    props.resetState(LOGOUT);
    props.resetState(USER_ENTRUST_ORDERS_REMOVE);
    props.resetState(GET_VIEW_WALLET_REMOVE);
    props.resetState(GET_WALLET_CLOUDASSETS_REMOVE);
    props.resetState(GET_CLOUD_WALLET_TYPE_REMOVE);
  };

  const onReLogin = () => {
    EasyToast.show('其他设备已登录,请重新输入密码');
    resetStateItems();
    navigate('Login');
  };

  const sentryConfig = () => {
    Sentry.config('https://28bf57ed8f4f4150852fbd3edac47372@sentry.io/1521444').install();
  };

  useEffect(() => {
    DeviceEventEmitter.removeListener(DeviceEventType.REFRESH_LOGIN_TOKEN, onRefreshLoginToken);
    DeviceEventEmitter.removeListener(DeviceEventType.RE_LOGIN, onReLogin);
    // 先删除事件，再加事件
    DeviceEventEmitter.addListener(DeviceEventType.REFRESH_LOGIN_TOKEN, onRefreshLoginToken);
    DeviceEventEmitter.addListener(DeviceEventType.RE_LOGIN, onReLogin);
  }, []);

  const sendWebSocketInit = () => {
    const bbsInit = { msgType: 'bbs_init', msgData: { collectionCodes: '' } };
    WebSocket.getInstance().send(sendWrapper(bbsInit));
  };

  // 首页涨幅榜
  const increaseTop = () => {
    const bbsInit = { msgType: 'bbs_increasetop', msgData: {} };
    WebSocket.getInstance().send(sendWrapper(bbsInit));
  };

  // 不需要反持久化请求
  useEffect(() => {
    props.bannerListRequest();
    props.getCloudWalletTypeRequest();
    props.getAllCloudWalletTypeRequest();
  }, []);

  // 反持久化 store 数据的请求
  useEffect(() => {
    timer1 = setTimeout(() => {
      sendWebSocketInit();
      increaseTop();
      if (props.userInfo && props.userInfo.data) {
        props.getAuthRequest();
      }
      props.getAuthOnoffRequest();
    }, TIMEOUT / 2);
    return () => clearTimeout(timer1);
  }, []);

  // 需要反持久化请求
  useEffect(() => {
    const { isInstalled } = props;
    timer2 = setTimeout(() => {
      if (isInstalled) {
        navigate('Frame');
      } else {
        navigate('Welcome');
      }
    }, TIMEOUT);
    return () => clearTimeout(timer2);
  }, [props.isInstalled]);

  // WebSocket onMessage
  useEffect(() => {
    WebSocket.getInstance().onMessage((message: Record<string, any>) => {
      if (!message || !message.data || message.data === 'pong') {
        return;
      }
      const { code, data } = ab2json(message.data);
      if (!data || code !== ERROR_CODE.SUCCESS || !data.msgType) {
        if (data && data.code === ERROR_CODE.TOKEN_FAIL) {
          // 清空失效的 Token
          resetStateItems();
        }
        console.warn('WebSocket服务器错误:', data);
        return;
      }
      if (data.msgType === 'user_repeat_login') {
        EasyToast.show('其他设备已登录,请重新输入密码');
        resetStateItems();
        navigate('Login');
        return;
      }
      if (data.msgType === ORDERBOOK) {
        // @ts-ignore
        DelayStore.chacheData.orderBook.data.push(data);
      } else if (data.msgType === MARKET_INFO) {
        // @ts-ignore
        DelayStore.chacheData.marketInfo.data.push(data);
      } else if (data.msgType === MARKET_LIST_INFO) {
        // @ts-ignore
        DelayStore.chacheData.marketListInfo.data.push(data);
      } else if (data.msgType === BBS_INCREASETOP_R) {
        // @ts-ignore
        DelayStore.chacheData.bbsIncreasetopR.data.push(data);
      } else if (data.msgType === BBS_COLLECTION_LIST) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        //@ts-ignore
        const data1 = store.getState().userInfo.data;
        if (data1 && data1.userName && data1.encrypt_pwd) {
          props.storeState(data.msgType, data);
        } else {
          props.storeState(ASS_LOCAL_COLLECTION, data);
        }
      } else {
        props.storeState(data.msgType, data);
      }
    });
    // empty-array means don't watch for any updates
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor(Colors.whiteColor);
  }, []);

  //检测语言
  useEffect(() => {
    new LocalStore().fetchLocalRepository('localLanguage').then(res => {
      console.log('localLanguage=====', res);
      if (res) {
        // @ts-ignore
        I18n.locale = res;
        console.log('default setting language======', I18n.locale);
      }
    });
  }, []);

  // 设置 DeviceInfo 信息
  useEffect(() => {
    Config.headers.deviceid = DeviceInfo.getUniqueID();
    Config.headers.appsource = Platform.OS;
    Config.bundleId = DeviceInfo.getBundleId();
    sentryConfig();
  }, []);

  const clearTimer = () => {
    timer1 && clearTimeout(timer1);
    timer2 && clearTimeout(timer2);
    timer1 = null;
    timer2 = null;
  };

  return (
    <View style={styles.container}>
      <Indicator />
      <Text style={styles.text}>加载中...</Text>
    </View>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.userInfo, (state: Record<string, any>) => state.appConfig, (state: Record<string, any>) => state.marketInfo],
  (userInfo, appConfig, marketInfo) => {
    return {
      userInfo,
      isInstalled: appConfig.isInstalled,
      marketInfoData: marketInfo.msgData,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
