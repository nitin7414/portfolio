import ProjectGrid from "@/src/components/ProjectGrid";
import FadeIn from "@/src/components/FadeIn";
import Image from "next/image";
import prisma from "@/src/lib/prisma";
import { Mail, Copy, ArrowUpRight, MapPin, Briefcase } from "lucide-react";

// --- NATIVE SVG ICONS ---
const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const WhatsappIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ─── Skill data ───────────────────────────────────────────────────────────────
const skillCategories = [
  {
    label: "AI & Machine Learning",
    color: "from-violet-500/20 to-purple-500/10 border-violet-500/20",
    accent: "text-violet-400",
    dot: "bg-violet-400",
    skills: ["Vector RAG", "Deep Learning", "NLP", "Computer Vision", "LangChain", "Hugging Face", "LLM Fine-Tuning", "TensorFlow", "PyTorch", "Keras", "Scikit-Learn"],
  },
  {
    label: "Data Science & Analytics",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/20",
    accent: "text-cyan-400",
    dot: "bg-cyan-400",
    skills: ["Pandas", "NumPy", "Probability & Statistics", "R Analysis", "EDA (Matplotlib, Seaborn)", "PowerBI", "Tableau", "MS Excel"],
  },
  {
    label: "Programming & Core",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/20",
    accent: "text-emerald-400",
    dot: "bg-emerald-400",
    skills: ["Python (OOP, DSA)", "Algorithm Design", "TypeScript", "SQL"],
  },
  {
    label: "Cloud, API & Databases",
    color: "from-orange-500/20 to-amber-500/10 border-orange-500/20",
    accent: "text-orange-400",
    dot: "bg-orange-400",
    skills: ["AWS SageMaker", "Azure AI", "FastAPI", "PostgreSQL", "NoSQL (MongoDB)", "Docker", "Git"],
  },
  {
    label: "Web & Full-Stack",
    color: "from-pink-500/20 to-rose-500/10 border-pink-500/20",
    accent: "text-pink-400",
    dot: "bg-pink-400",
    skills: ["Next.js", "React.js", "Node.js", "Tailwind CSS", "Framer Motion"],
  },
];

// ─── Stat pills shown beside name ────────────────────────────────────────────
const stats = [
  { value: "5+", label: "Projects Shipped" },
  { value: "2+", label: "Years Building" },
  { value: "10+", label: "Technologies" },
];

