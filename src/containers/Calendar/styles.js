// @flow
import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FA',
  },
  headerTextStyle: {
    fontSize: Metrics.ratio(20),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },
  heading: {
    color: '#4DE528',
    fontSize: Metrics.ratio(22),
    fontFamily: Fonts.type.MontserratMedium,
  },
  number: {
    color: '#444E62',
    fontSize: Fonts.size.ten,
    fontFamily: Fonts.type.MontserratBold,
    marginTop: Metrics.ratio(15),
  },
  name: {
    color: '#444E62',
    fontSize: Metrics.ratio(16),
    fontFamily: Fonts.type.MontserratMedium,
  },
  nameBold: {
    color: '#444E62',
    fontSize: Metrics.ratio(16),
    fontFamily: Fonts.type.MontserratBold,
  },
  by: {
    color: '#8F93A2',
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.MontserratMedium,
  },
  secHeading: {
    color: '#D2D2DE',
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.MontserratMedium,
  },
  eventHeaderContainer: {
    flexDirection: 'row',
    paddingBottom: Metrics.ratio(6),
    borderBottomColor: '#D2D2DE',
    borderBottomWidth: 1,
  },
  closeImg: {
    height: Metrics.ratio(18),
    width: Metrics.ratio(18),
  },
  modalMain: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: Metrics.ratio(10),
    paddingBottom: Metrics.ratio(20),
    maxHeight: Metrics.screenHeight * 0.85,
  },
  menuContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: Metrics.ratio(16),
  },
  menu: {
    borderRadius: Metrics.ratio(8),
  },
  menuItemText: {
    color: '#454F63',
    fontSize: Metrics.ratio(13),
    fontFamily: Fonts.type.MontserratMedium,
  },
  monthBtn: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: Metrics.ratio(4),
    paddingHorizontal: Metrics.ratio(12),
    paddingVertical: Metrics.ratio(8),
    borderRadius: Metrics.ratio(23),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    marginBottom: Metrics.ratio(13),
  },
  monthBtnText: {
    color: '#444E62',
    fontSize: Metrics.ratio(13),
    fontFamily: Fonts.type.MontserratBold,
  },
});
