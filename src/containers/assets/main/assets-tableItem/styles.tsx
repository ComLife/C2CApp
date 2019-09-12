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
      height: setRatio(165),
    },
    titleText: {
      marginTop: setRatio(30),
      marginLeft: setRatio(23),
      fontSize: setText(27),
      color: UIColor.colorA1,
      fontWeight: 'bold',
    },
    titleText1: {
      fontSize: setText(20),
      color: UIColor.colorB3,
    },
    titleText2: {
      fontSize: setText(18),
      color: UIColor.colorB1,
    },
    titleText3: {
      marginLeft: setRatio(8),
      fontSize: setText(20),
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
      alignItems: 'flex-end',
    },
    buttonView: {
      marginRight: setRatio(23),
    },
    titleView: {
      marginTop: setRatio(34),
      flexDirection: 'row',
    },
    titleView1: {
      marginTop: setRatio(15),
      flexDirection: 'row',
    },
    lineView: {
      marginHorizontal: setRatio(23),
      width: screenWidth - setRatio(46),
      height: setRatio(2),
      marginTop: setRatio(20),
      backgroundColor: UIColor.colorB4,
    },
    titleChildView: {
      marginLeft: setRatio(24),
      width: (screenWidth - setRatio(48)) / 3,
    },
    titleChildView1: {
      // backgroundColor: 'red',
      width: (screenWidth - setRatio(48)) / 3,
    },
    titleChildView2: {
      alignItems: 'flex-end',
      width: (screenWidth - setRatio(48)) / 3,
    },
  });
}
