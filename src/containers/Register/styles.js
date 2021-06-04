// @flow
import { StyleSheet } from 'react-native';
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
    textAlign: 'right',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    marginTop: Metrics.ratio(10),
    fontFamily: Fonts.type.MontserratBoldItalic,
    fontSize: Fonts.size.ten,
  },
  signupBtn: {
    backgroundColor: '#4de528',
    marginHorizontal: Metrics.ratio(60),
    paddingVertical: Metrics.ratio(15),
    marginTop: Metrics.ratio(40),
    marginBottom: Metrics.ratio(20),
    borderRadius: Metrics.ratio(30),
    elevation: 4,
    height: Metrics.ratio(46),
  },
  BackArrowImg: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
    alignSelf: 'flex-start',
    zIndex: 99,
    marginLeft: Metrics.ratio(10),
    marginTop: Metrics.ratio(20),
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

  container: {
    flex: 1,
  },

  backgroundImg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SignUpLogoImg: {
    width: Metrics.ratio(110),
    height: Metrics.ratio(110),
    marginTop: Metrics.screenWidth * 0.08,
    alignItems: 'center',
  },

  headerTextStyle: {
    fontSize: Metrics.ratio(20),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },

  uploadText: {
    fontSize: Fonts.size.ten,
    marginLeft: Metrics.ratio(5),
  },

  uploadImageArea: {
    flexDirection: 'row',
  },

  uploadIcon: {
    height: Metrics.ratio(8),
    width: Metrics.ratio(8),
    marginTop: Metrics.ratio(2),
  },

  placeholder: {
    height: Metrics.ratio(80),
    width: Metrics.ratio(80),
    marginTop: Metrics.ratio(2),
    marginBottom: Metrics.ratio(10),
    borderRadius: Metrics.ratio(60),
  },

  customDateIcon: {
    top: 15,
    left: 10,
    position: 'absolute',
  },

  checkbox: {
    alignSelf: 'center',
  },

  keep: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  keepme: {
    color: '#000',
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.MontserratRegular,
    marginTop: Metrics.ratio(10),
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
