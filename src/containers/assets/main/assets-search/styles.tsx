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
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: setRatio(90),
    },
    baseView: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
    },
    baseView1: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
    },
    titleText: {
      marginRight: setRatio(23),
      fontSize: setText(22),
      color: UIColor.colorB2,
    },
    imageView: {
      marginLeft: setRatio(23),
      width: setRatio(24),
      height: setRatio(24),
    },
    imageView1: {
      width: setRatio(24),
      height: setRatio(24),
    },
    input: {
      fontSize: setText(23),
      color: UIColor.importantTextColor,
      flex: 1,
      marginLeft: setRatio(20),
    },
    deleteImage: {
      width: setRatio(21),
      height: setRatio(21),
    },
    textInputButton: {
      marginLeft: setRatio(30),
      height: setRatio(50),
      width: setRatio(250),
    },
    textInputButton1: {
      marginRight: setRatio(20),
    },
    textInputButton2: {
      marginRight: setRatio(10),
    },
    textView: {
      flex: 1,
      justifyContent: 'center',
    },
    textView1: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageStyle: {
      alignItems: 'center',
    },
  });
}
