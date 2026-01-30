import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export type BigSectionItem = {
  title: string;
  description: string;
};

export type BigSectionProps = {
  id: string;
  label?: string;
  headline: string;
  headlineEmphasis?: string;
  body: string;
  linkText?: string;
  onLinkClick?: () => void;
  items: BigSectionItem[];
  graphicSide: 'left' | 'right';
  graphicAlt: string;
  trustPoints?: string[];
  className?: string;
};

const BigSection: React.FC<BigSectionProps> = ({
  id,
  label,
  headline,
  headlineEmphasis,
  body,
  linkText,
  onLinkClick,
  items,
  graphicSide,
  graphicAlt,
  trustPoints,
  className = '',
}) => {
  const copyBlock = (
    <motion.div
      initial={{ opacity: 0, x: graphicSide === 'left' ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {label && (
        <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-surface border border-border text-xs uppercase tracking-[0.2em] text-accent mb-6">
          {label}
        </span>
      )}
      <h2 className="font-serif text-4xl md:text-6xl text-text-primary mb-6">
        {headline}
        {headlineEmphasis != null && headlineEmphasis !== '' && (
          <span className="text-accent italic"> {headlineEmphasis}</span>
        )}
      </h2>
      <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-xl">
        {body}
      </p>
      {trustPoints != null && trustPoints.length > 0 && (
        <ul className="list-none space-y-2 mb-8">
          {trustPoints.map((point, i) => (
            <li key={i} className="text-text-secondary text-base flex items-start gap-2">
              <span className="text-accent mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
              {point}
            </li>
          ))}
        </ul>
      )}
      {linkText != null && linkText !== '' && (
        <a
          href="#waitlist"
          className="inline-flex items-center text-accent hover:text-text-primary transition-colors duration-300 font-medium group"
          onClick={(e) => {
            e.preventDefault();
            onLinkClick?.();
          }}
        >
          {linkText} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </motion.div>
  );

  const placeholderGraphic = (
    <motion.aside
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="min-h-[280px] rounded-2xl border border-border bg-surface/50 flex items-center justify-center"
      aria-label={graphicAlt}
    >
      <span className="text-text-tertiary text-sm">{graphicAlt}</span>
    </motion.aside>
  );

  const leftCell = graphicSide === 'left' ? placeholderGraphic : copyBlock;
  const rightCell = graphicSide === 'left' ? copyBlock : placeholderGraphic;

  return (
    <section
      id={id}
      className={`py-24 md:py-32 px-6 md:px-12 bg-page relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent opacity-10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent opacity-20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
          <div>{leftCell}</div>
          <div>{rightCell}</div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -10 }}
              className="bg-surface border border-border p-8 rounded-2xl group hover:border-accent transition-colors duration-300"
            >
              <h3 className="font-serif text-2xl text-text-primary mb-4">{item.title}</h3>
              <p className="font-sans text-text-secondary leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BigSection;
