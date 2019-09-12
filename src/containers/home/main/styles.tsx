import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import { setRatio } from '../../../utils/screen-util';
import Colors from '../../../const/colors';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      backgroundColor: backColor,
    },
    shortcut: {
      flexDirection: 'row',
    },
    // divisorLine
    divisorLine: {
      height: setRatio(13),
      backgroundColor: Colors.colorB5,
    },
  });
}
