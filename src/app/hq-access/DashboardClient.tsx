"use client";

import { useState } from "react";
import { addProject, deleteProject, updateProject } from "@/src/actions/projectActions";
import ImageUpload from "@/src/components/ImageUpload";
import { Trash2, Plus, Edit2, X, ExternalLink, Code } from "lucide-react";

// 1. UPDATED TYPE: Removed imageUrl, added images array
type Project = {
  id: string;
  title: string;
  description: string;
  Images: string[]; 
  githubUrl: string | null;
  deployUrl: string | null;
};

export default function DashboardClient({ projects }: { projects: Project[] }) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleSubmit = async (formData: FormData) => {
    if (editingProject) {
      await updateProject(editingProject.id, formData);
      setEditingProject(null); 
    } else {
      await addProject(formData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4">
      {/* HEADER */}
      <div className="bg-slate-950/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Command Center
        </h1>
        <p className="text-slate-400 mt-2 font-medium">Manage your portfolio projects and live deployments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: THE FORM */}
        <div className="lg:col-span-4 h-fit sticky top-24">
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {editingProject ? <Edit2 size={20} className="text-amber-400"/> : <Plus size={20} className="text-cyan-400"/>} 
                {editingProject ? "Edit Project" : "New Project"}
              </h2>
              {editingProject && (
                <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              )}
            </div>

            <form action={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1.5">Project Title</label>
                <input type="text" name="title" defaultValue={editingProject?.title || ""} required 
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder:text-slate-600" 
                  placeholder="e.g. AI SaaS Platform" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1.5">Description</label>
                <textarea name="description" defaultValue={editingProject?.description || ""} required rows={4} 
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder:text-slate-600 resize-none" 
                  placeholder="Tech stack and core features..." />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-1.5">Project Images</label>
                <div className="bg-slate-900/50 rounded-xl border border-white/10 p-2">
                  {/* 2. Pass existing images to the uploader so they show up when editing */}
                  <ImageUpload initialImages={editingProject?.Images || []} />
                </div>
                {editingProject && (
                  <p className="text-xs text-amber-400 mt-2 font-medium">Add new images or remove old ones above.</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1.5">Live URL</label>
                  <input type="text" name="deployUrl" defaultValue={editingProject?.deployUrl || ""} 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white text-sm placeholder:text-slate-600" 
                    placeholder="https://" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-300 mb-1.5">GitHub URL</label>
                  <input type="text" name="githubUrl" defaultValue={editingProject?.githubUrl || ""} 
                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-white text-sm placeholder:text-slate-600" 
                    placeholder="https://github..." />
                </div>
              </div>

              <button type="submit" 
                className={`w-full py-3.5 text-slate-950 font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all ${
                  editingProject 
                    ? 'bg-amber-400 hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]' 
                    : 'bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                }`}>
                {editingProject ? "Update Project" : "Publish Project"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: PROJECT LIST */}
        <div className="lg:col-span-8 space-y-4">
          {projects.map((project) => {
            // 4. Safely grab the first image from the array to use as the thumbnail
            const thumbnail = project.Images && project.Images.length > 0 
              ? project.Images[0] 
              : "/api/placeholder/600/400";

            return (
              <div key={project.id} className="group flex flex-col sm:flex-row items-center gap-6 bg-white/5 backdrop-blur-md p-5 rounded-3xl border border-white/10 shadow-lg hover:bg-white/10 transition-all">
                
                {/* Image Preview */}
                <div className="w-full sm:w-48 h-32 shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-white/20">
                  <img src={thumbnail} alt={project.title} className="w-full h-full object-cover object-top" />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-extrabold text-white truncate">{project.title}</h3>
                  <p className="text-slate-400 mt-1 line-clamp-2 leading-relaxed">{project.description}</p>
                  
                  <div className="flex gap-4 mt-4">
                    {project.deployUrl && <a href={project.deployUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"><ExternalLink size={16}/> Live</a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors"><Code size={16}/> Code</a>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <button onClick={() => {
                    setEditingProject(project);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} className="flex-1 p-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/20 rounded-xl transition-colors flex items-center justify-center" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  
                  <form action={deleteProject.bind(null, project.id)} className="flex-1 flex">
                    <button type="submit" className="flex-1 p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-xl transition-colors flex items-center justify-center" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </div>

              </div>
            );
          })}

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="p-12 text-center bg-white/5 backdrop-blur-md rounded-3xl border-2 border-dashed border-white/20">
              <h3 className="text-xl font-bold text-white">No projects yet</h3>
              <p className="text-slate-400 mt-2">Use the console on the left to deploy your first project.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}