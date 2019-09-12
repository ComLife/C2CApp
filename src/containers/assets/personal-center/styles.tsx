/* eslint-disable @typescript-eslint/ban-ts-ignore */
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
    container1: {
      flex: 1,
      backgroundColor: Colors.colorB5,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    indexBg: {
      flex: 1,
      backgroundColor: Colors.colorB5,
    },
    indexView: {
      marginTop: setRatio(15),
      backgroundColor: backColor,
    },
    shadow: {
      bottom: setRatio(54),
    },
    itemBg: {
      backgroundColor: Colors.whiteColor,
      height: setRatio(78),
      paddingHorizontal: setRatio(24),
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      fontSize: setText(23),
      color: textColor,
      fontWeight: 'bold',
    },
    itemView: {
      flex: 1,
      height: setRatio(24),
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    itemImage: {
      width: setRatio(9),
      height: setRatio(17),
      // tintColor: Colors.imageColor,
      transform: [{ rotate: '180deg' }],
    },
    itemTextBtn: {
      fontSize: setText(23),
      color: Colors.colorA1,
    },
    blurView: {
      position: 'absolute',
      top: -DEVICE_HEIGHT,
      left: 0,
      bottom: 0,
      right: 0,
    },
    modal: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    titleView2: {
      height: setRatio(344),
      backgroundColor: Colors.whiteSustrate,
    },
    titleView1: {
      height: setRatio(170),
      backgroundColor: Colors.whiteSustrate,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: setRatio(20),
    },
    titleView: {
      height: setRatio(87),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: setRatio(20),
    },
    lineDiv: {
      height: setRatio(2),
      backgroundColor: Colors.colorB4,
    },
    input: {
      fontSize: setText(23),
      includeFontPadding: false,
      color: Colors.importantTextColor,
      flex: 1,
      width: setRatio(200),
      marginRight: setRatio(20),
    },
    loginText: {
      fontSize: setText(23),
      includeFontPadding: false,
      color: Colors.importantTextColor,
    },
    loginText1: {
      fontSize: setText(22),
    },
    loginContainer: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    loginBtn: {
      width: DEVICE_WIDTH - setRatio(40),
      height: setRatio(70),
    },
    headerBg: {
      height: setRatio(160),
      backgroundColor: Colors.whiteColor,
    },
    headerView: {
      height: setRatio(54),
      paddingHorizontal: setRatio(10),
      justifyContent: 'center',
    },
    headerBack: {
      // tintColor: Colors.imageColor,
    },
    headerView1: {
      height: setRatio(106),
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerText: {
      fontSize: setText(25),
      fontWeight: 'bold',
      color: Colors.importantTextColor,
      marginLeft: setRatio(62),
    },
    headerText1: {
      fontSize: setText(25),
      fontWeight: 'bold',
      color: Colors.importantTextColor,
    },
    headerLogo: {
      width: setRatio(70),
      height: setRatio(70),
    },
    headerLogoView: {
      flex: 1,
      height: setRatio(106),
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: setRatio(20),
    },
    headerTouch: {
      width: setRatio(70),
      height: setRatio(70),
    },
    headerViewTouch: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerBg1: {
      height: setRatio(69),
      paddingHorizontal: setRatio(10),
      alignItems: 'center',
      flexDirection: 'row',
    },
    headerMid: {
      flex: 1,
      height: setRatio(69),
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerEndView: {
      width: setRatio(48),
    },
  });
}
