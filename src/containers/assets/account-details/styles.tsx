import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import Colors from '../../../const/colors';
import { setRatio } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.whiteColor,
    },
    scrollView: {
      flex: 1,
      backgroundColor: backColor,
    },
    bg: {
      height: 500,
      backgroundColor: Colors.whiteColor,
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
    view: {
      paddingHorizontal: setRatio(24),
    },
    divLine: {
      height: 1,
      backgroundColor: Colors.colorB4,
    },
    activityIndicatorView: {
      height: setRatio(40),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
