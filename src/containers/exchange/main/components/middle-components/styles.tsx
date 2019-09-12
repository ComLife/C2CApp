import { StyleSheet } from 'react-native';
import Colors from '../../../../../const/colors';
import { setRatio, setText } from '../../../../../utils/screen-util';

export default StyleSheet.create({
  leftHeaderBg: {
    width: setRatio(353),
    height: setRatio(63),
    justifyContent: 'center',
  },
  leftHeaderText: {
    fontSize: setText(22),
    fontWeight: 'bold',
    color: Colors.colorB2,
  },
  leftHeaderTouch: {
    width: setRatio(100),
    height: setRatio(40),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftMidBg: {
    width: setRatio(353),
    height: setRatio(226),
  },
  midTopView: {
    width: setRatio(353),
    height: setRatio(70),
    flexDirection: 'row',
  },
  midTouch: {
    height: setRatio(70),
    width: setRatio(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  midBox1: {
    width: setRatio(213),
    height: setRatio(70),
    borderTopLeftRadius: setRatio(3),
    borderBottomLeftRadius: setRatio(3),
    borderWidth: setRatio(2),
    borderColor: Colors.colorB4,
  },
  midBox2: {
    flex: 1,
    marginLeft: setRatio(-2),
    height: setRatio(70),
    borderTopRightRadius: setRatio(3),
    borderBottomRightRadius: setRatio(3),
    borderTopWidth: setRatio(2),
    borderBottomWidth: setRatio(2),
    borderRightWidth: setRatio(2),
    borderColor: Colors.colorB4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  midTextView1: {
    width: setRatio(353),
    height: setRatio(43),
    justifyContent: 'center',
  },
  midText1: {
    fontSize: setText(20),
    color: Colors.colorB2,
  },
  midBox3: {
    width: setRatio(353),
    height: setRatio(70),
    flexDirection: 'row',
    borderWidth: setRatio(2),
    borderColor: Colors.colorB4,
    alignItems: 'center',
  },
  input: {
    marginLeft: setRatio(15),
    fontSize: setText(23),
    includeFontPadding: false,
    color: Colors.colorB1,
    flex: 1,
    width: setRatio(200),
    marginRight: setRatio(20),
  },
  midBox3View: {
    width: setRatio(109),
    height: setRatio(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleBg: {
    width: setRatio(353),
    height: setRatio(76),

    // backgroundColor:Colors.colorA2
  },
  scheduleBg2: {
    width: setRatio(353),
    height: setRatio(40),

    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:Colors.colorA2
  },
  scheduleBg1: {
    width: setRatio(353),
    height: setRatio(40),
    // backgroundColor:'#999'
  },
  bottomBg: {
    width: setRatio(353),
    flex: 1,
  },
  bottomTopView: {
    width: setRatio(353),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtnView: {
    height: setRatio(118),
    width: setRatio(353),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText2: {
    fontSize: setText(25),
    color: Colors.colorB1,
    marginLeft: setRatio(19),
  },
  bottomBtn: {
    height: setRatio(74),
    width: setRatio(353),
    borderRadius: setRatio(5),
  },
  bottomBtnText: {
    fontSize: setText(27),
    fontWeight: 'bold',
  },
  rightHeaderBg: {
    height: setRatio(63),
    width: setRatio(208),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightHeaderText: {
    fontSize: setText(18),
    color: Colors.colorB3,
  },
  rightBottomBg: {
    height: setRatio(84),
    width: setRatio(208),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightBottomLeftTouch: {
    height: setRatio(40),
    width: setRatio(120),
    borderWidth: setRatio(2),
    borderColor: Colors.colorB4,
    borderRadius: setRatio(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightBottomRightTouch: {
    height: setRatio(40),
    width: setRatio(46),
    borderWidth: setRatio(2),
    borderColor: Colors.colorB4,
    borderRadius: setRatio(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightMidBg: {
    height: setRatio(396),
    width: setRatio(208),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  rightMidDiv: {
    width: setRatio(208),
    borderWidth: setRatio(1),
    borderColor: Colors.colorB4,
  },
  rightMidPanel: {
    height: setRatio(36),
    width: setRatio(208),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightMidButtomPanel: {
    position: 'absolute',
    height: setRatio(36),
    width: setRatio(208),
    right: setRatio(-24),
    zIndex: -1,
  },
  slider: {
    height: setRatio(40),
    width: setRatio(350),
    justifyContent: 'center',
    marginLeft: setRatio(10),
    marginTop: setRatio(4),
  },
  sliderThumb: {
    height: setRatio(50),
    width: setRatio(53),
  },

  slider1: {
    height: setRatio(52),
    width: setRatio(320),
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider2: {
    height: setRatio(52),
    width: setRatio(320),
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
    justifyContent: 'center',
  },
  sliderView: {
    flex: 1,
    marginLeft: setRatio(3),
    width: setRatio(350),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'#999'
  },
});
