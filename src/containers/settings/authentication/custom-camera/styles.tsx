import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../utils/screen-util';
import UIColor from '../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      width: screenWidth,
      alignItems: 'center',
      backgroundColor: UIColor.whiteColor,
    },
    preview: {
      marginTop: setRatio(333),
      width: screenWidth,
      height: setRatio(400),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    cancelView: {
      width: setRatio(150),
      height: setRatio(190),
      alignItems: 'center',
      justifyContent: 'center',
    },
    photoView: {
      width: screenWidth - setRatio(300),
      height: setRatio(190),
      alignItems: 'center',
      justifyContent: 'center',
    },
    determineView: {
      alignSelf: 'flex-end',
      width: setRatio(150),
      height: setRatio(190),
    },
    cancelText: {
      fontWeight: '200',
      fontSize: setText(27),
      color: UIColor.whiteColor,
    },
    tipText: {
      fontWeight: '200',
      fontSize: setText(24),
      color: UIColor.whiteColor,
    },
    tipView: {
      marginTop: setRatio(15),
      alignItems: 'center',
      justifyContent: 'center',
    },
    baseView: {
      flex: 1,
      backgroundColor: 'black',
    },
    imageView: {
      width: screenWidth,
      height: setRatio(400),
      position: 'absolute',
    },
    bgBottomView: {
      backgroundColor: 'black',
      position: 'absolute',
      width: screenWidth,
      height: setRatio(333),
    },
    bgBackView: {
      flex: 1,
      backgroundColor: 'black',
    },
    canView: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    canBgView: {
      width: screenWidth,
      height: setRatio(190),
      flexDirection: 'row',
      justifyContent: 'center',
    },
    imageView1: {
      width: setRatio(130),
      height: setRatio(130),
    },
  });
}
