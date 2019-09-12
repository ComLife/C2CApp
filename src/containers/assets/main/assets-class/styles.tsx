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
    },
    baseView: {
      width: screenWidth / 2,
      height: setRatio(101),
      alignItems: 'center',
      justifyContent: 'center',
    },
    baseView1: {
      marginLeft: setRatio(3),
      width: setRatio(120),
      height: setRatio(101),
    },
    baseView2: {
      marginLeft: setRatio(30),
      width: setRatio(120),
      height: setRatio(101),
    },
    baseView3: {
      marginLeft: setRatio(45),
      width: setRatio(120),
      height: setRatio(101),
    },
    baseView4: {
      marginLeft: setRatio(45),
      width: setRatio(120),
      height: setRatio(101),
    },
    baseViewButton: {
      width: screenWidth / 4,
      height: setRatio(101),
    },
    titleText: {
      marginLeft: setRatio(11),
      fontSize: setText(22),
      color: UIColor.colorB2,
    },
    imageView: {
      width: setRatio(26),
      height: setRatio(27),
    },
    imageView1: {
      width: setRatio(25),
      height: setRatio(28),
    },
    endView: {
      flex: 1,
      alignItems: 'flex-end',
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonView1: {
      width: setRatio(120),
      height: setRatio(101),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
