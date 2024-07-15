import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
import ko from './ko';

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

console.log('ko', ko);
console.log('en', en);

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
  pluralSeparator: false,
  compatibilityJSON: 'v3',
});

export default i18n;
