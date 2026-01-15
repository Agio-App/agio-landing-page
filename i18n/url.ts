export const canonicalLocales = [
  'en',
  'de',
  'fr',
  'es',
  'ja',
  'zh-CN',
  'pt-BR'
] as const;

export type CanonicalLocale = (typeof canonicalLocales)[number];

export const defaultLocale: CanonicalLocale = 'en';

const localeLookup = new Map<string, CanonicalLocale>(
  canonicalLocales.map((locale) => [locale.toLowerCase(), locale])
);

export const normalizeLocale = (value?: string | null): CanonicalLocale | null => {
  if (!value) {
    return null;
  }

  return localeLookup.get(value.toLowerCase()) ?? null;
};

export const getLocaleFromPath = (pathname: string): CanonicalLocale | null => {
  const parts = pathname.split('/');
  const candidate = parts.length > 1 ? parts[1] : null;
  return normalizeLocale(candidate);
};

export const getPathWithoutLocale = (pathname: string): string => {
  const parts = pathname.split('/');
  if (parts.length <= 1) {
    return pathname || '/';
  }

  if (!normalizeLocale(parts[1])) {
    return pathname || '/';
  }

  const remainder = parts.slice(2).join('/');
  return remainder ? `/${remainder}` : '/';
};

export const stripLeadingSegment = (pathname: string): string => {
  const parts = pathname.split('/').filter(Boolean);
  const remainder = parts.slice(1).join('/');
  return remainder ? `/${remainder}` : '/';
};

export const buildLocalePath = (
  locale: CanonicalLocale,
  pathname: string,
  search = '',
  hash = ''
): string => {
  const safePath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const normalizedPath = safePath === '/' ? '' : safePath;
  return `/${locale}${normalizedPath}${search}${hash}`;
};

export const replaceLocaleInPath = (
  pathname: string,
  locale: CanonicalLocale
): string => buildLocalePath(locale, getPathWithoutLocale(pathname));

export const getBestMatchLocale = (): CanonicalLocale => {
  if (typeof window !== 'undefined') {
    const stored = normalizeLocale(window.localStorage.getItem('agio_language'));
    if (stored) {
      return stored;
    }
  }

  if (typeof navigator !== 'undefined') {
    for (const language of navigator.languages ?? []) {
      const normalized = normalizeLocale(language);
      if (normalized) {
        return normalized;
      }

      const baseLanguage = language.split('-')[0];
      const normalizedBase = normalizeLocale(baseLanguage);
      if (normalizedBase) {
        return normalizedBase;
      }
    }
  }

  return defaultLocale;
};
