// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  mainCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#000',
    borderRadius: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(25),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 5,
    marginTop: Metrics.ratio(10),
    paddingRight: Metrics.ratio(15),
    width: Metrics.screenWidth * 0.444,
    marginHorizontal: Metrics.ratio(10),
    marginBottom: Metrics.ratio(10),
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconMain: {
    marginLeft: Metrics.ratio(15),
    height: Metrics.ratio(30),
    justifyContent: 'center',
    alignItems: 'center',
    width: Metrics.ratio(30),
  },

  mainText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Fonts.size.thirteen,
    marginLeft: Metrics.ratio(10),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
