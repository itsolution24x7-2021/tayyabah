// @flow
import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: Metrics.ratio(55),
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  row: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  textInput: {
    flex: 1,
    padding: Metrics.ratio(16),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratRegular,
    fontSize: Metrics.ratio(14),
  },
  cancelBtn: {
    width: Metrics.ratio(50),
    justifyContent: 'center',
    alignItems: 'center',
  }
});
