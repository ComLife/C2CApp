import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import { screenWidth, setRatio, setText, statusBarHeight } from '../../../../utils/screen-util';
import UIColor from '../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    header: {
      width: screenWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // borderBottomWidth: ScreenUtil.pixel,
      // borderBottomColor: UIColor.divingLine,
      // ...CommonStyles.shadow
    },
    headerTitle: {
      fontSize: setText(28),
      includeFontPadding: false,
      fontWeight: 'bold',
      color: UIColor.importantTextColor,
    },
    leftOut: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      left: setRatio(10),
      height: setRatio(70) + statusBarHeight,
      minWidth: setRatio(70),
    },
    touchOpa: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    touchOpaView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftImage: {
      width: setRatio(16),
      height: setRatio(27),
    },
    leftText: {
      fontSize: setText(22),
      color: 'white',
      marginLeft: setRatio(10),
    },
    rightText: {
      fontSize: setRatio(22),
      color: 'white',
      marginLeft: setRatio(10),
    },
    rightOut: {
      justifyContent: 'center',
      position: 'absolute',
      right: setRatio(10),
      height: setRatio(70) + statusBarHeight,
    },
    rightTouchOpa: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      height: setRatio(70) + statusBarHeight,
    },
  });
}
