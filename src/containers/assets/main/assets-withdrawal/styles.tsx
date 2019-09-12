import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../utils/screen-util';
import UIColor from '../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    scrollView: {
      // backgroundColor: 'lightblue',
      backgroundColor: UIColor.colorB5,
    },
    body: {
      flex: 1,
    },
    baseView: {
      flex: 1,
    },
    blankView: {
      marginTop: setRatio(23),
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
  });
}
