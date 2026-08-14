'use client';

import React, { useState, useEffect } from 'react';
import { Assignment, EvidenceFile, AssignmentReference } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { uploadFileHelper } from '@/lib/storage';
import {
  Save,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  FileText,
  Video,
  Image as ImageIcon,
  CheckCircle,
  HelpCircle,
  FileCode,
  FileSpreadsheet,
} from 'lucide-react';

interface AssignmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment?: Assignment | null;
  onSave: (assignment: Assignment) => void;
  nextActivityNumber: number;
}

export const AssignmentFormModal: React.FC<AssignmentFormModalProps> = ({
  isOpen,
  onClose,
  assignment,
  onSave,
  nextActivityNumber,
}) => {
  const [formData, setFormData] = useState<Partial<Assignment>>({
    activityNumber: nextActivityNumber,
    title: '',
    objective: '',
    evidence: [],
    learned: '',
    sustainabilityConnection: '',
    surprised: '',
    challenge: '',
    improvement: '',
    references: [],
    status: 'Completed',
  });

  const [externalUrlInput, setExternalUrlInput] = useState('');
  const [externalUrlTitle, setExternalUrlTitle] = useState('');
  const [refTitle, setRefTitle] = useState('');
  const [refUrl, setRefUrl] = useState('');
  const [refOrg, setRefOrg] = useState('');
  const [refDate, setRefDate] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    } else {
      setFormData({
        activityNumber: nextActivityNumber,
        title: '',
        objective: '',
        evidence: [],
        learned: '',
        sustainabilityConnection: '',
        surprised: '',
        challenge: '',
        improvement: '',
        references: [],
        status: 'Completed',
      });
    }
  }, [assignment, nextActivityNumber, isOpen]);

  // Live Word Counter for "What I Learned"
  const wordCount = formData.learned
    ? formData.learned.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const files = Array.from(e.target.files);
    try {
      const uploadedEvidences: EvidenceFile[] = [];
      for (const file of files) {
        const res = await uploadFileHelper(file, 'evidence');
        uploadedEvidences.push({
          id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          type: res.type,
          name: res.name,
          url: res.url,
          size: res.size,
          createdAt: new Date().toISOString().split('T')[0],
        });
      }
      setFormData((prev) => ({
        ...prev,
        evidence: [...(prev.evidence || []), ...uploadedEvidences],
      }));
    } catch (err) {
      console.error('File upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddExternalLink = () => {
    if (!externalUrlInput.trim()) return;
    const newEv: EvidenceFile = {
      id: `ev-${Date.now()}`,
      type: 'url',
      name: externalUrlTitle.trim() || externalUrlInput.trim(),
      url: externalUrlInput.trim(),
      size: 'External Link',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setFormData((prev) => ({
      ...prev,
      evidence: [...(prev.evidence || []), newEv],
    }));
    setExternalUrlInput('');
    setExternalUrlTitle('');
  };

  const handleRemoveEvidence = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      evidence: prev.evidence?.filter((ev) => ev.id !== id),
    }));
  };

  const handleAddReference = () => {
    if (!refTitle.trim()) return;
    const newRef: AssignmentReference = {
      id: `ref-${Date.now()}`,
      title: refTitle.trim(),
      url: refUrl.trim() || undefined,
      authorOrOrg: refOrg.trim() || undefined,
      date: refDate.trim() || undefined,
    };
    setFormData((prev) => ({
      ...prev,
      references: [...(prev.references || []), newRef],
    }));
    setRefTitle('');
    setRefUrl('');
    setRefOrg('');
    setRefDate('');
  };

  const handleRemoveReference = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      references: prev.references?.filter((r) => r.id !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.objective) return;

    const finalAssignment: Assignment = {
      id: formData.id || `assignment-${Date.now()}`,
      activityNumber: formData.activityNumber || nextActivityNumber,
      title: formData.title,
      objective: formData.objective,
      evidence: formData.evidence || [],
      learned: formData.learned || '',
      sustainabilityConnection: formData.sustainabilityConnection || '',
      surprised: formData.surprised || '',
      challenge: formData.challenge || '',
      improvement: formData.improvement || '',
      references: formData.references || [],
      status: formData.status || 'Completed',
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(finalAssignment);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={assignment ? `Edit Activity ${assignment.activityNumber}` : `+ Add New Assignment (Activity ${nextActivityNumber})`}
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-slate-800">
        {/* Basic Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Activity #</label>
            <input
              type="number"
              value={formData.activityNumber}
              onChange={(e) => setFormData({ ...formData, activityNumber: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-800 text-sm"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Activity Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Device Anatomy – Mobile Phone Disassembly"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
              required
            />
          </div>
        </div>

        {/* Objective */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Objective <span className="text-slate-400 font-normal">(Why was this activity performed?)</span>
          </label>
          <textarea
            rows={3}
            value={formData.objective}
            onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
            placeholder="Describe the primary goals, hardware analyzed, tools used, and hypotheses..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
            required
          />
        </div>

        {/* Evidence Upload Section */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Evidence Upload (Images, PDFs, Videos, Notebooks, Links)</span>
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              {formData.evidence?.length || 0} Files Attached
            </span>
          </div>

          {/* File Upload Box */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className="cursor-pointer w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{uploading ? 'Processing Files...' : 'Choose Files to Upload'}</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.xlsx,.ipynb"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* External URL input */}
            <div className="flex-1 flex gap-2 w-full">
              <input
                type="url"
                value={externalUrlInput}
                onChange={(e) => setExternalUrlInput(e.target.value)}
                placeholder="Or paste external URL (e.g. GitHub link, YouTube video)"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
              />
              <button
                type="button"
                onClick={handleAddExternalLink}
                className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Link
              </button>
            </div>
          </div>

          {/* Attached Evidence Pills */}
          {formData.evidence && formData.evidence.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {formData.evidence.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    {ev.type === 'image' && <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {ev.type === 'pdf' && <FileText className="w-4 h-4 text-red-500 shrink-0" />}
                    {ev.type === 'video' && <Video className="w-4 h-4 text-blue-500 shrink-0" />}
                    {ev.type === 'url' && <LinkIcon className="w-4 h-4 text-teal-600 shrink-0" />}
                    {ev.type === 'notebook' && <FileCode className="w-4 h-4 text-amber-500 shrink-0" />}
                    <span className="font-semibold text-slate-800 truncate" title={ev.name}>
                      {ev.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{ev.size}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEvidence(ev.id)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* What I Learned (with live word counter) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">What I Learned</label>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                wordCount >= 130 && wordCount <= 170
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {wordCount} / ~150 words target
            </span>
          </div>
          <textarea
            rows={4}
            value={formData.learned}
            onChange={(e) => setFormData({ ...formData, learned: e.target.value })}
            placeholder="Synthesize the key findings, components identified, hazardous fractions detected, or technical principles mastered..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        {/* Sustainability Connection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Sustainability Connection
          </label>
          <textarea
            rows={3}
            value={formData.sustainabilityConnection}
            onChange={(e) => setFormData({ ...formData, sustainabilityConnection: e.target.value })}
            placeholder="Explain how this activity relates to reducing e-waste, responsible consumption, recycling, circular economy, or environmental protection..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        {/* 3 Reflection Prompts */}
        <div className="space-y-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
          <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>3-Part Activity Reflection</span>
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">1. What surprised me?</label>
            <textarea
              rows={2}
              value={formData.surprised}
              onChange={(e) => setFormData({ ...formData, surprised: e.target.value })}
              placeholder="Unexpected assembly techniques, adhesive use, component density..."
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">2. What challenge did I face?</label>
            <textarea
              rows={2}
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              placeholder="Stripped screws, fragile ribbon cables, toxic safety precautions..."
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">3. What will I do differently?</label>
            <textarea
              rows={2}
              value={formData.improvement}
              onChange={(e) => setFormData({ ...formData, improvement: e.target.value })}
              placeholder="Future tools, precise mass measurement, specialized heating tools..."
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        {/* References Section */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">References & Citations</h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <input
              type="text"
              value={refTitle}
              onChange={(e) => setRefTitle(e.target.value)}
              placeholder="Reference Title"
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs sm:col-span-2"
            />
            <input
              type="url"
              value={refUrl}
              onChange={(e) => setRefUrl(e.target.value)}
              placeholder="URL (Optional)"
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
            />
            <button
              type="button"
              onClick={handleAddReference}
              className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Ref
            </button>
          </div>

          {formData.references && formData.references.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {formData.references.map((ref) => (
                <div key={ref.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">{ref.title}</span>
                    {ref.url && <span className="text-emerald-600 ml-2">({ref.url})</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveReference(ref.id)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/30 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Assignment</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