export default async function HomePage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-32 pb-12 overflow-hidden">

      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="pt-12 lg:pt-24 relative">

        {/* Ambient glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="pointer-events-none absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: copy ── */}
          <div className="space-y-8 order-2 lg:order-1">

            {/* Availability badge */}
            <FadeIn delay={0.05} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to Opportunities
              </div>
            </FadeIn>

            <FadeIn delay={0.1} direction="up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-red-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  Nitin Mishra
                </span>
                <br />
                I build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  digital experiences.
                </span>
              </h1>
            </FadeIn>

            {/* Meta row */}
            <FadeIn delay={0.15} direction="up">
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-cyan-500" />
                  India
                </span>
                <span className="w-px h-4 bg-white/10" />
                <span className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-cyan-500" />
                  Full-Stack Dev &amp; AI Engineer
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                Full-stack developer &amp; ML practitioner specialising in{" "}
                <span className="text-slate-300 font-medium">Next.js</span>,{" "}
                <span className="text-slate-300 font-medium">React</span>, and{" "}
                <span className="text-slate-300 font-medium">LLM-powered applications</span>.
                I bridge production-grade web engineering with intelligent data systems — from RAG pipelines to polished UIs.
              </p>
            </FadeIn>

            {/* Stat pills */}
            <FadeIn delay={0.25} direction="up">
              <div className="flex flex-wrap gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                  >
                    <span className="text-2xl font-extrabold text-white">{s.value}</span>
                    <span className="text-xs text-slate-400 mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="mailto:mlnitin7414@gmail.com"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-0.5"
                >
                  Get in touch
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#projects"
                  className="px-8 py-3.5 bg-white/5 backdrop-blur-md text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-0.5"
                >
                  View Work
                </a>
              </div>
            </FadeIn>
          </div>

          {/* ── Right: avatar ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <FadeIn delay={0.4} direction="left">
              <div className="relative w-[280px] h-[350px] sm:w-[350px] sm:h-[450px] lg:w-[450px] lg:h-[550px] animate-[float_6s_ease-in-out_infinite]">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full mix-blend-screen -z-10" />
                <Image
                  src="/hero.png"
                  alt="Nitin Mishra 3D Avatar"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                  priority
                />
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════════════════ */}
      <section id="projects" className="space-y-10 scroll-mt-32">
        <FadeIn direction="left">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-2">Portfolio</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Featured Projects</h2>
              <p className="text-slate-400 mt-2 text-base">A selection of my recent industry-level work.</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} direction="up" fullWidth>
          <ProjectGrid projects={projects} />
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════════════════
          EDUCATION & SKILLS
      ═══════════════════════════════════════════════════ */}
      <section className="pt-16 border-t border-white/10 space-y-16">

        {/* Section header */}
        <FadeIn direction="up">
          <div>
            <p className="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-2">Background</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Education &amp; Expertise</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── Education ── */}
          <FadeIn direction="up" className="lg:col-span-4">
            <div className="space-y-5 h-full">

              {/* Card: Masters */}
              <div className="group relative rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold border border-purple-500/20">
                      Current
                    </span>
                    <span className="text-slate-500 text-xs font-mono">2025 – Present</span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">
                    M.Sc. Data Science &amp; Analytics
                  </h4>
                  <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                    Sharda University
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["Statistics", "ML Research", "Data Systems"].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-xs border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card: Bachelors */}
              <div className="group relative rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/15 text-slate-400 text-xs font-semibold border border-slate-500/20">
                      Completed
                    </span>
                    <span className="text-slate-500 text-xs font-mono">2019 – 2022</span>
                  </div>
                  <h4 className="text-base font-bold text-white leading-snug">
                    B.Sc. Mathematics
                  </h4>
                  <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
                    Maharaja Ganga Singh University, Bikaner
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {["Calculus", "Linear Algebra", "Probability"].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-xs border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>

          {/* ── Skills ── */}
          <FadeIn direction="up" delay={0.15} className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories.map((cat) => (
                <div
                  key={cat.label}
                  className={`group relative rounded-2xl p-5 bg-gradient-to-br ${cat.color} border backdrop-blur-sm hover:scale-[1.015] transition-transform duration-300 overflow-hidden`}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${cat.dot} shadow-[0_0_8px_currentColor]`} />
                    <h4 className={`text-xs font-bold tracking-widest uppercase ${cat.accent}`}>
                      {cat.label}
                    </h4>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-white/5 backdrop-blur-md text-slate-300 text-xs font-medium rounded-lg border border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          GET IN TOUCH / FOOTER
      ═══════════════════════════════════════════════════ */}
      <section className="pt-32 pb-8 relative">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />

        <FadeIn direction="up">
          <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">

            <p className="text-cyan-400 text-xs font-bold tracking-[0.25em] uppercase mb-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              05. What's Next?
            </p>

            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]">
              Get In Touch
            </h2>

            {/* Role tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {["Full-Stack Developer", "AI Engineer", "ML / Data Science", "Open to Internships"].map((role) => (
                <span
                  key={role}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 backdrop-blur-md"
                >
                  {role}
                </span>
              ))}
            </div>

            <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-xl">
              I'm actively seeking full-time roles and internships in Full-Stack, AI Engineering, or Data Science.
              Whether you have a project in mind or just want to connect — my inbox is always open.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="mailto:mlnitin7414@gmail.com"
                className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <Mail size={18} strokeWidth={2.5} />
                Say Hello
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="mailto:mlnitin7414@gmail.com"
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/5 border border-white/10 text-slate-300 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all backdrop-blur-md"
              >
                <Copy size={16} />
                <span className="font-mono text-sm tracking-wide">mlnitin7414@gmail.com</span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Socials & copyright */}
        <FadeIn direction="up" delay={0.2}>
          <div className="mt-28 pt-8 border-t border-white/10 flex flex-col items-center gap-6">
            <div className="flex gap-3">
              {[
                { href: "https://github.com/nitin7414", label: "GitHub", icon: <GithubIcon size={18} />, hover: "hover:text-white" },
                { href: "https://www.linkedin.com/in/nitin-mishra-a16158276/", label: "LinkedIn", icon: <LinkedinIcon size={18} />, hover: "hover:text-[#0A66C2]" },
                { href: "https://wa.me/917414820357", label: "WhatsApp", icon: <WhatsappIcon size={18} />, hover: "hover:text-[#25D366]" },
                { href: "mailto:mlnitin7414@gmail.com", label: "Email", icon: <Mail size={18} />, hover: "hover:text-cyan-400" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-400 ${s.hover} transition-all backdrop-blur-md hover:-translate-y-1`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p className="text-slate-500 text-sm font-medium">
              © {new Date().getFullYear()} Nitin Mishra — Built with Next.js &amp; Tailwind CSS
            </p>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}