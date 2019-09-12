import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
import UIColor from '../../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    safeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: UIColor.whiteColor,
    },
    container: {
      flex: 1,
      width: screenWidth,
      alignItems: 'center',
    },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      padding: 16,
    },
  });
}
