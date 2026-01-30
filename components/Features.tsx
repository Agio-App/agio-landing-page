import React from 'react';
import { useTranslation } from 'react-i18next';
import BigSection, { BigSectionItem } from './BigSection';

const focusWaitlistEmail = () => {
  const waitlist = document.getElementById('waitlist');
  if (waitlist) {
    waitlist.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (window.location.hash !== '#waitlist') {
    window.history.pushState(null, '', '#waitlist');
  }

  window.requestAnimationFrame(() => {
    const input = document.getElementById('waitlist-email') as HTMLInputElement | null;
    if (input) {
      input.focus({ preventScroll: true });
    }
  });
};

const Features: React.FC = () => {
  const { t } = useTranslation();
  const items = t('valueProp.items', { returnObjects: true }) as BigSectionItem[];

  return (
    <BigSection
      id="valueProp"
      headline={t('valueProp.headline')}
      headlineEmphasis={t('valueProp.headlineEmphasis')}
      body={t('valueProp.body')}
      linkText={t('valueProp.link')}
      onLinkClick={focusWaitlistEmail}
      items={items}
      graphicSide="right"
      graphicAlt={t('valueProp.graphicAlt')}
    />
  );
};

export default Features;
