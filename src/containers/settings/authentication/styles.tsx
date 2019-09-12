import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import UIColor from '../../../const/colors';
import { screenHeight, screenWidth, setRatio, setText } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    sefleView: {
      backgroundColor: UIColor.whiteColor,
    },
    scrollView: {
      backgroundColor: UIColor.colorB5,
      width: screenWidth,
      height: screenHeight,
    },
    body: {
      backgroundColor: UIColor.colorB5,
    },
    sectionContainer: {
      marginTop: setRatio(32),
    },
    sectionTitle: {
      fontSize: setText(24),
      fontWeight: '600',
      color: textColor,
    },
  });
}
