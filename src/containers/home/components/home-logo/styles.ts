import { StyleSheet } from 'react-native';
import { setRatio } from '../../../../utils/screen-util';

export default StyleSheet.create({
  container: {
    marginTop: setRatio(17),
    marginBottom: setRatio(27),
    marginLeft: setRatio(24),
    width: setRatio(227),
    height: setRatio(40),
  },
});
