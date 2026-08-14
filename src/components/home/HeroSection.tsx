'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight, BookOpen, ShieldCheck, UserCheck, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden gradient-bg-hero">
      {/* Background Animated Leaf Elements */}
      <div className="absolute top-1/4 left-10 w-12 h-12 text-emerald-200/60 animate-float pointer-events-none">
        <Leaf className="w-full h-full transform -rotate-45" />
      </div>
      <div
        className="absolute bottom-12 right-12 w-16 h-16 text-teal-200/50 animate-float pointer-events-none"
        style={{ animationDelay: '2s' }}
      >
        <Leaf className="w-full h-full transform rotate-12" />
      </div>
      <div className="absolute top-20 right-1/3 w-72 h-72 bg-emerald-200/30 rounded-full filter blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-100/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin-slow" />
            <span>Academic E-Portfolio • Information Technology Engineering</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              E-WASTE & <span className="gradient-text-emerald">ENVIRONMENTAL</span> MANAGEMENT
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Building Awareness. Understanding Technology. Creating a Sustainable Future.
            </p>
          </motion.div>

          {/* Student Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 rounded-2xl shadow-xl shadow-slate-200/50 max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border border-emerald-100"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Student
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">Atharva Chavan</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-600" /> Roll No.
              </span>
              <p className="text-sm sm:text-base font-bold text-emerald-800">24101C0006</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Mentor
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">Prof. Nilima Main</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Course
              </span>
              <p className="text-xs sm:text-xs font-bold text-slate-900 leading-snug">E-Waste & Env Mgmt</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="#about-course"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore My Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/assignments"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 font-semibold text-base shadow-xs hover:bg-emerald-50/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>View Assignments</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
