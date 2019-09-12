import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../../utils/screen-util';
import Colors from '../../../../../const/colors';

export default StyleSheet.create({
  container: {
    borderTopWidth: setRatio(2),
    borderTopColor: Colors.colorB9,
    justifyContent: 'center',
    paddingHorizontal: setRatio(24),
    flex: 1,
    backgroundColor: Colors.colorB11,
  },
  titleWrapper: {
    flex: 1,
    height: setRatio(50),
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    flex: 1,
    fontSize: setText(20),
    color: Colors.colorB8,
  },
  dataItemWrapper: {
    flex: 1,
    height: setRatio(40),
    flexDirection: 'row',
  },
  itemText: {
    flex: 1,
    fontSize: setText(20),
    color: Colors.whiteColor,
  },
  centerText: {
    textAlign: 'center',
  },
  greenText: {
    textAlign: 'center',
    color: Colors.colorA2,
  },
  redText: {
    textAlign: 'center',
    color: Colors.colorA3,
  },
  rightText: {
    textAlign: 'right',
  },
});
