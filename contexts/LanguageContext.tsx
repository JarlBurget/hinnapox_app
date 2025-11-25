import React, { createContext, useContext } from 'react';
import i18n, { changeLanguage, init } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import en from '../locales/en.json';
import et from '../locales/et.json';

// Initialize i18next
if (!i18n.isInitialized) {
  init({
    lng: 'et',
    fallbackLng: 'et',
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
      en: { translation: en },
      et: { translation: et },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

type Language = 'en' | 'et';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>('et');

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    changeLanguage(lang);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
