import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import Colors from '../../../const/colors';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    scrollView: {
      // backgroundColor: 'lightblue',
    },
    body: {
      backgroundColor: backColor,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: textColor,
    },
    tabView: {
      // backgroundColor: 'red',
    },
    tabStyle: {
      backgroundColor: Colors.whiteColor,
    },
    labelStyle: {
      backgroundColor: Colors.colorB1,
    },
    indicatorStyle: {
      backgroundColor: '#f00',
    },
    indicatorContainerStyle: {
      backgroundColor: '#16ffa4',
    },
  });
}
