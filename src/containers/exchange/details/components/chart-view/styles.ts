import { StyleSheet } from 'react-native';
import { screenWidth, setRatio, setText } from '../../../../../utils/screen-util';
import UIColor from '../../../../../const/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  klineView: {
    height: setRatio(690),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgView: {
    width: screenWidth,
    height: setRatio(690),
    backgroundColor: UIColor.colorB9, // your color
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2,
  },
});
