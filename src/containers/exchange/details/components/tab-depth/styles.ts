import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../../utils/screen-util';
import Colors from '../../../../../const/colors';

export default StyleSheet.create({
  container: {
    borderTopWidth: setRatio(2),
    borderTopColor: Colors.colorB9,
    paddingHorizontal: setRatio(24),
    backgroundColor: Colors.colorB11,
  },
  titleWrapper: {
    // backgroundColor: 'lightblue',
    height: setRatio(50),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: setText(20),
    color: Colors.colorB8,
  },
  dataItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: setRatio(40),
  },
  priceWrapper: {
    flexDirection: 'row',
  },
  priceLeftRight: {
    width: '50%',
  },
  price1Text: {
    marginRight: setRatio(10),
    textAlign: 'right',
    fontSize: setText(20),
    color: Colors.whiteColor,
  },
  price2Text: {
    marginLeft: setRatio(10),
    fontSize: setText(20),
    color: Colors.whiteColor,
  },
  count2Text: {
    marginLeft: setRatio(10),
    fontSize: setText(20),
    color: Colors.colorA3,
  },
  count2Text1: {
    marginRight: setRatio(10),
    fontSize: setText(20),
    color: Colors.colorA2,
  },
  kLineStyle: {
    backgroundColor: Colors.colorA4,
    height: setRatio(40),
    position: 'absolute',
    zIndex: -1,
    right: 0,
  },
  kLineStyle1: {
    backgroundColor: Colors.colorA5,
    height: setRatio(40),
    position: 'absolute',
    zIndex: -1,
  },
});
