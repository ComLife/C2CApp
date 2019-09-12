import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../utils/theme-color';
import UIColor from '../../const/colors';
import { screenHeight, screenWidth, setRatio, setText } from '../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    googleBg: {
      height: screenHeight,
      backgroundColor: UIColor.colorB5,
    },
    gapView: {
      height: setRatio(30),
      borderColor: UIColor.colorB3,
      borderWidth: setRatio(1),
    },
    authView: {
      backgroundColor: UIColor.whiteColor,
    },
    processView: {
      marginHorizontal: setRatio(25),
      height: setRatio(162),
      marginTop: setRatio(28),
      alignSelf: 'center',
    },
    processText: {
      fontSize: setText(20),
      color: UIColor.secondTextColor,
    },
    googleBtn: {
      marginHorizontal: setRatio(30),
      backgroundColor: UIColor.btnOnpressColor,
    },
    googleCloseView: {
      width: screenWidth,
      height: screenHeight,
      alignItems: 'center',
      backgroundColor: UIColor.colorB5,
    },
    noticeView: {
      width: screenWidth,
      height: setRatio(140),
      backgroundColor: UIColor.whiteColor,
      marginTop: setRatio(28),
      justifyContent: 'center',
      alignItems: 'center',
    },
    noticeText1: {
      fontSize: setText(22),
      marginHorizontal: setRatio(30),
      color: UIColor.secondTextColor,
      textAlign: 'center',
    },
    testView: {
      width: screenWidth,
      backgroundColor: UIColor.whiteColor,
      marginTop: setRatio(30),
    },
    inputView: {
      width: setRatio(591),
      height: setRatio(80),
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputbox: {
      fontSize: setText(22),
      color: UIColor.importantTextColor,
      flex: 1,
      marginLeft: setRatio(20),
    },
    leftTimeText: {
      fontSize: setText(22),
      color: UIColor.colorA1,
    },
    leftPos: {
      position: 'absolute',
      right: 0,
    },
    closeGoogleBtn: {
      marginTop: setRatio(80),
      width: screenWidth - 30,
    },
  });
}
