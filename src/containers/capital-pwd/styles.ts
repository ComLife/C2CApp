import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../utils/theme-color';
import UIColor from '../../const/colors';
import { screenHeight, setRatio, setText } from '../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: UIColor.colorB5,
    },
    noticeView: {
      height: setRatio(140),
      backgroundColor: UIColor.whiteColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: setRatio(15),
    },
    noticeTextBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: setRatio(15),
    },
    noticeText1: {
      fontSize: setText(22),
      color: UIColor.secondTextColor,
      textAlign: 'center',
    },
    noticeText2: {
      fontSize: setText(22),
      color: UIColor.importantTextColor,
      marginHorizontal: setRatio(8),
    },
    DivingLine: {
      color: UIColor.colorB4,
      height: setRatio(1),
    },
    testView: {
      backgroundColor: UIColor.whiteColor,
      marginTop: setRatio(30),
    },
    inputView: {
      width: setRatio(591),
      height: setRatio(80),
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      height: setRatio(80),
      fontSize: setText(22),
      color: UIColor.importantTextColor,
      marginLeft: setRatio(20),
    },
    leftPos: {
      position: 'absolute',
      right: setRatio(0),
    },
    leftTimeText: {
      fontSize: setRatio(25),
      color: UIColor.colorA1,
    },
    tipsText: {
      color: UIColor.colorA3,
      marginTop: setRatio(30),
      marginLeft: setRatio(20),
    },
    button: {
      marginTop: setRatio(90),
      borderRadius: setRatio(5),
      marginHorizontal: setRatio(30),
    },
  });
}
