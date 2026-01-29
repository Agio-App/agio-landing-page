import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../images/icon_light.svg?react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { buildLocalePath, getPathWithoutLocale, normalizeLocale } from '../i18n/url';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lng } = useParams();

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'ja', label: '日本語' },
    { code: 'zh-CN', label: '中文(简体)' },
    { code: 'pt-BR', label: 'Português (Brasil)' }
  ];

  const currentLocale =
    normalizeLocale(lng) ?? normalizeLocale(i18n.resolvedLanguage ?? i18n.language) ?? 'en';
  const thankYouAction = buildLocalePath(currentLocale, '/thank-you');

  const handleLanguageChange = (value: string) => {
    const nextLocale = normalizeLocale(value) ?? 'en';
    const nextPath = buildLocalePath(
      nextLocale,
      getPathWithoutLocale(location.pathname),
      location.search,
      location.hash
    );
    navigate(nextPath);
  };

  return (
    <footer
      id="waitlist"
      className="bg-page pt-20 pb-10 border-t border-border relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle decorative circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border rounded-full opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Icon
            className="w-12 h-12 mx-auto mb-8 opacity-80 text-text-primary"
            role="img"
            aria-label={t('footer.iconAlt')}
          />
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-6">
            {t('footer.headlineLine1')} <br /> {t('footer.headlineLine2')}
          </h2>
          <p className="text-text-secondary mb-10 max-w-lg mx-auto">
            {t('footer.body')}
          </p>

          <form
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-4"
            name="waitlist"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action={thankYouAction}
          >
            <input type="hidden" name="form-name" value="waitlist" />
            <input type="text" name="bot-field" className="hidden" aria-hidden="true" tabIndex={-1} />
            <input 
              id="waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t('footer.emailPlaceholder')}
              className="flex-1 bg-input-bg border border-input-border rounded-full px-6 py-4 text-text-primary placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
            <button type="submit" className="px-8 py-4 bg-cta-bg text-cta-text font-medium rounded-full hover:bg-cta-hover transition-colors duration-300">
              {t('footer.cta')}
            </button>
          </form>
          <p className="text-xs text-muted">
            {t('footer.disclaimer')}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-border pt-8 mt-16 gap-4">
          <p className="text-muted text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex gap-6">
              <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors">{t('footer.links.privacy')}</a>
              <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors">{t('footer.links.terms')}</a>
              <a href="#" className="text-text-secondary hover:text-accent text-sm transition-colors">{t('footer.links.contact')}</a>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="language-select" className="sr-only">
                {t('footer.languageLabel')}
              </label>
              <div className="relative">
                <select
                  id="language-select"
                  value={currentLocale}
                  onChange={(event) => handleLanguageChange(event.target.value)}
                  className="appearance-none bg-input-bg border border-input-border text-text-secondary text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  aria-label={t('footer.languageLabel')}
                >
                  {languageOptions.map((option) => (
                    <option
                      key={option.code}
                      value={option.code}
                      className="text-text-primary"
                      style={{ paddingLeft: '12px' }}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.25 8.27a.75.75 0 0 1-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;