// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  notificationView: {
    flex: 1,
  },
  dayText: {
    marginHorizontal: Metrics.ratio(25),
    color:'#3C4350',
    fontFamily: Fonts.type.MontserratBold,
  },
});
