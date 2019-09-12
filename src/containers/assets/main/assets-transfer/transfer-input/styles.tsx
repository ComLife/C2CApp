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
      marginTop: setRatio(6),
      width: screenWidth,
      height: setRatio(201),
      backgroundColor: UIColor.whiteColor,
      justifyContent: 'center',
    },
    baseView: {
      width: screenWidth,
      height: setRatio(70),
      flexDirection: 'row',
      alignItems: 'center',
    },
    blankView: {
      marginTop: setRatio(23),
    },
    colorView: {
      backgroundColor: UIColor.colorB5,
      width: screenWidth,
      height: setRatio(15),
    },
    input: {
      padding: 0,
      marginTop: setRatio(20),
      fontSize: setText(22),
      color: UIColor.importantTextColor,
      width: screenWidth - setRatio(300),
      marginLeft: setRatio(22),
    },
    titleView: {
      marginTop: setRatio(20),
      marginLeft: setRatio(23),
      fontSize: setText(20),
      color: UIColor.colorB2,
    },
    titleView1: {
      marginLeft: setRatio(22),
      fontSize: setText(22),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    titleView2: {
      marginTop: setRatio(10),
      marginLeft: setRatio(129),
      fontSize: setText(18),
      color: UIColor.colorB1,
    },
    titleView3: {
      marginTop: setRatio(20),
      marginLeft: setRatio(24),
      fontSize: setText(22),
      color: UIColor.colorB2,
    },
    titleView4: {
      marginTop: setRatio(20),
      marginLeft: setRatio(24),
      fontSize: setText(22),
      color: UIColor.colorA1,
    },
    imageView: {
      width: setRatio(9),
      height: setRatio(17),
    },
    buttonView: {
      flex: 1,
      marginRight: setRatio(24),
      marginTop: setRatio(20),
    },
    endView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    endView1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    lineView: {
      marginLeft: setRatio(130),
      width: screenWidth - setRatio(153),
      height: setRatio(2),
      backgroundColor: UIColor.colorB4,
    },
    lineView1: {
      marginHorizontal: setRatio(66),
      width: screenWidth - setRatio(132),
      height: setRatio(2),
      backgroundColor: UIColor.colorB4,
    },
    touchableView: {
      // flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
}
