import { useContext } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import UIColor from '../../../../const/colors';
import { moreHeight, screenHeight, screenWidth, setRatio, setText } from '../../../../utils/screen-util';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    base: {
      flex: 1,
    },
    safeContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: UIColor.whiteColor,
    },
    container: {
      marginHorizontal: setRatio(30),
      width: screenWidth - setRatio(60),
      height: setRatio(150),
      marginTop: setRatio(26),
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
    },
    midView: {
      width: screenWidth - setRatio(60),
      height: setRatio(315),
      borderRadius: setRatio(10),
      backgroundColor: UIColor.whiteColor,
      shadowColor: 'rgba(201, 201, 201, 0.3)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: setRatio(5),
      shadowOpacity: 1,
      marginTop: setRatio(30),
      marginHorizontal: setRatio(30),
    },
    errorView: {
      width: screenWidth - setRatio(60),
      marginTop: setRatio(30),
      marginHorizontal: setRatio(30),
      flexDirection: 'row',
    },
    midView1: {
      width: setRatio(561 / 2),
      height: setRatio(200),
    },
    midText: {
      marginHorizontal: setRatio(16),
      paddingHorizontal: setRatio(20),
    },
    midText1: {
      marginTop: setRatio(26),
      fontSize: setText(18),
      color: UIColor.colorD2,
      marginHorizontal: setRatio(46),
    },
    midText2: {
      fontWeight: '100',
      fontSize: setText(19),
      color: UIColor.secondTextColor,
      marginHorizontal: setRatio(16),
    },
    midText4: {
      fontSize: setText(19),
      color: UIColor.secondTextColor,
      marginHorizontal: setRatio(20),
      textAlign: 'center',
    },
    imageView: {
      width: setRatio(271),
      height: setRatio(161),
      opacity: 0.5,
      borderRadius: setRatio(5),
      backgroundColor: UIColor.whiteColor,
      shadowColor: 'rgba(189, 224, 238, 0.3)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: setRatio(14),
      shadowOpacity: 1,
      position: 'absolute',
    },
    blackView: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: screenWidth,
      height: screenHeight,
      position: 'absolute',
      zIndex: 1,
      flexDirection: 'column-reverse',
    },
    chooseView: {
      borderRadius: setRatio(20),
      backgroundColor: UIColor.whiteColor,
      marginHorizontal: setRatio(20),
      // @ts-ignore
      marginBottom: setRatio(15) + moreHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chooseView1: {
      width: screenWidth - setRatio(40),
      height: setRatio(90),
      justifyContent: 'center',
      alignItems: 'center',
    },
    chooseView2: {
      borderRadius: setRatio(20),
      backgroundColor: UIColor.whiteColor,
      marginHorizontal: setRatio(20),
      justifyContent: 'center',
      marginBottom: setRatio(15),
      alignItems: 'center',
    },
    chooseText: {
      fontSize: setText(27),
      color: UIColor.colorD2,
    },
    ImageView: {
      width: screenWidth,
      height: setRatio(432),
      marginBottom: setRatio(230),
    },
    errorText: {
      fontSize: setText(22),
      color: UIColor.colorA3,
    },
    errorText1: {
      marginHorizontal: setRatio(20),
    },

    buttonStyle: {
      width: screenWidth - setRatio(40),
      height: setRatio(90),
    },
    midViewStyle: {
      marginTop: setRatio(30),
      marginHorizontal: setRatio(95),
    },
    midImageVIew: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5fafc',
    },
    imageStyle: {
      width: setRatio(372),
      height: setRatio(194),
    },
    imageSamllStyle: {
      width: setRatio(114),
      height: setRatio(114),
      position: 'absolute',
    },
    tipsView: {
      marginTop: setRatio(18),
      justifyContent: 'center',
      alignItems: 'center',
    },
    tipsView1: {
      flex: 1,
      backgroundColor: UIColor.colorB5,
    },
    imageStyle1: {
      width: setRatio(200),
      height: setRatio(200),
      position: 'absolute',
    },
    chooseFrameStyle: {
      width: screenWidth - setRatio(40),
      height: setRatio(90),
    },
    bigImageStyle: {
      width: screenWidth,
      height: setRatio(432),
    },
    backStyle: {
      alignSelf: 'center',
    },
    bottomView: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    buttonStyleView: {
      marginHorizontal: setRatio(20),
      marginBottom: setRatio(80),
    },
    authButton: {
      backgroundColor: UIColor.colorD2,
    },
  });
}
