import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../utils/screen-util';
import Colors from '../../const/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: setRatio(100),
  },
  text: {
    marginTop: setRatio(15),
    fontSize: setText(18),
    color: Colors.colorB2,
  },
});
