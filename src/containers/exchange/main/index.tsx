import React, { useEffect, useState } from 'react';
import { AppState, InteractionManager, Keyboard, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { DivisorLine, Indicator, SafeAreaView } from 'space-ui';
import { createSelector } from 'reselect';
import Header from './components/header';
import Buttons from './components/buttons';
import MidComponent from './components/mid-component';
import BottomHeader from './components/bottom-header';
import BottomItem from './components/bottom-item';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props } from './interfaces';
import styles from './styles';
import Colors from '../../../const/colors';
import { setRatio } from '../../../utils/screen-util';
import { LOGOUT, RECEIVE_REVOKE_ENTRUST_ORDER_REPLY, REMOVE_AUTH } from '../../../redux/action-types';
import { NavigationEventPayload, useNavigation, useNavigationEvents } from '../../../routes/navigation-service';
import Search from '../transation-search';
import { sendWrapper } from '../../../utils/websocket-util';
import WebSocket from '../../../services/websocket';
import DealModal from './components/deal-modal';
import { EasyShowLD, LoadingDialog } from '../../../components/easyShowLD/EasyShow';
import NoDataHolder from '../../../components/no-data';
import Alert, { EasyAlert } from '../../../components/easyAlert/Alert';
import { EasyToast } from '../../../components/EasyToast/toast';
import { toNumber } from '../../../utils/digital';
import Bidding from './components/bidding';
import { formatHHmmss, formatYYYYMMDD } from '../../../utils/date-time';
import { AUTH_LEVEL, ERROR_CODE } from '../../../const/enum-set';

