import I18n,{ getLanguages } from 'react-native-i18n'
// import DeviceInfo from 'react-native-device-info'
// import DataRepository from '../dao/DataRepository'
import en from './en';
import zh from './zh';

I18n.defaultLocale = 'zh';
I18n.fallbacks = true;
I18n.translations = {
    en,
    zh,
};

I18n.locale = 'zh';

export function strings(name, params = {}) {
    return I18n.t(name, params);
};

export function setLang(lan) {
    I18n.locale = lan || 'en';
};

export function getLang() {
    return I18n.locale;
};

export default I18n;
