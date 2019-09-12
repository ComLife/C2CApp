import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    height: setRatio(55),
    paddingHorizontal: setRatio(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: setRatio(28),
    height: setRatio(28),
  },
  text: {
    marginLeft: setRatio(7),
    fontSize: setText(20),
    color: Colors.colorB1,
  },
});
