'use client';

import React, { useState } from 'react';
import { StudentProfile } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Save, Plus, Trash2, Edit2, Link as LinkIcon } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updatedProfile: StudentProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [newInterest, setNewInterest] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const handleTextChange = (field: keyof StudentProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddInterest = () => {
    if (!newInterest.trim()) return;
    setFormData((prev) => ({
      ...prev,
      academicInterests: [...prev.academicInterests, newInterest.trim()],
    }));
    setNewInterest('');
  };

  const handleRemoveInterest = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      academicInterests: prev.academicInterests.filter((_, i) => i !== index),
    }));
  };

  const handleAddHobby = () => {
    if (!newHobby.trim()) return;
    setFormData((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, newHobby.trim()],
    }));
    setNewHobby('');
  };

  const handleRemoveHobby = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Student Profile Details" maxWidth="4xl">
      <form onSubmit={handleSubmit} className="space-y-6 text-slate-800">
        {/* Core Personal Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            Personal & Academic Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleTextChange('name', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => handleTextChange('rollNumber', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Branch / Discipline</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => handleTextChange('branch', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">College Name</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleTextChange('college', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Year</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => handleTextChange('academicYear', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Course Mentor</label>
              <input
                type="text"
                value={formData.mentor}
                onChange={(e) => handleTextChange('mentor', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleTextChange('email', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleTextChange('location', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
              <input
                type="text"
                value={formData.linkedIn}
                onChange={(e) => handleTextChange('linkedIn', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile URL</label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => handleTextChange('github', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Career Vision */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            My Vision & Career Goal
          </h4>
          <textarea
            rows={3}
            value={formData.careerGoal}
            onChange={(e) => handleTextChange('careerGoal', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
            placeholder="Explain your interest in technology, engineering, and sustainability..."
          />
        </div>

        {/* Academic Interests Editor */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            Academic Interests
          </h4>

          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="e.g. Circular Software Architecture"
              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-sm"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.academicInterests.map((interest, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Hobbies Editor */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider border-b border-slate-200 pb-2">
            Hobbies & Extra-Curriculars
          </h4>

          <div className="flex gap-2">
            <input
              type="text"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              placeholder="e.g. Hardware Restoration"
              className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-sm"
            />
            <button
              type="button"
              onClick={handleAddHobby}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.hobbies.map((hobby, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-medium"
              >
                {hobby}
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(idx)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
