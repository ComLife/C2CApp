/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import UIColor from '../../../const/colors';
import { setRatio, setText } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    registerView: {
      marginHorizontal: setRatio(45),
    },
    backTouch: {
      width: setRatio(80),
      height: setRatio(70),
      justifyContent: 'center',
      paddingLeft: setRatio(24),
    },
    titleHeaderText: {
      marginTop: setRatio(60),
      fontSize: setText(42),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    codeInput: {
      height: setRatio(70),
      fontWeight: 'bold',
      fontSize: setText(27),
      color: UIColor.colorB1,
      marginTop: setRatio(20),
    },
    noteCodeInput: {
      flex: 1,
      height: setRatio(70),
      fontWeight: 'bold',
      fontSize: setText(27),
      color: UIColor.colorB1,
    },
    passInput: {
      height: setRatio(70),
      fontWeight: 'bold',
      marginTop: setRatio(80),
      fontSize: setText(27),
      color: UIColor.colorB1,
    },
    codeView: {
      flexDirection: 'row',
      alignItems: 'center',
      height: setRatio(70),
      marginTop: setRatio(50),
      justifyContent: 'space-between',
    },
    codeText: {
      fontSize: setRatio(27),
      color: UIColor.colorA1,
    },
    inputDiving: {
      height: setRatio(2),
      backgroundColor: UIColor.colorB4,
    },
    inputView: {
      marginTop: 50,
      paddingHorizontal: 15,
    },
    loginButton: {
      marginTop: 70,
      backgroundColor: UIColor.btnOnpressColor,
    },
    btnText: {
      fontWeight: 'bold',
      color: UIColor.whiteColor,
      fontSize: setText(27),
    },
    forgotPassText: {
      marginTop: setRatio(30),
      fontSize: setText(22),
      color: UIColor.colorA1,
    },
    registerTextView: {
      flexDirection: 'row',
      marginTop: setRatio(180),
      marginBottom: setRatio(50),
    },
    registerText: {
      fontSize: setText(27),
      color: UIColor.colorB3,
    },
    onRegisterText: {
      fontSize: setText(27),
      color: UIColor.colorA1,
      fontWeight: 'bold',
    },
    countryView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: setRatio(50),
      height: setRatio(80),
    },
    phoneHeader: {
      fontSize: setText(24),
      color: UIColor.colorB1,
      fontWeight: 'bold',
      marginRight: setRatio(10),
    },
    inputDiving1: {
      width: setRatio(2),
      height: setRatio(42),
      marginRight: setRatio(20),
      backgroundColor: UIColor.colorB4,
    },
    accountView: {
      flexDirection: 'row',
      marginTop: setRatio(50),
      alignItems: 'center',
    },
  });
}
