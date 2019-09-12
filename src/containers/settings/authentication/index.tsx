/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { createSelector } from 'reselect';
import { SafeAreaView } from 'space-ui';
import { NavigationEventPayload, useNavigation, useNavigationEvents } from '../../../routes/navigation-service';
import AuthenticationComFrame from './authentication-com-frame';
import AuthenticationHeader from './authentication-header-top';
import outerStyles from './styles';
import { DispatchProps, Props, StateProps } from './interfaces';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { AUTH_LEVEL, ERROR_CODE } from '../../../const/enum-set';
import { getAbbreviation } from '../../../utils/wallet-utils';
import Imgs from '../../../const/image-set';
import Header from './header';

const Authentication = (props: DispatchProps & Props) => {
  const { navigate, goBack } = useNavigation();
  const [primary, setPrimary] = useState('可进行单笔少于3K的法币交易');
  const [intermediate, setIntermediate] = useState('可进行单笔少于2W的法币交易');
  const [senior, setSenior] = useState('可进行单笔少于10W的法币交易');

  const styles = outerStyles();

  useNavigationEvents((evt: NavigationEventPayload) => {
    if (evt.type === 'didFocus') {
      props.getAuthRequest();
    }
  });
  const onAuthenticationPrimary = () => {
    navigate('AuthenticationPrimary', { authInfo: props });
  };
  const onAuthenticationIntermediate = () => {
    navigate('AuthenticationIntermediate', { url: props.authPhotoUrl });
  };
  const onAuthenticationSenior = () => {
    navigate('AuthenticationSenior', { url: props.authVideoUrl, isExamine: props.authenticationStatus, errorAuth: props.errorAuth });
  };

  useEffect(() => {
    if (props.quota && props.quota.data) {
      const datas = JSON.parse(props.quota.data.params);
      setPrimary(`可进行单笔少于${getAbbreviation(datas.primary)}的法币交易`);
      setIntermediate(`可进行单笔少于${getAbbreviation(datas.intermediate)}的法币交易`);
      setSenior(`可进行单笔少于${getAbbreviation(datas.senior)}的法币交易`);
    }
  }, [props.quota]);

  useEffect(() => {
    console.log('like componentDidMount');
    props.getAuthQuotaRequest();
    return () => {
      console.log('like componentWillUnmount');
    };
    // empty-array means don't watch for any updates
  }, []);

  // const pushAuthen = (item, key) => {
  //   if (key === 0) {
  //     this.props.navigation.navigate('Authentication');
  //   } else if (key === 1) {
  //     this.props.navigation.navigate('AuthenticationSenior', { url: this.authPhotoUrl });
  //   } else {
  //     this.props.navigation.navigate('AuthenticationFace', { url: this.authVideoUrl, isExamine: this.state.authenticationStatus, errorAuth: this.errorAuth });
  //   }
  // };
  const onBack = () => {
    goBack();
  };

  return (
    <SafeAreaView style={styles.sefleView} forceInset={{ top: 'always', bottom: 'never' }}>
      <ScrollView alwaysBounceVertical={false} contentInsetAdjustmentBehavior="automatic" style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Header title="身份认证" navigation={navigate} leftTitle="" leftImage={Imgs.back} onPressLeft={onBack} />
          <View style={styles.sectionContainer}>
            <AuthenticationHeader level={props.level} dataString1={'初级认证'} dataString2={'中级认证'} dataString3={'高级认证'} />
            <AuthenticationComFrame
              onPress={onAuthenticationPrimary}
              level={props.level}
              index={0}
              name={'初级认证'}
              authenticationStatus={props.authenticationStatus}
              authenticationContext={primary}
            />
            <AuthenticationComFrame
              onPress={onAuthenticationIntermediate}
              level={props.level}
              index={1}
              name={'中级认证'}
              authenticationStatus={props.authenticationStatus}
              authenticationContext={intermediate}
            />
            <AuthenticationComFrame
              onPress={onAuthenticationSenior}
              level={props.level}
              index={2}
              name={'高级认证'}
              authenticationStatus={props.authenticationStatus}
              authenticationContext={senior}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.getAuthRequest, (state: Record<string, any>) => state.getAuthenQuota],
  (getAuthRequest, getAuthenQuota) => {
    if (!getAuthRequest || !getAuthRequest.data || !getAuthenQuota || !getAuthenQuota.data) {
      return { authenticationStatus: 0, level: 0, quota: getAuthenQuota };
    }
    let levelAuth = -1;
    if (String(getAuthRequest.code) === ERROR_CODE.SUCCESS) {
      if (
        getAuthRequest.data.state === AUTH_LEVEL.Authentication1 ||
        getAuthRequest.data.state === AUTH_LEVEL.Authentication20 ||
        getAuthRequest.data.state === AUTH_LEVEL.Authentication21
      ) {
        levelAuth = 1;
      } else if (
        getAuthRequest.data.state === AUTH_LEVEL.Authentication22 ||
        getAuthRequest.data.state === AUTH_LEVEL.Authentication30 ||
        getAuthRequest.data.state === AUTH_LEVEL.Authentication31
      ) {
        levelAuth = 2;
      } else if (getAuthRequest.data.state === AUTH_LEVEL.Authentication32) {
        levelAuth = 3;
      } else {
        levelAuth = 0;
        return {
          quota: getAuthenQuota,
          authenticationStatus: getAuthRequest.data.state,
          level: levelAuth,
        };
      }
    } else if (getAuthRequest && getAuthRequest.code === AUTH_LEVEL.Authentication0) {
      levelAuth = 0;
      return {
        authenticationStatus: 0,
        level: levelAuth,
        quota: getAuthenQuota,
      };
    }
    return {
      authenticationStatus: getAuthRequest.data.state,
      authPhotoUrl: getAuthRequest.data.authPhotoUrl,
      authVideoUrl: getAuthRequest.data.authVideoUrl,
      errorAuth: getAuthRequest.data.authCheckComment ? getAuthRequest.data.authCheckComment : '',
      level: levelAuth,
      authCode: getAuthRequest.data.authCode,
      realName: getAuthRequest.data.realName,
      quota: getAuthenQuota,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Authentication);
