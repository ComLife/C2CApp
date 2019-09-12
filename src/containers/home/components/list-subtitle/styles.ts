import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../utils/screen-util';
import Colors from '../../../../const/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: setRatio(90),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: setRatio(24),
  },
  wrapper: {
    flex: 1,
  },
  leftWrapper: {
    flex: 1,
  },
  middleWrapper: {
    alignItems: 'flex-start',
    flex: 1.2,
  },
  rightWrapper: {
    flex: 0.8,
    height: setRatio(70),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: setText(20),
    color: Colors.colorB3,
  },
  percentSortingIcon: {
    marginLeft: 5,
  },
});
