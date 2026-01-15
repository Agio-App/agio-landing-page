import React from 'react';
import { motion } from 'framer-motion';

const Vision: React.FC = () => {
  return (
    <section id="vision" className="py-24 md:py-32 px-6 md:px-12 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 right-0 w-[420px] h-[420px] bg-mint/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-mint mb-6">
            Vision
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
            Preserve the moments that matter most.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Agio is designed to be a living archive for your most meaningful memories. From
            milestones to quiet in-between moments, our vision is to make remembering feel effortless,
            secure, and beautifully human.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
