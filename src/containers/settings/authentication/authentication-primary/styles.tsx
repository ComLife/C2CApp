import { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import UIColor from '../../../../const/colors';
import { screenHeight, screenWidth, setRatio, setText } from '../../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    safeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      width: screenWidth,
      alignItems: 'center',
    },
    inputView: {
      width: setRatio(591),
      height: setRatio(75),
      borderBottomColor: UIColor.colorB4,
      borderBottomWidth: setRatio(1),
      flexDirection: 'row',
      alignItems: 'center',
    },
    inputText: {
      fontSize: setText(23),
      color: UIColor.importantTextColor,
      width: setRatio(160),
    },
    input: {
      fontSize: setText(23),
      color: UIColor.importantTextColor,
      flex: 1,
      marginLeft: setRatio(20),
    },
    notCanNext: {
      backgroundColor: UIColor.colorA1,
    },
    button: {
      marginTop: setRatio(170),
    },
    enabledStyle: {
      backgroundColor: UIColor.colorD2,
    },
    enabledTextStyle: {
      color: UIColor.whiteColor,
    },
    buttonView: {
      flex: 1,
      borderRadius: setRatio(4),
      backgroundColor: UIColor.whiteColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginText: {
      fontSize: setText(22),
      color: UIColor.whiteColor,
    },
    detailView: {
      width: setRatio(591),
      height: setRatio(195),
      borderRadius: setRatio(23),
      backgroundColor: UIColor.whiteColor,
      paddingTop: setRatio(39),
      paddingLeft: setRatio(34),
      paddingBottom: setRatio(24),
      justifyContent: 'space-between',
    },
    detailInfoView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: setRatio(20),
    },
    infoText: {
      fontSize: setText(24),
      color: UIColor.secondTextColor,
      marginLeft: Platform.OS === 'android' ? setRatio(-7) : 0,
    },
    successColor: {
      marginLeft: setRatio(10),
      color: UIColor.colorA1,
      fontSize: setText(18),
    },
    buttonView1: {
      width: screenWidth - setRatio(60),
      marginHorizontal: setRatio(30),
      height: setRatio(60),
      marginTop: setRatio(180),
    },
    authButton: {
      backgroundColor: UIColor.colorD2,
    },
    detailView1: {
      flexDirection: 'row',
    },
    detailView2: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    detailView3: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    baseView: {
      flex: 1,
    },
    baseView1: {
      height: setRatio(20),
    },
  });
}
