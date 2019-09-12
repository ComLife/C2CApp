import { Platform, StyleSheet } from 'react-native';
import { isIphoneX, isIphoneXX, screenHeight, screenWidth, setRatio, setText } from '../../utils/screen-util';
import UIColor from '../../const/colors';
import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme-color';

export default StyleSheet.create({
  container: {
    width: setRatio(500),
    borderRadius: setRatio(8),
    backgroundColor: '#ffffff',
  },
  li: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: setRatio(20),
    paddingHorizontal: setRatio(20),
  },
  liBtns: {
    justifyContent: 'space-between',
    marginTop: setRatio(30),
  },
  btns: {
    marginTop: setRatio(30),
    paddingHorizontal: 0,
  },
  liTil: {
    fontSize: setText(18),
    color: UIColor.colorB1,
    width: setRatio(80),
  },
  liText: {
    fontSize: setRatio(20),
    color: UIColor.colorA4,
    marginLeft: setRatio(10),
  },
  liBtn: {
    width: setRatio(60),
    height: setRatio(40),
    borderColor: UIColor.colorA4,
    borderWidth: setRatio(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: setRatio(4),
  },
  liSelectBtn: {
    backgroundColor: UIColor.colorA4,
  },
  liSelectBtnText: {
    color: UIColor.whiteColor,
  },
  liBtnText: {
    fontSize: setText(18),
    color: UIColor.colorA4,
  },
  btn: {
    flex: 0.5,
    height: setRatio(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: setRatio(1),
    borderTopColor: UIColor.colorB1,
  },
  btnCan: {
    borderRightWidth: setRatio(1),
    borderRightColor: UIColor.colorB1,
  },
  btnText: {
    fontSize: setText(22),
    color: UIColor.colorA1,
  },
  btnTextCan: {
    color: UIColor.colorB1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UIColor.modalColor,
  },
});
