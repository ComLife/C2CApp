import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FlatList, Indicator, SafeAreaView } from 'space-ui';
import { trim } from 'lodash';
import { useNavigation } from '../../../routes/navigation-service';
import { REMOVE_CALLBACK_COLLECTION, REMOVE_SEARCH_WALLET_TYPE } from '../../../redux/action-types';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import SearchItem from '../components/search-item';
import HeaderBar from '../components/search-header';
import { DispatchProps, Props, StateProps } from './interfaces';
import mapDispatchToProps from './map-dispatch-to-props';
import outerStyles from './styles';

const MarketSearch = (props: DispatchProps & Props) => {
  const { goBack, navigate } = useNavigation();
  const styles = outerStyles();

  const onChangeText = (keyword: string) => {
    const input = trim(keyword);
    if (input) {
      props.searchWalletTypeRequest({ input });
    }
  };

  useEffect(() => {
    if (props.collectionListCallBack.code === '1') {
      console.log('collectionListCallBack', props.collectionListCallBack);
      const msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: '' } };
      WebSocket.getInstance().send(sendWrapper(msgData));
      props.resetState(REMOVE_CALLBACK_COLLECTION);
    }
  }, [props.collectionListCallBack]);

  const isExist = (reqParams: Record<string, string>) => {
    if (props.userInfo && props.userInfo.data) {
      const { collectionList } = props;
      if (collectionList.length > 0) {
        const result1 = collectionList.filter(
          (r: Record<string, string>) => r.baseCurrency === reqParams.baseCurrency && r.paymentCurrency === reqParams.paymentCurrency,
        );
        return result1.length > 0;
      }
    } else {
      const { localCollection } = props;
      if (localCollection.length > 0) {
        const result = localCollection.filter(
          (r: Record<string, string>) => r.baseCurrency === reqParams.baseCurrency && r.paymentCurrency === reqParams.paymentCurrency,
        );
        return result.length > 0;
      }
    }
  };

  const onSearchPress = (value: Record<string, string>) => {
    const { baseCurrencyCode, paymentCurrencyCode } = value;
    const reqParams = { baseCurrency: baseCurrencyCode, paymentCurrency: paymentCurrencyCode };
    const isLogin = props.userInfo && props.userInfo.data ? true : false;
    if (isExist(reqParams)) {
      props.deleteCollectionRequest(reqParams, isLogin);
    } else {
      props.addCollectionRequest(reqParams, isLogin);
    }
  };

  const onItemPress = (value: Record<string, string>) => {
    const { baseCurrencyCode, paymentCurrencyCode } = value;
    const msgData = { msgType: 'change_currency', msgData: { baseCurrency: baseCurrencyCode, paymentCurrency: paymentCurrencyCode } };
    WebSocket.getInstance().send(sendWrapper(msgData));
    navigate('ExchangeDetails');
  };

  const renderItem = ({ item }: Record<string, any>) => (
    <SearchItem
      item={item}
      local={props.userInfo && props.userInfo.data ? props.collectionList : props.localCollection}
      onSearchPress={onSearchPress}
      onItemPress={onItemPress}
    />
  );

  const keyExtractor = (props: Record<string, string>) => {
    return `${props.id + props.baseCurrencyCode + props.paymentCurrencyCode}`;
  };

  const onBackPress = () => {
    props.resetState(REMOVE_SEARCH_WALLET_TYPE);
    const msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: '' } };
    WebSocket.getInstance().send(sendWrapper(msgData));
    goBack && goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar onChangeText={onChangeText} onBackPress={onBackPress} />
      {props.searchFetching && <Indicator style={styles.indicator} />}
      <FlatList data={props.searchDataList} renderItem={renderItem} keyExtractor={keyExtractor} />
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.searchWalletType,
    (state: Record<string, any>) => state.localCollection,
    (state: Record<string, any>) => state.collectionList,
    (state: Record<string, any>) => state.collectionListCallBack,
  ],
  (userInfo, searchWalletType, localCollection, collectionList, collectionListCallBack) => {
    console.log('isExist', collectionListCallBack);
    return {
      localCollection,
      userInfo,
      searchDataList: searchWalletType.data || [],
      searchFetching: searchWalletType.isFetching,
      collectionList: collectionList || [],
      collectionListCallBack,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarketSearch);
