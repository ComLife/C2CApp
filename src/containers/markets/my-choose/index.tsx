import React, { memo, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import { Button, FlatList } from 'space-ui';
import { useNavigation } from '../../../routes/navigation-service';
import ImageSet from '../../../const/image-set';
import WebSocket from '../../../services/websocket';
import { sendWrapper } from '../../../utils/websocket-util';
import outerStyles from './styles';
import { Props, StateProps } from './interfaces';
import ListItem from '../components/list-item';
import ListSubTitle from '../../home/components/list-subtitle';
import { I18n } from '../../../localization/i18n';

const MyChoose = memo((props: Props) => {
  const styles = outerStyles();
  const { navigate } = useNavigation();
  const [collDataList, setCollDataList] = useState([]);
  const [localDataList, setLocalDataList] = useState([]);
  const [percentSort, setPercentSort] = useState('default'); // 升序:1, 默认:0, 降序:-1

  const onNavigatePress = () => {
    navigate('MarketSearch');
  };

  useEffect(() => {
    setLocalDataList(props.localCollection);
  }, [props.localCollection]);

  useEffect(() => {
    setCollDataList(props.collDataList);
  }, [props.collDataList]);

  const getCollectionString = () => {
    if (props.localCollection && props.localCollection.length > 0) {
      let valueString = '';
      for (let i = 0; i < props.localCollection.length; i++) {
        const collection: any = props.localCollection[i];
        valueString += collection.baseCurrency + '/' + collection.paymentCurrency;
        valueString += i + 1 !== props.localCollection.length ? ',' : '';
      }
      return valueString;
    }
    return '';
  };

  useEffect(() => {
    let msgData: any;
    if (props.userInfo && props.userInfo.data) msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: '' } };
    else msgData = { msgType: 'switch_to_collection', msgData: { collectionCodes: getCollectionString() } };
    WebSocket.getInstance().send(sendWrapper(msgData));
  }, [props.userInfo.data]);

  const renderDefault = () => (
    <View style={styles.chooseWrapper}>
      <Image source={ImageSet.icon_wallet} style={styles.walletIcon} />
      <Button style={styles.buttonWrapper} textStyle={styles.buttonText} onPress={onNavigatePress}>
        {'＋ 添加自选'}
      </Button>
    </View>
  );

  const onItemPress = (event: Record<string, any>) => {
    const { baseCurrency, paymentCurrency } = event;
    const msgData = { msgType: 'change_currency', msgData: { baseCurrency, paymentCurrency } };
    WebSocket.getInstance().send(sendWrapper(msgData));
    navigate('ExchangeDetails');
  };

  const renderItem = ({ item }: any) => <ListItem item={item} onItemPress={onItemPress} />;

  const onPercentSortingPress = () => {
    console.log('percentSort======', percentSort);
    if (props.collDataList && props.collDataList.length > 0) {
      let newValue: any = 'default';
      switch (percentSort) {
        case 'asc':
          newValue = 'desc';
          break;
        case 'desc':
          newValue = 'default';
          break;
        default:
          newValue = 'asc';
          break;
      }
      const orderDataTmp = orderBy(props.collDataList, ['twentyfourGain'], [newValue]);
      setPercentSort(newValue);
      setCollDataList(orderDataTmp);
    } else if (props.localCollection && props.localCollection.length > 0) {
      let newValue: any = 'default';
      switch (percentSort) {
        case 'asc':
          newValue = 'desc';
          break;
        case 'desc':
          newValue = 'default';
          break;
        default:
          newValue = 'asc';
          break;
      }
      const orderDataTmp = orderBy(props.localCollection, ['twentyfourGain'], [newValue]);
      setPercentSort(newValue);
      setLocalDataList(orderDataTmp);
    }
  };

  const renderListHeaderComponent = () => (
    <ListSubTitle
      btn3Enabled={true}
      btn3Press={onPercentSortingPress}
      percentSort={percentSort}
      text1={I18n.t('homePage.name')}
      text2={I18n.t('homePage.newPrice')}
      text3={I18n.t('homePage.growthPercent')}
    />
  );

  if (props.collNoData) {
    return renderDefault();
  }

  const keyExtractor = ({ id }: { id: number }, index: number) => `${index}${id}`;

  return (
    <FlatList
      data={collDataList && collDataList.length > 0 ? collDataList : localDataList}
      ListHeaderComponent={renderListHeaderComponent}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
});

const mapStateToProps = createSelector(
  [(state: Record<string, any>) => state.userInfo, (state: Record<string, any>) => state.collectionList, (state: Record<string, any>) => state.localCollection],
  (userInfo, collectionList, localCollection = {}) => {
    const collDataList = collectionList || [];
    const localDataList = localCollection || [];
    console.log('collDataList', collDataList);
    let collNoData;
    if (userInfo && userInfo.data) {
      collNoData = collDataList.length === 0 || !collDataList[0];
    } else {
      collNoData = localDataList.length === 0 || !localDataList[0];
    }
    return {
      userInfo,
      collDataList,
      collNoData,
      localCollection: localDataList,
    };
  },
);

export default connect(
  mapStateToProps,
  null,
)(MyChoose);
