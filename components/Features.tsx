import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Layers, ArrowRight } from 'lucide-react';

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
    className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-2xl group hover:border-mint/30 transition-colors duration-300"
  >
    <div className="mb-6 p-3 bg-white/5 rounded-full w-fit text-mint group-hover:bg-mint group-hover:text-charcoal transition-colors duration-300">
      {icon}
    </div>
    <h3 className="font-serif text-2xl text-white mb-4">{title}</h3>
    <p className="font-sans text-gray-400 leading-relaxed text-sm md:text-base">
      {description}
    </p>
  </motion.div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-32 px-6 md:px-12 bg-charcoal relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
              Designed to remember — <span className="text-mint italic">beautifully.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              Agio isn’t another storage app. It’s an intuitive memory companion built to organise, visualise, and protect the stories that shape you. Using smart categorisation and elegant design, Agio transforms your digital memories into a seamless, meaningful archive.
            </p>
            <a
              href="#waitlist"
              className="inline-flex items-center text-mint hover:text-white transition-colors duration-300 font-medium group"
              onClick={(event) => {
                event.preventDefault();
                focusWaitlistEmail();
              }}
            >
              Reserve your spot early <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
             {/* Abstract representation of the UI or the provided sample image */}
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src="card_post_premium.png" alt="Agio Interface Preview" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent pointer-events-none"></div>
             </div>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="Intelligent Memory Engine"
            description="Your memories, organised automatically. Agio uses advanced recognition technology to tag, group, and surface what matters most — effortlessly."
            delay={0.1}
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="AI-Powered Discovery"
            description="Rediscover forgotten moments. Agio's AI surfaces connections, recreates context, and helps you relive memories you'd forgotten you had."
            delay={0.3}
          />
          <FeatureCard
            icon={<Layers className="w-8 h-8" />}
            title="Crafted for Every Moment"
            description="From candid shots to curated collections, Agio adapts to how you remember. Beautiful visualisations and intuitive tools make managing memories effortless."
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;