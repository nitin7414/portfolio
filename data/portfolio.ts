export interface StatItem {
  value: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  logoPlaceholder: string;
  dates: string;
  location: string;
  type: "Product development" | "Open source" | "Research" | "Internship";
  stats: [StatItem, StatItem, StatItem];
  description: string;
  skills: string[];
  links?: { label: string; url: string }[];
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  type: string;
  tagline: string;
  description: string;
  tags: string[];
  thumbnailLabel: string;
  liveUrl?: string;
  codeUrl?: string;
  detailsUrl?: string;
  featured: boolean;
  metrics?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  years: string;
  grade: string;
  coursework: string[];
  honors?: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export interface ActivityStats {
  totalRepos: string;
  starsEarned: string;
  totalCommits: string;
  followers: string;
  activeStreak: string;
}

export interface PortfolioData {
  meta: {
    title: string;
    description: string;
    siteUrl: string;
    ogImage: string;
    author: string;
  };
  hero: {
    name: string;
    title: string;
    status: string;
    location: string;
    phone: string;
    intro: string;
    subIntro: string;
    email: string;
    avatarLabel: string;
    socials: {
      github: string;
      linkedin: string;
      x: string;
      scholar?: string;
      huggingface: string;
    };
  };
  about: {
    headline: string;
    paragraphs: string[];
    corePillars: {
      title: string;
      description: string;
    }[];
    interests: string[];
    spokenLanguages: { language: string; proficiency: string }[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  compactProjects: ProjectItem[];
  githubActivity: {
    stats: ActivityStats;
    heatmapLegend: { less: string; more: string };
  };
  education: EducationItem[];
  skillGroups: SkillGroup[];
  contact: {
    headline: string;
    subheadline: string;
    email: string;
    phone: string;
    availability: string;
    officeHours: string;
    socials: {
      platform: string;
      handle: string;
      url: string;
      type: "primary" | "secondary";
    }[];
  };
}

export const portfolioData: PortfolioData = {
  meta: {
    title: "Nitin Mishra | AI Application Developer & Full-Stack Engineer",
    description: "Portfolio of Nitin Mishra — AI Application Developer & Full-Stack Engineer specializing in Next.js, TypeScript, LLM Integration, Prisma, and PostgreSQL.",
    siteUrl: "https://github.com/nitin7414",
    ogImage: "/og-preview.png",
    author: "Nitin Mishra",
  },
  hero: {
    name: "Nitin Mishra",
    title: "AI Application Developer & Full-Stack Engineer",
    status: "Seeking AI Engineer / GenAI Developer / Full-Stack Roles",
    location: "Greater Noida, India • Open to Relocation & Remote",
    phone: "+91-7414820357",
    intro: "I build and ship LLM-powered applications and full-stack systems end-to-end, from normalized database schemas to production cloud deployments.",
    subIntro: "Currently pursuing an M.Sc. in Data Science & Analytics (2025–2027). Hands-on experience developing autonomous AI agents, multi-tier RBAC platforms, structured conversational funnels, and real-time operational dashboards with Next.js, TypeScript, Prisma, and PostgreSQL.",
    email: "mlnitin7414@gmail.com",
    avatarLabel: "NM",
    socials: {
      github: "https://github.com/nitin7414",
      linkedin: "https://www.linkedin.com/in/nitin-mishra-a16158276/",
      x: "https://x.com/NitinMi26185798",
      huggingface: "https://huggingface.co/Nitin992",
    },
  },
  about: {
    headline: "Full-Stack Developer & Open Source Contributor — owning features end-to-end from database to API to UI.",
    paragraphs: [
      "I am an AI application developer and full-stack software engineer focused on building real-world, production-shaped projects with clean UI, scalable backend architecture, and readable code. My work encompasses the full lifecycle: modeling relational and NoSQL schemas (PostgreSQL, MySQL, MongoDB, Prisma), designing type-safe APIs (Next.js, Node.js, Express, FastAPI), and orchestrating LLM agents.",
      "At IDFA Digital AI Institute, I built an AI-agent CRM that captures leads through a structured conversational sales funnel and automates qualification and follow-ups using the OpenAI and Gemini APIs. Alongside this, I designed and shipped an enterprise task management platform featuring real-time chat, three-tier Role-Based Access Control (Admin, Manager, Employee), audit logging, and temporal performance tracking, deployed to AWS and Azure.",
      "Beyond product work, I actively contribute to open source and pick up Algora bounties while deepening my backend and system design skills. Currently pursuing my M.Sc. in Data Science & Analytics at Sharda University (expected 2027), I am seeking an AI Engineer, GenAI Developer, or Full-Stack Engineer role.",
    ],
    corePillars: [
      {
        title: "LLM Integration & Agentic Workflows",
        description: "Orchestrating OpenAI, Gemini, and OpenRouter APIs with prompt engineering, structured outputs, and grounding knowledge bases for reliable autonomous agents.",
      },
      {
        title: "Full-Stack Web Architecture",
        description: "Architecting type-safe applications using Next.js (App Router), React, TypeScript, Prisma ORM, and PostgreSQL with granular multi-tier RBAC and audit logging.",
      },
      {
        title: "Cloud Deployment & Production Reliability",
        description: "Deploying and managing scalable web applications across AWS and Microsoft Azure with Neon PostgreSQL, Git version control, and CI/CD pipelines.",
      },
    ],
    interests: [
      "Autonomous Conversational Agents",
      "Retrieval-Augmented Generation (RAG)",
      "Multi-Tier Role-Based Access Control (RBAC)",
      "Serverless PostgreSQL & Prisma Optimization",
      "NLP System Diagnostics & Automation",
      "Adaptive Learning & Spaced Repetition Algorithms",
    ],
    spokenLanguages: [
      { language: "English", proficiency: "Professional Working" },
      { language: "Hindi", proficiency: "Native" },
      { language: "Spanish", proficiency: "Basic" },
    ],
  },
  experience: [
    {
      id: "idfa-digital-ai",
      role: "Full-Stack & AI Developer",
      company: "IDFA Digital AI Institute",
      logoPlaceholder: "IDFA",
      dates: "Mar 2026 — Jul 2026",
      location: "Greater Noida, India",
      type: "Product development",
      stats: [
        { value: "3-Tier", label: "RBAC security matrix" },
        { value: "2", label: "platforms on AWS & Azure" },
        { value: "100%", label: "automated lead qualification" },
      ],
      description: "Engineered and shipped two production products: an AI-agent CRM featuring conversational sales funnels, lead qualification, and admin intelligence dashboards, alongside an enterprise task management platform with real-time chat, audit logging, and multi-interval performance views.",
      skills: ["Next.js", "TypeScript", "Prisma ORM", "Neon PostgreSQL", "OpenAI API", "Gemini API", "AWS", "Microsoft Azure", "RBAC"],
      links: [
        { label: "GitHub Profile", url: "https://github.com/nitin7414" },
      ],
    },
    {
      id: "outliers-appen",
      role: "AI Data Trainer & Prompt Evaluator (Freelance)",
      company: "Outliers, Crowden (Appen)",
      logoPlaceholder: "APP",
      dates: "Apr 2025 — Jul 2025",
      location: "Remote",
      type: "Research",
      stats: [
        { value: "1,200+", label: "prompts & outputs evaluated" },
        { value: "99.2%", label: "guideline accuracy score" },
        { value: "RLHF", label: "model response refinement" },
      ],
      description: "Analyzed and refined prompts and model outputs through systematic evaluation to improve response accuracy, safety, and relevance for frontier LLM training and alignment pipelines.",
      skills: ["Prompt Engineering", "LLM Evaluation", "RLHF", "Python", "NLP", "Data Annotation"],
      links: [
        { label: "GitHub Profile", url: "https://github.com/nitin7414" },
      ],
    },
  ],
  projects: [
    {
      id: "lexara",
      number: "01",
      title: "Lexara: AI-Powered English Learning App",
      type: "Mobile & GenAI Application",
      tagline: "Duolingo-style language learning app for students and professionals with personalized AI lessons.",
      description: "Built with React Native and Expo (SDK 54.0.0) to deliver AI-generated vocabulary lessons, streak-based daily flow, adaptive difficulty, and spaced repetition for learners and working professionals.",
      tags: ["React Native", "Expo (SDK 54)", "TypeScript", "Next.js", "OpenAI API", "Spaced Repetition"],
      thumbnailLabel: "Adaptive Curriculum & Spaced Repetition Engine",
      liveUrl: "https://github.com/nitin7414/lexara",
      codeUrl: "https://github.com/nitin7414/lexara",
      detailsUrl: "#lexara",
      featured: true,
      metrics: "Expo SDK 54 • Spaced repetition algorithm",
    },
    {
      id: "hms-ai",
      number: "02",
      title: "Hospital Management System with AI Medicine Module",
      type: "Enterprise Healthcare Platform",
      tagline: "Multi-portal clinical operations suite for staff, doctors, nurses, patients, and lab reports.",
      description: "Built on Next.js 15+, React, Tailwind CSS, Prisma, and PostgreSQL with 5 dedicated portals (Admin, Doctor, Patient, Nurse, Receptionist), lab reports, bed allocation, and an AI-supported medicine lookup module.",
      tags: ["Next.js 15+", "React", "TypeScript", "Prisma ORM", "PostgreSQL", "Tailwind CSS"],
      thumbnailLabel: "Multi-Portal Architecture & AI Medicine Verification",
      liveUrl: "https://hospital-management-beta-one.vercel.app/",
      codeUrl: "https://github.com/nitin7414/hospital-management",
      detailsUrl: "#hms-ai",
      featured: true,
      metrics: "5 role-based portals • Lab reports & AI lookup",
    },
    {
      id: "ai-crm",
      number: "03",
      title: "AI-Agent CRM & Conversational Sales Funnel",
      type: "Autonomous Agent System",
      tagline: "Conversational lead qualification agent backed by an admin intelligence dashboard.",
      description: "Captures prospective leads through structured conversational dialogues, evaluates qualifications with OpenAI and Gemini structured outputs, and provides admins with analytics, message templates, and a searchable grounding knowledge base.",
      tags: ["Next.js", "TypeScript", "OpenAI API", "Gemini API", "PostgreSQL (Neon)", "Prisma"],
      thumbnailLabel: "Conversational Sales Funnel & Knowledge Base",
      liveUrl: "https://github.com/nitin7414",
      codeUrl: "https://github.com/nitin7414",
      detailsUrl: "#ai-crm",
      featured: true,
      metrics: "Automated qualification • Structured outputs",
    },
    {
      id: "syscare",
      number: "04",
      title: "SysCare: NLP-Based System Health Monitor",
      type: "NLP & Systems Automation",
      tagline: "Conversational diagnostics mapping plain-English queries to OS system metrics.",
      description: "Uses natural language intent recognition to map freeform queries into instant system diagnostics: monitoring disk utilization, CPU/memory health, and high-speed filesystem search for non-technical users.",
      tags: ["Python", "NLP", "Intent Recognition", "System Diagnostics", "Automation"],
      thumbnailLabel: "Natural Language Diagnostic Pipeline",
      liveUrl: "https://github.com/nitin7414",
      codeUrl: "https://github.com/nitin7414",
      detailsUrl: "#syscare",
      featured: true,
      metrics: "Plain-language mapping • Instant OS diagnostics",
    },
  ],
  compactProjects: [
    {
      id: "pdf-qa-bot",
      number: "05",
      title: "PDF Question-Answering Semantic Search Bot",
      type: "RAG & Vector Search",
      tagline: "Extractive question answering over dense documents using Hugging Face embeddings.",
      description: "Embeds complex multi-page PDF documents into vector representations to deliver accurate contextual answers and semantic passage retrieval.",
      tags: ["Hugging Face", "Transformers", "Python", "Vector Search", "NLP"],
      thumbnailLabel: "Vector Search & Retrieval Pipeline",
      liveUrl: "https://github.com/nitin7414",
      codeUrl: "https://github.com/nitin7414",
      featured: false,
      metrics: "Dense semantic embeddings",
    },
    {
      id: "task-platform",
      number: "06",
      title: "Enterprise Task Management Platform with 3-Tier RBAC",
      type: "Full-Stack System",
      tagline: "Collaborative task platform with real-time chat, audit logging, and temporal metrics.",
      description: "Granular access control across Admin, Manager, and Employee tiers with task delegation workflows, audit logging, and performance tracking across daily, weekly, monthly, and annual views.",
      tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS", "Azure"],
      thumbnailLabel: "3-Tier RBAC & Real-Time Chat System",
      liveUrl: "https://knowledgebase-zeta.vercel.app/",
      codeUrl: "https://github.com/nitin7414/knowledgebase",
      featured: false,
      metrics: "3-tier RBAC • Real-time messaging",
    },
    {
      id: "multi-llm-gateway",
      number: "07",
      title: "Custom Multi-LLM Chatbot Gateway",
      type: "LLM Routing",
      tagline: "Dynamic multi-model conversational router interfacing OpenRouter, OpenAI, and Gemini.",
      description: "Unified interface supporting multi-model execution, temperature tuning, dynamic provider fallback, and custom system prompt injection.",
      tags: ["OpenRouter", "OpenAI API", "Gemini API", "TypeScript", "Next.js"],
      thumbnailLabel: "Multi-Model API Orchestrator",
      liveUrl: "https://github.com/nitin7414",
      codeUrl: "https://github.com/nitin7414",
      featured: false,
      metrics: "Multi-provider LLM routing",
    },
    {
      id: "emotion-detection",
      number: "08",
      title: "Face Emotion Detection & Vision Classifier",
      type: "Computer Vision",
      tagline: "Real-time facial landmark extraction and emotion classification with CNNs.",
      description: "Combines Mediapipe facial mesh extraction with a Keras convolutional neural network to classify facial affective states from live webcam streams.",
      tags: ["Keras", "CNN", "OpenCV", "Mediapipe", "Python", "TensorFlow"],
      thumbnailLabel: "Facial Landmark Mesh & CNN Classifier",
      liveUrl: "https://github.com/nitin7414",
      codeUrl: "https://github.com/nitin7414",
      featured: false,
      metrics: "Real-time webcam inference",
    },
  ],
  githubActivity: {
    stats: {
      totalRepos: "24",
      starsEarned: "180+",
      totalCommits: "1,420+",
      followers: "85+",
      activeStreak: "42 days",
    },
    heatmapLegend: {
      less: "Less",
      more: "More",
    },
  },
  education: [
    {
      degree: "M.Sc. in Data Science & Analytics",
      institution: "Sharda University",
      location: "Greater Noida, India",
      years: "Sep 2025 — Present (Expected 2027)",
      grade: "Postgraduate Degree Candidate",
      honors: "Focus on Applied Machine Learning, Big Data Analytics & GenAI Systems",
      coursework: [
        "Machine Learning Algorithms & Optimization",
        "Natural Language Processing & LLMs",
        "Big Data Analytics & Cloud Infrastructure",
        "Statistical Inference & Predictive Modeling",
        "Deep Learning & Computer Vision Foundations",
      ],
    },
    {
      degree: "B.Sc. (Physics, Chemistry, Mathematics)",
      institution: "Maharaja Ganga Singh University",
      location: "Rajasthan, India",
      years: "2019 — 2022",
      grade: "CGPA: 8.0 / 10",
      honors: "First Class with Distinction in Physical Sciences & Mathematics",
      coursework: [
        "Linear Algebra & Matrix Analysis",
        "Multivariable Calculus & Differential Equations",
        "Probability Theory & Numerical Methods",
        "Classical & Quantum Physics Principles",
        "Computational Problem Solving & Logic",
      ],
    },
  ],
  skillGroups: [
    {
      category: "AI / LLM & Agents",
      description: "Frontier model APIs, structured prompt design, autonomous agent workflows, and vector retrieval.",
      skills: [
        "OpenAI API",
        "Gemini API",
        "OpenRouter",
        "Prompt Engineering",
        "AI Agent Design",
        "LangChain",
        "RAG (Vector Search)",
        "Hugging Face Transformers",
        "Structured Outputs",
      ],
    },
    {
      category: "Machine Learning & Vision",
      description: "Statistical modeling, deep learning architectures, computer vision, and NLP pipelines.",
      skills: [
        "Python",
        "Scikit-learn",
        "TensorFlow",
        "Keras",
        "PyTorch",
        "NLP",
        "OpenCV",
        "Mediapipe",
        "Pandas",
        "NumPy",
      ],
    },
    {
      category: "Frontend & Mobile",
      description: "Modern, responsive, accessible web interfaces and cross-platform mobile apps.",
      skills: [
        "Next.js 15+ (App Router)",
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "React Native",
        "Expo (SDK 54)",
        "Tailwind CSS",
        "HTML5 / Semantic ARIA",
        "CSS3",
      ],
    },
    {
      category: "Backend & Systems",
      description: "Scalable server architectures, type-safe APIs, authentication, and multi-tier access control.",
      skills: [
        "Node.js",
        "Express.js",
        "REST API Design",
        "Role-Based Access Control (RBAC)",
        "Authentication & Authorization",
        "FastAPI (Python)",
        "Java",
        "C++",
        "Audit Logging",
      ],
    },
    {
      category: "Databases & ORM",
      description: "Relational and NoSQL modeling, serverless database clusters, and ORM abstractions.",
      skills: [
        "PostgreSQL (Neon)",
        "Prisma ORM",
        "MongoDB",
        "MySQL",
        "Relational Schema Design",
        "Database Migrations",
      ],
    },
    {
      category: "Cloud, DevOps & Tooling",
      description: "Containerization, cloud infrastructure deployment, API testing, and version control.",
      skills: [
        "Docker",
        "AWS",
        "Microsoft Azure",
        "Neon Cloud",
        "Git",
        "GitHub",
        "Postman",
        "CI/CD Basics",
        "VS Code",
        "Linux CLI",
      ],
    },
    {
      category: "Data Science & Tools",
      description: "Data exploration, interactive notebooks, and business intelligence reporting.",
      skills: [
        "Jupyter Notebook",
        "Matplotlib",
        "Seaborn",
        "Power BI",
        "Exploratory Data Analysis (EDA)",
      ],
    },
  ],
  contact: {
    headline: "Let's build intelligent, production-ready applications.",
    subheadline: "Whether you're looking for an AI Application Developer to design autonomous LLM workflows, build secure multi-tier web platforms, or take features end-to-end from schema to cloud release, I'm ready to contribute immediately.",
    email: "mlnitin7414@gmail.com",
    phone: "+91-7414820357",
    availability: "Actively seeking full-time AI Engineer, GenAI Developer, and Full-Stack Software Engineer opportunities (Immediate / Flexible).",
    officeHours: "Available for technical interviews and architectural discussions Monday through Saturday.",
    socials: [
      {
        platform: "GitHub",
        handle: "github.com/nitin7414",
        url: "https://github.com/nitin7414",
        type: "primary",
      },
      {
        platform: "LinkedIn",
        handle: "in/nitin-mishra-a16158276",
        url: "https://www.linkedin.com/in/nitin-mishra-a16158276/",
        type: "primary",
      },
      {
        platform: "Algora",
        handle: "algora.io/nitin7414",
        url: "https://algora.io/nitin7414",
        type: "secondary",
      },
      {
        platform: "Email",
        handle: "mlnitin7414@gmail.com",
        url: "mailto:mlnitin7414@gmail.com",
        type: "primary",
      },
      {
        platform: "Phone",
        handle: "+91-7414820357",
        url: "tel:+917414820357",
        type: "secondary",
      },
    ],
  },
};
