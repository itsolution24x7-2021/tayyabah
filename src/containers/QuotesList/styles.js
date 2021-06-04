/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import {Metrics, Fonts, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Metrics.ratio(20),
  },
  noRecordText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratRegular,
    fontSize: Metrics.ratio(16),
  },
  noRecordView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  quoteItem: {
    alignItems: 'center',
    backgroundColor: '#F7F7FA',
    borderRadius: Metrics.ratio(50),
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: Metrics.ratio(16),
    marginVertical: Metrics.ratio(8),
    padding: Metrics.ratio(14),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
  quoteItemIcon: {
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
  },
  quoteItemText: {
    color: 'rgba(69, 79, 99, 0.5)',
    flex: 1,
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Metrics.ratio(13),
    marginLeft: Metrics.ratio(8),
    textTransform: 'capitalize',
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: '#F7F7FA',
    borderRadius: Metrics.ratio(50),
    elevation: 5,
    flexDirection: 'row',
    marginHorizontal: Metrics.ratio(16),
    overflow: 'hidden',
    paddingHorizontal: Metrics.ratio(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchBarIcon: {
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
  },
  searchBarTextInput: {
    color: Colors.Dove_Gray,
    flex: 1,
    marginLeft: Metrics.ratio(8),
  },
});
