import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../../../../utils/theme-color';
import Colors from '../../../../const/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio, setText } from '../../../../utils/screen-util';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    headerBg: {
      height: setRatio(85),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: setRatio(24),
      justifyContent: 'space-between',
    },
    touch: {
      width: setRatio(40),
      height: setRatio(40),
    },
    headerText: {
      marginLeft: setRatio(5),
      fontSize: setText(25),
      fontWeight: 'bold',
      color: Colors.colorB1,
    },

    selectView: {
      height: setRatio(64),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: setRatio(24),
    },
    selectBtnView: {
      flexDirection: 'row',
      alignItems: 'center',
      width: (DEVICE_WIDTH - setRatio(48)) / 3,
      justifyContent: 'flex-start',
    },
    selectBtnView1: {
      flexDirection: 'row',
      alignItems: 'center',
      width: (DEVICE_WIDTH - setRatio(48)) / 3,
      justifyContent: 'center',
    },
    selectBtnView2: {
      flexDirection: 'row',
      alignItems: 'center',
      width: (DEVICE_WIDTH - setRatio(48)) / 3,
      justifyContent: 'flex-end',
    },
    selectImage: {
      marginLeft: setRatio(10),
      transform: [{ rotate: '90deg' }],
    },
    selectText: {
      fontSize: setText(22),
      color: Colors.colorB2,
    },
    div: {
      height: setRatio(2),
      left: 0,
      backgroundColor: Colors.colorB4,
    },
    bg: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rightView: {
      minWidth: setRatio(120),
      height: setRatio(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonsText: {
      fontSize: setText(22),
      fontWeight: 'bold',
    },
    leftImageView: {
      width: setRatio(6),
      height: setRatio(77),
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftView: {
      justifyContent: 'center',
      width: (DEVICE_WIDTH - setRatio(48)) / 3,
      height: setRatio(60),
    },
    bottomItemText: {
      fontSize: setText(22),
      color: Colors.colorB1,
    },
    bottomItemText1: {
      width: setRatio(115),
      justifyContent: 'center',
      alignItems: 'center',
    },
    midView: {
      width: (DEVICE_WIDTH - setRatio(48)) / 3 - 30,
      height: setRatio(60),
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bottomHeaderText2: {
      fontSize: setText(20),
      color: Colors.colorB2,
    },
    bottomView: {
      flex: 1,
      minHeight: setRatio(60),
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
  });
}
