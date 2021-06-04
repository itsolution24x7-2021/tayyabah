// @flow
import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: Metrics.ratio(12),
    marginHorizontal: Metrics.ratio(16),
  },
  profileImage: {
    width: Metrics.ratio(36),
    height: Metrics.ratio(36),
    borderRadius: Metrics.ratio(36),
  },
  row: {
    marginLeft: Metrics.ratio(10),
  },
  profileName: {
    color: '#454F63',
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.MontserratRegular,
  },
  message: {
    color: '#979DA8',
    width: Metrics.screenWidth * 0.783,
    fontSize: Metrics.ratio(11),
    fontFamily: Fonts.type.MontserratRegular,
  },
});
