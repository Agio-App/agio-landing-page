import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Vision from './components/Vision';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
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

export default App;