/* eslint-disable react-native/no-color-literals */
import {StyleSheet} from 'react-native';
import {Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  bottomFlower: {
    bottom: Metrics.ratio(50),
    height: Metrics.ratio(40),
    left: Metrics.ratio(20),
    position: 'absolute',
    width: Metrics.ratio(40),
  },
  commentFloatingImage: {
    height: Metrics.ratio(72),
    width: Metrics.ratio(72),
  },
  commentFloatingView: {
    bottom: Metrics.ratio(25),
    position: 'absolute',
    right: Metrics.ratio(25),
    zIndex: 9998,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  flowerLine: {
    bottom: -18,
    height: Metrics.ratio(50),
    position: 'absolute',
    width: Metrics.screenWidth,
  },
  headerTextStyle: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Metrics.ratio(20),
  },
  innerQuote: {
    height: Metrics.ratio(50),
    left: Metrics.ratio(15),
    position: 'absolute',
    width: Metrics.ratio(50),
  },
  noOfCommentsContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    margin: Metrics.ratio(16),
  },
  noOfCommentsImage: {
    height: Metrics.ratio(15),
    marginLeft: Metrics.ratio(6),
    width: Metrics.ratio(15),
  },
  noOfCommentsText: {
    color: '#979DA8',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Metrics.ratio(12),
    marginRight: Metrics.ratio(6),
  },
  quoteAuthor: {
    color: '#000000',
    fontFamily: Fonts.type.EBGaramondRegular,
    fontSize: Metrics.ratio(20),
  },
  quoteScrollView: {
    marginBottom: Metrics.ratio(32),
    marginHorizontal: Metrics.ratio(24),
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
  rightFlower: {
    bottom: Metrics.ratio(150),
    height: Metrics.ratio(30),
    position: 'absolute',
    right: Metrics.ratio(30),
    width: Metrics.ratio(30),
  },
  topFlower: {
    height: Metrics.ratio(35),
    left: Metrics.ratio(100),
    position: 'absolute',
    width: Metrics.ratio(35),
  },
});
