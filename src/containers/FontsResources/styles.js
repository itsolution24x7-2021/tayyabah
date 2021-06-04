// @flow
import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  bigHeart: {
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
  card: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: Metrics.ratio(8),
    padding: Metrics.ratio(16),
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginVertical: Metrics.ratio(16),
    marginRight: Metrics.ratio(32),
    marginLeft: Metrics.ratio(16),
  },
  copyButton: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(30),
    backgroundColor: Colors.white,
    borderRadius: Metrics.ratio(30),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    top: -16,
  },
  copyIcon: {
    width: Metrics.ratio(15),
    height: Metrics.ratio(15),
  },
  cardText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },
});
