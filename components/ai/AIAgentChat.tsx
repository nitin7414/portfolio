"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Send,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  links?: { label: string; url: string }[];
  pills?: string[];
}

const INITIAL_SUGGESTIONS = [
  "Who is Nitin?",
  "What projects has he built?",
  "What is his tech stack?",
  "Tell me about his experience",
  "How can I contact or hire him?",
];

const WELCOME_MESSAGE = `Hello! I'm Nitin's portfolio representative.

I can walk you through his technical background:
• **Full-Stack Systems**: Next.js, TypeScript, Prisma, PostgreSQL
• **Production AI Systems**: Lexara, Hospital Management System, Conversational CRM
• **Experience**: IDFA Digital AI Institute & Outliers/Appen
• **Education**: M.Sc. Data Science & Analytics (Sharda Univ)
• **Direct Contact**: Email, phone, & role availability

What would you like to explore?`;

function formatInlineText(content: string): React.ReactNode[] {
  const parts = content.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="font-mono text-[11px] px-1 py-0.5 rounded bg-surface border border-border text-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderMessageContent(text: string) {
  const lines = text.split("\n");
  return (
    <div className="space-y-1.5 font-sans leading-relaxed text-xs sm:text-sm">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} className="h-1.5" />;
        }
        if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
          const itemText = trimmed.replace(/^[•-]\s*/, "");
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-0.5 my-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span className="text-text leading-normal">{formatInlineText(itemText)}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
          const num = numMatch ? numMatch[1] : "";
          const itemText = numMatch ? numMatch[2] : trimmed;
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-0.5 my-1">
              <span className="font-mono text-xs font-semibold text-accent shrink-0 pt-0.5">
                {num}.
              </span>
              <span className="text-text leading-normal">{formatInlineText(itemText)}</span>
            </div>
          );
        }
        return (
          <p key={lIdx} className="text-text">
            {formatInlineText(line)}
          </p>
        );
      })}
    </div>
  );
}

