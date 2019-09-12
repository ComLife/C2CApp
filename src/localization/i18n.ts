/* eslint-disable @typescript-eslint/camelcase */
import I18n from 'i18n-js';
import LocalStore from '../utils/local-store';
import * as RNLocalize from 'react-native-localize';

import en from './en';
import zh from './zh';
import zh_tw from './zh-tw';

I18n.fallbacks = true;
I18n.translations = {
  en,
  zh,
  zh_tw,
};
I18n.defaultLocale = 'en';

// 这个是手机系统里面的语言控制
const localesOS = RNLocalize.getLocales();
I18n.locale = localesOS[0].languageTag;

// 这个是本软件内的语言控制
const locales = [
  { countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false },
  { countryCode: 'ZH', languageTag: 'zh-Hans-US', languageCode: 'zh', isRTL: false },
  { countryCode: 'TW', languageTag: 'zh-Hans-TW', languageCode: 'zh-tw', isRTL: false },
];

const setLocales = (type: number, callback?: any) => {
  console.log('type==', type);
  if (Array.isArray(locales)) {
    I18n.locale = locales[type].languageTag;
    new LocalStore().saveLocalRepository('localLanguage', I18n.locale);
  }
};

export { I18n, setLocales };
