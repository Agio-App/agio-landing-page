import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!locale || typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const origin = window.location.origin;
    const restPath = getPathWithoutLocale(location.pathname);
    const canonicalHref = `${origin}${buildLocalePath(locale, restPath, location.search)}`;
    const head = document.head;
    const ogImageUrl = `${origin}/web-app-manifest-512x512.png`;
    const ogLocale = locale.replace('-', '_');
    const siteName = 'Agio';

    // ----- Canonical + hreflang -----
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
      alternateLink.href = `${origin}${buildLocalePath(supportedLocale, restPath, location.search)}`;
      alternateLink.setAttribute('data-i18n-seo', 'true');
      head.appendChild(alternateLink);
    });

    // ----- Title + meta tags -----
    const enT = i18n.getFixedT('en');

    const title = t('meta.title', { defaultValue: enT('meta.title', { defaultValue: '' }) });
    const description = t('meta.description', {
      defaultValue: enT('meta.description', { defaultValue: '' })
    });

    if (title) document.title = title;

    const upsertMetaByName = (name: string, content: string) => {
      const selector = `meta[name="${name}"]`;
      let node = head.querySelector(selector) as HTMLMetaElement | null;
      if (!node) {
        node = document.createElement('meta');
        node.setAttribute('name', name);
        head.appendChild(node);
      }
      node.setAttribute('content', content);
      node.setAttribute('data-i18n-seo', 'true');
    };

    const upsertMetaByProperty = (property: string, content: string) => {
      const selector = `meta[property="${property}"]`;
      let node = head.querySelector(selector) as HTMLMetaElement | null;
      if (!node) {
        node = document.createElement('meta');
        node.setAttribute('property', property);
        head.appendChild(node);
      }
      node.setAttribute('content', content);
      node.setAttribute('data-i18n-seo', 'true');
    };

    if (description) upsertMetaByName('description', description);

    // OpenGraph
    if (title) upsertMetaByProperty('og:title', title);
    if (description) upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:type', 'website');
    upsertMetaByProperty('og:url', canonicalHref);
    upsertMetaByProperty('og:site_name', siteName);
    upsertMetaByProperty('og:locale', ogLocale);
    upsertMetaByProperty('og:image', ogImageUrl);

    // Twitter
    upsertMetaByName('twitter:card', 'summary_large_image');
    if (title) upsertMetaByName('twitter:title', title);
    if (description) upsertMetaByName('twitter:description', description);
    upsertMetaByName('twitter:image', ogImageUrl);
  }, [i18n, locale, location.pathname, location.search, t]);

  return null;
};

export default SeoLinks;
