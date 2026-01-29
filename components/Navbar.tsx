import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import Logo from '../images/logo_light.svg?react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeProvider';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollLockY = useRef(0);
  const isDark = theme === 'dark';
  const navTextClass = isDark
    ? isScrolled
      ? 'text-white'
      : 'text-black'
    : 'text-text-primary';
  const navLinkClass = isDark
    ? isScrolled
      ? 'text-white hover:text-accent'
      : 'text-black hover:text-text-primary'
    : 'text-text-secondary hover:text-accent';
  const navButtonClass = isDark
    ? isScrolled
      ? 'text-white border-white/30 hover:text-accent hover:border-accent'
      : 'text-black border-black/30 hover:text-text-primary hover:border-text-primary'
    : 'text-text-secondary border-border hover:text-accent hover:border-accent';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    scrollLockY.current = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousLeft = document.body.style.left;
    const previousRight = document.body.style.right;
    const previousWidth = document.body.style.width;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollLockY.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.left = previousLeft;
      document.body.style.right = previousRight;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollLockY.current);
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface backdrop-blur-md py-4 border-b border-border shadow-sm' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Logo
            className={`h-8 md:h-10 w-auto ${navTextClass}`}
            role="img"
            aria-label={t('nav.logoAlt')}
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className={`text-sm font-medium transition-colors duration-300 ${navLinkClass}`}
          >
            {t('nav.features')}
          </a>
          <a
            href="#vision"
            className={`text-sm font-medium transition-colors duration-300 ${navLinkClass}`}
          >
            {t('nav.vision')}
          </a>
          {/* <button className="px-5 py-2 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white hover:text-charcoal transition-all duration-300">
            Login
          </button> */}
          <button
            type="button"
            className={`p-2 rounded-full border transition-colors duration-300 ${navButtonClass}`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            className={`p-2 rounded-full border transition-colors duration-300 ${navButtonClass}`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={`p-2 rounded-full border transition-colors duration-300 ${navButtonClass}`}
            aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-page backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              id="mobile-nav"
              className="h-full flex flex-col items-center justify-center gap-8 text-center text-text-primary"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <a
                href="#features"
                className="text-2xl font-medium hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.features')}
              </a>
              <a
                href="#vision"
                className="text-2xl font-medium hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.vision')}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;