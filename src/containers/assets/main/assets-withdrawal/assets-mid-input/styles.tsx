import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../../../../utils/theme-color';
import { screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
import UIColor from '../../../../../const/colors';
export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    scrollView: {
      // backgroundColor: 'lightblue',
    },
    body: {
      marginTop: setRatio(15),
      width: screenWidth,
      height: setRatio(380),
      backgroundColor: UIColor.whiteColor,
    },
    body1: {
      marginTop: setRatio(15),
      width: screenWidth,
      height: setRatio(300),
      backgroundColor: UIColor.whiteColor,
    },
    baseView: {
      width: screenWidth,
      height: setRatio(70),
      flexDirection: 'row',
      alignItems: 'center',
    },
    baseView1: {
      marginTop: setRatio(30),
      width: screenWidth,
      height: setRatio(70),
      flexDirection: 'row',
      alignItems: 'center',
    },
    blankView: {
      marginTop: setRatio(23),
    },
    colorView: {
      backgroundColor: UIColor.colorB5,
      width: screenWidth,
      height: setRatio(15),
    },
    input: {
      marginTop: setRatio(30),
      fontSize: setText(22),
      color: UIColor.importantTextColor,
      width: screenWidth - setRatio(300),
      marginLeft: setRatio(22),
      padding: 0,
    },
    titleView: {
      width: setRatio(85),
      height: setRatio(30),
      marginTop: setRatio(38),
      marginLeft: setRatio(23),
      fontSize: setText(20),
      color: UIColor.colorB2,
    },
    titleView1: {
      marginTop: setRatio(10),
      marginLeft: setRatio(22),
      fontSize: setText(22),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    titleView2: {
      marginTop: setRatio(10),
      marginLeft: setRatio(129),
      fontSize: setText(18),
      color: UIColor.colorB1,
    },
    titleView3: {
      marginTop: setRatio(33),
      marginLeft: setRatio(24),
      fontSize: setText(22),
      color: UIColor.colorB2,
    },
    titleView4: {
      marginBottom: setRatio(2),
      marginLeft: setRatio(24),
      fontSize: setText(22),
      color: UIColor.colorA1,
    },
    titleView5: {
      width: setRatio(85),
      height: setRatio(25),
      marginTop: setRatio(40),
      marginLeft: setRatio(23),
      fontSize: setText(20),
      color: UIColor.colorB2,
    },
    imageView: {
      marginTop: setRatio(10),
      width: setRatio(9),
      height: setRatio(17),
    },
    imageView1: {
      width: setRatio(23),
      height: setRatio(23),
    },
    buttonView: {
      flex: 1,
      marginTop: setRatio(20),
      marginRight: setRatio(24),
    },
    buttonView1: {
      marginTop: setRatio(30),
      marginRight: setRatio(24),
    },
    endView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    endView1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    tipsView: {
      marginLeft: setRatio(24),
      fontSize: setText(18),
      color: UIColor.colorB2,
    },
    tipsView1: {
      fontSize: setText(22),
      color: UIColor.colorB1,
    },
    tipsView2: {
      fontSize: setText(30),
      color: UIColor.colorA1,
    },
    tipsView3: {
      marginLeft: setRatio(24),
      fontSize: setText(18),
      color: UIColor.colorB2,
    },
    tipsView4: {
      fontSize: setText(18),
      marginLeft: setRatio(24),
      color: UIColor.colorB2,
    },
    tipsBaseView: {
      justifyContent: 'center',
    },
    confirmButton: {
      marginTop: setRatio(138),
      backgroundColor: UIColor.colorA1,
      marginHorizontal: setRatio(23),
    },
    confirmButton1: {
      marginTop: setRatio(208),
      backgroundColor: UIColor.colorA1,
      marginHorizontal: setRatio(23),
    },
    lineView: {
      height: setRatio(2),
      width: setRatio(469),
      marginLeft: setRatio(129),
      backgroundColor: UIColor.colorB4,
    },
    touchableView: {
      // flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
}
