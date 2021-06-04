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
    // alignItems: 'center',
  },
  Edit: {
    color: '#fff',
  },

  editView: {
    flexDirection: 'row',
    marginTop: Metrics.screenHeight * (- 0.04),
    width: Metrics.screenWidth * 0.3,
    backgroundColor: '#4DE528',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.ratio(8),
    borderRadius: Metrics.ratio(20),
    zIndex: 10,
  },
  customDateIcon: {
    top: 15,
    right: 15,
    position: 'absolute',
  },
  InputView: {
    flex: 1,
    marginHorizontal: Metrics.ratio(20),
  },
  ImageUserView: {
    alignItems: 'center',
  },
  imageEdit: {
    marginRight: Metrics.ratio(10),
  },
  image: {
    height: Metrics.screenHeight * 0.22,
    width: Metrics.screenHeight * 0.22,
    borderRadius: Metrics.screenHeight * 0.22,
    borderWidth: Metrics.ratio(1),
    borderColor: '#eee',
    marginTop: Metrics.screenHeight * 0.14,
  },

  UploadView: {
    alignItems: 'center',
    marginBottom: Metrics.ratio(20),
  },
  labelTopText: {
    position: 'absolute',
    color: '#BBBBBB',
    top: 8,
    left: 30,
    fontSize: 10,
    zIndex: 1000,
  },
  TextInputPaddingStyle: {
    paddingLeft: Metrics.ratio(25),
  },
  SaveView: {
    backgroundColor: '#4DE528',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.ratio(25),
    marginTop: Metrics.ratio(15),
    marginBottom: Metrics.ratio(20),
    width: Metrics.screenWidth * 0.5,
    height: Metrics.ratio(40),
  },
  saveBtn: {
    color: '#fff',
    fontSize: Metrics.ratio(15),
  },
});
