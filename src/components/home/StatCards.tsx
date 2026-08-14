'use client';

import React, { useState } from 'react';
import { CORE_EWASTE_STATS } from '@/lib/initialData';
import { TrendingUp, Recycle, ShieldCheck, ExternalLink, Info, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';

export const StatCards: React.FC = () => {
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-World Empirical Data</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why E-Waste <span className="text-emerald-700">Matters</span>
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              Verified global statistics demonstrating the scale, recycling gap, and projection of electronic waste.
            </p>
          </div>

          <button
            onClick={() => setSourcesModalOpen(true)}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-800 font-semibold text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-emerald-600" />
            <span>View Data Sources</span>
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_EWASTE_STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-100/80">
                    {stat.year}
                  </span>
                  <Award className="w-4 h-4 text-slate-400" />
                </div>

                <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{stat.title}</h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                  <span className="text-xs font-bold text-emerald-700 leading-tight">{stat.unit}</span>
                </div>

                {stat.change && (
                  <p className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200/50 inline-block">
                    {stat.change}
                  </p>
                )}

                <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                  {stat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate max-w-[170px]" title={stat.source}>
                  Source: {stat.source}
                </span>
                {stat.sourceUrl && (
                  <a
                    href={stat.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline flex items-center gap-0.5 font-medium"
                  >
                    <span>Cite</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Sources Modal */}
      <Modal
        isOpen={sourcesModalOpen}
        onClose={() => setSourcesModalOpen(false)}
        title="Academic & Official Data Sources"
      >
        <div className="space-y-4 text-sm text-slate-700">
          <p className="text-xs text-slate-500">
            All core statistics presented across EcoPortfolio are compiled from international environmental agencies, United Nations research bodies, and peer-reviewed monitors:
          </p>

          <ul className="space-y-3 divide-y divide-slate-100">
            <li className="pt-3 first:pt-0">
              <h4 className="font-bold text-slate-900">1. Global E-waste Monitor 2024</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Published jointly by UNITAR (UN Institute for Training and Research), ITU (International Telecommunication Union), and UNU.
              </p>
              <a
                href="https://ewastemonitor.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
              >
                <span>Visit ewastemonitor.info</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>

            <li className="pt-3">
              <h4 className="font-bold text-slate-900">2. UN Environment Programme (UNEP)</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Global reporting on toxic chemical safety, electronic waste trade regulations (Basel Convention), and circular economy frameworks.
              </p>
              <a
                href="https://www.unep.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
              >
                <span>Visit unep.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>

            <li className="pt-3">
              <h4 className="font-bold text-slate-900">3. World Health Organization (WHO)</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Health risks associated with informal e-waste recycling, toxic exposure, and child health protection initiatives.
              </p>
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
              >
                <span>WHO E-Waste Fact Sheet</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </Modal>
    </section>
  );
};
