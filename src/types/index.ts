export type EvidenceType = 'image' | 'pdf' | 'video' | 'url' | 'document' | 'notebook' | 'presentation' | 'excel';

export interface EvidenceFile {
  id: string;
  type: EvidenceType;
  name: string;
  url: string;
  size?: string;
  createdAt: string;
  mimeType?: string;
}

export interface AssignmentReference {
  id: string;
  title: string;
  url?: string;
  authorOrOrg?: string;
  date?: string;
}

export interface Assignment {
  id: string;
  activityNumber: number;
  title: string;
  objective: string;
  evidence: EvidenceFile[];
  learned: string;
  sustainabilityConnection: string;
  surprised: string;
  challenge: string;
  improvement: string;
  references: AssignmentReference[];
  status: 'Completed' | 'In Progress' | 'Draft';
  createdAt: string;
  updatedAt: string;
}

export interface SkillCategory {
  category: 'Programming' | 'Web Development' | 'Database' | 'Tools' | 'Environmental Tech' | string;
  skills: { name: string; level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  sustainabilityFocus?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Hackathon' | 'Certification' | 'Academic' | 'Workshop' | 'Volunteering' | 'Event';
  organization: string;
  date: string;
  description: string;
  credentialUrl?: string;
}

export interface StudentProfile {
  name: string;
  rollNumber: string;
  course: string;
  branch: string;
  college: string;
  academicYear: string;
  division: string;
  mentor: string;
  email: string;
  location: string;
  linkedIn: string;
  github: string;
  resumeUrl: string;
  photoUrl: string;
  careerGoal: string;
  academicInterests: string[];
  hobbies: string[];
  skills: SkillCategory[];
  projects: Project[];
  achievements: Achievement[];
}

export interface EWasteStat {
  id: string;
  title: string;
  value: string;
  unit: string;
  change?: string;
  description: string;
  source: string;
  sourceUrl?: string;
  year: string;
}

export interface RegionalData {
  region: string;
  generatedMt: number; // Million tonnes
  recycledPercent: number; // %
  perCapitaKg: number; // kg per inhabitant
}

export interface CompositionData {
  category: string;
  percentage: number;
  weightMt: number;
  color: string;
}

export interface HistoricalGrowthData {
  year: number;
  generatedMt: number;
  recycledMt: number;
  projected?: boolean;
}
