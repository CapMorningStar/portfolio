'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { HireModal } from '@/components/HireModal';

export default function Home() {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  return (
    <>
      {/* Interactive Cursor Follower & Trail */}
      <CursorFollower />

      {/* Intro Screen Animation (Plays only once per session) */}
      <IntroOverlay />

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

      {/* Main Page Container with Smooth Cinematic Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <main id="home" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-20">
          <HeroBento />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ServicesSection />
          <ContactSection />
        </main>

        <Footer />
      </motion.div>
    </>
  );
}
