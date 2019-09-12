import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../../utils/theme-color';
import Colors from '../../../../../const/colors';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      // justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    container1: {
      flex: 1,
      backgroundColor: Colors.colorB5,
    },
    view: {
      flex: 1,
    },
  });
}