let isAuth = false;
let tmpChange = true;
let isOpenShowData = true;
const Exchange = (props: DispatchProps & Props) => {
  const { navigate, getParam, setParams } = useNavigation();
  //=================== buttons组件里
  const [buyTextColor, setBuyTextColor] = useState(Colors.whiteColor);
  const [buyBtnColor, setBuyBtnColor] = useState(Colors.colorA2);
  const [sellTextColor, setSellTextColor] = useState(Colors.colorB2);
  const [sellBtnColor, setSellBtnColor] = useState(Colors.colorB5);
  const [isBuy, setIsBuy] = useState(true);
  const [isShowSearch, setIsShowSearch] = useState(false);

  //==========================委托单
  const [curOrder, setCurOrder] = useState([]);

  //买卖界面
  const [password, setPassword] = useState('');
  const [msgId, setMsgId] = useState('-1');

  const [twoInputValue, setTwoInputValue] = useState('');
  const [dealPanel, setDealPanel] = useState(false);
  const [oneInputValue, setOneInputValue] = useState('');
  const [initPriceText, setInitPriceText] = useState('限价');
  const [isBlur, setIsBlur] = useState(false);
  const [isCall, setIsCall] = useState(false);
  const [isCallTime, setIsCallTime] = useState(false);
  const [bidTime, setBidTime] = useState('');
  const [eventY, setEventY] = useState('0');
  const [one, setOne] = useState(true);
  const [currencyRate, setCurrencyRate] = useState('');

  const closeBlur = () => {
    setTimeout(() => {
      setIsBlur(false);
    }, 100);
  };

  //===================buttons组件里
  const onBuy = () => {
    setBuyTextColor(Colors.whiteColor);
    setBuyBtnColor(Colors.colorA2);
    setSellTextColor(Colors.colorB2);
    setSellBtnColor(Colors.colorB5);
    setIsBuy(true);
    setIsBlur(true);
    closeBlur();
  };

  const onSell = () => {
    setBuyTextColor(Colors.colorB2);
    setBuyBtnColor(Colors.colorB5);
    setSellTextColor(Colors.whiteColor);
    setSellBtnColor(Colors.colorA3);
    setIsBuy(false);
    setIsBlur(true);
    closeBlur();
  };

  useNavigationEvents((evt: NavigationEventPayload) => {
    if (evt.type === 'didFocus') {
      setOne(true);
      onBuy();
    }
    const optionType = getParam('type');
    if (evt.type === 'didFocus' && optionType) {
      if (optionType === 'sell') {
        setParams({ type: '' });
        onSell();
      }
    }
  });

  //========K线回调
  const onClick = () => {
    InteractionManager.runAfterInteractions(() => {
      navigate('ExchangeDetails');
    });
    setIsBlur(true);
    closeBlur();
  };

  //==================委托Item
  //取消订单回调
  const closeOrder = (index: number) => {
    const tmpOrder: any = curOrder[index];
    EasyShowLD.loadingShow('撤单中...');

    const accuracy = {
      msgType: 'revoke_entrust_order',
      msgData: {
        orderId: tmpOrder.orderId,
        paymentCurrency: props.paymentCurrency,
        baseCurrency: props.baseCurrency,
        tradeType: tmpOrder.tradeType,
        entrustType: tmpOrder.entrustType,
        entrustPrice: tmpOrder.entrustPrice,
        entrustNum: tmpOrder.entrustNum,
      },
    };
    WebSocket.getInstance().send(sendWrapper(accuracy));
  };

  const renderOrderItem = (item: any, index: number) => {
    const divColor = item.tradeType ? Colors.colorA3 : Colors.colorA2; //左边线颜色 红卖 绿买
    const date = new Date(item.time);
    const leftTopText = formatYYYYMMDD(date);
    const leftBottomText = formatHHmmss(date);
    const rightTopText = props.baseCurrency + '/' + props.paymentCurrency;
    const leftMidText = '价格: ' + item.entrustPrice;
    const rightBottomText = '数量: ' + item.dealNum + '/' + item.entrustNum;
    const tmpIndex = index;
    return (
      <BottomItem
        divColor={divColor}
        leftTopText={leftTopText}
        leftBottomText={leftBottomText}
        rightTopText={rightTopText}
        leftMidText={leftMidText}
        rightBottomText={rightBottomText}
        closeOrder={closeOrder}
        key={index}
        index={tmpIndex}
      />
    );
  };

  const showOrder = () => {
    if (curOrder.length !== 0) {
      return curOrder.map((item: any, index: number) => renderOrderItem(item, index));
    } else {
      return <NoDataHolder />;
    }
  };

  const isAuthuccessS = () => {
    if (isOpenShowData) {
      EasyToast.show('暂未开启服务');
    } else if (toNumber(twoInputValue) < toNumber(props.tradingMin)) {
      EasyToast.show('低于最小交易量' + toNumber(props.tradingMin));
    } else if (toNumber(twoInputValue) > toNumber(props.tradingMax)) {
      EasyToast.show('高于最大交易量' + toNumber(props.tradingMax));
    } else if (isBuy) {
      if (oneInputValue !== '市价') {
        if (toNumber(oneInputValue) * toNumber(twoInputValue) > toNumber(props.paymentBalanceData)) {
          EasyToast.show('可用余额不足!');
        } else {
          setDealPanel(true);
        }
      } else {
        if (toNumber(props.newestPrice) * toNumber(twoInputValue) > toNumber(props.paymentBalanceData)) {
          EasyToast.show('可用余额不足!');
        } else {
          setDealPanel(true);
        }
      }
    } else if (!isBuy) {
      if (toNumber(twoInputValue) > toNumber(props.baseBalanceData)) {
        EasyToast.show('可用余额不足!');
      } else {
        setDealPanel(true);
      }
    }
  };

  // 暂不需要身份认证，广靖说可以注释
  useEffect(() => {
    if (JSON.stringify(props.authInfo) !== '{}' && isAuth) {
      if (props.authInfo.code === '') return;
      EasyAlert.close();
      if (String(props.authInfo.code) === ERROR_CODE.SUCCESS) {
        isAuth = false;
        if (props.authInfo.data.state >= AUTH_LEVEL.Authentication1) {
          isAuthuccessS();
        } else {
          EasyAlert.show(
            {
              title: '提示',
              notice: '您未进行身份证初级认证，暂不可交易，是否前往认证？',
              inputComponentIsShow: false,
            },
            () => {
              navigate('Authentication');
            },
          );
        }
      } else if (props.authInfo.code === AUTH_LEVEL.Authentication0) {
        isAuth = false;
        EasyAlert.show(
          {
            title: '提示',
            notice: '您未进行身份证初级认证，暂不可交易，是否前往认证？',
            inputComponentIsShow: false,
          },
          () => {
            navigate('Authentication');
          },
        );
      }
    }
  }, [props.authInfo]);

  const isOpenBiddingView = () => {
    if (props.callAuction) {
      setIsCall(false);
      return;
    } else if (isCallTime === false) {
      return;
    } else if (isCallTime === true) {
      setIsCallTime(false);
      const tmpNum = props.openTime - props.systemTime;
      setBidTime(tmpNum.toString());
      if (tmpNum <= 0) {
        setIsCall(false);
      }
    }
  };

  useEffect(() => {
    setIsCall(true);
    isOpenBiddingView();
    setIsCallTime(true);
  }, [props.callAuction, props.openTime, props.systemTime]);

  useEffect(() => {
    if (curOrder) {
      showOrder();
    }
  }, [curOrder]);

  useEffect(() => {
    if (JSON.stringify(props.userEntrustOrdersData) !== '{}') {
      //暂时先截最上方的5条委托记录
      if (props.userEntrustOrdersData.length > props.dealMax) {
        setCurOrder(props.userEntrustOrdersData.slice(0, props.dealMax));
      } else {
        setCurOrder(props.userEntrustOrdersData.slice(0));
      }
    }
  }, [props.userEntrustOrdersData]);

  useEffect(() => {
    if (JSON.stringify(props.revokeEntrustOrderReplyData) !== '{}') {
      if (props.revokeResult) {
        EasyToast.show('撤单成功');
      } else {
        EasyToast.show('撤单失败');
      }
      EasyShowLD.loadingClose();
      props.resetState(RECEIVE_REVOKE_ENTRUST_ORDER_REPLY);
    }
  }, [props.revokeEntrustOrderReplyData]);

  const showSearch = (value: boolean) => {
    setIsShowSearch(value);
    setIsBlur(true);
    closeBlur();
  };

  //==========打开modal
  const openDeal = () => {
    if (props.userInfo.data) {
      if (props.getAuthenOnoff && props.getAuthenOnoff.data) {
        if (props.authInfo.data && props.authInfo.data.state >= AUTH_LEVEL.Authentication1) {
          isAuthuccessS();
        } else {
          isAuth = true;
          props.resetState(REMOVE_AUTH);
          props.getAuthRequest();
        }
      } else {
        setIsBlur(true);
        closeBlur();
        setTimeout(() => {
          isAuthuccessS();
        }, 200);
      }
    } else {
      navigate('Login');
    }
  };

  const closeDeal = () => {
    setPassword('');
    setDealPanel(false);
    // Keyboard.dismiss();
    setIsBlur(true);
    closeBlur();
  };

  //========跳转重置资金密码
  const onPassword = () => {
    closeDeal();
    Keyboard.dismiss();
    navigate('CapitalPwd');
  };

  //买卖界面
  const openDealPanel = () => {
    if (dealPanel) {
      let titleText = '';
      const dealNum = twoInputValue;
      let dealTypeText = '';
      const baseCoin = props.baseCurrency;
      let paymentCoin = '';
      let titleColor = '';

      if (isBuy) {
        titleText = '买入';
        titleColor = Colors.colorA2;
      } else {
        titleText = '卖出';
        titleColor = Colors.colorA3;
      }

      if (initPriceText === '限价') {
        paymentCoin = oneInputValue + '  ' + props.paymentCurrency;
        dealTypeText = '限价委托';
      } else {
        paymentCoin = '市价' + props.paymentCurrency;
        dealTypeText = '市价委托';
      }
      return (
        <DealModal
          onClose={closeDeal}
          titleText={titleText}
          titleColor={titleColor}
          dealNum={dealNum}
          dealTypeText={dealTypeText}
          baseCoin={baseCoin}
          paymentCoin={paymentCoin}
          password={password}
          setPassword={setPassword}
          onPassword={onPassword}
        />
      );
    }
    return;
  };

  useEffect(() => {
    if (password.length === 6) {
      const tradeType = isBuy ? '0' : '1';
      const entrustType = initPriceText === '限价' ? '1' : '0';
      const entrustPrice = initPriceText === '限价' ? oneInputValue : props.newestPrice;
      const entrustNum = twoInputValue;
      const capitalPwd = password;
      const date = new Date().getTime().toString();
      setMsgId(date);
      const accuracy = {
        msgType: 'create_entrust_order',
        msgData: {
          tradeType,
          entrustType,
          entrustPrice,
          paymentCurrency: props.paymentCurrency,
          baseCurrency: props.baseCurrency,
          entrustNum,
          capitalPwd,
          inMsgId: date,
        },
      };
      WebSocket.getInstance().send(sendWrapper(accuracy));
      setPassword('');

      EasyShowLD.loadingShow('数据传输中...');
    }
  }, [password]);

  useEffect(() => {
    if (props.orderInMsgId === msgId) {
      //清掉msgId
      setMsgId('');
      //无论是否成功关闭转菊花
      if (props.entrustResult) {
        //成功关闭下拉界面 刷新历史委托
        setTimeout(() => {
          EasyToast.show('下单成功');
        }, 200);
        setIsBlur(true);
        closeBlur();
        closeDeal();
      } else {
        //失败重置
        setTimeout(() => {
          EasyToast.show(props.errorHint);
        }, 200);
      }
      EasyShowLD.loadingClose();
    }
  }, [props.orderInMsgId]);

  const openTrading = () => {
    navigate('TradingRecord');
  };

  const appStateListener = () => {
    AppState.addEventListener('change', newState => {
      if (newState !== null && newState === 'active') {
        if (tmpChange) {
          const accuracy = { msgType: 'bbs_getmarketinfo', msgData: {} };
          WebSocket.getInstance().send(sendWrapper(accuracy));
          tmpChange = false;
        }
      } else if (newState !== null && newState.match(/inactive|background/)) {
        tmpChange = true;
      }
    });
  };

  // 监听手机切回系统后台后切回
  useEffect(() => {
    AppState.removeEventListener('change', appStateListener);
    AppState.addEventListener('change', appStateListener);
    const accuracy = { msgType: 'bbs_getmarketinfo', msgData: {} };
    WebSocket.getInstance().send(sendWrapper(accuracy));
  }, []);

  //重算绘率
  useEffect(() => {
    if (props.currency) {
      for (let i = 0; i < props.currency.length; i++) {
        if (props.currency[i]['code'] === props.paymentCurrency) {
          setCurrencyRate(props.currency[i]['marketPrice']);
        }
      }
      onBuy();
    }
  }, [props.paymentCurrency, props.baseCurrency]);

  return (
    <SafeAreaView style={styles.container} forceInset={{ bottom: 'never' }}>
      {/*{isOpenShowData ? (*/}
      {/*<View style={styles.container1}>*/}
      {/*<Indicator />*/}
      {/*<Text style={styles.text}>加载中...</Text>*/}
      {/*</View>*/}
      {/*) : (*/}
      {/*<View style={styles.container}>*/}
      <Header
        onClick={onClick}
        onBack={() => showSearch(true)}
        baseCurrency={props.baseCurrency}
        paymentCurrency={props.paymentCurrency}
        callAuction={props.callAuction}
      />
      <DivisorLine height={setRatio(2)} backgroundColor={Colors.colorB4} />
      {isCall === true && !isOpenShowData ? (
        <Bidding time={bidTime} setIsCall={setIsCall} />
      ) : (
        <View style={styles.bg}>
          <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
            style={styles.container}
            keyboardShouldPersistTaps={'handled'}
            onScrollEndDrag={event => {
              const tmp = event.nativeEvent.contentOffset.y;
              setEventY(tmp.toString());
            }}
            onMomentumScrollEnd={event => {
              const tmp = event.nativeEvent.contentOffset.y;
              setEventY(tmp.toString());
            }}>
            <Buttons
              rightText1={props.newestPrice}
              rightText2={props.newesRmbPrice}
              btnBg1={buyBtnColor}
              btnTextBg1={buyTextColor}
              btnBg2={sellBtnColor}
              btnTextBg2={sellTextColor}
              onBackBtn1={onBuy}
              onBackBtn2={onSell}
              rightColor1={toNumber(props.twentyfourGain) >= 0 ? Colors.colorA2 : Colors.colorA3}
            />
            <MidComponent
              isBuy={isBuy}
              buy={props.buyData}
              sell={props.sellData}
              valuationMin={props.valuationMin}
              basicsMin={props.basicsMin}
              status={props.status}
              baseBalanceData={props.baseBalanceData}
              paymentBalanceData={props.paymentBalanceData}
              twoInputValue={twoInputValue}
              setTwoInputValue={setTwoInputValue}
              dealPanel={dealPanel}
              setDealPanel={setDealPanel}
              oneInputValue={oneInputValue}
              setOneInputValue={setOneInputValue}
              initPriceText={initPriceText}
              setInitPriceText={setInitPriceText}
              newestPrice={props.newestPrice}
              openDeal={openDeal}
              userInfo={props.userInfo}
              isBlur={isBlur}
              setIsBlur={setIsBlur}
              eventY={eventY}
              baseCurrency={props.baseCurrency}
              paymentCurrency={props.paymentCurrency}
              one={one}
              setOne={setOne}
              currencyRate={currencyRate}
            />
            <DivisorLine height={setRatio(16)} backgroundColor={Colors.colorB5} />
            <BottomHeader onClick={openTrading} userInfo={props.userInfo} />
            {showOrder()}
          </ScrollView>
          {openDealPanel()}
          <Alert />
          <LoadingDialog />
        </View>
      )}
      {isShowSearch ? <Search onClosePress={showSearch} /> : null}
      {/*</View>*/}
      {/*)}*/}
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getAuthRequest,
    (state: Record<string, any>) => state.orderBook,
    (state: Record<string, any>) => state.userEntrustOrders,
    (state: Record<string, any>) => state.marketInfo,
    (state: Record<string, any>) => state.userAvailablefunds,
    (state: Record<string, any>) => state.createEntrustOrderReply,
    (state: Record<string, any>) => state.revokeEntrustOrderReply,
    (state: Record<string, any>) => state.userInfo,
    (state: Record<string, any>) => state.checktradPWD,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.getAuthenOnoff,
  ],
  (
    getAuthRequest,
    orderBook,
    userEntrustOrders,
    marketInfo,
    userAvailablefunds,
    createEntrustOrderReply,
    revokeEntrustOrderReply,
    userInfo,
    checktradPWD,
    getCloudWalletType,
    getAuthenOnoff,
  ) => {
    const { msgData: orderBookMsgData = {} } = orderBook;
    const { msgData: marketInfoMsgData = {} } = marketInfo;
    const { msgData: userData = {} } = userAvailablefunds;
    const { msgData: userEntrustOrdersData = {} } = userEntrustOrders;
    const { msgData: orderReplyData = {}, inMsgId = '' } = createEntrustOrderReply;
    const { msgData: revokeEntrustOrderReplyData = {} } = revokeEntrustOrderReply;
    if (JSON.stringify(marketInfoMsgData) !== '{}') {
      isOpenShowData = false;
    }
    console.log('props.getAuthenOnoff', getAuthenOnoff, getAuthRequest);
    return {
      //marketInfo
      baseCurrency: marketInfoMsgData.baseCurrency || '',
      basicsMin: marketInfoMsgData.basicsMin || -1,
      callAuction: marketInfoMsgData.callAuction || 0,
      dealMax: marketInfoMsgData.dealMax || 0,
      newesRmbPrice: marketInfoMsgData.newesRmbPrice || '',
      newestPrice: marketInfoMsgData.newestPrice || '',
      openTime: marketInfoMsgData.openTime || 0,
      paymentCurrency: marketInfoMsgData.paymentCurrency || '',
      status: marketInfoMsgData.status || 0,
      systemTime: marketInfoMsgData.systemTime || 0,
      tradingMax: marketInfoMsgData.tradingMax || '',
      tradingMin: marketInfoMsgData.tradingMin || '',
      twentyfourGain: marketInfoMsgData.twentyfourGain || '',
      valuationMin: marketInfoMsgData.valuationMin || -1,
      //orderBook
      buyData: orderBookMsgData.buy || [],
      sellData: orderBookMsgData.sell || [],
      //userAvailablefunds
      baseBalanceData: userData.baseBalance || '0',
      paymentBalanceData: userData.paymentBalance || '0',
      //userEntrustOrders
      userEntrustOrdersData: userEntrustOrdersData || {},
      //createEntrustOrderReply
      orderInMsgId: inMsgId || '',
      entrustResult: orderReplyData.entrustResult || false,
      errorHint: orderReplyData.errorHint || '',
      //revokeEntrustOrderReply
      revokeEntrustOrderReplyData: revokeEntrustOrderReplyData || {},
      revokeResult: revokeEntrustOrderReplyData.revokeResult || false,

      userInfo: userInfo,
      authInfo: getAuthRequest,
      checktradPWD: checktradPWD,
      currency: getCloudWalletType.data,
      getAuthenOnoff: getAuthenOnoff,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Exchange);
