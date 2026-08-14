'use client';

import React, { useState } from 'react';
import { Assignment, EvidenceFile } from '@/types';
import { useAdmin } from '@/context/AdminContext';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Paperclip,
  CheckCircle,
  Clock,
  Edit3,
  Trash2,
  ExternalLink,
  BookOpen,
  Leaf,
  HelpCircle,
  ImageIcon,
  Video,
  FileCode,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssignmentCardProps {
  assignment: Assignment;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
  onViewEvidence: (evidence: EvidenceFile) => void;
  isSample?: boolean;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onEdit,
  onDelete,
  onViewEvidence,
  isSample = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header Bar — Collapsed View */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white font-black text-lg flex items-center justify-center shadow-md shadow-emerald-600/20 shrink-0">
            {assignment.activityNumber < 10 ? `0${assignment.activityNumber}` : assignment.activityNumber}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Activity {assignment.activityNumber}
              </span>
              {isSample && (
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Sample Assignment
                </span>
              )}
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {new Date(assignment.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {assignment.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">
              {assignment.objective}
            </p>
          </div>
        </div>

        {/* Right side indicators */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
              <span>{assignment.evidence.length} Evidence</span>
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{assignment.status}</span>
            </span>
          </div>

          <button
            aria-label="Toggle details"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-500 flex items-center justify-center transition-colors"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accordion Expanded Dropdown Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8 space-y-8"
          >
            {/* Objective */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Objective & Activity Overview</span>
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200/80">
                {assignment.objective}
              </p>
            </div>

            {/* Evidence Gallery */}
            {assignment.evidence.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-emerald-600" />
                  <span>Collected Evidence ({assignment.evidence.length})</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {assignment.evidence.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => onViewEvidence(ev)}
                      className="group p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          {ev.type === 'image' && <ImageIcon className="w-4 h-4" />}
                          {ev.type === 'pdf' && <FileText className="w-4 h-4 text-red-500" />}
                          {ev.type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
                          {ev.type === 'url' && <ExternalLink className="w-4 h-4 text-teal-600" />}
                          {ev.type === 'notebook' && <FileCode className="w-4 h-4 text-amber-500" />}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 truncate" title={ev.name}>
                            {ev.name}
                          </p>
                          <span className="text-[10px] text-slate-400">{ev.size}</span>
                        </div>
                      </div>

                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What I Learned */}
            {assignment.learned && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>What I Learned</span>
                </h4>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {assignment.learned}
                </div>
              </div>
            )}

            {/* Sustainability Connection */}
            {assignment.sustainabilityConnection && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Sustainability Connection</span>
                </h4>
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-sm text-emerald-950 font-medium leading-relaxed">
                  {assignment.sustainabilityConnection}
                </div>
              </div>
            )}

            {/* Reflections */}
            {(assignment.surprised || assignment.challenge || assignment.improvement) && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Activity Reflection</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {assignment.surprised && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-amber-800 uppercase">What Surprised Me?</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{assignment.surprised}</p>
                    </div>
                  )}

                  {assignment.challenge && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-rose-800 uppercase">What Challenge Did I Face?</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{assignment.challenge}</p>
                    </div>
                  )}

                  {assignment.improvement && (
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase">What Will I Do Differently?</span>
                      <p className="text-xs text-slate-600 leading-relaxed">{assignment.improvement}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* References */}
            {assignment.references && assignment.references.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">References</h4>
                <ul className="space-y-1 text-xs text-slate-600">
                  {assignment.references.map((ref) => (
                    <li key={ref.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-slate-800">{ref.title}</span>
                      {ref.authorOrOrg && <span>• {ref.authorOrOrg}</span>}
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline flex items-center gap-0.5"
                        >
                          <span>Link</span> <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Bar — Admin Only Controls */}
            {isAdmin && (
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => onEdit(assignment)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Edit Assignment</span>
                </button>

                <button
                  onClick={() => onDelete(assignment.id)}
                  className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Assignment</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
