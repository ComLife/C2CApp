import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../utils/screen-util';
import UIColor from '../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    body: {
      marginTop: setRatio(60),
      marginHorizontal: setRatio(30),
      height: setRatio(175),
      borderRadius: setRatio(10),
      backgroundColor: 'red',
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
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: textColor,
    },

    container: {
      width: screenWidth,
      height: setRatio(68),
      marginTop: setRatio(50),
    },
    smallcircular: {
      width: setRatio(10),
      height: setRatio(10),
      borderRadius: setRatio(5),
      backgroundColor: UIColor.colorA1,
    },
    smallcircular1: {
      width: setRatio(10),
      height: setRatio(10),
      borderRadius: setRatio(5),
      backgroundColor: UIColor.colorA1,
      opacity: 0.5,
    },
    bigcircular: {
      width: setRatio(30),
      height: setRatio(30),
      borderRadius: setRatio(15),
      backgroundColor: UIColor.colorA1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bigsmallcircular: {
      width: setRatio(10),
      height: setRatio(10),
      borderRadius: setRatio(5),
      backgroundColor: UIColor.whiteColor,
      shadowColor: 'rgba(0, 62, 111, 0.41)',
      shadowOffset: {
        width: setRatio(1),
        height: setRatio(1),
      },
      shadowRadius: 0,
      shadowOpacity: 1,
    },
    line: {
      marginTop: setRatio(15),
      width: (screenWidth - setRatio(210)) / 2,
      height: setRatio(1),
      backgroundColor: UIColor.colorA1,
      zIndex: -1,
    },
    textView: {
      marginTop: setRatio(20),
      width: screenWidth,
      height: setRatio(20),
      flexDirection: 'row',
    },
    textView1: {
      justifyContent: 'center',
      alignItems: 'center',
      height: setRatio(20),
      width: setRatio(170),
    },
    topText: {
      fontSize: setText(19),
      color: UIColor.colorA1,
    },
  });
}
