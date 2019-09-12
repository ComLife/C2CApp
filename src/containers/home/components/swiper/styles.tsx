import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, setRatio } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    paddingBottom: 18,
  },
  wrapper: {
    height: setRatio(275),
    width: DEVICE_WIDTH,
  },
  slide: {
    alignItems: 'center',
  },
  paginationStyle: {
    bottom: setRatio(10),
  },
  dotStyle: {
    marginLeft: 0,
    marginRight: 0,
    borderRadius: setRatio(1),
    width: setRatio(76),
    height: setRatio(2),
    backgroundColor: Colors.dotColor,
  },
  activeDotStyle: {
    backgroundColor: Colors.activeDotColor,
  },
});
