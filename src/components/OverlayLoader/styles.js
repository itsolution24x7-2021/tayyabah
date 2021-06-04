// @flow
import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: Metrics.screenWidth * 0.85,
    borderRadius: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(24),
  },
  message: {
    color: '#454F63',
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.MontserratRegular,
    marginLeft: Metrics.ratio(8),
  },
});
