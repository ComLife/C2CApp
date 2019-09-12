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
    loginView: {
      marginHorizontal: setRatio(45),
    },
    titleHeader: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop: setRatio(142),
    },
    titleHeaderImage: {
      width: setRatio(315),
      height: setRatio(55),
      marginTop: setRatio(50),
    },
    titleHeaderText: {
      marginLeft: setRatio(11),
      fontSize: setText(35),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    cancelText: {
      marginTop: setRatio(25),
      fontSize: setText(22),
      color: UIColor.colorB1,
      width: setRatio(60),
      height: setRatio(30),
    },
    codeInput: {
      height: setRatio(70),
      fontWeight: 'bold',
      flex: 1,
      fontSize: setText(27),
      marginTop: setRatio(20),
      color: UIColor.colorB1,
    },
    passInput: {
      height: setRatio(70),
      fontWeight: 'bold',
      marginTop: setRatio(50),
      fontSize: setText(27),
      color: UIColor.colorB1,
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
      marginTop: 50,
      height: setRatio(74),
      backgroundColor: UIColor.btnOnpressColor,
      // backgroundColor: UIColor.disPressColor,
    },
    btnText: {
      fontWeight: 'bold',
      color: UIColor.whiteColor,
      fontSize: setText(27),
    },
    forgotPassText: {
      marginTop: setRatio(30),
      fontSize: setText(22),
      width: setRatio(100),
      color: UIColor.colorA1,
    },
    registerTextView: {
      flexDirection: 'row',
      marginBottom: setRatio(50),
      marginTop: setRatio(180),
    },
    registerTextView1: {
      marginTop: setRatio(30),
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
    touchOpa: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: setRatio(70),
      height: setRatio(70),
      marginTop: setRatio(30),
    },
    leftImage: {
      width: setRatio(80),
      height: setRatio(70),
      justifyContent: 'center',
      paddingLeft: setRatio(24),
      marginTop: setRatio(20),
    },
    countryView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: setRatio(60),
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
  });
}
