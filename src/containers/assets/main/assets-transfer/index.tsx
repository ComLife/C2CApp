import React, { Fragment, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, DivisorLine, SafeAreaView } from 'space-ui';
import { createSelector } from 'reselect';
import { useNavigation } from '../../../../routes/navigation-service';
import outerStyles from './styles';
import TransferPosition from './transfer-position';
import TransferInput from './transfer-input';
import TransferPopup from './transfer-popup';
import Imgs from '../../../../const/image-set';
import Header from '../../../settings/authentication/header';

import UIColor from '../../../../const/colors';
// @ts-ignore
import { ERROR_CODE, WALLET_TRANSFER_TYPE } from '../../../../const/enum-set';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props, StateProps } from './interfaces';
import { division, sub, toNumber } from '../../../../utils/digital';
import * as types from '../../../../redux/action-types';
import { getCompareAccountIntersectionMap } from '../../../../utils/wallet-utils';
import { EasyShowLD, LoadingDialog } from '../../../../components/easyShowLD/EasyShow';
import { EasyToast } from '../../../../components/EasyToast/toast';
import WebSocket from '../../../../services/websocket';
import { sendWrapper } from '../../../../utils/websocket-util';
import { inputLimit } from '../../../../utils/input-limit';

const turnArray = ['', '法币账户', '币币账户'];
const AssetsTransfer = (props: DispatchProps & Props) => {
  const styles = outerStyles();
  const { navigate, getParam, goBack } = useNavigation();
  let index = getParam('index');
  let accountTypeEnter = index === 0 ? WALLET_TRANSFER_TYPE.WALLET_COIN : WALLET_TRANSFER_TYPE.WALLET_CLOUD;
  let accountTypeOut = index === 0 ? WALLET_TRANSFER_TYPE.WALLET_CLOUD : WALLET_TRANSFER_TYPE.WALLET_COIN;
  const [inputString, setInputString] = useState('');
  const [turnEnter, setTurnEnter] = useState(accountTypeEnter);
  const [turnOut, setTurnOut] = useState(accountTypeOut);
  const [showChoose, setShowChoose] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [currentCurrency, setCurrentCurrency] = useState();
  const [currencyCoin, setCurrencyCoin] = useState();

  const sendMessage = () => {
    const accuracy = {
      msgType: 'bbs_fund_transfer_success',
      msgData: {},
    };
    WebSocket.getInstance().send(sendWrapper(accuracy));
  };

  useEffect(() => {
    if (props.getWalletTransfer && props.getWalletTransfer.code === ERROR_CODE.SUCCESS) {
      EasyShowLD.loadingClose();
      EasyToast.show('划转成功');
      props.resetState(types.REMOVE_WALLET_TRANSFER);
      sendMessage();
      goBack();
    } else if (props.getWalletTransfer && props.getWalletTransfer.msg) {
      EasyToast.show(props.getWalletTransfer.msg);
      EasyShowLD.loadingClose();
      props.resetState(types.REMOVE_WALLET_TRANSFER);
    }
  }, [props.getWalletTransfer]);

  useEffect(() => {
    if (props.currencysMap && props.currencysMap.length > 0) {
      setCurrency(props.currencysMap);
      if (!currentCurrency) setCurrentCurrency(props.currencysMap[0]);
    }
  }, [props.currencysMap]);

  useEffect(() => {
    if (index === 1 && props.walletAccount) {
      if (props.currencysMap && props.currencysMap.length > 0) {
        setCurrencyCoin(props.walletAccount.filter((item: any) => item.walletType === props.currencysMap[0].id));
      } else {
        setCurrencyCoin([]);
      }
    }
  }, [props.walletAccount]);

  useEffect(() => {
    if (index === 0 && props.bbCoinAccount) {
      setCurrencyCoin(props.bbCoinAccount.filter((item: any) => item.walletType === props.currencysMap[0].id));
    }
  }, [props.bbCoinAccount]);

  const onPressinput = (string: string) => {
    setInputString(inputLimit(string, 8));
  };

  // 返回
  const onBack = () => {
    goBack();
  };

  const onChange = () => {
    setTurnEnter(turnOut);
    setTurnOut(turnEnter);
    setInputString('');
    if (turnOut === WALLET_TRANSFER_TYPE.WALLET_COIN && props.bbCoinAccount && currentCurrency && currentCurrency.id) {
      setCurrencyCoin(props.bbCoinAccount.filter((item: any) => item.walletType === currentCurrency.id));
    } else if (turnOut === WALLET_TRANSFER_TYPE.WALLET_CLOUD && props.walletAccount && currentCurrency && currentCurrency.id) {
      setCurrencyCoin(props.walletAccount.filter((item: any) => item.walletType === currentCurrency.id));
    }
  };

  const isCanNext = () => {
    return inputString;
  };

  const onChooseCoinCallback = (choossCurrency: any) => {
    if (choossCurrency) {
      setInputString('');
      setCurrentCurrency(choossCurrency);
      console.log('onChooseCoinCallback', turnEnter);
      if (turnEnter === WALLET_TRANSFER_TYPE.WALLET_COIN && props.bbCoinAccount && currentCurrency && currentCurrency.id) {
        setCurrencyCoin(props.bbCoinAccount.filter((item: any) => item.walletType === choossCurrency.id));
      } else if (turnEnter === WALLET_TRANSFER_TYPE.WALLET_CLOUD && props.walletAccount && currentCurrency && currentCurrency.id) {
        setCurrencyCoin(props.walletAccount.filter((item: any) => item.walletType === choossCurrency.id));
      }
    }
  };
  const onPressChooseWalletCoin = () => {
    navigate('ChooseCoin', { currencysMap: currency, onChooseCoinCallback: onChooseCoinCallback });
  };

  const onPressCloseChooseWalletCoin = () => {
    setShowChoose(false);
  };
  const onPressChooseItem = (item: any, index: number) => {
    setShowChoose(false);
    setCurrency(item.coin);
  };
  const onPressAll = () => {
    const realAmont = currencyCoin && currencyCoin.length > 0 ? currencyCoin[0].realAmount : 0;
    if (index === 0) {
      setInputString(realAmont + '');
    } else {
      setInputString(realAmont + '');
    }
  };

  const onConfirmPress = () => {
    const coin = currencyCoin && currencyCoin.length > 0 ? currencyCoin[0].realAmount : 0;
    const value = toNumber(inputString);
    console.log('onConfirmPress', inputString, value);
    if (value <= 0) {
      EasyToast.show('划转数量错误');
      return;
    } else if (value > coin) {
      EasyToast.show('超出划转数量');
      return;
    }
    EasyShowLD.loadingShow('正在划转...');
    props.getWalletTransferRequest({ walletType: currentCurrency.id, amount: inputString, fromWallet: turnEnter, toWallet: turnOut });
  };

  return (
    <SafeAreaView forceInset={{ top: 'always', bottom: 'never' }}>
      <View style={styles.body}>
        <Header title="资金划转" navigation={navigate} leftTitle="" leftImage={Imgs.back} onPressLeft={onBack} />
        <View style={styles.baseView}>
          <TransferPosition title1={turnArray[turnEnter]} title2={turnArray[turnOut]} onChange={onChange} />
          <TransferInput
            onPressAll={onPressAll}
            currency={currentCurrency}
            onPressChoose={onPressChooseWalletCoin}
            inPutString={inputString}
            onPressInput={onPressinput}
            currencyCoin={currencyCoin && currencyCoin.length > 0 ? currencyCoin[0].realAmount : 0}
          />
          <Button style={styles.buttonView} disabled={!isCanNext()} onPress={onConfirmPress}>
            确 认
          </Button>
        </View>
      </View>
      {showChoose ? (
        <TransferPopup data={[{ coin: 'BTC' }, { coin: 'ETH' }]} onPressClose={onPressCloseChooseWalletCoin} onChooseItem={onPressChooseItem} />
      ) : null}
      <LoadingDialog />
    </SafeAreaView>
  );
};

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getViewWallet,
    (state: Record<string, any>) => state.getCloudWalletAssets,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.getWalletTransfer,
  ],
  (getViewWallet, getCloudWalletAssets, getCloudWalletType, getWalletTransfer) => {
    const supportCurrency = getCompareAccountIntersectionMap(getCloudWalletType.data, getViewWallet.data, getCloudWalletAssets.data);
    return {
      currencysMap: supportCurrency,
      walletAccount: getCloudWalletAssets.data,
      bbCoinAccount: getViewWallet.data,
      getWalletTransfer: getWalletTransfer,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsTransfer);
