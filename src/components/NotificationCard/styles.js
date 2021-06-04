// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  mainCard: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderRadius: Metrics.ratio(10),
    paddingVertical: Metrics.ratio(15),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 5,
    marginTop: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(20),
    flex: 1,
    marginBottom: Metrics.ratio(10),
  },

  online: {
    backgroundColor: '#4DE528',
    height: Metrics.ratio(10),
    width: Metrics.ratio(10),
    borderRadius: Metrics.ratio(20),
    position: 'absolute',
    top: 7,
    left: -4,
  },

  mainText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratMedium,
    fontSize: Fonts.size.fifteen,
    marginLeft: Metrics.ratio(20),
    marginRight: Metrics.ratio(10),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratRegular,
    fontSize: Fonts.size.ten,
    marginLeft: Metrics.ratio(10),
    flex: 1,
    justifyContent: 'center',
    marginTop: Metrics.ratio(5),
    marginRight: Metrics.ratio(10),
    alignSelf: 'flex-end',
  },
});
