import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

const pos = (DEVICE_HEIGHT - DEVICE_WIDTH) / 2;

export default StyleSheet.create({
  container: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    left: -pos,
    top: pos,
    width: DEVICE_HEIGHT,
    height: DEVICE_WIDTH,
  },
  fullScreen: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: 'red',
  },
});
