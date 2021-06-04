// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainCard: {
    flexDirection: 'row',
    shadowColor: '#000',
    borderRadius: Metrics.ratio(35),
    paddingVertical: Metrics.ratio(12),
    paddingHorizontal: Metrics.ratio(25),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
    marginTop: Metrics.ratio(10),
    marginHorizontal: Metrics.ratio(10),
    marginBottom: Metrics.ratio(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMain: {
    marginRight: Metrics.ratio(10),
    height: 18,
    width: 18,
  },
  cardMainView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: Metrics.ratio(14)
  },
  categoryName: {
    fontFamily: Fonts.type.MontserratBold,
    textTransform: 'capitalize',
    fontSize: Metrics.ratio(13),
  }
});
