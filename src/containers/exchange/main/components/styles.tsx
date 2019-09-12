import { StyleSheet } from 'react-native';
import Colors from '../../../../const/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio, setText } from '../../../../utils/screen-util';

export default StyleSheet.create({
  headerBg: {
    height: setRatio(85),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setRatio(24),
    justifyContent: 'space-between',
  },
  headerTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: setRatio(5),
    fontSize: setText(25),
    fontWeight: 'bold',
    color: Colors.colorB1,
  },
  buttonsBg: {
    height: setRatio(80),
    paddingHorizontal: setRatio(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsBtn: {
    width: setRatio(155),
    height: setRatio(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: setRatio(3),
  },
  buttonsText: {
    fontSize: setText(22),
    fontWeight: 'bold',
  },
  buttonsView: {
    flex: 1,
    height: setRatio(60),
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  buttonsRightText1: {
    fontSize: setText(27),
    fontWeight: 'bold',
  },
  buttonsRightText2: {
    fontSize: setText(20),
  },
  midBg: {
    height: setRatio(543),
    paddingHorizontal: setRatio(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  midLeftBg: {
    width: setRatio(353),
    height: setRatio(543),
    alignItems: 'center',
  },
  midRightBg: {
    width: setRatio(208),
    height: setRatio(543),
    alignItems: 'center',
    marginLeft: setRatio(16),
  },
  bottomHeaderBg: {
    width: DEVICE_WIDTH,
    height: setRatio(90),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: setRatio(23),
  },
  bottomHeaderTitle: {
    fontSize: setText(27),
    fontWeight: 'bold',
    color: Colors.colorB1,
  },
  bottomHeaderView: {
    flex: 1,
    height: setRatio(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomHeaderText1: {
    fontSize: setRatio(20),
    color: Colors.colorA1,
    marginRight: setRatio(27),
  },
  bottomHeaderText2: {
    fontSize: setRatio(20),
    color: Colors.colorB2,
  },
  bottomHeaderTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomHeaderImage: {
    marginRight: setRatio(5),
  },
  bg: {
    paddingHorizontal: setRatio(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftView: {
    justifyContent: 'space-around',
    // alignItems: 'center',
    width: setRatio(200),
    height: setRatio(60),
    marginLeft: setRatio(12),
  },
  midView: {
    width: setRatio(200),
    marginRight: setRatio(20),
    flex: 1,
    height: setRatio(90),
    justifyContent: 'space-around',
    // alignItems: 'center',
  },
  rightView: {
    minWidth: setRatio(120),
    height: setRatio(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftImage: {
    width: setRatio(40),
    height: setRatio(40),
  },
  leftImageView: {
    width: setRatio(6),
    height: setRatio(77),
    justifyContent: 'center',
    alignItems: 'center',
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
  modalBg: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: setRatio(24),
    width: DEVICE_WIDTH,
    height: setRatio(705),
  },
  modalHeader: {
    height: setRatio(69),
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderView: {
    flex: 1,
    height: setRatio(69),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderView1: {
    width: setRatio(40),
  },
  modalMidView: {
    marginTop: setRatio(45),
    height: setRatio(195),
  },
  modalMidView2: {
    marginTop: setRatio(30),
    height: setRatio(255),
  },
  modalDataView: {
    height: setRatio(65),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexStyle: {
    flex: 1,
  },
  modalLeftText: {
    fontSize: setText(22),
    color: Colors.colorB2,
  },
  modalFundsView: {
    marginTop: setRatio(11),
    height: setRatio(74),
    justifyContent: 'center',
  },
  modalFundsFrame: {
    height: setRatio(70),
    width: setRatio(572),
    borderColor: Colors.colorB4,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: setRatio(2),
    borderBottomWidth: setRatio(2),
    borderLeftWidth: setRatio(1),
    borderRightWidth: setRatio(1),
  },
  modalFundsView1: {
    borderWidth: setRatio(1),
    borderColor: Colors.colorB4,
    width: setRatio(95),
    height: setRatio(70),
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalPass: {
    height: setRatio(117),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPassText: {
    fontSize: setText(50),
    color: Colors.colorB2,
    fontWeight: 'bold',
    marginTop: setRatio(12),
  },
  modalPassText1: {
    fontSize: setText(22),
    color: Colors.colorA1,
    fontWeight: 'bold',
  },
  loginContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurView: {
    position: 'absolute',
    top: -DEVICE_HEIGHT,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalMidView1: {
    flex: 1,
    height: setRatio(60),
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  modalMidText1: {
    fontSize: setText(40),
    fontWeight: 'bold',
    marginRight: setRatio(20),
  },
  modalLine: {
    position: 'absolute',
    top: setRatio(70),
    width: DEVICE_WIDTH,
    height: setRatio(2),
    backgroundColor: Colors.colorB4,
  },
  modalLine1: {
    height: setRatio(1),
    backgroundColor: Colors.colorB4,
  },
  modalPut: {
    position: 'absolute',
    left: 10000,
  },
  bidBg: {
    flex: 1,
    alignItems: 'center',
  },
  bidMidView: {
    width: DEVICE_WIDTH,
    height: setRatio(100),
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: setRatio(42),
  },
  bidBox: {
    width: setRatio(100),
    height: setRatio(100),
    backgroundColor: Colors.colorB1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: setRatio(13),
  },
  bidPoint: {
    width: setRatio(49),
    height: setRatio(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidPointText: {
    fontSize: setRatio(45),
    fontWeight: 'bold',
  },
  bidBox1: {
    width: setRatio(100),
    height: setRatio(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bidPointText1: {
    fontSize: setText(18),
  },
  bidMidView1: {
    width: DEVICE_WIDTH,
    height: setRatio(46),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bidPointText2: {
    fontSize: setRatio(45),
    fontWeight: 'bold',
    color: Colors.whiteColor,
  },
  bidImage: {
    marginTop: setRatio(151),
  },
  rightButton: {
    width: setRatio(50),
    height: setRatio(50),
  },
  rightButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: setRatio(26),
    height: setRatio(24),
  },
  headerImage1: {
    width: setRatio(35),
    height: setRatio(35),
  },
});
