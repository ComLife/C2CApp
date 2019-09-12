import { StyleSheet } from 'react-native';
import { screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
import Colors from '../../../../../const/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.colorB10,
    height: setRatio(140),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftWrapper: {
    paddingLeft: setRatio(24),
    width: '55%',
  },
  leftRow2Wrapper: {
    marginTop: setRatio(8),
    flexDirection: 'row',
  },
  leftRow2LeftText: {
    fontSize: setText(22),
    color: Colors.whiteColor,
  },
  leftRow2RightText: {
    fontSize: setText(22),
    color: Colors.colorA3,
    marginLeft: setRatio(22),
  },
  leftRow2RightText1: {
    fontSize: setText(22),
    color: Colors.colorA2,
    marginLeft: setRatio(22),
  },
  rightWrapper: {
    width: '45%',
  },
  latestText: {
    fontSize: setText(45),
    fontWeight: 'bold',
    color: Colors.colorA2,
  },
  latestText1: {
    fontSize: setText(45),
    fontWeight: 'bold',
    color: Colors.colorA3,
  },
  rightText: {
    fontSize: setText(18),
    color: Colors.colorB7,
    marginTop: setRatio(8),
  },
  backGroundView: {
    width: screenWidth,
    height: setRatio(15),
    backgroundColor: Colors.colorB9,
  },
});
