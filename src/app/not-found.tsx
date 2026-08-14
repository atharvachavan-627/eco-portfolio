'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl text-center space-y-6 border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <Leaf className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Error 404
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3">Page Not Found</h1>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            The page or eco-portfolio resource you are trying to access does not exist or may have been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
