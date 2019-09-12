import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(97),
    paddingHorizontal: setRatio(24),
  },
  wrapper: {
    justifyContent: 'space-between',
    height: setRatio(95),
    flexDirection: 'row',
  },
  leftColWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  leftRo1Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftRo2Wrapper: {
    flexDirection: 'row',
    marginTop: setRatio(12),
  },
  marginTo12: {
    marginTop: setRatio(12),
  },
  middleColWrapper: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'lightblue',
  },
  rightColWrapper: {
    flex: 0.8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.colorB4,
  },
  coinName: {
    marginTop: 2,
  },
  boldText: {
    fontSize: setText(27),
    fontWeight: 'bold',
    color: Colors.colorB1,
  },
  grayText: {
    fontSize: setText(20),
    color: Colors.colorB2,
  },
  buttonWrapper: {
    width: setRatio(130),
    height: setRatio(50),
    backgroundColor: Colors.colorA2,
  },
  buttonRed: {
    backgroundColor: Colors.colorA3,
  },
  buttonText: {
    fontSize: setText(22),
    fontWeight: 'bold',
    color: Colors.whiteColor,
  },
  textViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
