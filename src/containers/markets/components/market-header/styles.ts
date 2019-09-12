import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(74),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.colorB1,
    fontSize: setText(25),
    fontWeight: '500',
  },
  rightIcon: {
    position: 'absolute',
    right: setRatio(24),
  },
});
