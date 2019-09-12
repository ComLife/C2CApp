import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    paddingTop: setRatio(24),
    marginHorizontal: setRatio(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: setRatio(70),
  },
  icon: {},
  text: {
    fontSize: setText(25),
    color: Colors.colorB1,
  },
});
