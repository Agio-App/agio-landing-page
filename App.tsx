import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Vision from './components/Vision';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThankYou from './pages/ThankYou';
import SeoLinks from './components/SeoLinks';
import {
  buildLocalePath,
  getBestMatchLocale,
  getPathWithoutLocale,
  normalizeLocale,
  stripLeadingSegment
} from './i18n/url';

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-charcoal min-h-screen selection:bg-mint selection:text-charcoal relative">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-mint origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <Vision />
      </main>

      <Footer />
    </div>
  );
};

const RootRedirect: React.FC = () => {
  const bestMatch = getBestMatchLocale();
  return <Navigate replace to={buildLocalePath(bestMatch, '/')} />;
};

const LegacyThankYouRedirect: React.FC = () => {
  const location = useLocation();
  const bestMatch = getBestMatchLocale();
  return (
    <Navigate
      replace
      to={buildLocalePath(bestMatch, '/thank-you', location.search, location.hash)}
    />
  );
};

const CatchAllRedirect: React.FC = () => {
  const location = useLocation();
  const bestMatch = getBestMatchLocale();
  return (
    <Navigate
      replace
      to={buildLocalePath(bestMatch, location.pathname, location.search, location.hash)}
    />
  );
};

const LocaleShell: React.FC = () => {
  const { lng } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const canonicalLocale = normalizeLocale(lng);
    const currentUrl = `${location.pathname}${location.search}${location.hash}`;

    if (!canonicalLocale) {
      const bestMatch = getBestMatchLocale();
      const restPath = stripLeadingSegment(location.pathname);
      const nextPath = buildLocalePath(bestMatch, restPath, location.search, location.hash);

      if (nextPath !== currentUrl) {
        navigate(nextPath, { replace: true });
      }
      return;
    }

    const canonicalPath = buildLocalePath(
      canonicalLocale,
      getPathWithoutLocale(location.pathname),
      location.search,
      location.hash
    );

    if (canonicalPath !== currentUrl) {
      navigate(canonicalPath, { replace: true });
      return;
    }

    if ((i18n.resolvedLanguage ?? i18n.language).toLowerCase() !== canonicalLocale.toLowerCase()) {
      void i18n.changeLanguage(canonicalLocale);
    }
  }, [i18n, lng, location.hash, location.pathname, location.search, navigate]);

  return (
    <>
      <SeoLinks />
      <Outlet />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/thank-you" element={<LegacyThankYouRedirect />} />
      <Route path="/:lng" element={<LocaleShell />}>
        <Route index element={<LandingPage />} />
        <Route path="thank-you" element={<ThankYou />} />
      </Route>
      <Route path="*" element={<CatchAllRedirect />} />
    </Routes>
  );
};

export default App;
