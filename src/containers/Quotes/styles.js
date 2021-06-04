// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextStyle: {
    fontSize: Metrics.ratio(20),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },
  flowerLineImage: {
    width: Metrics.screenWidth,
    height: Metrics.ratio(50),
    position: 'absolute',
    bottom: -18,
  },
  commentFloatingView: {
    position: 'absolute',
    zIndex: 9998,
    bottom: Metrics.ratio(25),
    right: Metrics.ratio(25),
  },
  commentFloatingImage: {
    width: Metrics.ratio(72),
    height: Metrics.ratio(72),
  },
  noRecordView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    color: '#454F63',
    fontSize: Metrics.ratio(16),
    fontFamily: Fonts.type.MontserratRegular,
  },
});
