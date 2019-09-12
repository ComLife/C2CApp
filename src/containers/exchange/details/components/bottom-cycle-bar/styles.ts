import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../../utils/screen-util';
import Colors from '../../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(50),
    backgroundColor: Colors.colorB9,
    flexDirection: 'row',
  },
  unselectedText: {
    marginLeft: setRatio(24),
    color: Colors.colorB1,
    fontSize: setText(20),
  },
  selectedText: {
    marginLeft: setRatio(24),
    color: Colors.colorA1,
    fontSize: setText(20),
  },
});
