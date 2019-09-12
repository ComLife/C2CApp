import { useContext } from 'react';
import { StyleSheet } from 'react-native';
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
      height: setRatio(70),
      marginTop: setRatio(15),
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
    },
    midView: {
      width: screenWidth - setRatio(60),
      height: setRatio(200),
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
      flexDirection: 'row',
    },
    midView1: {
      width: (screenWidth - setRatio(60)) / 2,
      height: setRatio(200),
    },
    midView2: {
      width: (screenWidth - setRatio(60)) / 2,
      height: setRatio(200),
      alignItems: 'flex-end',
    },
    midText: {
      marginHorizontal: setRatio(16),
    },
    midText1: {
      fontSize: setText(19),
      color: UIColor.colorD2,
    },
    midText2: {
      fontWeight: '100',
      fontSize: setText(19),
      color: UIColor.secondTextColor,
    },
    midText4: {
      fontSize: setText(20),
      marginTop: setRatio(20),
      marginLeft: setRatio(111),
      color: UIColor.importantTextColor,
    },
    midText5: {
      fontSize: setText(20),
      marginTop: setRatio(20),
      marginRight: setRatio(111),
      color: UIColor.importantTextColor,
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
      width: screenWidth - setRatio(60),
      height: setRatio(90),
      justifyContent: 'center',
      alignItems: 'center',
    },
    chooseView2: {
      borderRadius: setRatio(20),
      backgroundColor: UIColor.whiteColor,
      marginHorizontal: setRatio(20),
      marginBottom: setRatio(15),
      justifyContent: 'center',
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
    ImageItem: {
      width: setRatio(230),
      height: setRatio(120),
    },
    ImageItem1: {
      width: screenWidth,
      height: setRatio(432),
    },
    ImageItem2: {
      backgroundColor: UIColor.modalColor,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },

    baseMidView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: setRatio(14),
      marginLeft: setRatio(40),
      backgroundColor: '#f5fafc',
    },

    baseMidView1: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5fafc',
      marginTop: setRatio(14),
      marginRight: setRatio(40),
    },

    imageView: {
      width: setRatio(230),
      height: setRatio(120),
      position: 'absolute',
    },
    imageView1: {
      width: setRatio(230),
      height: setRatio(120),
    },
    imageBView: {
      width: setRatio(170),
      height: setRatio(100),
      position: 'absolute',
    },
    buttonStyle: {
      width: screenWidth - setRatio(60),
      height: setRatio(90),
    },
    bgBaseView: {
      flex: 1,
      backgroundColor: UIColor.colorB5,
    },
    bgBaseChildView: {
      flex: 1,
      flexDirection: 'column-reverse',
    },
    bgBaseChildView1: {
      width: screenWidth - setRatio(60),
      marginHorizontal: setRatio(30),
      height: setRatio(60),
      marginBottom: setRatio(80),
    },
    authButton: {
      backgroundColor: UIColor.colorD2,
    },
  });
}
