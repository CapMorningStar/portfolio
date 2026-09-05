'use client';

import React, { useState, Suspense } from 'react';
import { StarfieldCanvas } from '@/components/StarfieldCanvas';
import { IntroOverlay } from '@/components/IntroOverlay';
import { CursorFollower } from '@/components/CursorFollower';
import { Navbar } from '@/components/Navbar';
import { SocialSidebar } from '@/components/SocialSidebar';
import { HeroBento } from '@/components/HeroBento';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { EducationSection } from '@/components/EducationSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HireModal } from '@/components/HireModal';

export default function Home() {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  return (
    <>
      {/* Interactive Cursor Follower & Trail */}
      <CursorFollower />

      {/* Intro Screen Animation (Plays on page load/refresh; skipped when returning from resume) */}
      <Suspense fallback={null}>
        <IntroOverlay />
      </Suspense>

      {/* Persistent Ambient Starfield Background with Mouse Reaction */}
      <StarfieldCanvas />

      {/* Floating Top Nav & Social Sidebar */}
      <Navbar onOpenHireModal={() => setIsHireModalOpen(true)} />
      <SocialSidebar />

      {/* Quick Connect & Resume Modal */}
      <HireModal
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
      />

      {/* Main Page Container (Always Crisp, Bright & Interactive) */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20">
        <HeroBento />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
