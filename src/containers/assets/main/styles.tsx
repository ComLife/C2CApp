import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import { screenWidth, setRatio } from '../../../utils/screen-util';
import UIColor from '../../../const/colors';
export default function outerStyles() {
  // // @ts-ignore
  // const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    scrollView: {
      // backgroundColor: 'lightblue',
    },
    body: {
      flex: 1,
      // backgroundColor: UIColor.colorA3,
    },
    baseView: {
      flex: 1,
    },
    blankView: {
      marginTop: setRatio(13),
    },
    colorView: {
      backgroundColor: UIColor.colorB5,
      width: screenWidth,
      height: setRatio(15),
    },
    footerView: {
      flexDirection: 'row',
      width: screenWidth,
      height: 50,
      //backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerTitle: {
      color: 'red',
    },
    lineView: {
      width: screenWidth,
      height: setRatio(2),
      backgroundColor: UIColor.colorB4,
    },
  });
}
