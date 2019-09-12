import { StyleSheet } from 'react-native';
import Colors from '../../../const/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.colorB1,
  },
  bg: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.whiteColor,
  },
  text: {
    marginTop: 5,
    marginLeft: 15,
    color: Colors.colorB2,
  },
  listContainer: { padding: 10 },
  itemHeight: { height: 50 },
  itemText: { textAlign: 'center' },
});
