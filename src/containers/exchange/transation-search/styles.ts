/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/ban-ts-ignore */
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import UIColor from '../../../const/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio, setText } from '../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      overflow: 'hidden',
      flex: 1,
      backgroundColor: UIColor.whiteColor,
      width: DEVICE_WIDTH * 0.8,
      height: DEVICE_HEIGHT,
    },
    maskView: {
      height: DEVICE_HEIGHT,
      backgroundColor: 'rgba(100, 100, 100, 0.5)',
    },
    searchView: {
      flexDirection: 'row',
      marginHorizontal: setRatio(23),
      backgroundColor: UIColor.colorB5,
      alignItems: 'center',
      height: setRatio(44),
      marginTop: setRatio(30),
    },
    flatList: {
      borderTopWidth: setRatio(2),
      borderTopColor: UIColor.colorB4,
    },
    searchImg: {
      marginHorizontal: setRatio(14),
    },
    input: {
      flex: 1,
    },
    BBitemView: {
      flexDirection: 'row',
      height: setRatio(75),
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: setRatio(23),
    },
    BBText: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      width: setRatio(150),
    },
    BBCostText: {
      fontSize: setText(22),
    },
    BBCostTextEnd: {
      fontSize: setText(22),
      width: setRatio(130),
      textAlign: 'right',
    },
    BBitemText1: {
      fontSize: setText(27),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    BBitemText2: {
      fontSize: setText(20),
      color: UIColor.colorB2,
    },
    line: {
      backgroundColor: UIColor.colorB4,
      height: 1,
      marginLeft: setRatio(23),
    },
    activetyLine: {
      width: setRatio(30),
      height: setRatio(7),
      backgroundColor: UIColor.colorA1,
      borderRadius: setRatio(3),
    },
    tabView: {
      height: setRatio(70),
      flexDirection: 'row',
    },
    tabTouch: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalStyle: {
      margin: 0,
    },
  });
}
