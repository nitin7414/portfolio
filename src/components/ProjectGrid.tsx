"use client";

import { motion, type Variants } from "framer-motion";
import ProjectCard from "./ProjectCard";

// 1. STRICTLY SYNCHRONIZED PRISMA TYPE
type Project = {
  id: string;
  title: string;
  description: string;
  Images: string[]; // Strict array of strings with Capital I
  githubUrl: string | null;
  deployUrl: string | null;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="w-full p-8 text-center border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
        <p className="text-slate-400">No projects added yet. Head to your dashboard to add some!</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      // Updated to max 2 columns so 16:9 cards look massive and cinematic
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants} className="flex">
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}