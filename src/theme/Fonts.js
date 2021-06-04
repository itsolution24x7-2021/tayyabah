// @flow
// Android
// title 20
// Heading 16
// desc 14

// ios
// title 20
// Heading 20
// desc 17

import Metrics from './Metrics';

const type = {
  //Adobe Arabic
  AdobeArabicBold: 'AdobeArabic-Bold',
  AdobeArabicBoldItalic:'AdobeArabic-BoldItalic',
  AdobeArabicItalic: 'AdobeArabic-Italic',
  AdobeArabicRegular: 'AdobeArabic-Regular',
 
  //Montserrat
  MontserratBlack: 'Montserrat-Black',
  MontserratBlackItalic: 'Montserrat-BlackItalic',
  MontserratBold: 'Montserrat-Bold',
  MontserratBoldItalic: 'Montserrat-BoldItalic',
  MontserratExtraBold: 'Montserrat-ExtraBold',
  MontserratExtraBoldItalic: 'Montserrat-ExtraBoldItalic',
  MontserratExtraLight: 'Montserrat-ExtraLight',
  MontserratExtraLightItalic: 'Montserrat-ExtraLightItalic',
  MontserratItalic: 'Montserrat-Italic',
  MontserratLight: 'Montserrat-Light',
  MontserratLightItalic: 'Montserrat-LightItalic',
  MontserratMedium: 'Montserrat-Medium',
  MontserratRegular: 'Montserrat-Regular',
  MontserratSemiBold: 'Montserrat-SemiBold',
  MontserratSemiBoldItalic: 'Montserrat-SemiBoldItalic',
  MontserratThin: 'Montserrat-Thin',
  MontserratThinItalic: 'Montserrat-ThinItalic',

  // EBGaramond
  EBGaramondBold: 'EBGaramond-Bold',
  EBGaramondBoldItalic: 'EBGaramond-BoldItalic',
  EBGaramondExtraBold: 'EBGaramond-ExtraBold',
  EBGaramondExtraBoldItalic: 'EBGaramond-ExtraBoldItalic',
  EBGaramondItalic: 'EBGaramond-Italic',
  EBGaramondMedium: 'EBGaramond-Medium',
  EBGaramondMediumItalic: 'EBGaramond-MediumItalic',
  EBGaramondRegular: 'EBGaramond-Regular',
  EBGaramondSemiBold: 'EBGaramond-SemiBold',
  EBGaramondSemiBoldItalic: 'EBGaramond-SemiBoldItalic',
};

const size = {
  tiny: Metrics.generatedFontSize(8),
  ten: Metrics.generatedFontSize(10),
  xxxSmall: Metrics.generatedFontSize(11),
  xxSmall: Metrics.generatedFontSize(12),
  twelve: Metrics.generatedFontSize(12),
  thirteen: Metrics.generatedFontSize(13),
  fourteen: Metrics.generatedFontSize(14),
  xSmall: Metrics.generatedFontSize(14),
  small: Metrics.generatedFontSize(15),
  fifteen: Metrics.generatedFontSize(15.11),
  sixteen: Metrics.generatedFontSize(16),
  medium: Metrics.generatedFontSize(18),
  normal: Metrics.generatedFontSize(17),
  eighteen: Metrics.generatedFontSize(18),
  nighteen: Metrics.generatedFontSize(19),
  large: Metrics.generatedFontSize(20),
  xLarge: Metrics.generatedFontSize(25),
  xxLarge: Metrics.generatedFontSize(30),
  xxxLarge: Metrics.generatedFontSize(36),
  xxxxLarge: Metrics.generatedFontSize(50),
};

export default {
  type,
  size,
};
