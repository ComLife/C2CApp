import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { SafeAreaView } from 'space-ui';
import SplashScreen from 'react-native-splash-screen';
import { NavigationEventPayload, useNavigation, useNavigationEvents } from '../../../routes/navigation-service';
import { I18n } from '../../../localization/i18n';
// import NoticeBar from '../components/notice-bar';
// import SloganBar from '../components/slogan-bar';
import ListCaption from '../components/list-caption';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import Banner from '../components/swiper';
import HomeLogo from '../components/home-logo';
import GrowthList from '../components/growth-list';
import { DispatchProps, Props, StateProps } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';
import outerStyles from './styles';
import Forced from '../../../components/forced';
import Config from '../../../const/config';

const Home = (props: any) => {
  SplashScreen.hide();
  const { navigate } = useNavigation();
  const [compareData, setCompareData] = useState(null);
  const styles = outerStyles();

  const increaseTop = () => {
    // 首页涨幅榜
    const bbsInit = { msgType: 'bbs_increasetop', msgData: {} };
    WebSocket.getInstance().send(sendWrapper(bbsInit));
  };

  useNavigationEvents((evt: NavigationEventPayload) => {
    if (evt.type === 'didFocus') {
      props.getCloudWalletTypeRequest();
      props.getAllCloudWalletTypeRequest();
      increaseTop();
    }
  });

  useEffect(() => {
    console.log('like componentDidUpdate or componentDidMount');
    if (props.userInfo && props.userInfo.data) {
      props.emergentNoticeRequest({ appType: 2 });
    }
    // deps 为 [props.userInfo] 表示 props.userInfo.data 变化了才执行
  }, [props.userInfo.data]);

  const onGrowthItemPress = (event: Record<string, string>) => {
    const { baseCurrency, paymentCurrency } = event;
    const msgData = { msgType: 'change_currency', msgData: { baseCurrency, paymentCurrency } };
    WebSocket.getInstance().send(sendWrapper(msgData));
    navigate('ExchangeDetails');
  };

  const onClick = (string: string) => {
    console.log('onClickonClick', string);
    if (string && string.length > 0) {
      if (string === 'market') string = 'Market';
      else if (string === 'transaction') string = 'Exchange';
      else if (string === 'assets') string = 'Assets';
      navigate(string);
    }
  };

  useEffect(() => {
    if (props.compareVersion && !props.compareVersion.isFetching) return;
    props.compareVersionRequest({ versionNo: Config.headers.versionId, versionName: Config.versionName });
  }, []);

  useEffect(() => {
    if (props.compareVersion && props.compareVersion.code) {
      if (props.compareVersion.code === '1') {
        if (props.compareVersion.data.isUpdate !== '0') {
          // 强制更新
          setCompareData(props.compareVersion.data);
        }
      }
    }
  }, [props.compareVersion]);

  const callBack = () => {
    setCompareData(null);
  };

  const renderPopWindow = () => {
    return compareData ? <Forced data={compareData} callback={callBack} /> : null;
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <ScrollView alwaysBounceVertical={false} contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
        <HomeLogo />
        <Banner data={props.bannerList} onClick={onClick} />
        <View style={styles.divisorLine} />
        {/*<NoticeBar text={'小白交易所最新上线，交易拼手速瓜分100万EUSD！'} />*/}
        {/*<SloganBar />*/}
        <ListCaption text={I18n.t('homePage.growthList')} />
        <GrowthList data={props.increaseList} onItemPress={onGrowthItemPress} />
      </ScrollView>
      {renderPopWindow()}
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.bannerList,
    (state: Record<string, any>) => state.increaseTopReply,
    (state: Record<string, any>) => state.getAllCloudWalletType,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.compareVersion,
  ],
  (userInfo = {}, bannerList, increaseTopReply, getAllCloudWalletType, getCloudWalletType, compareVersion) => {
    return {
      currency: getCloudWalletType,
      currencyAll: getAllCloudWalletType,
      userInfo: userInfo,
      bannerList: (bannerList && bannerList.data) || [],
      increaseList: increaseTopReply.msgData || [],
      compareVersion: compareVersion,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
