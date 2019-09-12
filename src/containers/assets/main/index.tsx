/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FlatList, SafeAreaView } from 'space-ui';
// @ts-ignore
import Carousel from 'react-native-snap-carousel';
import { NavigationEventPayload, useNavigation, useNavigationEvents } from '../../../routes/navigation-service';
import outerStyles from './styles';
import AssetsHeader from './assets-header';
import AssetsItem from './assets-item';
import AssetsClass from './assets-class';
import AssetsSearch from './assets-search';
import AssetsTableItem from './assets-tableItem';
import { screenWidth, setRatio } from '../../../utils/screen-util';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props, StateProps } from './interfaces';
import { getCloudWallet, getCurrencysMap, getRMBTotalAmount, getUSDTTotalAmount } from '../../../utils/wallet-utils';
import { addition } from '../../../utils/digital';
import RechargeCode from '../recharge-code';
import NoDataHolder from '../../../components/no-data';
import { LoadingDialog } from '../../../components/easyShowLD/EasyShow';

let timer: any;
const AssetsMain = (props: DispatchProps & Props) => {
  const { userInfoData } = props;
  const { navigate } = useNavigation();

  if (!userInfoData) {
    navigate('Login');
  }

  const styles = outerStyles();
  const [inputString, setInputString] = useState('');
  const [currentCoinData, setCurrentCoinData] = useState(null);
  const [coinChoose, setCoinChoose] = useState(false);
  const [showFoot, setShowFoot] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [assetsData, setAssetsData] = useState([]);
  const [assetsWallet, setAssetsWallet] = useState(0);
  const entries = [{ title: '币币账户资产折合(USDT)' }, { title: '云钱包账户资产折合(USDT)' }];
  const [showCode, setShowCode] = useState(false);
  const [bbShow, setBbShow] = useState(true);
  const [cloudShow, setCloudShow] = useState(true);
  const getNotHeld = (arrayData: any, isCoinChoose: boolean) => {
    if (isCoinChoose) {
      return arrayData.filter((item: any) => item.amount !== 0);
    } else {
      return arrayData;
    }
  };

  const getOriginalSearch = (choossCurrency: any, index: number, isCoinChoose: boolean) => {
    if (choossCurrency) {
      setInputString(choossCurrency.code);
      if (index === 1) {
        return getNotHeld(props.cloudWallet, isCoinChoose).filter((item: any) => item.walletType === choossCurrency.id);
      } else {
        return getNotHeld(props.coinWallet, isCoinChoose).filter((item: any) => item.walletType === choossCurrency.id);
      }
    } else {
      setInputString('');
      if (index === 1) {
        return getNotHeld(props.cloudWallet, isCoinChoose);
      } else {
        return getNotHeld(props.coinWallet, isCoinChoose);
      }
    }
  };

  const clearTimer = () => {
    console.log('timer clear', timer);
    timer && clearInterval(timer);
    timer = null;
  };

  useNavigationEvents((evt: NavigationEventPayload) => {
    if (evt.type === 'didFocus') {
      props.getCloudWalletAssetsRequest();
      props.getViewWalletRequest();
      props.getCloudWalletTypeRequest();
      clearTimer();
      timer = setInterval(() => {
        props.getCloudWalletAssetsRequest();
        props.getViewWalletRequest();
        props.getCloudWalletTypeRequest();
      }, 10000);
    } else if (evt.type === 'willBlur') {
      clearTimer();
    }
  });

  useEffect(() => {
    props.getCloudWalletAssetsRequest();
    props.getViewWalletRequest();
    props.getCloudWalletTypeRequest();
    clearTimer();
    // console.log('timer useEffect');
    timer = setInterval(() => {
      props.getCloudWalletAssetsRequest();
      props.getViewWalletRequest();
      props.getCloudWalletTypeRequest();
    }, 10000);
    // console.log('timer setInterval', timer);
  }, []);

  useEffect(() => {
    setAssetsData(getOriginalSearch(currentCoinData, assetsWallet, coinChoose));
    // empty-array means don't watch for any updates
  }, [props.coinWallet]);

  const onTransfer = () => {
    navigate('AssetsTransfer', { index: assetsWallet });
  };
  const onDetailed = () => {
    navigate('AccountDetails', { index: assetsWallet });
  };
  const onCash = () => {
    navigate('AssetsWithDrawal');
  };
  const onRecharge = (isShow: boolean) => {
    setShowCode(isShow);
  };

  const OpenRecharge = async () => {
    setShowCode(true);
  };

  const onCarousel = (index: number) => {
    setAssetsWallet(index);
    setAssetsData(getOriginalSearch(currentCoinData, index, coinChoose));
  };

  const onPressChoose = () => {
    setCoinChoose(!coinChoose);
    setAssetsData(getOriginalSearch(currentCoinData, assetsWallet, !coinChoose));
  };

  const onChooseCoinCallback = (choossCurrency: any) => {
    setCurrentCoinData(choossCurrency); // 搜索的数据
    setAssetsData(getOriginalSearch(choossCurrency, assetsWallet, coinChoose));
  };

  const onPressFocus = () => {
    navigate('ChooseCoin', { currencysMap: props.currency, onChooseCoinCallback: onChooseCoinCallback });
  };

  const onPressDelete = () => {
    // @ts-ignore
    setCurrentCoinData(null);
    setInputString('');
    setAssetsData(getOriginalSearch(null, assetsWallet, coinChoose));
  };

  const onPressSetting = () => {
    navigate('PersonalCenter');
  };

  const renderListEmptyComponent = () => <NoDataHolder />;

  const onPressShow = (index: number, isShow: boolean) => {
    if (index === 0) {
      setBbShow(isShow);
    } else {
      setCloudShow(isShow);
    }
  };

  const renderItem = (item: any) => {
    return (
      <AssetsItem
        isShow={item.index === 0 ? bbShow : cloudShow}
        index={item.index}
        onPressShow={onPressShow}
        titleString={item.item.title}
        totalRmb={item.index === 0 ? props.coinTotalRMBPrice : props.cloudWalletTotalRMBPrice}
        totalPrice={item.index === 0 ? props.coinTotalPrice : props.cloudWalletTotalPrice}
      />
    );
  };
  const renderHeader = () => {
    const totalPrice = addition(props.coinTotalPrice * 1, props.cloudWalletTotalPrice * 1);
    const totalRMBPrice = addition(props.coinTotalRMBPrice * 1, props.cloudWalletTotalRMBPrice * 1);
    return (
      <View>
        <AssetsHeader isShow={assetsWallet === 0 ? bbShow : cloudShow} totalPrice={totalPrice} totalRMBPrice={totalRMBPrice} onPress={onPressSetting} />
        <View style={styles.blankView} />
        <Carousel
          data={entries}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - setRatio(100)}
          layout={'default'}
          onSnapToItem={onCarousel}
        />
        <AssetsClass onTransfer={onTransfer} onDetailed={onDetailed} onCash={onCash} onRecharge={OpenRecharge} walletType={assetsWallet} />
        <View style={styles.colorView} />
        <AssetsSearch
          onPressDelete={onPressDelete}
          onPressFocus={onPressFocus}
          inPutString={inputString}
          onPressChoose={onPressChoose}
          closeCoin={coinChoose}
        />
        <View style={styles.lineView} />
      </View>
    );
  };

  const renderTableItem = (item: any, index?: number) => {
    return (
      <View>
        <AssetsTableItem isShow={assetsWallet === 0 ? bbShow : cloudShow} walletType={item.walletName} balance={item.realAmount} freezeAmount={item.lock} />
      </View>
    );
  };
  const keyExtractor = () => `${Math.random()}`;
  /**
   * 创建尾部布局
   */
  const createListFooter = () => {
    return assetsData && assetsData.length > 0 ? (
      <View style={styles.footerView}>
        {showFoot === 1 && <ActivityIndicator />}
        <Text style={styles.footerTitle}>{showFoot === 1 ? '正在加载更多数据...' : '没有更多数据了'}</Text>
      </View>
    ) : null;
  };
  /**
   * 下啦刷新
   * @private
   */
  const handleRefresh = () => {
    if (assetsWallet === 1) {
      props.getCloudWalletAssetsRequest();
    } else {
      props.getViewWalletRequest();
    }
  };
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View style={styles.body}>
        <View style={styles.baseView}>
          <FlatList
            key={0}
            ListHeaderComponent={renderHeader()}
            data={assetsData}
            renderItem={({ item, index }) => renderTableItem(item, index)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh} //因为涉及到this.state
                colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
                progressBackgroundColor="#ffffff"
              />
            }
            keyExtractor={keyExtractor}
            ListEmptyComponent={renderListEmptyComponent}
          />
        </View>
        {showCode ? <RechargeCode onRecharge={onRecharge} /> : null}
      </View>
      <LoadingDialog />
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getViewWallet,
    (state: Record<string, any>) => state.getCloudWalletAssets,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.userInfo,
  ],
  (getViewWallet, getCloudWalletAssets, getCloudWalletType, userInfo) => {
    const currencysMap = getCurrencysMap(getCloudWalletType.data, true);
    const cloudWallet = getCloudWallet(getCloudWalletAssets.data, currencysMap, 2, 8);
    const cloudWalletUSDTPrice = getUSDTTotalAmount(cloudWallet);
    const cloudWalletRMBPrice = getRMBTotalAmount(cloudWallet);
    const coinWallet = getCloudWallet(getViewWallet.data, currencysMap, 2, 8);
    const coinUSDTPrice = getUSDTTotalAmount(coinWallet);
    const coinRMBPrice = getRMBTotalAmount(coinWallet);
    return {
      userInfoData: userInfo.data,
      coinWallet: coinWallet, //bb钱包数据
      currency: getCloudWalletType.data, //云钱包币种数据
      coinTotalPrice: coinUSDTPrice,
      coinTotalRMBPrice: coinRMBPrice,
      cloudWallet: cloudWallet, //云钱包数据
      cloudWalletTotalPrice: cloudWalletUSDTPrice,
      cloudWalletTotalRMBPrice: cloudWalletRMBPrice,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsMain);
