import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AgioHeroBg from '../images/agio_hero_bg.png';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';

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

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-page text-text-primary">
      {/* {theme === 'dark' && (
        <div className="absolute inset-0 z-0">
          <img 
            src={AgioHeroBg} 
            alt={t('hero.backgroundAlt')}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-90"></div>
        </div>
      )} */}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 pt-2 md:pt-0"
        >
             <span className="inline-block py-1 px-3 rounded-full bg-surface border border-border text-xs font-medium tracking-wider text-text-secondary uppercase mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
                {t('hero.badge')}
            </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl text-text-primary leading-[1.1] mb-6 tracking-tight"
        >
          {t('hero.titleLine1')} <br />
          <span className="italic text-accent">{t('hero.titleLine2')}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-sans text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10"
        >
          {t('hero.body')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center"
        >
          <button
            className="group relative flex items-center gap-3 px-8 py-4 bg-cta-bg text-cta-text rounded-full font-medium text-lg transition-all duration-300 hover:bg-cta-hover hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
            onClick={focusWaitlistEmail}
            type="button"
          >
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          
          <p className="mt-4 text-sm text-muted font-light">
            {t('hero.subtext')}
          </p>
        </motion.div>
      </div>

      {/* Decorative Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted">{t('hero.scroll')}</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-muted to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;