function AgentEmblem({ className = "w-5 h-5", strokeWidth = 1.75 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Precision corner brackets */}
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" />
      {/* Central neural diamond & kernel node */}
      <path d="M12 7l4.5 5-4.5 5-4.5-5z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function getBotResponse(input: string): { text: string; links?: { label: string; url: string }[]; pills?: string[] } {
  const query = input.toLowerCase().trim();

  // 1. Contact / Hire / Email / Phone / Reach
  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("reach") ||
    query.includes("call") ||
    query.includes("whatsapp") ||
    query.includes("interview")
  ) {
    return {
      text: `You can reach Nitin Mishra directly through multiple channels:

• **Email**: ${portfolioData.hero.email}
• **Phone / WhatsApp**: ${portfolioData.hero.phone}
• **Location**: Greater Noida, India (Open to Remote & Relocation)
• **Availability**: Actively seeking AI Engineer, GenAI Developer, and Full-Stack Software Engineer opportunities.

Feel free to send him an email or reach out via LinkedIn/GitHub!`,
      links: [
        { label: "Send Email", url: `mailto:${portfolioData.hero.email}` },
        { label: "Call / WhatsApp", url: `tel:${portfolioData.hero.phone.replace(/[^0-9+]/g, "")}` },
        { label: "LinkedIn Profile", url: portfolioData.hero.socials.linkedin },
      ],
      pills: ["What is his tech stack?", "What projects has he built?", "Tell me about his experience"],
    };
  }

  // 2. Projects / Lexara / Hospital / HMS / SysCare / CRM
  if (
    query.includes("project") ||
    query.includes("built") ||
    query.includes("build") ||
    query.includes("lexara") ||
    query.includes("hospital") ||
    query.includes("crm") ||
    query.includes("syscare") ||
    query.includes("portfolio")
  ) {
    return {
      text: `Nitin has engineered several production-grade full-stack and GenAI applications:

1. **Lexara: AI-Powered English Learning App**
   Duolingo-style mobile & web app built with React Native, Expo (SDK 54), and AI-generated lessons, streak-based daily loops, adaptive difficulty, and spaced repetition.

2. **Hospital Management System with AI Medicine Module**
   Built with Next.js 15+, React, Tailwind CSS, Prisma, and PostgreSQL — featuring 5 role-based portals (Admin, Doctor, Patient, Nurse, Receptionist), lab reports, bed tracking, and AI medicine lookup.

3. **AI-Agent CRM & Conversational Sales Funnel**
   Captures and qualifies leads automatically through structured conversational flows with OpenAI/Gemini structured outputs and admin intelligence dashboards.

4. **SysCare: NLP-Based System Health Monitor**
   Translates plain-English requests to hardware diagnostics (disk usage, CPU/RAM telemetry, fast file search in Python).

Plus earlier builds including a **PDF Semantic QA Bot** (Hugging Face embeddings) and a **Face Emotion Classifier** (Keras CNN + Mediapipe).`,
      links: [
        { label: "Nitin's GitHub", url: portfolioData.hero.socials.github },
        { label: "Jump to Projects Section", url: "#projects" },
      ],
      pills: ["What is his tech stack?", "Tell me about his experience", "How to contact him"],
    };
  }

  // 3. Tech Stack / Skills / Technologies / Python / Next / TypeScript / PostgreSQL
  if (
    query.includes("skill") ||
    query.includes("stack") ||
    query.includes("tech") ||
    query.includes("language") ||
    query.includes("python") ||
    query.includes("next") ||
    query.includes("typescript") ||
    query.includes("prisma") ||
    query.includes("react")
  ) {
    return {
      text: `Nitin's core technical stack bridges modern full-stack web engineering and generative AI:

• **AI & LLM Integration**: OpenAI API, Gemini API, OpenRouter, Prompt Engineering, AI Agent Workflows, LangChain, RAG (Vector Search), Hugging Face Transformers, Structured Outputs.
• **Full-Stack & Mobile**: Next.js 15+ (App Router), React, TypeScript, JavaScript (ES6+), React Native, Expo (SDK 54), Tailwind CSS, HTML5/CSS3.
• **Backend & Languages**: Node.js, Express.js, REST API Design, RBAC, FastAPI, Python, Java, C++.
• **Databases, Cloud & Tools**: PostgreSQL (Neon), Prisma ORM, MongoDB, MySQL, Docker, Postman, AWS, Microsoft Azure, Git/GitHub.
• **Machine Learning & Vision**: Python, Scikit-learn, TensorFlow, Keras, PyTorch, NLP, OpenCV, Mediapipe, Pandas, NumPy.`,
      links: [
        { label: "View Technical Skills", url: "#skills" },
        { label: "Explore Projects", url: "#projects" },
      ],
      pills: ["Tell me about his experience", "Where did he study?", "How can I hire him?"],
    };
  }

  // 4. Experience / Work / IDFA / Appen / Outliers / History
  if (
    query.includes("experience") ||
    query.includes("work") ||
    query.includes("job") ||
    query.includes("idfa") ||
    query.includes("appen") ||
    query.includes("outlier") ||
    query.includes("role")
  ) {
    return {
      text: `Nitin has proven industry experience across full-stack product engineering and generative AI:

• **Full-Stack & AI Developer at IDFA Digital AI Institute** (Mar 2026 – Jul 2026):
  - Built an AI-agent CRM automating lead capture and qualification with OpenAI & Gemini structured outputs.
  - Developed an admin intelligence panel with configurable messaging and a grounding knowledge base.
  - Designed an enterprise task management platform with real-time messaging, 3-tier RBAC (Admin, Manager, Employee), and daily-to-annual performance analytics.
  - Deployed both platforms on AWS and Azure using Next.js, Prisma, and Neon PostgreSQL.

• **AI Data Trainer & Prompt Evaluator (Freelance) at Outliers / Crowden (Appen)** (Apr 2025 – Jul 2025):
  - Evaluated and refined 1,200+ prompts and model responses for frontier LLM RLHF alignment projects, ensuring 99.2% benchmark accuracy.`,
      links: [
        { label: "Jump to Experience Section", url: "#experience" },
      ],
      pills: ["What projects has he built?", "What are his degrees?", "Contact details"],
    };
  }

  // 5. Education / University / Degree / College / Sharda / MGSU
  if (
    query.includes("education") ||
    query.includes("degree") ||
    query.includes("university") ||
    query.includes("college") ||
    query.includes("study") ||
    query.includes("sharda") ||
    query.includes("gpa") ||
    query.includes("school")
  ) {
    return {
      text: `Nitin has strong academic foundations in Data Science, Mathematics, and Computer Science:

1. **M.Sc. in Data Science & Analytics**
   *Sharda University, Greater Noida* | Sep 2025 – Present (Expected 2027)
   Focus on Machine Learning Algorithms, NLP & LLMs, Big Data Analytics, Deep Learning, and Predictive Modeling.

2. **B.Sc. in Physics, Chemistry & Mathematics**
   *Maharaja Ganga Singh University* | 2019 – 2022
   Graduated with **CGPA: 8.0 / 10** (First Class with Distinction), covering Multivariable Calculus, Linear Algebra, Probability, and Numerical Analysis.`,
      links: [
        { label: "View Education Details", url: "#education" },
      ],
      pills: ["What is his tech stack?", "What projects has he built?", "Contact Nitin"],
    };
  }

  // 6. Spoken languages
  if (
    query.includes("language") ||
    query.includes("speak") ||
    query.includes("hindi") ||
    query.includes("spanish") ||
    query.includes("english")
  ) {
    return {
      text: `Nitin is multilingual:
• **English**: Professional Working Proficiency
• **Hindi**: Native / Bilingual
• **Spanish**: Basic Elementary Proficiency`,
      pills: ["Who is Nitin?", "What projects has he built?", "Contact details"],
    };
  }

  // 7. General / Who is Nitin / About
  if (
    query.includes("who") ||
    query.includes("nitin") ||
    query.includes("about") ||
    query.includes("summary") ||
    query.includes("intro") ||
    query.includes("hello") ||
    query.includes("hi") ||
    query.includes("hey")
  ) {
    return {
      text: `**Nitin Mishra** is an AI Application Developer and Full-Stack Engineer based in Greater Noida, India.

He specializes in building end-to-end LLM products—from relational database schemas (Prisma, PostgreSQL) to modern frontends (Next.js, TypeScript) and autonomous agent workflows (OpenAI, Gemini APIs).

He is currently pursuing an **M.Sc. in Data Science & Analytics** (2025–2027) and is actively open to **AI Engineer, GenAI Developer, and Full-Stack Software Engineer** roles.`,
      pills: ["What projects has he built?", "What is his tech stack?", "Tell me about his experience", "How to contact him"],
    };
  }

  // Fallback
  return {
    text: `I'm Nitin's AI agent! I can provide detailed information about:
• **Projects**: Lexara (AI language app), Hospital Management System, AI-Agent CRM, SysCare.
• **Skills & Stack**: Next.js, TypeScript, LLM APIs, Prisma, PostgreSQL, Python, PyTorch.
• **Experience**: IDFA Digital AI Institute & Outliers/Appen.
• **Education**: M.Sc. Data Science & Analytics (Sharda Univ) & B.Sc. (MGSU).
• **Contact & Hiring**: Email, phone, location & availability.

What would you like to explore?`,
    pills: INITIAL_SUGGESTIONS,
  };
}

