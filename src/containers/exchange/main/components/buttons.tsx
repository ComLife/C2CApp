import React, { memo } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Button } from 'space-ui';
import Colors from '../../../../const/colors';
import { setRatio } from '../../../../utils/screen-util';
import { formatNumberBase } from '../../../../utils/digital';

interface Props {
  onBackBtn1?: any; //回调
  onBackBtn2?: any; //回调
  btnBg1?: string; //第一个按钮背景色
  btnTextBg1?: string; //第一个按钮字体色
  btnText1?: string; //第一个按钮文字
  btnBg2?: string; //第2个按钮背景色
  btnTextBg2?: string; //第2个按钮字体色
  btnText2?: string; //第2个按钮文字
  rightText1?: string; //右上文字
  rightColor1?: string; //右方文字颜色
  rightText2?: string; //右下文字
  rightColor2?: string; //右方文字颜色
}

const Buttons = memo((props: Props) => {
  const { onBackBtn1, onBackBtn2, btnText1, btnBg1, btnTextBg1, btnBg2, btnTextBg2, btnText2, rightColor1, rightText1, rightText2, rightColor2 } = props;
  const tmpPrice = '≈ ' + formatNumberBase(rightText2, 2) + ' CNY';
  const btn1 = [styles.buttonsBtn, { backgroundColor: btnBg1 || Colors.colorA2 }];
  const bgBtnText1 = [styles.buttonsText, { color: btnTextBg1 || Colors.whiteColor }];
  const btn2 = [styles.buttonsBtn, { backgroundColor: btnBg2 || Colors.colorA3, marginLeft: setRatio(42) }];
  const bgBtnText2 = [styles.buttonsText, { color: btnTextBg2 || Colors.whiteColor }];

  const rightTextColor1 = [styles.buttonsRightText1, { color: rightColor1 || Colors.colorA2 }];
  const rightTextColor2 = [styles.buttonsRightText2, { color: rightColor2 || Colors.colorB2 }];
  return (
    <View style={styles.buttonsBg}>
      <Button onPress={onBackBtn1} style={btn1}>
        <Text style={bgBtnText1}>{btnText1 || '买入'}</Text>
      </Button>
      <Button onPress={onBackBtn2} style={btn2} textStyle={bgBtnText2}>
        {btnText2 || '卖出'}
      </Button>
      <View style={styles.buttonsView}>
        <Text style={rightTextColor1}>{rightText1 || '0'}</Text>
        <Text style={rightTextColor2}>{tmpPrice || '≈ 0 CNY'}</Text>
      </View>
    </View>
  );
});

export default Buttons;
