"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  Images: string[]; // Capital I
  githubUrl: string | null;
  deployUrl: string | null;
};

export default function ProjectCard({ project }: { project: Project }) {
  const imageArray = project.Images?.length > 0 ? project.Images : ["/api/placeholder/1920/1080"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (imageArray.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageArray.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [imageArray.length]);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="group relative w-full aspect-video rounded-[24px] overflow-hidden bg-slate-950 border border-white/5 hover:border-cyan-500/30 shadow-xl transition-shadow duration-500 hover:shadow-[0_15px_40px_-10px_rgba(34,211,238,0.25)] cursor-pointer"
    >
      {/* --- BACKGROUND AMBIENT GLOW --- */}
      {/* This fills any empty space with a beautiful blurred version of your image so there are no ugly black bars */}
      <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
        {imageArray.map((img, index) => (
          <img
            key={`blur-${index}`}
            src={img}
            alt="ambient blur bg"
            className={`absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-40" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* --- FOREGROUND IMAGE (100% VISIBLE, NO CROPPING) --- */}
      <div className="absolute inset-0 w-full h-full p-2">
        {imageArray.map((img, index) => (
          <img
            key={`front-${index}`}
            src={img}
            alt={`${project.title} screenshot ${index + 1}`}
            // THE MASTER FIX: object-contain guarantees 0% cropping. 
            // Removed the hover scale so it never pushes out of frame.
            className={`absolute inset-0 w-full h-full object-contain object-top transition-all duration-1000 ease-out saturate-[0.6] brightness-[0.5] group-hover:saturate-100 group-hover:brightness-[1] ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* --- CINEMATIC GRADIENT OVERLAY --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

      {/* --- SLIDER INDICATORS (DOTS) --- */}
      {imageArray.length > 1 && (
        <div className="absolute top-6 left-6 flex gap-2 z-20">
          {imageArray.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? "w-5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* --- TOP RIGHT ACTION BUTTONS --- */}
      <div className="absolute top-5 right-5 flex gap-3 z-20 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
        {project.deployUrl ? (
          <a
            href={project.deployUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-110"
            title="Live App"
          >
            <ExternalLink size={18} strokeWidth={2.5} />
          </a>
        ) : (
          <div className="p-2.5 bg-slate-800/80 text-slate-500 rounded-full cursor-not-allowed backdrop-blur-md" title="Live Link Coming Soon">
            <ExternalLink size={18} strokeWidth={2.5} />
          </div>
        )}

        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 rounded-full transition-all backdrop-blur-md shadow-xl hover:scale-110"
            title="GitHub Repo"
          >
            <Code size={18} />
          </a>
        ) : (
          <div className="p-2.5 bg-slate-900/50 text-slate-600 border border-white/10 rounded-full cursor-not-allowed backdrop-blur-md" title="Source Code Private">
            <Code size={18} />
          </div>
        )}
      </div>

      {/* --- BOTTOM CONTENT AREA --- */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end h-full pointer-events-none">
        
        <span className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
          Featured Work
        </span>

        <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">
          {project.title}
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed line-clamp-2 mb-5 drop-shadow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pointer-events-auto">
          {['Next.js', 'React', 'Tailwind'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/10 text-slate-300 text-[12px] font-medium rounded-full border border-white/10 backdrop-blur-md shadow-sm hover:text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>
        
      </div>
    </motion.div>
  );
}