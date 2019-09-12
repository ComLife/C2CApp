import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { DivisorLine, SafeAreaView } from 'space-ui';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { NavigationEventPayload, useNavigation, useNavigationEvents } from '../../../routes/navigation-service';
import { setRatio } from '../../../utils/screen-util';
import { I18n } from '../../../localization/i18n';
import ImageSet from '../../../const/image-set';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import CustomTabBar from '../../exchange/transation-search/customTabBar';
import Colors from '../../../const/colors';
import HeaderBar from '../components/market-header';
import { Props, StateProps } from './interfaces';
import MyChoose from '../my-choose';
import DataList from '../list-data';
import NoDataHolder from '../../../components/no-data';

const myChooseText = '自选';

const Markets = (props: Props) => {
  const { navigate } = useNavigation();

  const onDataItemPress = (event: Record<string, string>) => {
    const { baseCurrency, paymentCurrency } = event;
    const msgData = { msgType: 'change_currency', msgData: { baseCurrency, paymentCurrency } };
    WebSocket.getInstance().send(sendWrapper(msgData));
    navigate('ExchangeDetails');
  };

  const getCollectionString = () => {
    if (props.localCollection && props.localCollection.length > 0) {
      let valueString = '';
      for (let i = 0; i < props.localCollection.length; i++) {
        const collection = props.localCollection[i];
        valueString += collection.baseCurrency + '/' + collection.paymentCurrency;
        valueString += i + 1 !== props.localCollection.length ? ',' : '';
      }
      return valueString;
    }
    return '';
  };

  useNavigationEvents((evt: NavigationEventPayload) => {
    if (evt.type === 'didFocus') {
      let msgData: any;
      if (props.userInfo && props.userInfo.data) msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: '' } };
      else msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: getCollectionString() } };
      WebSocket.getInstance().send(sendWrapper(msgData));
    }
  });

  const onRenderScene = () => {
    return props.routes.map((route: Record<string, string>) => {
      if (route.key === 'k1') {
        return <MyChoose key={route.key} tabLabel={route.title} />;
      }
      return <DataList key={route.key} tabLabel={route.title} data={props.marketDataList} onItemPress={onDataItemPress} />;
    });
  };

  const onNavigatePress = () => navigate('MarketSearch');

  const onChangeTab = (tab: Record<string, string>) => {
    let msgData = null;
    if (tab.tabLabel === '自选') {
      if (props.userInfo && props.userInfo.data) {
        msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: '' } };
      } else {
        msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: getCollectionString() } };
      }
    } else {
      msgData = { msgType: 'change_payment_currency', msgData: { paymentCurrency: tab.tabLabel } };
    }
    WebSocket.getInstance().send(sendWrapper(msgData));
  };

  useEffect(() => {
    let msgData = null;
    if (props.routes.length !== 0) {
      if (props.routes[0].key === 'k1') {
        if (props.userInfo && props.userInfo.data) {
          msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: '' } };
        } else {
          msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: getCollectionString() } };
        }
      } else {
        msgData = { msgType: 'change_payment_currency', msgData: { paymentCurrency: props.routes[0].title } };
      }
      WebSocket.getInstance().send(sendWrapper(msgData));
    }
  }, []);

  const imageStyle = { width: setRatio(23), height: setRatio(24) };
  return (
    <SafeAreaView>
      <HeaderBar title={I18n.t('tab.market')} icon={ImageSet.icon_search} imageStyle={imageStyle} onPress={onNavigatePress} />
      <DivisorLine height={setRatio(15)} backgroundColor={Colors.colorB5} />
      {props.routes && props.routes.length > 0 ? (
        <ScrollableTabView
          initialPage={0}
          onChangeTab={({ ref }: Record<string, any>) => onChangeTab(ref.props)}
          renderTabBar={() => (
            <CustomTabBar
              isShowLine={true}
              backgroundColor={Colors.whiteColor}
              tabUnderlineDefaultWidth={20}
              tabUnderlineScaleX={3}
              activeColor={Colors.colorB1}
              inactiveColor={Colors.colorB2}
            />
          )}>
          {onRenderScene()}
        </ScrollableTabView>
      ) : (
        <NoDataHolder />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.paymentCurrencys,
    (state: Record<string, any>) => state.marketListInfo,
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.localCollection,
  ],
  (paymentCurrencys, marketListInfo, userInfo, localCollection) => {
    const marketDataList = marketListInfo.msgData || [];
    const routes = [{ key: 'k1', title: myChooseText }]; // 产品要求：先注掉自选
    // const routes: Record<string, any>[] = [];
    if (Array.isArray(paymentCurrencys.msgData)) {
      paymentCurrencys.msgData.forEach((item: string, index: number) => {
        routes.push({ key: `k${index + 2}`, title: item });
      });
    }
    return {
      marketDataList,
      routes,
      userInfo,
      localCollection,
    };
  },
);

export default connect(
  mapStateToProps,
  null,
)(Markets);
