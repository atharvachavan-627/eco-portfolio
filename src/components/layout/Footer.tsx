'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Mail, Heart, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative leaf background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-900/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">EcoPortfolio</h3>
                <p className="text-xs text-emerald-400 font-medium">Academic E-Portfolio</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Official college course portfolio for <strong>E-WASTE & ENVIRONMENTAL MANAGEMENT</strong>.
              Created by <strong>Atharva Chavan</strong> under the mentorship of <strong>Prof. Nilima Main</strong>.
            </p>

            <blockquote className="border-l-2 border-emerald-500 pl-3 py-1 text-xs italic text-emerald-300/90 bg-emerald-950/30 rounded-r-lg">
              "Building a sustainable future through responsible technology."
            </blockquote>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                  <span>About Me</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/assignments" className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                  <span>Assignments</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                  <span>Dashboard</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Details & Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Student Details</h4>
            <div className="text-xs space-y-1.5 text-slate-400">
              <p><strong className="text-slate-200">Name:</strong> Atharva Chavan</p>
              <p><strong className="text-slate-200">Roll No.:</strong> 24101C0006</p>
              <p><strong className="text-slate-200">Branch:</strong> IT Engineering</p>
              <p><strong className="text-slate-200">Mentor:</strong> Prof. Nilima Main</p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/atharvachavan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all text-slate-400"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/atharvachavan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all text-slate-400"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:atharva.chavan@example.com"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all text-slate-400"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Atharva Chavan. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Submitted for <span className="text-emerald-400 font-medium">E-Waste & Environmental Management</span> course
          </p>
        </div>
      </div>
    </footer>
  );
};
