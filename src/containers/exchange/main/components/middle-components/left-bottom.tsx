import React, { memo } from 'react';
import { Text, View } from 'react-native';
import Colors from '../../../../../const/colors';
import styles from './styles';
import { Button } from 'space-ui';
import { toNumber } from '../../../../../utils/digital';

interface Props {
  bottomText1?: string;
  bottomText2: string;
  bottomBtnBgColor: string;
  bottomBtnText: string;
  bottomBtnTextColor?: string;
  isInput: boolean; //当前是限价还是市价
  disabled: boolean; //是否可以点击
  openDeal: any; //点击打开交易面板
  status: number;
  isBuy: boolean;
  baseBalanceData: string;
  paymentCurrency: string;
}

const LeftBottom = memo((props: Props) => {
  const {
    bottomText1,
    bottomText2,
    bottomBtnText,
    bottomBtnBgColor,
    bottomBtnTextColor,
    isInput,
    baseBalanceData,
    disabled,
    openDeal,
    status,
    isBuy,
    paymentCurrency,
  } = props;
  const bottomBtnBgStyle = [styles.bottomBtn, { backgroundColor: bottomBtnBgColor || Colors.colorA2 }];
  const bottomBtnTextStyle = [styles.bottomBtnText, { color: bottomBtnTextColor || Colors.whiteColor }];

  const isOpen = () => {
    if (bottomBtnText === '登录') {
      return false;
    } else {
      if (status === 0) {
        return true;
      } else if (!isBuy && !toNumber(baseBalanceData)) {
        return true;
      } else {
        return disabled;
      }
    }
  };

  const isShow = () => {
    let tmp;
    if (bottomText2 && bottomText2 !== '0' && bottomText2.length > 12) {
      tmp = bottomText2.slice(0, 13);
    } else {
      return bottomText2;
    }

    if (tmp.indexOf('.') === -1) {
      return bottomText2.slice(0, 12);
    } else if (tmp.indexOf('.') === 12) {
      return bottomText2.slice(0, 11);
    } else if (tmp.indexOf('.') === 11) {
      return Math.round(toNumber(tmp));
    } else {
      let tmp1 = Math.round(10 ** (11 - tmp.indexOf('.')) * toNumber(tmp));

      return tmp1 / 10 ** (11 - tmp.indexOf('.'));
    }
  };

  const openPlane = () => {
    if (isInput) {
      return (
        <View style={styles.bottomTopView}>
          <Text style={styles.midText1}>{bottomText1 || '交易额'}</Text>
          <Text style={styles.bottomText2}>{isShow()}</Text>
          <Text style={styles.midText1}>{` ${paymentCurrency}`}</Text>
        </View>
      );
    } else {
      return <View style={styles.bottomTopView} />;
    }
  };

  return (
    <View style={styles.bottomBg}>
      {openPlane()}
      <View style={styles.bottomBtnView}>
        <Button
          style={bottomBtnBgStyle}
          children={bottomBtnText}
          textStyle={bottomBtnTextStyle}
          disabled={isOpen()}
          // disableColor={bottomBtnBgColor}
          onPress={openDeal}
        />
      </View>
    </View>
  );
});

export default LeftBottom;
