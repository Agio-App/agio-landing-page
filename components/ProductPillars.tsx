import React from 'react';
import { useTranslation } from 'react-i18next';
import BigSection, { BigSectionItem } from './BigSection';

const ProductPillars: React.FC = () => {
  const { t } = useTranslation();
  const pillars = t('productPillars.pillars', { returnObjects: true }) as BigSectionItem[];

  return (
    <BigSection
      id="productPillars"
      headline={t('productPillars.headline')}
      body={t('productPillars.body')}
      items={pillars}
      graphicSide="left"
      graphicAlt={t('productPillars.graphicAlt')}
    />
  );
};

export default ProductPillars;
