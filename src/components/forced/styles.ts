import { Platform, StyleSheet } from 'react-native';
import { isIphoneX, isIphoneXX, screenHeight, screenWidth, setRatio, setText } from '../../utils/screen-util';
import UIColor from '../../const/colors';
import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme-color';

export default StyleSheet.create({
  bgView: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  View1: {
    position: 'absolute',
    top: screenHeight / 2,
    width: setRatio(324),
    height: setRatio(260),
  },
  View2: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    zIndex: 0,
    opacity: 0.7,
    backgroundColor: '#000',
  },
  Text1: {
    fontSize: setText(19),
    color: '#000',
  },
  TouchableOpacity1: {
    width: setRatio(300),
    height: setRatio(60),
    backgroundColor: UIColor.colorA1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: setRatio(10),
    marginLeft: setRatio(12),
  },
  updateNowText: {
    fontSize: setText(18),
    color: UIColor.whiteColor,
    fontWeight: '500',
  },
  updateLaterText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: setText(18),
    color: UIColor.colorA1,
  },
});