export function AIAgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-msg",
      sender: "ai",
      text: WELCOME_MESSAGE,
      timestamp: "Just now",
      pills: INITIAL_SUGGESTIONS,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Dragging state for the floating button
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);
  const hasMovedRef = useRef<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Handle window resize boundary clamping for dragged position
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        const newX = Math.min(prev.x, window.innerWidth - 76);
        const newY = Math.min(prev.y, window.innerHeight - 76);
        return { x: Math.max(16, newX), y: Math.max(16, newY) };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      chatInputRef.current?.focus();
    }
  }, [messages, isOpen, isTyping]);

  // Esc key listener to close chat window
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: rect.left,
      initY: rect.top,
    };
    hasMovedRef.current = false;
    setIsDragging(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMovedRef.current = true;
      }

      const rawX = dragStartRef.current.initX + dx;
      const rawY = dragStartRef.current.initY + dy;

      const clampedX = Math.max(16, Math.min(window.innerWidth - 76, rawX));
      const clampedY = Math.max(16, Math.min(window.innerHeight - 76, rawY));

      setPosition({ x: clampedX, y: clampedY });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      // If user didn't drag significantly, treat as a click to toggle open
      if (!hasMovedRef.current) {
        setIsOpen((prev) => !prev);
      }
      dragStartRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Touch Drag Handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!buttonRef.current || e.touches.length === 0) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    dragStartRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      initX: rect.left,
      initY: rect.top,
    };
    hasMovedRef.current = false;
    setIsDragging(true);

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (!dragStartRef.current || moveEvent.touches.length === 0) return;
      const t = moveEvent.touches[0];
      const dx = t.clientX - dragStartRef.current.startX;
      const dy = t.clientY - dragStartRef.current.startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMovedRef.current = true;
      }

      const rawX = dragStartRef.current.initX + dx;
      const rawY = dragStartRef.current.initY + dy;

      const clampedX = Math.max(12, Math.min(window.innerWidth - 72, rawX));
      const clampedY = Math.max(12, Math.min(window.innerHeight - 72, rawY));

      setPosition({ x: clampedX, y: clampedY });
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (!hasMovedRef.current) {
        setIsOpen((prev) => !prev);
      }
      dragStartRef.current = null;
    };

    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
  };

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const text = (textToSend || inputValue).trim();
      if (!text || isTyping) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: "user",
        text,
        timestamp: "Now",
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInputValue("");
      setIsTyping(true);

      const apiHistory = nextMessages
        .filter((m) => m.id !== "initial-msg")
        .slice(-8)
        .map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiHistory }),
        });

        if (res.ok) {
          const data = (await res.json()) as { reply?: string };
          if (data.reply) {
            const aiMsg: Message = {
              id: `ai-${Date.now()}`,
              sender: "ai",
              text: data.reply,
              timestamp: "Now",
            };
            setMessages((prev) => [...prev, aiMsg]);
            setIsTyping(false);
            return;
          }
        }
      } catch {
        // Fall back gracefully to local grounded responses
      }

      const fallback = getBotResponse(text);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: fallback.text,
        timestamp: "Now",
        links: fallback.links,
        pills: fallback.pills,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    },
    [inputValue, isTyping, messages]
  );

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "initial-msg",
        sender: "ai",
        text: WELCOME_MESSAGE,
        timestamp: "Just now",
        pills: INITIAL_SUGGESTIONS,
      },
    ]);
  };

  return (
    <>
      {/* Draggable Floating Button */}
      <div
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={
          position
            ? {
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 45,
                touchAction: "none",
              }
            : {
                position: "fixed",
                right: 24,
                bottom: 24,
                zIndex: 45,
                touchAction: "none",
              }
        }
        className={`group select-none cursor-grab active:cursor-grabbing transition-transform ${
          isDragging ? "scale-105" : "duration-75"
        }`}
      >
        <button
          type="button"
          aria-label={isOpen ? "Minimize Nitin's Representative" : "Open Nitin's Representative (Draggable)"}
          className="relative w-12 h-12 rounded-xl bg-surface border border-border text-text shadow-xl hover:border-accent hover:text-accent hover:bg-surface-hover flex items-center justify-center transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
        >
          {/* Subtle live indicator dot */}
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>

          <AgentEmblem className="w-5 h-5 text-accent" strokeWidth={1.75} />
        </button>

        {/* Draggable hint tooltip when closed */}
        {!isOpen && (
          <div className="absolute right-0 bottom-full mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <span className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-surface border border-border text-text shadow-md">
              Ask Nitin&apos;s Assistant • <span className="text-text-muted">Drag to move</span>
            </span>
          </div>
        )}
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Nitin's Representative Chat"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[410px] h-[540px] max-h-[85vh] flex flex-col rounded-2xl bg-surface border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-surface-subtle flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-accent">
                <AgentEmblem className="w-4 h-4 text-accent" strokeWidth={1.75} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-mono text-xs sm:text-sm font-semibold text-text">
                    Nitin&apos;s Representative
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
                </div>
                <p className="font-mono text-[10px] text-text-muted">
                  Knowledge grounded • Verified CV context
                </p>
              </div>
            </div>

            {/* Right side controls: Reset + Cross button to minimize */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:text-text hover:border-border-hover transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Cross button on the right top to minimize the chat box back to the floating icon */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat window"
                aria-label="Minimize chat window back to floating icon"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border bg-surface text-text hover:text-accent hover:border-accent transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAi = msg.sender === "ai";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed border ${
                      isAi
                        ? "bg-surface-subtle border-border text-text"
                        : "bg-accent-subtle border-accent/40 text-text font-medium"
                    }`}
                  >
                    {renderMessageContent(msg.text)}

                    {/* Action Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-border flex flex-wrap gap-1.5 font-mono text-[11px]">
                        {msg.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target={link.url.startsWith("http") ? "_blank" : undefined}
                            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                            onClick={() => {
                              if (link.url.startsWith("#")) {
                                setIsOpen(false);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-text hover:text-accent hover:border-accent transition-colors"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestion Pills */}
                  {msg.pills && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.pills.map((pill, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleSendMessage(pill)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-border bg-surface text-text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer text-left"
                        >
                          {pill}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="font-mono text-[9px] text-text-muted mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-subtle border border-border w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Bar */}
          <div className="p-3 border-t border-border bg-surface shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={chatInputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="Ask about Nitin's skills, projects, roles..."
                className="flex-1 bg-surface-subtle border border-border rounded-lg px-3 py-2 text-xs sm:text-sm font-mono text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors min-h-[44px]"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="w-11 h-11 flex items-center justify-center rounded-lg bg-accent text-accent-contrast disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all shrink-0 min-w-[44px] min-h-[44px] cursor-pointer"
              >
                <Send className="w-4 h-4" strokeWidth={2} />
              </button>
            </form>

            <div className="mt-1.5 px-1 flex items-center justify-between text-[10px] font-mono text-text-muted">
              <span>Press Enter to send</span>
              <span>Grounded in Nitin&apos;s CV</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
