"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  FolderGit2,
  Mail,
  ExternalLink,
  MapPin,
  Command,
  Maximize2,
  Phone,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";

export function HeroSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { hero } = portfolioData;

  const triggerCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <section
      id="hero"
      aria-label="Introduction & Profile Summary"
      className="scroll-mt-24 pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border"
    >
      <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-8 sm:gap-12">
        {/* Left Column: Intro, Title, CTAs */}
        <div className="flex-1 max-w-2xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="font-mono text-xs text-text-muted">
              {hero.status}
            </span>
          </div>

          <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-[1.15]">
            {hero.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-base sm:text-lg text-accent">
            <span>{hero.title}</span>
            <span className="text-border">•</span>
            <span className="text-text-muted text-xs sm:text-sm flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {hero.location}
            </span>
          </div>

          <p className="mt-6 font-sans text-base sm:text-lg text-text leading-relaxed">
            {hero.intro}
          </p>

          <p className="mt-3 font-sans text-sm sm:text-base text-text-muted leading-relaxed">
            {hero.subIntro}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact">
              <Button variant="primary" size="md" className="gap-2">
                <Mail className="w-4 h-4" strokeWidth={2} />
                <span>Get in touch</span>
              </Button>
            </a>

            <a href="#projects">
              <Button variant="secondary" size="md" className="gap-2">
                <FolderGit2 className="w-4 h-4 text-text-muted" strokeWidth={1.75} />
                <span>View projects</span>
                <ArrowRight className="w-4 h-4 text-text-muted" strokeWidth={1.75} />
              </Button>
            </a>

            {/* Visible ⌘K trigger button */}
            <Button
              variant="outline"
              size="md"
              onClick={triggerCommandPalette}
              className="gap-1.5 text-xs text-text-muted"
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
              <span>⌘K Actions</span>
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
            <span className="text-text-dim uppercase tracking-wider text-[11px]">Connect:</span>
            <a
              href={hero.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-border">•</span>
            <a
              href={hero.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-border">•</span>
            <a
              href={`mailto:${hero.email}`}
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              Email <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-border">•</span>
            <a
              href={`tel:${hero.phone.replace(/[^0-9+]/g, "")}`}
              className="hover:text-accent transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> {hero.phone}
            </a>
          </div>
        </div>

        {/* Right Column: Profile Image Placeholder with Lightbox click */}
        <div className="shrink-0 self-center md:self-start">
          <div className="relative group">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Click to expand profile image in lightbox"
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-surface border-2 border-border p-2 flex flex-col items-center justify-center text-center group-hover:border-accent transition-all duration-200 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="w-full h-full rounded-lg bg-surface-subtle border border-border/80 flex flex-col items-center justify-center relative">
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-text group-hover:text-accent transition-colors">
                  {hero.avatarLabel}
                </span>
                <span className="font-mono text-[10px] text-text-muted mt-1 uppercase tracking-wider text-center px-1">
                  AI & Full-Stack
                </span>
                <div className="absolute bottom-2 right-2 p-1 rounded bg-surface border border-border text-text-muted group-hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>
            </button>
            <div className="mt-2 text-center">
              <span className="font-mono text-[11px] text-text-dim">
                (Click to expand)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox dialog */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={`${hero.name} — Profile Dossier`}
        subtitle={hero.title}
      >
        <div className="w-full flex flex-col items-center p-4">
          <div className="w-48 h-48 rounded-xl bg-surface-subtle border-2 border-accent flex flex-col items-center justify-center mb-6 shadow-inner">
            <span className="font-mono text-5xl font-bold text-accent">
              {hero.avatarLabel}
            </span>
            <span className="font-mono text-xs text-text-muted mt-2">
              {hero.location}
            </span>
          </div>

          <div className="w-full space-y-3 text-left font-mono text-xs bg-surface-subtle border border-border p-4 rounded-lg">
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-text-muted">Primary Focus:</span>
              <span className="text-text font-medium">LLM Applications & Agent Workflows</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-text-muted">Core Stack:</span>
              <span className="text-text font-medium">Next.js, TypeScript, Prisma, PostgreSQL</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-text-muted">Education:</span>
              <span className="text-text font-medium">M.Sc. Data Science & Analytics (Sharda Univ.)</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-text-muted">Direct Email:</span>
              <span className="text-accent">{hero.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Direct Phone:</span>
              <span className="text-text font-medium">{hero.phone}</span>
            </div>
          </div>
        </div>
      </Lightbox>
    </section>
  );
}
