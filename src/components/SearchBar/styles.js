// @flow
import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  closeSerachBar: {
    padding: Metrics.ratio(10),
    position: 'absolute',
    right: 15,
    top: 2,
  },
  searchBar: {
    height: Metrics.screenHeight * 0.095,
    marginTop: Metrics.ratio(35),
    width: '100%',
  },
  searchBarTextInput: {
    backgroundColor: '#fff',
    borderRadius: Metrics.ratio(30),
    height: Metrics.screenHeight * 0.075,
    marginHorizontal: Metrics.ratio(15),
    paddingHorizontal: Metrics.ratio(10),
  },
});
