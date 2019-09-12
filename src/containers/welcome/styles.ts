import { StyleSheet } from 'react-native';
import Colors from '../../const/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio } from '../../utils/screen-util';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  slide: {
    alignItems: 'center',
  },
  paginationStyle: {
    bottom: setRatio(208),
  },
  dotStyle: {
    marginLeft: 10,
    borderRadius: setRatio(4),
    width: setRatio(40),
    height: setRatio(8),
    backgroundColor: Colors.dotColor,
  },
  activeDotStyle: {
    backgroundColor: '#ffca14',
  },
  divisorLine: {
    height: setRatio(13),
    backgroundColor: Colors.colorB5,
  },
  expenClick: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: setRatio(90),
    alignItems: 'center',
  },
});
