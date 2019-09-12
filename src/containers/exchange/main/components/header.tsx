import React from 'react';
import { Image, Switch, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Imgs from '../../../../const/image-set';

interface Props {
  onBack?: any; //背景色
  image?: any; //图片
  title?: string; //文字
  onClick?: any; //K线回调
  baseCurrency: string;
  paymentCurrency: string;
  callAuction: number;
}

export default function Header(props: Props) {
  const { onBack, image, onClick, baseCurrency, paymentCurrency, callAuction } = props;

  const currency1 = baseCurrency || '--';
  const currency2 = paymentCurrency || '--';

  return (
    <View style={styles.headerBg}>
      <TouchableOpacity onPress={onBack} style={styles.headerTouch}>
        <Image style={styles.headerImage} source={image || Imgs.icon_currency} />
        <Text style={styles.headerText}>{`${currency1}/${currency2}`}</Text>
      </TouchableOpacity>
      {callAuction ? (
        <TouchableOpacity style={styles.rightButton} onPress={onClick}>
          <View style={styles.rightButtonView}>
            <Image style={styles.headerImage1} source={image || Imgs.icon_movements} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
