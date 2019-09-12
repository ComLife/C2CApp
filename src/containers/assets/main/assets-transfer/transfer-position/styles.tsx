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
      marginTop: setRatio(15),
      height: setRatio(140),
      backgroundColor: UIColor.whiteColor,
      flexDirection: 'row',
    },
    leftView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: setRatio(67),
      height: setRatio(140),
    },
    midView: {
      flex: 1,
    },
    midTopView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: setRatio(69),
    },
    midBottomView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      height: setRatio(69),
    },
    endView: {
      alignItems: 'center',
      justifyContent: 'center',
      width: setRatio(66),
      height: setRatio(140),
    },
    blankView: {
      marginTop: setRatio(23),
    },
    imageView: {
      height: setRatio(81),
      width: setRatio(10),
    },
    imageView1: {
      height: setRatio(29),
      width: setRatio(22),
    },
    titleView: {
      fontSize: setText(20),
      color: UIColor.colorB2,
    },
    titleView1: {
      fontWeight: 'bold',
      marginLeft: setRatio(43),
      fontSize: setText(22),
      color: UIColor.colorB1,
    },
  });
}
