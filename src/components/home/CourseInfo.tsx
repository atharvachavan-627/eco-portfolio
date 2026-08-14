'use client';

import React from 'react';
import {
  Cpu,
  AlertTriangle,
  RefreshCw,
  Recycle,
  ShieldAlert,
  Zap,
  Globe,
  Layers,
  HeartPulse,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CourseInfo: React.FC = () => {
  const topics = [
    {
      icon: Cpu,
      title: 'What is E-Waste?',
      description:
        'Electronic Waste (e-waste) encompasses discarded electrical or electronic devices near or at end of life—ranging from smartphones, laptops, and circuit boards to refrigerators and solar panels.',
      badge: 'Core Concept',
    },
    {
      icon: Zap,
      title: 'Sources & Categories',
      description:
        'Major sources include household IT equipment, medical instruments, telecom gear, small consumer appliances, industrial machinery, and personal smart devices.',
      badge: 'Categorization',
    },
    {
      icon: AlertTriangle,
      title: 'Why E-Waste is Surging',
      description:
        'Planned obsolescence, rapid consumer tech upgrade cycles, low initial repairability, and global digitization are expanding e-waste generation by 2.6 million tonnes each year.',
      badge: 'Global Challenge',
    },
    {
      icon: ShieldAlert,
      title: 'Environmental Risk',
      description:
        'Informal disposal leads to toxic heavy metals (lead, mercury, cadmium, beryllium) leaching into groundwater, contaminating soil, and emitting hazardous dioxins during open burning.',
      badge: 'Ecological Impact',
    },
    {
      icon: HeartPulse,
      title: 'Human Health Hazards',
      description:
        'Exposure to improper e-waste burning and manual dismantling causes respiratory ailments, neurodevelopmental risks in children, heavy metal toxicity, and cellular damage.',
      badge: 'Health Impact',
    },
    {
      icon: Recycle,
      title: 'Circular Economy & Reuse',
      description:
        'Shifting from a linear take-make-dispose model to a circular design framework emphasizing repairability, component harvesting, secondary material recovery, and extended lifespans.',
      badge: 'Sustainable Future',
    },
  ];

  return (
    <section id="about-course" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Course Syllabus & Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About the <span className="text-emerald-700">Course</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            E-Waste & Environmental Management explores the intersection of hardware innovation, resource recovery, hazardous waste mitigation, and sustainable electronics engineering.
          </p>
        </div>

        {/* 6 Grid Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 group-hover:border-emerald-400 group-hover:bg-emerald-600 text-emerald-700 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800">
                      {topic.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">{topic.description}</p>
                </div>

                <div className="pt-6 border-t border-slate-200/60 mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Academic Portfolio Core Topic</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
