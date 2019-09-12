import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH, setRatio } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(110),
    paddingHorizontal: setRatio(24),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.colorB5,
  },
  icon: {
    height: setRatio(80),
    width: DEVICE_WIDTH - setRatio(48),
  },
});
