
import React from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  title: string;
  subtitle?: string;
  logoUrl?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ title, subtitle, logoUrl }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center p-4 flex flex-col items-center"
      >
        {logoUrl && (
            <motion.img 
                src={logoUrl} 
                alt="App Logo" 
                className="w-32 h-32 mb-6 object-contain drop-shadow-2xl rounded-xl"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "backOut" }}
            />
        )}
        <h1 className="text-4xl md:text-6xl font-bold font-title tracking-wider mb-2">
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="sparkle-letter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        {subtitle && (
          <motion.p 
            className="text-gray-400 mt-2 text-lg font-light tracking-wide uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      
      <motion.div
        className="absolute bottom-24 w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-blue-500 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.1 }}
        />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
    </div>
  );
};

export default SplashScreen;
