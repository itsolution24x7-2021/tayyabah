/* eslint-disable react-native/no-color-literals */
// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  actionBtnView: {
    marginHorizontal: Metrics.ratio(6),
  },
  actionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Metrics.ratio(10),
  },
  bottomFlower: {
    bottom: Metrics.ratio(24),
    height: Metrics.ratio(40),
    left: Metrics.ratio(-18),
    position: 'absolute',
    width: Metrics.ratio(40),
    zIndex: -1,
  },
  commentImage: {
    height: Metrics.ratio(12),
    marginHorizontal: Metrics.ratio(6),
    width: Metrics.ratio(12),
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  copyImage: {
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
  },
  favoriteImage: {
    height: Metrics.ratio(20),
    width: Metrics.ratio(20),
  },
  innerQuote: {
    height: Metrics.ratio(64),
    left: Metrics.ratio(12),
    position: 'absolute',
    width: Metrics.ratio(64),
    zIndex: -1,
  },
  itemAnimatedContainer: {
    backgroundColor: '#ffffff',
    borderRadius: Metrics.ratio(16),
    elevation: 12,
    height: Metrics.screenHeight * 0.55,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
  itemContainer: {
    height: Metrics.screenHeight * 0.72,
    justifyContent: 'center',
  },
  noOfComment: {
    color: '#979DA8',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(5),
  },
  quoteAuthor: {
    color: '#000000',
    fontFamily: Fonts.type.EBGaramondRegular,
    fontSize: Metrics.ratio(20),
  },
  quoteText: {
    color: '#000000',
    fontFamily: Fonts.type.EBGaramondRegular,
    fontSize: Metrics.ratio(25),
    marginBottom: Metrics.ratio(8),
  },
  quoteTitle: {
    color: '#000000',
    fontFamily: Fonts.type.EBGaramondMedium,
    fontSize: Metrics.ratio(25),
    marginBottom: Metrics.ratio(6),
    marginTop: Metrics.ratio(16),
  },
  quotesCardBg: {
    bottom: Metrics.ratio(-28),
    height: Metrics.ratio(176),
    position: 'absolute',
    right: Metrics.ratio(4),
    width: Metrics.ratio(176),
    zIndex: -1,
  },
  rightFlower: {
    bottom: Metrics.ratio(120),
    height: Metrics.ratio(30),
    position: 'absolute',
    right: Metrics.ratio(-16),
    width: Metrics.ratio(30),
    zIndex: -1,
  },
  saveImage: {
    height: Metrics.ratio(18),
    width: Metrics.ratio(18),
  },
  secActionRow: {
    flexDirection: 'row',
  },
  secActionView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topFlower: {
    height: Metrics.ratio(35),
    left: Metrics.ratio(80),
    position: 'absolute',
    top: Metrics.ratio(-20),
    width: Metrics.ratio(35),
    zIndex: -1,
  },
});
