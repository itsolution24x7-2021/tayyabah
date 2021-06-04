// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  mainCard: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: Metrics.ratio(5),
    paddingVertical: Metrics.ratio(30),
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
    marginHorizontal: Metrics.ratio(20),
    marginBottom: Metrics.ratio(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMainView: {
    flex: 1,
  },
  mainText: {
    color: '#737c8d',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Fonts.size.Large,
  },

  iconMain: {
    height: Metrics.screenHeight * 0.12,
    flex: 1,
    width: Metrics.screenHeight * 0.12,
    marginBottom: Metrics.ratio(20),
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
});
