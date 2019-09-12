import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'space-ui';
import { createSelector } from 'reselect';
import { useNavigation } from '../../../../routes/navigation-service';
import outerStyles from './styles';
import { ERROR_CODE, WALLET_ON_OFF } from '../../../../const/enum-set';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { DispatchProps, Props, StateProps } from './interfaces';
import { checkRemarks, getDefaultCurrency, getDefaultWallet } from '../../../../utils/wallet-utils';
import Imgs from '../../../../const/image-set';
import Header from '../../../settings/authentication/header';
import AssetsChoose from './assets-choose';
import AssetsMidInput from './assets-mid-input';
import DealModal from '../../../exchange/main/components/deal-modal';
import Alert, { EasyAlert } from '../../../../components/easyAlert/Alert';
import { EasyShowLD, LoadingDialog } from '../../../../components/easyShowLD/EasyShow';
// @ts-ignore
import { EasyToast } from '../../../../components/EasyToast/toast';
import { toNumber } from '../../../../utils/digital';
import * as types from '../../../../redux/action-types';
import UIColor from '../../../../const/colors';
import Config from '../../../../const/config';
import { inputLimit } from '../../../../utils/input-limit';

const AssetsWithDrawal = (props: DispatchProps & Props) => {
  const styles = outerStyles();
  const [currency, setCurrency] = useState();
  const [cloudWallet, setCloudWallet] = useState({
    realAmount: '0',
  });
  const [inPutSweepString, setInPutSweepString] = useState('');
  const [inPutPassString, setInPutPassString] = useState('');
  const [inPutPhoneString, setInPutPhoneString] = useState('');
  const [inPutRemarksString, setInPutRemarksString] = useState('');
  const [inPutCoinNumberstring, setInPutCoinNumberstring] = useState('');
  const [inPutTransferNumberstring, setInPutTransferNumberstring] = useState('');
  const { navigate, goBack } = useNavigation();
  const [tabIndex, setTabIndex] = useState(0);
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    setCurrency(props.currency);
  }, [props.currency]);
  useEffect(() => {
    setCloudWallet(props.cloudWallet);
  }, [props.cloudWallet]);

  useEffect(() => {
    if (!props.cashCode || !props.cashCode.code) return;
    console.log('useEffect', props.cashCode);
    if (props.cashCode.code === ERROR_CODE.SUCCESS) {
      EasyShowLD.loadingClose();
      EasyToast.show('提现成功');
      goBack();
    } else {
      EasyToast.show(props.cashCode.msg);
      EasyShowLD.loadingClose();
    }
    props.resetState(types.REMOVE_CLOUD_WALLET_CASH);
  }, [props.cashCode]);

  useEffect(() => {
    if (!props.carryCode || !props.carryCode.code) return;
    console.log('useEffect', props.carryCode);
    if (props.carryCode.code === ERROR_CODE.SUCCESS) {
      EasyToast.show('转账成功');
      EasyShowLD.loadingClose();
      goBack();
    } else {
      EasyToast.show(props.carryCode.msg);
      EasyShowLD.loadingClose();
    }
    props.resetState(types.REMOVE_CLOUD_WALLET_CARRY);
  }, [props.carryCode]);

  const closeDeal = () => {
    setIsPassword(false);
  };

  useEffect(() => {
    if (password.length === 6) {
      if (tabIndex === 0) {
        // 提现
        props.getCloudWalletCashRequest({
          toPublicKey: inPutSweepString,
          tradePwd: password,
          walletType: currency.id,
          userId: Config.headers.uid,
          amount: inPutCoinNumberstring,
          description: inPutRemarksString,
        });
        EasyShowLD.loadingShow('请求提现...');
      } else {
        // 转账
        props.getCloudWalletCarryRequest({
          toUser: inPutPhoneString,
          tradePwd: password,
          walletType: currency.id,
          userId: Config.headers.uid,
          amount: inPutTransferNumberstring,
        });
        EasyShowLD.loadingShow('请求转账...');
      }
      closeDeal();
      Keyboard.dismiss();
      setPassword('');
    }
  }, [password]);

  // 返回
  const onBack = () => {
    goBack();
  };
  const onChoose = (index: number) => {
    setTabIndex(index);
  };
  const onInputPhone = (string: string) => {
    setInPutPhoneString(inputLimit(string, 0));
  };
  const onInputSweep = (string: string) => {
    setInPutSweepString(string);
  };
  const onInputRemarks = (string: string) => {
    setInPutRemarksString(string);
  };
  const onInputCoin = (string: string) => {
    setInPutCoinNumberstring(inputLimit(string, 8));
  };
  const onInputTransfer = (string: string) => {
    setInPutTransferNumberstring(inputLimit(string, 8));
  };
  const onPressPassWord = (string: string) => {
    setInPutPassString(string);
  };
  const onAssetsQrScanner = (res: any) => {
    setInPutSweepString(res.data);
  };
  const onPressScanning = () => {
    navigate('AssetsQrScanner', { onAssetsQrScanner: onAssetsQrScanner });
  };
  const onPressTotal = () => {
    if (tabIndex === 0) {
      setInPutCoinNumberstring(cloudWallet && cloudWallet.realAmount ? cloudWallet.realAmount : '0');
    } else {
      setInPutTransferNumberstring(cloudWallet && cloudWallet.realAmount ? cloudWallet.realAmount : '0');
    }
  };

  const onPressConfirm = () => {
    if (!currency || !currency.id) return;
    let amount = 0;
    if (tabIndex === 0) {
      amount = toNumber(inPutCoinNumberstring);
    } else {
      amount = toNumber(inPutTransferNumberstring);
    }
    if (amount < parseFloat(currency.minerfeeMin1)) {
      EasyToast.show(tabIndex === 0 ? `单次提币不得小于${currency.minerfeeMin1}` : `单次转账不得小于${currency.minerfeeMin1}`);
      return;
    }
    if (amount < parseFloat(currency.minerfee1)) {
      EasyToast.show('交易金额不得小于服务费');
      return;
    }
    if (amount > parseFloat(currency.leftMiner)) {
      EasyToast.show(tabIndex === 0 ? `每日提币不得大于${currency.minerfeeMax1}` : `每日转账不得大于${currency.minerfeeMax1}`);
      return;
    }
    // const commission = this.state.type === 1 ? parseFloat(minerData.minerfee) : parseFloat(minerData.mallfee);
    if (amount > parseFloat(cloudWallet.realAmount)) {
      EasyAlert.show(
        {
          title: '提示',
          notice: tabIndex === 0 ? '提现金额大于当前余额' : '转账金额大于当前余额',
          inputComponentIsShow: false,
          buttons: [{ text: '确定' }],
        },
        () => {},
      );
      return;
    }
    if (!checkRemarks(inPutRemarksString)) {
      return;
    }
    setIsPassword(true);
  };

  const onChooseCoinCallback = (choossCurrency: any) => {
    if (choossCurrency) {
      setCurrency(choossCurrency);
      const cloudWallet = getDefaultWallet(props.walletAccount, choossCurrency);
      setCloudWallet(cloudWallet);
    }
  };
  const onPressChooseWalletCoin = () => {
    navigate('ChooseCoin', { currencysMap: props.supportCurrency, onChooseCoinCallback: onChooseCoinCallback });
  };

  const onRenderAssetsChoose = () => {
    return <AssetsChoose title1={'普通提币'} title2={'内部转账'} onChoose={onChoose} />;
  };

  //========跳转重置资金密码
  const onPassword = () => {
    closeDeal();
    Keyboard.dismiss();
    navigate('CapitalPwd');
  };

  const onSetPassword = (string: string) => {
    setPassword(string);
  };

  const minerfee = currency && currency.minerfee1 ? currency.minerfee1 : '0';
  const mallfee = currency && currency.mallfee1 ? currency.mallfee1 : '0';
  return (
    <SafeAreaView forceInset={{ bottom: 'never' }}>
      <ScrollView alwaysBounceVertical={false} contentInsetAdjustmentBehavior="automatic" style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Header navigation={navigate} leftTitle="" leftImage={Imgs.back} onPressLeft={onBack} titleComponent={onRenderAssetsChoose()} />
        <View style={styles.body}>
          <AssetsMidInput
            onPressConfirm={onPressConfirm}
            onPressTotal={onPressTotal}
            onPressScanning={onPressScanning}
            onPressTransferNumber={onInputTransfer}
            onPressCoinNumber={onInputCoin}
            onPressRemarks={onInputRemarks}
            onPressSweep={onInputSweep}
            onPressPhone={onInputPhone}
            onPressChooseCoin={onPressChooseWalletCoin}
            inPutTransferNumberstring={inPutTransferNumberstring}
            inPutCoinNumberstring={inPutCoinNumberstring}
            inPutSweepString={inPutSweepString}
            inPutPhoneString={inPutPhoneString}
            inPutRemarksString={inPutRemarksString}
            headerIndex={tabIndex}
            currency={currency}
            currentCurrency={cloudWallet}
          />
          <Alert />
          <LoadingDialog />
        </View>
      </ScrollView>
      {/*{openPassword ? <InputFundPassWord onPressInput={onPressPassWord} inputContent={inPutPassString} modelVisible={true} onClose={onClosePassword} /> : null}*/}
      {isPassword ? (
        <DealModal
          onClose={closeDeal}
          titleText={'验证资金密码'}
          titleColor={UIColor.colorB1}
          password={password}
          setPassword={onSetPassword}
          onPassword={onPassword}
          title1={'币种'}
          title2={tabIndex === 0 ? '提现地址' : '转账账户名'}
          title3={tabIndex === 0 ? '提现数量' : '转账数量'}
          title4={'手续费'}
          title1Value={currency && currency.code ? currency.code : ''}
          title2Value={tabIndex === 0 ? inPutSweepString : inPutPhoneString}
          title3Value={tabIndex === 0 ? inPutCoinNumberstring : inPutTransferNumberstring}
          title4Value={tabIndex === 0 ? minerfee : mallfee}
          transaction={true}
        />
      ) : null}
    </SafeAreaView>
  );
};

