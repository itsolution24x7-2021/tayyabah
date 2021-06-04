// @flow
import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  InputView: {
    paddingHorizontal: Metrics.ratio(5),
    marginTop: Metrics.ratio(5),
    borderRadius: Metrics.ratio(30),
    height: Metrics.ratio(50),
    borderColor: '#F5F5F5',
    borderWidth: 0.5,
    fontFamily: Fonts.type.MontserratItalic,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  labelTopText: {
    position: 'absolute',
    color: '#BBBBBB',
    top: 3,
    left: 30,
    fontSize: 10,
  },
  textInputStyle: {
    flex: 0.95,
    fontFamily: Fonts.type.MontserratItalic,
    color: '#3B3B3B',
    fontSize: Fonts.size.thirteen,
  },
  inputIcon: {
    width: Metrics.ratio(40),
  },
  errormsg: {
    color: 'red',
    fontSize: Fonts.size.fourteen,
    fontFamily: Fonts.type.MontserratRegular,
    marginHorizontal: Metrics.ratio(15),
  },
  rightIcon: {
    width: Metrics.ratio(20),
    marginRight: Metrics.ratio(10),
  },
});
