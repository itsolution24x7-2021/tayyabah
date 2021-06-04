// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  mainCard: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: Metrics.ratio(5),
    paddingVertical: Metrics.ratio(15),
    backgroundColor: '#fff',
    paddingHorizontal: Metrics.ratio(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginTop: Metrics.ratio(10),
    marginLeft: Metrics.ratio(25),
    marginRight: Metrics.ratio(20),
    marginBottom: Metrics.ratio(10),
    alignItems: 'center',
  },
  cardMainView: {
    flex: 1,
  },
  mainText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Fonts.size.Large,
  },

  iconMain: {
    height: 80,
    width: 80,
    position: 'absolute',
    left: -40,
    top: -11,
  },
  BigHeart: {
    width: Metrics.ratio(250),
    height: Metrics.ratio(250),
    position: 'absolute',
    bottom: Metrics.ratio(-40),
    right: Metrics.ratio(-70),
    zIndex: -1,
  },
  smallHeart: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(50),
    position: 'absolute',
    top: -12,
    zIndex: -1,
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
