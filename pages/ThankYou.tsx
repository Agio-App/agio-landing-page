import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { buildLocalePath, normalizeLocale } from '../i18n/url';

const ThankYou: React.FC = () => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const currentLocale = normalizeLocale(lng) ?? 'en';

  return (
    <main className="min-h-screen grid place-items-center bg-charcoal text-white px-6">
      <div className="max-w-xl w-full text-center border border-white/10 rounded-3xl bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] px-8 py-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">
          {t('thankYou.title')}
        </h1>
        <p className="text-gray-300 leading-relaxed mb-8">
          {t('thankYou.body')}
        </p>
        <Link
          to={buildLocalePath(currentLocale, '/')}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-mint text-charcoal font-medium hover:bg-mint-hover transition-colors"
        >
          {t('thankYou.backLink')}
        </Link>
      </div>
    </main>
  );
};

export default ThankYou;
