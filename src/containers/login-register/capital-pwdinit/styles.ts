import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import UIColor from '../../../const/colors';
import { screenHeight, setRatio, setText } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    capitalView: {
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
    tipText: {
      marginTop: setRatio(24),
      fontSize: setText(22),
      color: UIColor.colorB3,
    },
    passBox: {
      width: setRatio(50),
      height: setRatio(50),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    passBoxBot: {
      width: setRatio(50),
      height: setRatio(7),
      backgroundColor: UIColor.colorB4,
      borderRadius: setRatio(4),
    },
    passText: {
      fontSize: setText(43),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    passBoxView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: setRatio(40),
      marginTop: setRatio(100),
    },
    textInput: {
      position: 'absolute',
      marginTop: -10000,
      width: setRatio(500),
      height: setRatio(40),
      backgroundColor: UIColor.colorB3,
    },
    scrollView: {
      flex: 1,
    },
  });
}
