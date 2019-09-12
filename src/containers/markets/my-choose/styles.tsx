import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import Colors from '../../../const/colors';
import { setRatio, setText } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    chooseWrapper: {
      marginTop: -100,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    walletIcon: {
      width: setRatio(108),
      height: setRatio(92),
    },
    buttonWrapper: {
      marginTop: setRatio(30),
      height: setRatio(50),
      width: setRatio(200),
      borderRadius: setRatio(25),
      backgroundColor: Colors.colorD2,
    },
    buttonText: {
      fontSize: setText(20),
      fontWeight: 'bold',
    },
  });
}
