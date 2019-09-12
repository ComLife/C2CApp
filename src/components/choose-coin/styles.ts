import { Platform, StyleSheet } from 'react-native';
import { isIphoneX, isIphoneXX, screenHeight, screenWidth, setRatio, setText } from '../../utils/screen-util';
import UIColor from '../../const/colors';
import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme-color';

export default function outerStyles() {
  // @ts-ignore
  const { backColor, textColor } = useContext(ThemeContext);
  return StyleSheet.create({
    body: {
      flexDirection: 'row',
      // backgroundColor: UIColor.colorA3,
    },
    baseView: {
      backgroundColor: UIColor.whiteColor,
      width: screenWidth,
      height: screenHeight,
    },
    flexView: {
      width: screenWidth / 2,
      height: setRatio(91),
      alignItems: 'center',
      flexDirection: 'row',
    },
    flexView1: {
      width: screenWidth / 2,
      height: setRatio(91),
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
    },
    imageView: {
      marginLeft: setRatio(23),
      width: setRatio(24),
      height: setRatio(24),
    },
    input: {
      fontSize: setText(23),
      color: UIColor.importantTextColor,
      marginLeft: setRatio(20),
      height: setRatio(30),
      width: setRatio(300),
      padding: 0,
    },
    textView: {
      marginRight: setRatio(23),
    },
    sectionView: {
      height: setRatio(45),
      backgroundColor: UIColor.colorB5,
      width: screenWidth,
      justifyContent: 'center',
    },
    itemView: {
      height: setRatio(80),
      justifyContent: 'center',
      width: screenWidth,
    },
    sectionText: {
      marginLeft: setRatio(24),
      fontSize: setText(27),
      fontWeight: 'bold',
      color: UIColor.colorB2,
    },
    itemText: {
      marginLeft: setRatio(24),
      fontSize: setText(27),
      fontWeight: 'bold',
      color: UIColor.colorB1,
    },
    // blurView: {
    //   width: screenWidth,
    //   height: screenHeight,
    //   top: 0,
    //   left: 0,
    //   bottom: 0,
    //   right: 0,
    //   position: 'absolute',
    // },
    // containerView: {
    //   width: screenWidth,
    //   height: Platform.select({
    //     ios: setRatio(700) + (isIphoneX() || isIphoneXX() ? 100 : 0),
    //     android: screenHeight - setRatio(300),
    //   }),
    //   borderTopLeftRadius: setRatio(15),
    //   borderTopRightRadius: setRatio(15),
    //   backgroundColor: UIColor.whiteColor,
    //   alignItems: 'center',
    // },
    // titleView: {
    //   width: screenWidth,
    //   height: setRatio(87),
    //   borderTopLeftRadius: Math.ceil(setRatio(20)),
    //   borderTopRightRadius: Math.ceil(setRatio(20)),
    //   borderBottomWidth: 0,
    //   backgroundColor: UIColor.whiteSustrate,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   flexDirection: 'row',
    // },
    // textView: {
    //   marginTop: setRatio(67),
    //   width: screenWidth,
    //   paddingHorizontal: setRatio(38),
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    // },
    // textBorder: {
    //   width: setRatio(81),
    //   height: setRatio(81),
    //   borderWidth: setRatio(2),
    //   borderColor: UIColor.grayTextColor,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   borderRadius: setRatio(10),
    // },
    // textFont: {
    //   fontSize: setText(40),
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //
    //   color: UIColor.colorA1,
    //   marginTop: Platform.OS === 'ios' ? setRatio(18) : setRatio(4),
    // },
    // forgetPassword: {
    //   fontSize: setText(25),
    //   color: UIColor.bluishViolet,
    // },
    // baseView: {
    //   width: screenWidth,
    //   height: screenHeight / 2,
    //   color: UIColor.whiteColor,
    //   position: 'absolute',
    //   zIndex: -1,
    // },
    // inputView: {
    //   color: UIColor.transparentColor,
    //   backgroundColor: UIColor.transparentColor,
    //   position: 'absolute',
    //   zIndex: -2,
    //   bottom: -1000,
    // },
    // baseView1: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   justifyContent: 'flex-end',
    // },
    // baseView2: {
    //   flex: 1,
    //   position: 'absolute',
    //   padding: 0,
    //   zIndex: 10000,
    // },
    // password: {
    //   color: UIColor.bestDarkText,
    //   flex: 1.1,
    //   fontWeight: 'bold',
    //   fontSize: setText(28),
    //   includeFontPadding: false,
    // },
    // textView1: {
    //   flex: 1,
    // },
    // styleView: {
    //   alignItems: 'center',
    // },
  });
}
