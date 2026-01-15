import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import ja from './locales/ja.json';
import zhCN from './locales/zh-CN.json';
import ptBR from './locales/pt-BR.json';
import { canonicalLocales, getLocaleFromPath } from './url';

const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  ja: { translation: ja },
  'zh-CN': { translation: zhCN },
  'zh-cn': { translation: zhCN },
  'pt-BR': { translation: ptBR },
  'pt-br': { translation: ptBR }
};

const updateDocumentLanguage = () => {
  document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
  document.title = i18n.t('meta.title');
};

const initialLocale =
  typeof window !== 'undefined' ? getLocaleFromPath(window.location.pathname) : null;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: initialLocale ?? undefined,
    supportedLngs: [...canonicalLocales, 'zh-cn', 'pt-br'],
    detection: {
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'agio_language',
      lookupFromPathIndex: 0
    },
    interpolation: {
      escapeValue: false
    }
  })
  .then(updateDocumentLanguage);

i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
