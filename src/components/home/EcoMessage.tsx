'use client';

import React from 'react';
import { MinusCircle, RefreshCcw, Recycle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const EcoMessage: React.FC = () => {
  const cards = [
    {
      title: 'Reduce',
      subtitle: 'Minimize Consumption & Extend Lifespans',
      icon: MinusCircle,
      description:
        'Avoid impulse hardware upgrades. Optimize existing software, purchase durable modular electronics with long-term OS support, and reduce redundant device acquisitions.',
      actions: ['Purchase modular tech', 'Maintain battery health', 'Avoid unnecessary upgrades'],
      color: 'from-emerald-500 to-green-600',
    },
    {
      title: 'Reuse',
      subtitle: 'Repair, Upgrade & Donate Hardware',
      icon: RefreshCcw,
      description:
        'Extend operational lifespan by upgrading RAM/SSDs, replacing worn smartphone screens, donating working computers to educational institutions, or reselling pre-owned electronics.',
      actions: ['Exercise Right to Repair', 'Donate old laptops', 'Refurbish components'],
      color: 'from-teal-500 to-emerald-600',
    },
    {
      title: 'Recycle',
      subtitle: 'Dispose Through Certified Channels',
      icon: Recycle,
      description:
        'Dispose of non-repairable e-waste at authorized urban mining facilities to safely isolate hazardous mercury/lead and recover 95%+ of precious gold, copper, and rare earths.',
      actions: ['Use authorized collection points', 'Isolate lithium batteries', 'Zero landfill disposal'],
      color: 'from-cyan-600 to-teal-700',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-600/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sustainable Technology Imperative</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Technology Should Not End at <span className="text-emerald-400">Disposal.</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Responsible technology management means considering the entire lifecycle of hardware—from raw material extraction to circular end-of-life recovery.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/80 rounded-2xl p-8 backdrop-blur-md hover:shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-lg shadow-emerald-900/40 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-700 group-hover:text-emerald-400/30 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400 mt-1">{card.subtitle}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">{card.description}</p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Action Steps:</span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {card.actions.map((act) => (
                        <li key={act} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700/60 mt-6">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Explore Data Impact</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
