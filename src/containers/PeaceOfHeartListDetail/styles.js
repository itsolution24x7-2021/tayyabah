/* eslint-disable react-native/no-color-literals */
// @flow
import {StyleSheet, Platform} from 'react-native';
import {Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  cardMainView: {
    flex: 1,
  },
  cardTranslation: {
    backgroundColor: '#fff',
    borderRadius: Metrics.ratio(5),
    elevation: 2,
    flex: 1,
    marginBottom: Metrics.ratio(10),
    marginLeft: Metrics.ratio(16),
    marginRight: Metrics.ratio(16),
    marginTop: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  handleStyle: {
    backgroundColor: '#E5E5E5',
    borderRadius: Metrics.ratio(4),
    height: Metrics.ratio(3),
    width: Metrics.ratio(93),
  },
  innerText: {
    color: '#444E62',
    fontFamily: Fonts.type.MontserratBold,
    fontSize: Fonts.size.fifteen,
    marginBottom: Metrics.ratio(5),
  },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: Metrics.ratio(5),
    elevation: 2,
    flex: 1,
    marginBottom: Metrics.ratio(10),
    marginLeft: Metrics.ratio(16),
    marginRight: Metrics.ratio(16),
    marginTop: Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(35),
    paddingVertical: Metrics.ratio(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  mainText: {
    color: '#444E62',
    fontFamily: Fonts.type.AdobeArabicBold,
    textAlign: 'center',
  },
  mainTranslation: {
    color: '#000',
    flex: 1,
    fontFamily: Fonts.type.MontserratMedium,
    marginBottom: Metrics.ratio(15),
  },
  menu: {
    borderRadius: Metrics.ratio(8),
    top: 50,
  },
  menuContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 18,
  },
  menuItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'ios' ? Metrics.ratio(8) : Metrics.ratio(0),
  },
  menuItemImage: {
    height: Metrics.ratio(12),
    width: Metrics.ratio(12),
  },
  menuItemText: {
    color: '#454F63',
    fontFamily: Fonts.type.MontserratMedium,
    fontSize: Metrics.ratio(13),
    marginLeft: Metrics.ratio(8),
  },
  modalStyle: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: Metrics.ratio(16),
    borderTopRightRadius: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(24),
  },
  modalizeContentView: {
    flex: 1,
    marginHorizontal: Metrics.ratio(16),
  },
  overlayStyle: {
    backgroundColor: 'transparent',
  },
  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sliderLabel: {
    color: '#444E62',
    fontFamily: Fonts.type.MontserratMedium,
    fontSize: Metrics.ratio(16),
    marginBottom: Metrics.ratio(8),
  },
  tap: {
    textAlign: 'center',
  },
  tapImage: {
    height: Metrics.ratio(100),
    width: Metrics.ratio(100),
  },
  tapMain: {
    bottom: 0,
    position: 'absolute',
    right: 26,
  },
  toolTipContainer: {
    alignItems: 'center',
    backgroundColor: '#4DE528',
    borderRadius: Metrics.ratio(16),
    justifyContent: 'center',
    marginBottom: Metrics.ratio(8),
    paddingHorizontal: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(4),
  },
  toolTipImage: {
    bottom: Metrics.ratio(-9),
    height: Metrics.ratio(12),
    position: 'absolute',
    width: Metrics.ratio(12),
  },
  toolTipText: {
    color: '#fff',
    fontFamily: Fonts.type.MontserratMedium,
    fontSize: Fonts.size.twelve,
  },
});
