import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../utils/screen-util';
import UIColor from '../../../../const/colors';
export default function outerStyles() {
  // // @ts-ignore
  // const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    scrollView: {
      // backgroundColor: 'lightblue',
    },
    body: {
      marginTop: setRatio(13),
      flexDirection: 'row',
    },
    bodyView: {
      alignItems: 'center',
      flexDirection: 'row',
      width: screenWidth,
      height: setRatio(50),
    },
    bodyView1: {
      alignItems: 'center',
      flexDirection: 'row',
      width: screenWidth - setRatio(50),
      height: setRatio(50),
    },
    titleText: {
      marginLeft: setRatio(24),
      fontSize: setText(20),
      color: UIColor.colorB2,
    },
    titleText1: {
      marginBottom: setRatio(3),
      marginLeft: setRatio(10),
      fontSize: setText(27),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    titleText2: {
      marginLeft: setRatio(7),
      fontSize: setText(20),
      color: UIColor.colorB1,
    },
    titleText3: {
      marginLeft: setRatio(8),
      fontSize: setText(18),
      color: UIColor.colorB2,
    },
    baseView: {
      flex: 1,
    },
    imageView: {
      width: setRatio(27),
      height: setRatio(25),
    },
    endView: {
      flex: 1,
      height: setRatio(50),
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    buttonView: {
      marginRight: setRatio(10),
      width: setRatio(50),
      height: setRatio(50),
    },
    buttonChildView: {
      width: setRatio(50),
      height: setRatio(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
