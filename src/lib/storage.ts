import { Assignment, StudentProfile, EvidenceFile } from '@/types';
import { DEFAULT_PROFILE, SAMPLE_ASSIGNMENT } from './initialData';
import { supabase, isSupabaseConfigured } from './supabase';

const ASSIGNMENTS_KEY = 'ecoportfolio_assignments_v1';
const PROFILE_KEY = 'ecoportfolio_profile_v1';

// Profile Storage
export function getStoredProfile(): StudentProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading stored profile:', err);
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving profile:', err);
  }
}

// Assignments Storage
export function getStoredAssignments(): Assignment[] {
  if (typeof window === 'undefined') return [SAMPLE_ASSIGNMENT];
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_KEY);
    if (!raw) {
      const initial = [SAMPLE_ASSIGNMENT];
      localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed: Assignment[] = JSON.parse(raw);
    return parsed.length > 0 ? parsed : [SAMPLE_ASSIGNMENT];
  } catch (err) {
    console.error('Error reading stored assignments:', err);
    return [SAMPLE_ASSIGNMENT];
  }
}

export function saveAssignmentToStore(assignment: Assignment): Assignment[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredAssignments();
    const index = existing.findIndex((a) => a.id === assignment.id);
    let updated: Assignment[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = { ...assignment, updatedAt: new Date().toISOString() };
    } else {
      updated = [assignment, ...existing];
    }
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving assignment:', err);
    return [];
  }
}

export function deleteAssignmentFromStore(id: string): Assignment[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredAssignments();
    const updated = existing.filter((a) => a.id !== id);
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting assignment:', err);
    return [];
  }
}

// File Upload helper (Local Data URL + optional Supabase Storage)
export async function uploadFileHelper(
  file: File,
  bucketName: 'evidence' | 'avatars' = 'evidence'
): Promise<{ url: string; name: string; size: string; type: EvidenceFile['type'] }> {
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const sizeFormatted = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`;

  let fileType: EvidenceFile['type'] = 'document';
  if (file.type.startsWith('image/')) fileType = 'image';
  else if (file.type.startsWith('video/')) fileType = 'video';
  else if (file.type.includes('pdf')) fileType = 'pdf';
  else if (file.name.endsWith('.ipynb')) fileType = 'notebook';
  else if (file.name.endsWith('.pptx') || file.name.endsWith('.ppt')) fileType = 'presentation';
  else if (file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) fileType = 'excel';

  // Attempt Supabase Upload if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (!error && data) {
        const { data: publicData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        if (publicData?.publicUrl) {
          return {
            url: publicData.publicUrl,
            name: file.name,
            size: sizeFormatted,
            type: fileType,
          };
        }
      }
    } catch (e) {
      console.warn('Supabase upload fallback to local DataURL:', e);
    }
  }

  // Fallback to Data URL for local client-side persistence
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        name: file.name,
        size: sizeFormatted,
        type: fileType,
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
