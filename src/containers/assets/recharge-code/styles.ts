import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import UIColor from '../../../const/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio, setText } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    blurView: {
      position: 'absolute',
      top: -DEVICE_HEIGHT,
      left: 0,
      bottom: 0,
      right: 0,
    },
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalBg: {
      backgroundColor: UIColor.whiteColor,
      // paddingHorizontal: setRatio(24),
      width: DEVICE_WIDTH,
      height: setRatio(705),
    },
    codeHeader: {
      paddingHorizontal: setRatio(24),
      flexDirection: 'row',
      alignItems: 'center',
      height: setRatio(67),
      justifyContent: 'space-between',
    },
    centerView: {
      position: 'absolute',
      right: 30,
      left: 30,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    rechargeText: {
      fontSize: setText(25),
      fontWeight: 'bold',
    },
    codeHeaderBot: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    codeHeaderBotText1: {
      fontSize: setText(20),
      color: UIColor.colorB2,
      marginRight: setRatio(29),
    },
    codeHeaderBotText2: {
      fontSize: setText(25),
      color: UIColor.colorB1,
    },
    codeView: {
      alignItems: 'center',
      marginTop: setRatio(37),
    },
    adressView: {
      flexDirection: 'row',
      marginTop: setRatio(30),
    },
    memoText: {
      marginTop: setRatio(20),
      color: UIColor.colorA1,
      fontSize: setText(23),
    },
    addressText: {
      color: UIColor.colorA1,
      fontSize: setText(20),
      textDecorationLine: 'underline',
    },
    copyImage: {
      marginLeft: setRatio(7),
      width: setRatio(20),
      height: setRatio(22),
    },
    tipView: {
      marginTop: setRatio(52),
      justifyContent: 'space-between',
      height: setRatio(78),
    },
    tipText: {
      paddingHorizontal: setRatio(24),
      fontSize: setText(18),
      color: UIColor.colorB2,
    },
  });
}
