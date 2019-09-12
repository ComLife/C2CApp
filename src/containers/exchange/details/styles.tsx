import { StyleSheet } from 'react-native';
import { setRatio } from '../../../utils/screen-util';
import Colors from '../../../const/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.colorB10,
  },
  bottomBtnWrapper: {
    flexDirection: 'row',
  },
  bottomLeftBtn: {
    height: setRatio(74),
    backgroundColor: Colors.colorA2,
    borderRadius: 0,
    width: '50%',
  },
  bottomRightBtn: {
    backgroundColor: Colors.colorA3,
  },
  tabView: {
    width: setRatio(200),
  },
  imageView: {
    height: setRatio(24),
    width: setRatio(25),
  },
});
