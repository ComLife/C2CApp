import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio, setText } from '../../../utils/screen-util';
import Colors from '../../../const/colors';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.whiteColor,
    },
    leftText: {
      fontSize: setText(24),
      color: Colors.colorD2,
    },
    bg: {
      position: 'absolute',
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: Colors.whiteColor,
    },
    bgView: {
      justifyContent: 'center',
      height: setRatio(80),
      width: DEVICE_WIDTH,
    },
    touchble: {
      width: setRatio(170),
      height: setRatio(40),
      alignItems: 'center',
      flexDirection: 'row',
    },
    titleImage: {
      marginLeft: setRatio(30),
      tintColor: Colors.colorD2,
    },
    messageBgView: {
      height: setRatio(100),
    },
    messageBgView1: {
      height: setRatio(100),
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoImage: {
      width: setRatio(60),
      height: setRatio(60),
    },
    messageView: {
      height: setRatio(400),
    },
    messageTouch: {
      height: setRatio(100),
      alignItems: 'center',
    },
    messageText: {
      fontSize: setText(22),
      color: Colors.lightGreyFont,
    },
    messageText1: {
      fontSize: setText(24),
      color: Colors.modalBtnTextColor,
      // alignItems: 'center',
      marginTop: setRatio(30),
    },
    messageImage: {
      width: setRatio(100),
      height: setRatio(100),
    },
    indexView: {
      width: 80,
      height: 100,
      backgroundColor: Colors.colorB1,
    },
    messageView1: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
