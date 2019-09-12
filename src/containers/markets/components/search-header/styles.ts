import { Platform, StyleSheet } from 'react-native';
import { DEVICE_WIDTH, setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(74),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: setRatio(24),
  },
  input: {
    width: DEVICE_WIDTH - setRatio(200),
    marginLeft: setRatio(18),
    color: Colors.colorB1,
    fontSize: setText(22),
    // ...Platform.select({
    //   android: {
    //     paddingBottom: setRatio(5),
    //     height: setRatio(40),
    //   },
    //   ios: {},
    // }),
  },
  clearView: {
    width: setRatio(50),
    height: setRatio(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    width: setRatio(22),
    height: setRatio(22),
  },
  cancelText: {
    fontSize: setText(22),
    color: Colors.colorB2,
  },
  line: {
    backgroundColor: Colors.colorB4,
    height: 1,
  },
});
