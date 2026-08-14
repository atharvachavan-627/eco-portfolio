'use client';

import React, { useState, useEffect } from 'react';
import { CORE_EWASTE_STATS } from '@/lib/initialData';
import { getStoredAssignments, getStoredProfile } from '@/lib/storage';
import { Assignment } from '@/types';
import {
  BarChart2,
  TrendingUp,
  Globe,
  Award,
  ExternalLink,
  BookOpen,
  FileCheck,
  Paperclip,
  CheckCircle,
  Database,
  Info,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { RechartsSection } from '@/components/dashboard/RechartsSection';

export default function DashboardPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [profile, setProfile] = useState(getStoredProfile());

  useEffect(() => {
    setAssignments(getStoredAssignments());
    setProfile(getStoredProfile());
  }, []);

  // Compute live portfolio metrics
  const completedAssignmentsCount = assignments.filter((a) => a.status === 'Completed').length;
  const totalEvidenceCount = assignments.reduce((acc, a) => acc + (a.evidence?.length || 0), 0);
  const totalProjectsCount = profile.projects?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Dashboard Header */}
        <div className="pb-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Environmental Data Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            E-Waste Management <span className="text-emerald-700">Dashboard</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
            Understanding the scale, impact, and management of electronic waste through verified international statistics and interactive data visualizations.
          </p>
        </div>

        {/* Core Statistics Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <span>Global E-Waste Key Metrics</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Empirical Real-World Data</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_EWASTE_STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {stat.year}
                  </span>
                  {stat.change && (
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {stat.change}
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</h3>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className="text-xs font-bold text-emerald-700">{stat.unit}</span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                  {stat.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[170px]">Source: {stat.source}</span>
                  {stat.sourceUrl && (
                    <a
                      href={stat.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline font-semibold flex items-center gap-0.5"
                    >
                      <span>Cite</span> <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6 Recharts Visualizations */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Interactive Data Visualizations</span>
            </h2>
          </div>

          <RechartsSection />
        </section>

        {/* Academic Data Sources Section */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Database className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Academic & Official Data Sources</h3>
                <p className="text-xs text-slate-500">Credible reporting organizations and peer-reviewed monitors</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">UN Body</span>
                <span className="text-xs text-slate-400">2024 Report</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">Global E-waste Monitor 2024</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Published by UNITAR (UN Institute for Training and Research), ITU, and UNU. Comprehensive statistics on e-waste flows, recycling infrastructure, and metal loss.
              </p>
              <a
                href="https://ewastemonitor.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:underline font-bold inline-flex items-center gap-1 pt-1"
              >
                <span>Visit ewastemonitor.info</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">UNEP</span>
                <span className="text-xs text-slate-400">2024 Data</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">UN Environment Programme</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Global reporting on toxic chemical safety, electronic waste trade regulations under the Basel Convention, and circular economy frameworks.
              </p>
              <a
                href="https://www.unep.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:underline font-bold inline-flex items-center gap-1 pt-1"
              >
                <span>Visit unep.org</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">WHO</span>
                <span className="text-xs text-slate-400">2024 Fact Sheet</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">World Health Organization</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Health risks associated with informal e-waste recycling, toxic heavy metal exposure, and child health protection initiatives.
              </p>
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 hover:underline font-bold inline-flex items-center gap-1 pt-1"
              >
                <span>WHO E-Waste Fact Sheet</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Personal Portfolio Statistics (Dynamic counts from database) */}
        <section className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Atharva Chavan • Portfolio Analytics
              </span>
              <h3 className="text-2xl font-black text-white mt-1">My Personal Course Metrics</h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Dynamic Live Database Sync
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
              <span className="text-xs text-emerald-300 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Total Activities
              </span>
              <p className="text-3xl font-black text-white">{assignments.length}</p>
              <span className="text-[11px] text-emerald-400 font-medium">Documented in Portfolio</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
              <span className="text-xs text-emerald-300 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Completed
              </span>
              <p className="text-3xl font-black text-emerald-300">{completedAssignmentsCount}</p>
              <span className="text-[11px] text-emerald-400 font-medium">Verified by Mentor</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
              <span className="text-xs text-emerald-300 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <Paperclip className="w-3.5 h-3.5" /> Evidence Attached
              </span>
              <p className="text-3xl font-black text-white">{totalEvidenceCount}</p>
              <span className="text-[11px] text-emerald-400 font-medium">Files, Lightboxes & PDFs</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
              <span className="text-xs text-emerald-300 font-semibold flex items-center justify-center sm:justify-start gap-1">
                <FileCheck className="w-3.5 h-3.5" /> Projects & Cases
              </span>
              <p className="text-3xl font-black text-white">{totalProjectsCount}</p>
              <span className="text-[11px] text-emerald-400 font-medium">Web Apps & Lab Studies</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
