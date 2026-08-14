'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { uploadFileHelper } from '@/lib/storage';
import { Save, Upload, Image as ImageIcon } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  onSave: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onSave,
}) => {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      demoUrl: '',
      imageUrl: '',
      sustainabilityFocus: '',
    }
  );
  const [techInput, setTechInput] = useState(project?.technologies.join(', ') || '');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    try {
      const res = await uploadFileHelper(file, 'evidence');
      setFormData((prev) => ({ ...prev, imageUrl: res.url }));
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({ ...formData, technologies: techs });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Edit Project' : 'Add New Project'}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. E-Waste Recycling Drop-Off Finder"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Overview of features, architecture, and purpose..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Technologies Used (comma separated)
          </label>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="React, TypeScript, Tailwind CSS, Next.js"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Sustainability Focus / Connection
          </label>
          <input
            type="text"
            value={formData.sustainabilityFocus || ''}
            onChange={(e) => setFormData({ ...formData, sustainabilityFocus: e.target.value })}
            placeholder="e.g. Facilitates responsible hardware disposal..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Link</label>
            <input
              type="url"
              value={formData.githubUrl || ''}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Live Demo Link</label>
            <input
              type="url"
              value={formData.demoUrl || ''}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              placeholder="https://demo.vercel.app"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        {/* Project Image */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Project Banner Image</label>
          <div className="flex items-center gap-3">
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Project preview"
                className="w-16 h-12 object-cover rounded-lg border border-slate-200"
              />
            )}
            <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Project
          </button>
        </div>
      </form>
    </Modal>
  );
};
