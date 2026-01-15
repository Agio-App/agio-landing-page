import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../images/icon_light.svg?react';

const Footer: React.FC = () => {
  const thankYouAction = import.meta.env.DEV ? '/thank-you/index.html' : '/thank-you/';

  return (
    <footer
      id="waitlist"
      className="bg-charcoal pt-20 pb-10 border-t border-white/5 relative overflow-hidden"
    >
        {/* Subtle decorative circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none opacity-30"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Icon
            className="w-12 h-12 mx-auto mb-8 opacity-80 text-white"
            role="img"
            aria-label="Agio Icon"
          />
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            A better way to remember <br /> is coming.
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            Join others who value simplicity, privacy, and beauty in their digital lives.
          </p>

          <form
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-4 mb-4"
            name="waitlist"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action={thankYouAction}
          >
            <input type="hidden" name="form-name" value="waitlist" />
            <input type="text" name="bot-field" className="hidden" aria-hidden="true" tabIndex={-1} />
            <input 
              id="waitlist-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-mint/50 focus:ring-1 focus:ring-mint/50 transition-all"
            />
            <button type="submit" className="px-8 py-4 bg-mint text-charcoal font-medium rounded-full hover:bg-mint-hover transition-colors duration-300">
              Join the Waitlist
            </button>
          </form>
          <p className="text-xs text-gray-600">
            No spam. Only early access and meaningful updates.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 mt-16">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Agio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-mint text-sm transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-mint text-sm transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-mint text-sm transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;