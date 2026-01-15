import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  buildLocalePath,
  canonicalLocales,
  getPathWithoutLocale,
  normalizeLocale
} from '../i18n/url';

const SeoLinks: React.FC = () => {
  const location = useLocation();
  const { lng } = useParams();
  const locale = normalizeLocale(lng);

  useEffect(() => {
    if (!locale || typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const origin = window.location.origin;
    const restPath = getPathWithoutLocale(location.pathname);
    const canonicalHref = `${origin}${buildLocalePath(locale, restPath, location.search)}`;
    const head = document.head;

    head.querySelectorAll('link[data-i18n-seo="true"]').forEach((node) => node.remove());

    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = canonicalHref;
    canonicalLink.setAttribute('data-i18n-seo', 'true');
    head.appendChild(canonicalLink);

    canonicalLocales.forEach((supportedLocale) => {
      const alternateLink = document.createElement('link');
      alternateLink.rel = 'alternate';
      alternateLink.hreflang = supportedLocale;
      alternateLink.href = `${origin}${buildLocalePath(
        supportedLocale,
        restPath,
        location.search
      )}`;
      alternateLink.setAttribute('data-i18n-seo', 'true');
      head.appendChild(alternateLink);
    });
  }, [locale, location.pathname, location.search]);

  return null;
};

export default SeoLinks;
