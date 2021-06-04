// @flow
import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: Metrics.screenHeight * 0.375,
    opacity: 0.5,
  },
  headerTextStyle: {
    fontSize: Metrics.ratio(20),
    color: '#454F63',
    fontFamily: Fonts.type.MontserratBold,
  },
  profileView: {
    flex: 1,
    alignItems: 'center',
  },

  nameView: {
    alignItems: 'center',
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: Metrics.screenHeight * 0.14,
    width: Metrics.screenHeight * 0.22,
    height: Metrics.screenHeight * 0.22,
    borderRadius: Metrics.screenHeight * 0.22,
    borderWidth: Metrics.ratio(1),
    borderColor: '#eee',
    overflow: 'hidden'
  },
  image: {
    width: Metrics.screenHeight * 0.22,
    height: Metrics.screenHeight * 0.22,
  },
  name: {
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.MontserratBold,
    marginTop: Metrics.ratio(10),
  },
  emailView: {
    alignItems: 'center',
  },
  email: {
    fontSize: Fonts.size.thirteen,
    color: '#3C4350',
    fontFamily: Fonts.type.MontserratBold,
    marginTop: Metrics.ratio(20),
  },
  address: {
    fontSize: Fonts.size.twelve,
    color: '#3C4350',
    fontFamily: Fonts.type.MontserratRegular,
  },
  logoutView: {
    flexDirection: 'row',
    alignItems: "flex-end",
    marginBottom: Metrics.ratio(15),
  },
  logout: {
    fontSize: Fonts.size.nighteen,
    color: '#D93838',
    fontFamily: Fonts.type.MontserratSemiBold,
  },
  imageLogout: {
    height: Metrics.ratio(25),
    width: Metrics.ratio(25),
    marginRight: Metrics.ratio(10),
  },
});
