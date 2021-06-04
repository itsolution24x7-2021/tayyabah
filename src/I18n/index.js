import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import en from '../translations/en.json';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;
I18n.translations = {
  en,
};

let currentLanguage;
export const languageInitialize = locale => {
  if (locale) {
    I18n.defaultLocale = locale;
    I18n.locale = locale;
    I18n.currentLocale();
  }

  if (locale == 'ar') {
    currentLanguage = 'ar';
    moment.locale('ar');
  } else {
    currentLanguage = 'en';
    moment.locale('en');
  }
};

export function strings(name, params = {}) {
  return I18n.t(name, params);
}
