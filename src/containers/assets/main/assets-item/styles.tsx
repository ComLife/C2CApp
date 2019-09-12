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
    },
    body: {
      // marginLeft: setRatio(23),
      width: screenWidth - setRatio(100),
      height: setRatio(220),
      borderRadius: setRatio(3),
    },
    body1: {
      width: screenWidth - setRatio(100),
      height: setRatio(220),
      borderRadius: setRatio(3),
    },
    titleView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: setRatio(33),
    },
    titleText: {
      marginTop: setRatio(30),
      fontSize: setText(20),
      color: UIColor.colorB5,
    },
    titleText1: {
      marginTop: setRatio(35),
      marginLeft: setRatio(34),
      fontSize: setText(40),
      color: UIColor.whiteColor,
      fontWeight: 'bold',
    },
    titleText2: {
      marginTop: setRatio(21),
      marginLeft: setRatio(34),
      fontSize: setText(20),
      color: UIColor.whiteColor,
      opacity: 0.5,
    },
    imageView: {
      marginTop: setRatio(30),
      width: setRatio(31),
      height: setRatio(31),
    },
    baseView: {
      flex: 1,
    },
    linearGradientBg: {
      position: 'absolute',
      width: screenWidth - setRatio(100),
      height: setRatio(220),
    },
  });
}
