import { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import translations from '../locales';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('ayti_qizlar_locale') || 'uz';
  });

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('ayti_qizlar_locale', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      <IntlProvider locale={locale} messages={translations[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
