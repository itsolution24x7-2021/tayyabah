// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  MainViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  MainLogoImg: {
    width: Metrics.ratio(230),
    height: Metrics.ratio(230),
    alignItems: 'center',
    marginBottom: Metrics.ratio(20),
  },

  PhotoCard: {
    backgroundColor: '#fff',
    marginHorizontal: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(15),
    shadowColor: '#000',
    borderRadius: Metrics.ratio(15),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
  },
  headerTextStyle: {
    fontSize: Metrics.ratio(20),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },
  Head: {
    color: '#3C4350',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Fonts.size.thirteen,
  },

  Para: {
    color: '#000',
    marginTop: Metrics.ratio(10),
    fontFamily: Fonts.type.MontserratRegular,
    fontSize: Fonts.size.twelve,
  },

  cardMainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