// const mapStateToProps = (state: StateProps) => {
//   const { getCloudWalletAssets, getCloudWalletType, getCloudWalletCash, getCloudWalletCarry, userInfo } = state;
//   const supportCurrency = getDefaultCurrency(getCloudWalletType.data, WALLET_ON_OFF.TRANSFER);
//   const currentCurrency = supportCurrency && supportCurrency.length > 0 ? supportCurrency[0] : [];
//   const cloudWallet = getDefaultWallet(getCloudWalletAssets.data, currentCurrency);
//   return {
//     cashCode: getCloudWalletCash,
//     carryCode: getCloudWalletCarry,
//     cloudWallet: cloudWallet,
//     supportCurrency: supportCurrency,
//     currency: currentCurrency,
//     walletAccount: getCloudWalletAssets.data,
//   };
// };

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.getCloudWalletAssets,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.getCloudWalletCash,
    (state: Record<string, any>) => state.getCloudWalletCarry,
  ],
  (getCloudWalletAssets, getCloudWalletType, getCloudWalletCash, getCloudWalletCarry) => {
    const supportCurrency = getDefaultCurrency(getCloudWalletType.data, WALLET_ON_OFF.TRANSFER);
    const currentCurrency = supportCurrency && supportCurrency.length > 0 ? supportCurrency[0] : [];
    const cloudWallet = getDefaultWallet(getCloudWalletAssets.data, currentCurrency);
    return {
      cashCode: getCloudWalletCash,
      carryCode: getCloudWalletCarry,
      cloudWallet: cloudWallet,
      supportCurrency: supportCurrency,
      currency: currentCurrency,
      walletAccount: getCloudWalletAssets.data,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetsWithDrawal);
