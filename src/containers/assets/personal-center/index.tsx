import React, { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import { createSelector } from 'reselect';
import { useNavigation } from '../../../routes/navigation-service';
import Button from '../../../../packages/space-ui/button';
import Shadow from '../../../../packages/space-ui/shadow-view';
import Colors from '../../../const/colors';
import { setRatio, setText } from '../../../utils/screen-util';
import Imgs from '../../../const/image-set';
import {
  GET_CLOUD_WALLET_TYPE_REMOVE,
  GET_VIEW_WALLET_REMOVE,
  GET_WALLET_CLOUDASSETS_REMOVE,
  LOGOUT,
  REMOVE_COLLECTION,
  USER_ENTRUST_ORDERS_REMOVE,
} from '../../../redux/action-types';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import { connect } from 'react-redux';
import { DispatchProps, Props, StateProps } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';
import Header from './header';
import outerStyles from './styles';
import PersonalItem from './item';
import LocalStore from '../../../utils/local-store';

const PersonalCenter = (props: DispatchProps & Props) => {
  const { navigate, goBack } = useNavigation();
  const styles = outerStyles();

  //身份认证回调
  const onCertification = () => {
    navigate('Authentication');
  };

  //安全中心回调
  const onSafe = () => {
    navigate('HelpCenter');
  };

  //在线客服回调
  const onService = () => {};

  //帮助中心回调
  const onHelp = () => {
    navigate('Help');
  };

  //数据
  const dataOne =
    props.getAuthenOnoff && props.getAuthenOnoff.data
      ? [{ titleText: '身份认证', onClick: onCertification }, { titleText: '安全中心', onClick: onSafe }]
      : [{ titleText: '安全中心', onClick: onSafe }];

  const dataTwo = [{ titleText: '帮助中心', onClick: onHelp }];

  const itemMap = (item: any, index: number) => {
    return <PersonalItem key={index} titleText={item.titleText} onClick={item.onClick} />;
  };

  const sendWebSocketInit = () => {
    const bbsInit = { msgType: 'bbs_init', msgData: { collectionCodes: '' } };
    WebSocket.getInstance().send(sendWrapper(bbsInit));
  };

  const loginOut = () => {
    props.resetState(LOGOUT);
    props.resetState(USER_ENTRUST_ORDERS_REMOVE);
    props.resetState(GET_VIEW_WALLET_REMOVE);
    props.resetState(GET_WALLET_CLOUDASSETS_REMOVE);
    props.resetState(GET_CLOUD_WALLET_TYPE_REMOVE);
    props.resetState(REMOVE_COLLECTION);
    new LocalStore().saveLocalRepository('gesture', '-1');
    new LocalStore().saveLocalRepository('touch', '-1');
    navigate('Login');
    WebSocket.getInstance().close();
    WebSocket.getInstance().reconnect();
    sendWebSocketInit();
  };

  const isOpenBtn = () => {
    return (
      <View style={styles.container1}>
        <Shadow style={styles.shadow}>
          <Button
            borderRadius={setRatio(5)}
            backgroundColor={Colors.colorA3}
            width={setRatio(573)}
            height={setRatio(85)}
            fontSize={setText(22)}
            onPress={loginOut}>
            退出登录
          </Button>
        </Shadow>
      </View>
    );
  };

  const back = () => {
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.indexBg}>
        <Header onBack={back} title={props.userData.userName} image={Imgs.icon_login_logo} />
        <View style={styles.indexView} />
        {dataOne.map((item, index) => itemMap(item, index))}
        {/*<View style={styles.indexView} />*/}
        {dataTwo.map((item, index) => itemMap(item, index))}
        {isOpenBtn()}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.userInfo, (state: Record<string, any>) => state.getAuthenOnoff],
  (userInfo, getAuthenOnoff) => {
    const { data = {} } = userInfo;
    return {
      userData: data,
      getAuthenOnoff,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalCenter);
