import { StyleSheet } from 'react-native';
import { setRatio, setText } from '../../../../../utils/screen-util';
import Colors from '../../../../../const/colors';

export default StyleSheet.create({
  container: {
    width: 80,
    backgroundColor: Colors.colorB9,
    // backgroundColor: Colors.whiteColor,
    alignItems: 'center',
    marginRight: 20,
  },
  closeBtnWrap: {
    marginTop: setRatio(20),
    marginBottom: setRatio(5),
  },
  textBtnWrap: {
    marginTop: setRatio(15),
  },
  titleText: {
    color: Colors.colorB1,
    fontSize: setText(20),
  },
  unselectedText: {
    color: Colors.colorB1,
    fontSize: setText(17),
  },
  selectedText: {
    color: Colors.colorA1,
    fontSize: setText(17),
  },
});
