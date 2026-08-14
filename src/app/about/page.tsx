'use client';

import React, { useState, useEffect } from 'react';
import { StudentProfile, Project } from '@/types';
import { useAdmin } from '@/context/AdminContext';
import {
  getStoredProfile,
  saveStoredProfile,
  uploadFileHelper,
} from '@/lib/storage';
import {
  User,
  BookOpen,
  Mail,
  Camera,
  Upload,
  Trash2,
  Edit3,
  Plus,
  ExternalLink,
  Target,
  GraduationCap,
  Heart,
  Lock,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { motion } from 'framer-motion';
import { EditProfileModal } from '@/components/about/EditProfileModal';
import { ProjectModal } from '@/components/about/ProjectModal';

export default function AboutPage() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const { isAdmin, openLoginModal } = useAdmin();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    setProfile(getStoredProfile());
  }, []);

  const handleSaveProfile = (updated: StudentProfile) => {
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingPhoto(true);
    try {
      const result = await uploadFileHelper(file, 'avatars');
      const updated = { ...profile, photoUrl: result.url };
      setProfile(updated);
      saveStoredProfile(updated);
    } catch (err) {
      console.error('Error uploading profile photo:', err);
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    const updated = { ...profile, photoUrl: '' };
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const handleSaveProject = (proj: Project) => {
    const existingIndex = profile.projects.findIndex((p) => p.id === proj.id);
    let updatedProjects: Project[];
    if (existingIndex >= 0) {
      updatedProjects = [...profile.projects];
      updatedProjects[existingIndex] = proj;
    } else {
      updatedProjects = [proj, ...profile.projects];
    }
    const updated = { ...profile, projects: updatedProjects };
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const handleDeleteProject = (id: string) => {
    if (!isAdmin) {
      openLoginModal();
      return;
    }
    if (!confirm('Are you sure you want to remove this project?')) return;
    const updatedProjects = profile.projects.filter((p) => p.id !== id);
    const updated = { ...profile, projects: updatedProjects };
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const triggerEditProfile = () => {
    if (!isAdmin) {
      openLoginModal();
    } else {
      setIsEditProfileOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Profile & Qualifications</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About <span className="text-emerald-700">Me</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Atharva Chavan • Roll No: {profile.rollNumber} • {profile.branch}
            </p>
          </div>

          <button
            onClick={triggerEditProfile}
            className={`self-start md:self-auto px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all flex items-center gap-2 ${
              isAdmin
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                : 'bg-white border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-900'
            }`}
          >
            {isAdmin ? <Edit3 className="w-4 h-4" /> : <Lock className="w-4 h-4 text-emerald-600" />}
            <span>{isAdmin ? 'Edit Profile Info' : 'Admin Login to Edit'}</span>
          </button>
        </div>

        {/* Profile Card & Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-3xl p-8 border border-slate-200 shadow-xl relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar Display & Uploader */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative group">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-emerald-500/30 overflow-hidden bg-slate-100 shadow-lg flex items-center justify-center">
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <User className="w-16 h-16 text-emerald-600/40" />
                      <span className="text-xs font-semibold mt-1 text-slate-500">No Photo</span>
                    </div>
                  )}
                </div>

                {/* Upload Button Overlay */}
                {isAdmin && (
                  <label className="absolute bottom-2 right-2 p-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg cursor-pointer transition-transform hover:scale-110">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {isAdmin && (
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingPhoto ? 'Uploading...' : 'Upload Profile Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {profile.photoUrl && (
                    <button
                      onClick={handleRemovePhoto}
                      className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Profile Core Metadata */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                  {profile.branch}
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">{profile.name}</h2>
                <p className="text-sm font-semibold text-slate-600 flex items-center justify-center lg:justify-start gap-2 mt-1">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>{profile.college}</span>
                </p>
              </div>

              {/* Grid of Key Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Roll Number</span>
                  <p className="text-sm font-bold text-slate-900">{profile.rollNumber}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Course</span>
                  <p className="text-sm font-bold text-emerald-800">{profile.course}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Course Mentor</span>
                  <p className="text-sm font-bold text-slate-900">{profile.mentor}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Academic Year</span>
                  <p className="text-sm font-bold text-slate-900">{profile.academicYear}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Email</span>
                  <p className="text-sm font-bold text-slate-900 truncate" title={profile.email}>
                    {profile.email}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Location</span>
                  <p className="text-sm font-bold text-slate-900">{profile.location}</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                {profile.linkedIn && (
                  <a
                    href={profile.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 text-xs font-semibold transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-emerald-600" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 text-xs font-semibold transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-emerald-600" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* My Vision Section */}
        <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-900">My Vision</h3>
            </div>
            {isAdmin && (
              <button
                onClick={triggerEditProfile}
                className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Vision
              </button>
            )}
          </div>
          <p className="text-slate-700 text-base leading-relaxed">{profile.careerGoal}</p>
        </section>

        {/* Academic Interests & Hobbies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Interests */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Academic Interests</h3>
              </div>
              {isAdmin && (
                <button
                  onClick={triggerEditProfile}
                  className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.academicInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Hobbies */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">Hobbies & Activities</h3>
              </div>
              {isAdmin && (
                <button
                  onClick={triggerEditProfile}
                  className="text-xs font-semibold text-teal-700 hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.hobbies.map((hobby, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Academic & Environmental Projects</h3>
              <p className="text-xs text-slate-500">Software solutions and sustainability utilities</p>
            </div>
            {isAdmin ? (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Admin Login to Add
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {proj.imageUrl && (
                  <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                    <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6 space-y-4 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-lg font-bold text-slate-900">{proj.title}</h4>
                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg hover:bg-slate-100"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>

                  {proj.sustainabilityFocus && (
                    <p className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-900 p-2.5 rounded-xl font-medium">
                      🌱 <strong>Eco Focus:</strong> {proj.sustainabilityFocus}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((tech) => (
                      <span key={tech} className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-slate-700" /> Repository
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Live Demo</span> <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      {isAdmin && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
        />
      )}

      {/* Project Modal */}
      {isAdmin && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          project={editingProject}
          onSave={handleSaveProject}
        />
      )}
    </div>
  );
}
