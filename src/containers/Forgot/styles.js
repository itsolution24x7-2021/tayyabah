// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  heading: {
    textAlign: 'center',
    color: '#000',
    fontSize: Metrics.ratio(20),
    marginTop: Metrics.screenWidth * 0.06,
    marginBottom: Metrics.screenWidth * 0.06,
    fontFamily: Fonts.type.MontserratBold,
  },
  loginView: {
    paddingHorizontal: Metrics.ratio(15),
    backgroundColor: '#f0f1f6',
    marginTop: Metrics.ratio(20),
    borderRadius: Metrics.ratio(30),
    height: Metrics.ratio(50),
    borderColor: '#d8dde9',
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginBtn: {
    backgroundColor: '#4de528',
    marginHorizontal: Metrics.ratio(60),
    paddingVertical: Metrics.ratio(15),
    marginTop: Metrics.ratio(40),
    borderRadius: Metrics.ratio(30),
    elevation: 4,
    marginBottom: Metrics.ratio(30),
  },

  forgotBtnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: Fonts.type.MontserratExtraBold,
    fontSize: Fonts.size.twelve,
  },
  loginInput: {
    flex: 0.95,
  },
  logoStyle: {
    resizeMode: 'contain',
    width: Metrics.ratio(100),
    height: Metrics.ratio(100),
  },
  inputIcon: {
    width: Metrics.ratio(16),
  },
  MainViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LogoImg: {
    width: Metrics.ratio(126),
    height: Metrics.ratio(126),
    alignItems: 'center',
  },

  CardViewStyle: {
    width: Metrics.screenWidth * 0.9,
    height: Metrics.screenHeight * 0.64,
    marginLeft: Metrics.ratio(15),
    marginRight: Metrics.ratio(15),
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.screenWidth * 0.05,
    borderRadius: Metrics.ratio(10),
  },
});
