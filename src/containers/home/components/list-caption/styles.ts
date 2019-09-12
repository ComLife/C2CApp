import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(90),
    paddingHorizontal: setRatio(24),
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
  },
  text: {
    fontSize: setText(27),
    color: Colors.colorB1,
    fontWeight: 'bold',
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.colorB4,
  },
});
