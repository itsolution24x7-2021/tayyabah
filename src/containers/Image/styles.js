/* eslint-disable react-native/no-color-literals */
// @flow
import {StyleSheet, Platform} from 'react-native';
import {Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: Metrics.ratio(16),
    zIndex: 1,
  },
  headerText: {
    color: '#FFFFFF',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Metrics.ratio(20),
    textTransform: 'capitalize',
  },
  headerTextContainer: {
    flex: 1,
    paddingHorizontal: Metrics.ratio(16),
  },
  menu: {
    borderRadius: Metrics.ratio(8),
    top: 50,
  },
  menuContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    marginRight: Metrics.ratio(25),
  },
  menuItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'ios' ? Metrics.ratio(8) : Metrics.ratio(0),
  },
  menuItemImage: {
    height: Metrics.ratio(12),
    width: Metrics.ratio(12),
  },
  menuItemText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratMedium,
    fontSize: Metrics.ratio(13),
    marginLeft: Metrics.ratio(8),
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
  rotateBtn: {
    marginLeft: Metrics.ratio(16),
    marginRight: 'auto',
    marginTop: Metrics.ratio(20),
  },
  secHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  secLeftIconContainer: {
    paddingHorizontal: Metrics.ratio(16),
  },
  secLeftIconImg: {
    height: Metrics.ratio(25),
    width: Metrics.ratio(25),
  },
  topHeaderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(16),
    width: Metrics.screenWidth,
  },
  topLeftIcon: {
    backgroundColor: '#F7F7FA',
    borderRadius: Metrics.ratio(25),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
