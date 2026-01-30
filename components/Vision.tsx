import React from 'react';
import { useTranslation } from 'react-i18next';
import BigSection, { BigSectionItem } from './BigSection';

const Vision: React.FC = () => {
  const { t } = useTranslation();
  const trustPoints = t('vision.trustPoints', { returnObjects: true }) as string[];
  const items: BigSectionItem[] = trustPoints.map((point) => {
    const dot = point.indexOf('. ');
    const title = dot >= 0 ? point.slice(0, dot) : point;
    const description = dot >= 0 ? point.slice(dot + 2) : '';
    return { title, description: description || point };
  });

  return (
    <BigSection
      id="vision"
      label={t('vision.label')}
      headline={t('vision.headline')}
      body={t('vision.body')}
      items={items}
      graphicSide="right"
      graphicAlt={t('vision.graphicAlt')}
    />
  );
};

export default Vision;
