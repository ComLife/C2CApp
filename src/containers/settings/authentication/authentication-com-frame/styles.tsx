import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../utils/screen-util';
import UIColor from '../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    midView: {
      marginTop: setRatio(60),
      marginHorizontal: setRatio(30),
      width: screenWidth - setRatio(60),
      height: setRatio(175),
      borderRadius: setRatio(10),
      backgroundColor: UIColor.whiteColor,
      shadowColor: 'rgba(201, 201, 201, 0.5)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: setRatio(5),
      shadowOpacity: 1,
      flexDirection: 'row',
    },
    viewChild: {
      flexDirection: 'row',
    },
    viewChildvv: {
      width: setRatio(230),
      height: setRatio(120),
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageView: {
      width: setRatio(170),
      height: setRatio(90),
      position: 'absolute',
    },
    viewChildvvv: {
      flexDirection: 'row',
      marginTop: setRatio(16),
      alignItems: 'center',
    },
    midView1: {
      marginTop: setRatio(60),
      marginHorizontal: setRatio(30),
      width: screenWidth - setRatio(60),
      height: setRatio(175),
      borderRadius: setRatio(10),
      backgroundColor: UIColor.whiteColor,
      shadowColor: 'rgba(201, 201, 201, 0.5)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: setRatio(5),
      shadowOpacity: 1,
      flexDirection: 'row',
      opacity: 0.8,
    },
    midView2: {
      marginTop: setRatio(60),
      marginHorizontal: setRatio(30),
      width: screenWidth - setRatio(60),
      height: setRatio(175),
      borderRadius: setRatio(10),
      backgroundColor: UIColor.whiteColor,
      borderWidth: 2,
      borderColor: '#2983dc',
      shadowColor: 'rgba(201, 201, 201, 0.5)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: setRatio(5),
      shadowOpacity: 1,
      flexDirection: 'row',
    },
    midText: {
      marginHorizontal: setRatio(30),
    },
    midText1: {
      fontWeight: '100',
      fontSize: setText(19),
      color: UIColor.colorA1,
    },
    midText2: {
      fontWeight: '100',
      fontSize: setText(19),
      color: UIColor.secondTextColor,
    },
    midText3: {
      fontSize: setText(24),
      marginTop: setRatio(40),
      marginLeft: setRatio(40),
      color: UIColor.colorB1,
    },
    midText4: {
      fontWeight: '100',
      marginTop: setRatio(23),
      marginHorizontal: setRatio(38),
      fontSize: setText(20),
      color: UIColor.secondTextColor,
    },
    midLeftView: {
      width: setRatio(280),
      height: setRatio(175),
    },
    midLeftView1: {
      width: setRatio(280),
      height: setRatio(175),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
