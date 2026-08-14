'use client';

import React, { useState, useEffect } from 'react';
import { Assignment, EvidenceFile } from '@/types';
import { useAdmin } from '@/context/AdminContext';
import {
  getStoredAssignments,
  saveAssignmentToStore,
  deleteAssignmentFromStore,
} from '@/lib/storage';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  CheckCircle,
  FolderOpen,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AssignmentCard } from '@/components/assignments/AssignmentCard';
import { AssignmentFormModal } from '@/components/assignments/AssignmentFormModal';
import { EvidenceViewerModal } from '@/components/assignments/EvidenceViewerModal';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'activity'>('newest');

  const { isAdmin, openLoginModal } = useAdmin();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [viewingEvidence, setViewingEvidence] = useState<EvidenceFile | null>(null);

  useEffect(() => {
    setAssignments(getStoredAssignments());
  }, []);

  const handleSaveAssignment = (assignment: Assignment) => {
    const updated = saveAssignmentToStore(assignment);
    setAssignments(updated);
  };

  const handleDeleteAssignment = (id: string) => {
    if (!confirm('Are you sure you want to delete this assignment activity?')) return;
    const updated = deleteAssignmentFromStore(id);
    setAssignments(updated);
  };

  const handleAddClick = () => {
    if (!isAdmin) {
      openLoginModal();
    } else {
      setEditingAssignment(null);
      setIsFormOpen(true);
    }
  };

  // Search & Filter & Sort Logic
  const filteredAssignments = assignments
    .filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.objective.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.learned.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'activity') {
        return a.activityNumber - b.activityNumber;
      }
      return 0;
    });

  const nextActivityNum =
    assignments.length > 0
      ? Math.max(...assignments.map((a) => a.activityNumber || 0)) + 1
      : 1;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dynamic Course Submissions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My <span className="text-emerald-700">Assignments</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Activities, laboratory reports, teardowns, and learning reflections from E-Waste & Environmental Management.
            </p>
          </div>

          {/* + Add Assignment Button (Owner Admin Only or Login Prompt) */}
          <button
            onClick={handleAddClick}
            className={`self-start md:self-auto px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02] ${
              isAdmin
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/30'
                : 'bg-white border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-900'
            }`}
          >
            {isAdmin ? <Plus className="w-5 h-5" /> : <Lock className="w-4 h-4 text-emerald-600" />}
            <span>{isAdmin ? 'Add Assignment' : 'Admin Login to Add'}</span>
          </button>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, objective, or keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {['All', 'Completed', 'In Progress', 'Draft'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === st
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="activity">Activity Number</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignments Cards List */}
        {filteredAssignments.length > 0 ? (
          <div className="space-y-6">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onEdit={(a) => {
                  setEditingAssignment(a);
                  setIsFormOpen(true);
                }}
                onDelete={handleDeleteAssignment}
                onViewEvidence={(ev) => setViewingEvidence(ev)}
                isSample={assignment.id === 'assignment-sample-01'}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel rounded-3xl p-12 text-center border border-slate-200 space-y-4 max-w-lg mx-auto my-12"
          >
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">No assignments added yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Your activities and learning reports will appear here once you add them.
              </p>
            </div>
            {isAdmin ? (
              <button
                onClick={() => {
                  setEditingAssignment(null);
                  setIsFormOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Assignment</span>
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold inline-flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Admin Login to Add</span>
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Assignment Add / Edit Modal */}
      {isAdmin && (
        <AssignmentFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          assignment={editingAssignment}
          onSave={handleSaveAssignment}
          nextActivityNumber={nextActivityNum}
        />
      )}

      {/* Evidence Fullscreen Lightbox / Viewer */}
      <EvidenceViewerModal
        isOpen={Boolean(viewingEvidence)}
        onClose={() => setViewingEvidence(null)}
        evidence={viewingEvidence}
      />
    </div>
  );
}
