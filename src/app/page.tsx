import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CourseInfo } from '@/components/home/CourseInfo';
import { StatCards } from '@/components/home/StatCards';
import { ImageGallery } from '@/components/home/ImageGallery';
import { EcoMessage } from '@/components/home/EcoMessage';

export const metadata = {
  title: 'Atharva Chavan | E-Waste & Environmental Management Portfolio',
  description:
    'Official E-Portfolio of Atharva Chavan showcasing learning activities, assignments, sustainability projects, e-waste research, and environmental management work.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSection />
      <CourseInfo />
      <StatCards />
      <ImageGallery />
      <EcoMessage />
    </main>
  );
}
