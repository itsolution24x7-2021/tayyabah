// @flow
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
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
  forgot: {
    color: '#4de528',
    textDecorationLine: 'underline',
    fontFamily: Fonts.type.MontserratBoldItalic,
    fontSize: Metrics.ratio(10),
  },
  loginBtn: {
    backgroundColor: '#4de528',
    marginHorizontal: Metrics.ratio(60),
    paddingVertical: Metrics.ratio(15),
    marginTop: Metrics.ratio(40),
    borderRadius: Metrics.ratio(30),
    elevation: 4,
  },

  loginBtnText: {
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

  RegisterTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrics.ratio(20),
    bottom: Metrics.ratio(20),
  },

  RegisterHere: {
    fontSize: Fonts.size.medium,
    marginTop: Metrics.ratio(50),
    fontFamily: Fonts.type.MontserratItalic,
  },

  RegisterHereLink: {
    fontSize: Fonts.size.thirteen,
    fontFamily: Fonts.type.MontserratBold,
    color: '#4de528',
    textDecorationLine: 'underline',
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
    width: Metrics.ratio(150),
    height: Metrics.ratio(150),
    marginTop: Metrics.screenWidth * 0.12,
    alignItems: 'center',
  },

  checkbox: {
    alignSelf: "center",
  },

  keep: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  keepme: {
    color: '#000',
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.MontserratRegular,
  },

  CardViewStyle: {
    width: Metrics.screenWidth * 0.9,
    marginLeft: Metrics.ratio(15),
    marginRight: Metrics.ratio(15),
    marginBottom: Metrics.ratio(15),
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.screenWidth * 0.05,
    borderTopLeftRadius: Metrics.ratio(10),
    borderTopRightRadius: Metrics.ratio(10),
  },
});
