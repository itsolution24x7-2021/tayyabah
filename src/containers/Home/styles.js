// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextStyle: {
    fontSize: Metrics.ratio(20),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },
  MainViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  MainLogoImg: {
    width: Metrics.ratio(280),
    height: Metrics.ratio(280),
    marginTop: Metrics.screenWidth * 0.08,
    alignItems: 'center',
    marginBottom: Metrics.ratio(20),
  },

  cardMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
