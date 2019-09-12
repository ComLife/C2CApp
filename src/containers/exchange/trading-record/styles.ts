import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../utils/theme-color';
import UIColor from '../../../const/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio, setText } from '../../../utils/screen-util';
import Colors from '../../../const/colors';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: UIColor.whiteColor,
      width: DEVICE_WIDTH * 0.8,
    },
    flatList: {
      borderTopWidth: setRatio(2),
      borderTopColor: Colors.colorB4,
    },
    ScrollableTabHeader: {
      flexDirection: 'row',
      marginHorizontal: setRatio(24),
      alignItems: 'center',
      marginTop: setRatio(25),
    },
    CustomTabBarView: {
      marginHorizontal: setRatio(45),
      width: DEVICE_WIDTH - setRatio(180),
      height: setRatio(58),
    },
    backView: {
      height: setRatio(58),
      width: setRatio(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftView: {
      justifyContent: 'space-around',
      alignItems: 'center',
      minWidth: setRatio(131),
      height: setRatio(60),
      marginLeft: setRatio(12),
    },
    bottomItemText: {
      fontSize: setText(22),
      color: Colors.colorB1,
    },
    midView: {
      width: setRatio(200),
      marginRight: setRatio(20),
      flex: 1,
      height: setRatio(90),
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bottomHeaderTitle: {
      fontSize: setText(27),
      fontWeight: 'bold',
      color: Colors.colorB1,
    },
    bottomHeaderText2: {
      fontSize: setRatio(20),
      color: Colors.colorB2,
    },
    rightView: {
      minWidth: setRatio(120),
      height: setRatio(50),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: setRatio(3),
      backgroundColor: UIColor.colorA1,
    },
    buttonsText: {
      fontSize: setText(22),
      fontWeight: 'bold',
      color: UIColor.whiteColor,
    },
    buttonView: {
      width: setRatio(150),
      alignItems: 'flex-end',
    },
    leftImageView: {
      width: setRatio(6),
      height: setRatio(77),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    bg: {
      paddingHorizontal: setRatio(24),
      height: setRatio(125),
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailView: {
      flex: 1,
      paddingHorizontal: setRatio(24),
    },
    titleView: {
      flexDirection: 'row',
      marginTop: setRatio(29),
    },
    titleText: {
      fontSize: setRatio(27),
      fontWeight: 'bold',
      marginRight: setRatio(13),
    },
    detailTemView: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    temView: {
      width: '33%',
      alignItems: 'center',
      marginTop: setRatio(31),
    },
    entrustItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: setRatio(80),
    },
    timeView: {
      width: setRatio(130),
      alignItems: 'center',
    },
    timeText: {
      fontSize: setText(20),
      color: UIColor.colorB1,
    },
    dataText: {
      fontSize: setText(22),
      color: UIColor.colorB1,
      fontWeight: 'bold',
    },
    entrustTitleView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: setRatio(80),
      marginBottom: setRatio(5),
    },
    entrustTitleText: {
      fontSize: setText(18),
      color: UIColor.colorB3,
    },
    entrustItemView: {
      flex: 1,
      alignItems: 'center',
    },
    divisionView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dealView: {
      width: setRatio(130),
    },
    priceText: {
      fontSize: setText(20),
      color: UIColor.colorB2,
    },
    priceNumText: {
      fontSize: setText(22),
      color: UIColor.colorB1,
      marginTop: setRatio(10),
    },
    loder: {
      fontSize: 14,
      color: UIColor.colorB2,
      alignSelf: 'center',
    },
    footerView: {
      height: setRatio(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
