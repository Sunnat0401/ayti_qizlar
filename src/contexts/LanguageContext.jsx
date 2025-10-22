// import { createContext, useContext, useState } from 'react';
// import { IntlProvider } from 'react-intl';
// import translations from '../locales';

// const LanguageContext = createContext();

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within LanguageProvider');
//   }
//   return context;
// };

// export const LanguageProvider = ({ children }) => {
//   const [locale, setLocale] = useState(() => {
//     return localStorage.getItem('ayti_qizlar_locale') || 'uz';
//   });

//   const changeLanguage = (newLocale) => {
//     setLocale(newLocale);
//     localStorage.setItem('ayti_qizlar_locale', newLocale);
//   };

//   return (
//     <LanguageContext.Provider value={{ locale, changeLanguage }}>
//       <IntlProvider locale={locale} messages={translations[locale]}>
//         {children}
//       </IntlProvider>
//     </LanguageContext.Provider>
//   );
// };


import { createContext, useContext, useState, useMemo } from 'react';
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

const getNested = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('ayti_qizlar_locale') || 'uz';
  });

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('ayti_qizlar_locale', newLocale);
  };

  // messages for IntlProvider
  const messages = translations[locale] || {};

  // t function that supports dot paths like 'cv.title'
  const t = useMemo(() => {
    return (key, fallback = '') => {
      const val = getNested(messages, key);
      if (val === undefined || val === null) return fallback || key;
      return val;
    };
  }, [messages]);

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};