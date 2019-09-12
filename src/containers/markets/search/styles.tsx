import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import { setRatio } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      backgroundColor: backColor,
    },
    indicator: {
      marginTop: setRatio(24),
    },
  });
}
