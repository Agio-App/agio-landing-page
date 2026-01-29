import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Layers, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    whileHover={{ y: -10 }}
    className="bg-surface border border-border p-8 rounded-2xl group hover:border-accent transition-colors duration-300"
  >
    <div className="mb-6 p-3 bg-input-bg rounded-full w-fit text-accent group-hover:bg-accent group-hover:text-text-inverse transition-colors duration-300">
      {icon}
    </div>
    <h3 className="font-serif text-2xl text-text-primary mb-4">{title}</h3>
    <p className="font-sans text-text-secondary leading-relaxed text-sm md:text-base">
      {description}
    </p>
  </motion.div>
);

const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-12 bg-page relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent opacity-10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent opacity-20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl text-text-primary mb-6">
              {t('features.headline')} <span className="text-accent italic">{t('features.headlineEmphasis')}</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-xl">
              {t('features.body')}
            </p>
            <a
              href="#waitlist"
              className="inline-flex items-center text-accent hover:text-text-primary transition-colors duration-300 font-medium group"
              onClick={(event) => {
                event.preventDefault();
                focusWaitlistEmail();
              }}
            >
              {t('features.link')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          {/* <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
             {/* Abstract representation of the UI or the provided sample image
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src="card_post_premium.png" alt="Agio Interface Preview" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent pointer-events-none"></div>
             </div>
          </motion.div> */}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title={t('features.cards.intelligent.title')}
            description={t('features.cards.intelligent.description')}
            delay={0.1}
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title={t('features.cards.discovery.title')}
            description={t('features.cards.discovery.description')}
            delay={0.3}
          />
          <FeatureCard
            icon={<Layers className="w-8 h-8" />}
            title={t('features.cards.crafted.title')}
            description={t('features.cards.crafted.description')}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;