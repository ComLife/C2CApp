import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../../utils/theme-color';
import { moreHeight, screenHeight, screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
import UIColor from '../../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    scrollView: {
      // backgroundColor: 'lightblue',
    },
    buttonClose: {
      flex: 1,
      backgroundColor: UIColor.colorA3,
    },
    blackView: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: screenWidth,
      height: screenHeight,
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'column-reverse',
    },
    chooseView: {
      backgroundColor: UIColor.whiteColor,
      // @ts-ignore
      // marginBottom: setRatio(15) + moreHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chooseFrameStyle: {},
    chooseView1: {
      width: screenWidth,
      height: setRatio(68),
      justifyContent: 'center',
      alignItems: 'center',
    },
    chooseView3: {
      width: screenWidth,
      height: setRatio(2),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: UIColor.colorB4,
    },
    bottomView: {
      backgroundColor: UIColor.whiteColor,
      // @ts-ignore
      height: moreHeight,
      width: screenWidth,
    },
    chooseView2: {
      borderRadius: setRatio(20),
      backgroundColor: UIColor.whiteColor,
      marginHorizontal: setRatio(20),
      justifyContent: 'center',
      marginBottom: setRatio(15),
      alignItems: 'center',
    },
    chooseText: {
      fontSize: setText(27),
      color: UIColor.colorD2,
    },
    buttonStyle: {
      width: screenWidth,
      height: setRatio(70),
    },
  });
}
