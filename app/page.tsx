import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { AIAgentChat } from "@/components/ai/AIAgentChat";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ActivitySection } from "@/components/sections/ActivitySection";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text selection:bg-accent selection:text-accent-contrast">
      {/* Sticky Index Navigation & Theme Controls */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Home / Hero */}
        <HeroSection />

        {/* 2. About */}
        <AboutSection />

        {/* 3. Experience */}
        <ExperienceSection />

        {/* 4. Projects */}
        <ProjectsSection />

        {/* 5. GitHub Activity */}
        <ActivitySection />

        {/* 6. Education */}
        <EducationSection />

        {/* 7. Technical Skills */}
        <SkillsSection />

        {/* 8. Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll-to-top Floating Control */}
      <BackToTop />

      {/* Floating Draggable AI Agent Chat */}
      <AIAgentChat />
    </div>
  );
}
