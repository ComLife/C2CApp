import React, { Fragment, memo, useEffect, useState } from 'react';
import { Clipboard, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import outerStyles from './styles';
import Colors from '../../../const/colors';
import Imgs from '../../../const/image-set';
import { DivisorLine } from 'space-ui';
import { setRatio } from '../../../utils/screen-util';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import mapDispatchToProps from './map-dispatch-to-props';
import { useNavigation } from '../../../routes/navigation-service';
import { WALLET_ON_OFF } from '../../../const/enum-set';
import { getCloudWallet, getCurrencysMap, getDefaultCurrency } from '../../../utils/wallet-utils';
import { EasyToast } from '../../../components/EasyToast/toast';
import { REMOVE_RECEIVEADDRESS } from '../../../redux/action-types';
import { createSelector } from 'reselect';

interface Props {
  onRecharge?: any;
}

const RechargeCode = memo((props: any) => {
  const styles = outerStyles();
  const { navigate } = useNavigation();
  const [isShow, setIsShow] = useState(true);

  //publickey的请求
  const onChooseCoin = (currencyDefault: any, isCall: boolean = false) => {
    if (currencyDefault) {
      if (props.cloudWallet && Array.isArray(props.cloudWallet)) {
        const currencyArr = props.cloudWallet.filter((item: any) => item.walletTypeCode === currencyDefault.code);
        if (currencyArr[0]) {
          props.SetCurreyDefult(currencyArr[0]);
          props.getReceiveaddressRequest({ walletType: currencyArr[0].walletType });
          if (isCall) {
            setIsShow(true);
          }
        } else {
          setIsShow(false);
          EasyToast.show('数据出现错误');
        }
      }
    } else {
      setIsShow(true);
    }
  };

  useEffect(() => {
    if (props.ReceiveaddressData && props.ReceiveaddressData.code === '1') {
      let cloutCrency = { ...props.currencyDefault };
      cloutCrency.publicKey = props.ReceiveaddressData.data.result.publicKey;
      cloutCrency.memo = props.ReceiveaddressData.data.result.memo;
      props.SetCurreyDefult(cloutCrency);
      props.resetState(REMOVE_RECEIVEADDRESS);
    }
  }, [props.ReceiveaddressData]);

  useEffect(() => {
    const currencyDefault: any = getDefaultCurrency(props.currency, WALLET_ON_OFF.RECEIVE)[0];
    onChooseCoin(currencyDefault);
  }, []);

  const onCopyPress = () => {
    Clipboard.setString(props.currencyDefault.publicKey);
    EasyToast.show('复制成功');
  };

  const onCopyMemoPress = () => {
    Clipboard.setString(props.currencyDefault.memo);
    EasyToast.show('复制成功');
  };

  const onRecharge = () => {
    if (props.onRecharge) props.onRecharge(false);
  };

  // 显示公钥
  const changePublicStr = (val: string) => {
    if (val && val.length > 23) {
      return `${val.substr(0, 10)}...${val.substr(-10, 10)}`;
    } else {
      return val || '';
    }
  };

  const onTopage = () => {
    // 跳转
    const currnecyArr = getDefaultCurrency(props.currency, WALLET_ON_OFF.RECEIVE);
    setIsShow(false);
    navigate('ChooseCoin', { currencysMap: currnecyArr, onChooseCoinCallback: onChooseCoin });
  };

  const currencyWallet = props.currency.find((item: any) => item.code === props.currencyDefault.walletTypeCode);
  return (
    <Modal transparent animationType="slide" visible={isShow}>
      <View style={[styles.blurView, { backgroundColor: Colors.modalColor }]} />
      <TouchableOpacity style={styles.modal} onPress={onRecharge} activeOpacity={1}>
        <TouchableOpacity style={styles.modalBg} onPress={() => {}} activeOpacity={1}>
          <View style={styles.codeHeader}>
            <TouchableOpacity onPress={onRecharge} activeOpacity={0.8}>
              <Image source={Imgs.icon_close} />
            </TouchableOpacity>
            <View style={styles.centerView}>
              <Text style={styles.rechargeText}>充值</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.codeHeader} onPress={onTopage}>
            <View style={styles.codeHeaderBot}>
              <Text style={styles.codeHeaderBotText1}>充值币种</Text>
              <Text style={styles.codeHeaderBotText2}>{props.currencyDefault.walletTypeCode}</Text>
            </View>
            <Image source={Imgs.icon_next} />
          </TouchableOpacity>
          <DivisorLine height={setRatio(2)} backgroundColor={Colors.colorB4} />
          <View style={styles.codeView}>
            {props.currencyDefault && props.currencyDefault.publicKey ? <QRCode size={setRatio(245)} value={props.currencyDefault.publicKey} /> : null}
            <TouchableOpacity onPress={() => onCopyPress()} activeOpacity={0.8}>
              <View style={styles.adressView}>
                <Text style={styles.addressText}>{changePublicStr(props.currencyDefault.publicKey || '')}</Text>
                <Image source={Imgs.icon_copy} style={styles.copyImage} />
              </View>
            </TouchableOpacity>
            {props.currencyDefault.memo ? <Text style={styles.memoText} onPress={onCopyMemoPress}>{`MEMO: ${props.currencyDefault.memo}`}</Text> : null}
          </View>
          <View style={styles.tipView}>
            <Text style={styles.tipText}>{`• 最小充值金额：${currencyWallet && currencyWallet.minRechargeAmount1 ? currencyWallet.minRechargeAmount1 : ''} ${
              props.currencyDefault.walletTypeCode
            }`}</Text>
            <Text style={styles.tipText}>• 小于最小金额的充值不会到账</Text>
            <Text style={styles.tipText}>{`• 请勿向上述地址充值任何非${props.currencyDefault.walletTypeCode}资产，否则资产将不可找回`}</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
});

const mapStateToProps = createSelector(
  [
    (state: Record<string, any>) => state.currencyDefaultData,
    (state: Record<string, any>) => state.getCloudWalletType,
    (state: Record<string, any>) => state.getCloudWalletAssets,
    (state: Record<string, any>) => state.ReceiveaddressData,
  ],
  (currencyDefaultData, getCloudWalletType, getCloudWalletAssets, ReceiveaddressData) => {
    const currencysMap = getCurrencysMap(getCloudWalletType.data, true);
    const cloudWallet = getCloudWallet(getCloudWalletAssets.data, currencysMap, 2, 4);
    return {
      currencyDefault: currencyDefaultData,
      currency: getCloudWalletType.data,
      cloudWallet,
      ReceiveaddressData,
    };
  },
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RechargeCode);
