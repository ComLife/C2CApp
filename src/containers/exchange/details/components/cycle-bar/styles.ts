import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../../utils/screen-util';
import Colors from '../../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(50),
  },
  contentStyle: {
    alignItems: 'center',
    paddingRight: setRatio(24),
  },
  text: {
    fontSize: setText(20),
    marginLeft: setRatio(24),
    color: Colors.whiteColor,
  },
  grayText: {
    color: Colors.colorB2,
  },
});
