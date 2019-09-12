import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
import UIColor from '../../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    scrollView: {
      // backgroundColor: 'lightblue',
    },
    body: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    titleText: {
      fontSize: setText(25),
      color: UIColor.colorB1,
    },
    titleText1: {
      fontSize: setText(25),
      color: UIColor.colorB2,
    },
    colorView: {
      marginTop: setRatio(12),
      width: setRatio(30),
      height: setRatio(6),
      borderRadius: setRatio(3),
      backgroundColor: UIColor.colorA1,
    },
    colorView1: {
      marginTop: setRatio(12),
      width: setRatio(30),
      height: setRatio(6),
      borderRadius: setRatio(3),
      backgroundColor: UIColor.whiteColor,
    },
    body1: {
      alignItems: 'center',
    },
  });
}
