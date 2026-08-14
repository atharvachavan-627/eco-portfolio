'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Menu, X, BookOpen, User, BarChart2, Home, Sparkles, Lock, Unlock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { AdminLoginModal } from '@/components/ui/AdminLoginModal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, logoutAdmin, openLoginModal } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Me', href: '/about', icon: User },
    { name: 'Assignments', href: '/assignments', icon: BookOpen },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-sm py-3' : 'bg-white/80 backdrop-blur-md py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Subtitle */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 text-white animate-pulse-glow" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    EcoPortfolio
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                    Course Project
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <span>Atharva Chavan</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-400">Roll: 24101C0006</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive ? 'text-emerald-800 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-white rounded-full shadow-sm border border-emerald-100"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Admin / Visitor Access Toggle */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 rounded-xl text-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-600">Mentor:</span>
                <span className="font-semibold text-emerald-900">Prof. Nilima Main</span>
              </div>

              {/* Admin Mode Toggle Button */}
              {isAdmin ? (
                <button
                  onClick={logoutAdmin}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 hover:bg-emerald-700 transition-colors"
                  title="Click to exit Admin Mode & view as Public Visitor"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Admin Mode Active</span>
                </button>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-200 transition-colors"
                  title="Owner Admin Login to enable CRUD edits"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Visitor View</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              {isAdmin ? (
                <button
                  onClick={logoutAdmin}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1"
                >
                  <Unlock className="w-3.5 h-3.5" /> Admin
                </button>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" /> Lock
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg"
            >
              <div className="py-2 border-b border-slate-100 mb-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-800">E-WASTE & ENVIRONMENTAL MANAGEMENT</p>
                  <p className="text-xs text-slate-500">Mentor: Prof. Nilima Main</p>
                </div>
                {isAdmin ? (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                    Admin Active
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    Visitor View
                  </span>
                )}
              </div>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Admin Login Modal */}
      <AdminLoginModal />
    </>
  );
};
