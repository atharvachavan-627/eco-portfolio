'use client';

import React from 'react';
import { RefreshCw, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-50/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Recycling Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/50 flex items-center justify-center"
        >
          <RefreshCw className="w-12 h-12 text-emerald-600/40" />
        </motion.div>

        {/* Center Leaf Icon */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30"
        >
          <Leaf className="w-5 h-5" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">EcoPortfolio</h3>
        <p className="text-xs font-medium text-emerald-700 mt-1">Loading Environmental Management Data...</p>
      </motion.div>
    </div>
  );
};
