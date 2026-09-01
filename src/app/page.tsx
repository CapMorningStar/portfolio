'use client';

import React from 'react';
import { StarfieldCanvas } from '@/components/StarfieldCanvas';
import { IntroOverlay } from '@/components/IntroOverlay';
import { CursorFollower } from '@/components/CursorFollower';
import { Navbar } from '@/components/Navbar';
import { SocialSidebar } from '@/components/SocialSidebar';
import { HeroBento } from '@/components/HeroBento';
import { ProjectsSection } from '@/components/ProjectsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { EducationSection } from '@/components/EducationSection';
import { ServicesSection } from '@/components/ServicesSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Interactive Cursor Follower & Trail */}
      <CursorFollower />

      {/* Intro Screen Animation ("Click anywhere to skip") */}
      <IntroOverlay />

      {/* Persistent Ambient Starfield Background with Mouse Reaction */}
      <StarfieldCanvas />

      {/* Floating Top Nav & Social Sidebar */}
      <Navbar />
      <SocialSidebar />

      {/* Main Container with generous top spacing */}
      <main id="home" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20">
        <HeroBento />
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
