"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUp, X, Loader2, Mail, Phone, MessageCircle } from "lucide-react";
import { useChat } from "ai/react";

// ── Contact info – update these ──────────────────────────────────────────────
const CONTACT = {
  email: "mlnitin7414@gmail.com",
  phone: "+917414820357",          // include country code for WhatsApp deep-link
  whatsapp: "+917414820357",
};

// ── Suggestion chips shown before the user sends anything ───────────────────
const INITIAL_SUGGESTIONS = [
  "What technologies do you work with?",
  "Tell me about your projects",
  "What's your experience level?",
  "Are you available for freelance?",
];

// ── Detect contact intent in AI reply ────────────────────────────────────────
const CONTACT_KEYWORDS = [
  "email", "mail", "contact", "reach", "whatsapp", "call", "phone",
  "message", "get in touch", "drop a message", "send a message",
];

function hasContactIntent(text: string) {
  const lower = text.toLowerCase();
  return CONTACT_KEYWORDS.some((kw) => lower.includes(kw));
}

// ── Follow-up chip suggestions based on last AI reply ───────────────────────
function getFollowUpSuggestions(text: string): string[] {
  const lower = text.toLowerCase();
  if (lower.includes("project") || lower.includes("work"))
    return ["Which project are you most proud of?", "What was the biggest challenge?", "Do you have a GitHub?"];
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack"))
    return ["How long have you used Next.js?", "Do you do backend too?", "Any DevOps experience?"];
  if (lower.includes("freelance") || lower.includes("available") || lower.includes("hire"))
    return ["What's your rate?", "How do I contact you?", "What's your availability?"];
  return ["Tell me more", "What else can you do?", "How do I hire you?"];
}

// ── Contact action buttons ────────────────────────────────────────────────────
function ContactButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mt-3"
    >
      <a
        href={`mailto:${CONTACT.email}`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
      >
        <Mail size={13} /> Email me
      </a>
      <a
        href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors"
      >
        <MessageCircle size={13} /> WhatsApp
      </a>
      <a
        href={`tel:${CONTACT.phone}`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors"
      >
        <Phone size={13} /> Call me
      </a>
    </motion.div>
  );
}

// ── Suggestion chip row ───────────────────────────────────────────────────────
function SuggestionChips({
  chips,
  onSelect,
}: {
  chips: string[];
  onSelect: (text: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mt-3"
    >
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect(chip)}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-800 transition-all"
        >
          {chip}
        </button>
      ))}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AiAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/chat",
  });

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Submit a chip text directly
  const handleChipClick = (text: string) => {
    setIsOpen(true);
    setInput(text);
    // Submit on next tick so input state is flushed
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent<HTMLFormElement>;
      handleSubmit(fakeEvent);
    }, 0);
  };

  const onSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsOpen(true);
    handleSubmit(e);
  };

  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex flex-col items-center justify-end pb-6 px-4 pointer-events-none">

      {/* ── EXPANDED CHAT WINDOW ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full max-w-3xl bg-white/90 backdrop-blur-2xl border border-slate-200/60 shadow-2xl rounded-3xl mb-4 h-[60vh] max-h-[600px] flex flex-col pointer-events-auto overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white/50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-full">
                  <Sparkles size={16} className="text-blue-600" />
                </div>
                <span className="font-semibold text-slate-800 tracking-tight">Portfolio Copilot</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Empty state with suggestion chips */}
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-5">
                  <Sparkles size={32} className="text-slate-300" />
                  <p className="text-center max-w-sm text-sm leading-relaxed">
                    Ask me anything about my projects, tech stack, or professional experience.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                    {INITIAL_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleChipClick(s)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, idx) => {
                const isLastAssistant =
                  m.role === "assistant" && idx === messages.length - 1 && !isLoading;
                const showContact =
                  isLastAssistant && hasContactIntent(m.content as string);
                const showFollowUp =
                  isLastAssistant && !showContact;

                return (
                  <div key={m.id}>
                    <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] px-5 py-3.5 text-[15px] leading-relaxed ${
                          m.role === "user"
                            ? "bg-slate-900 text-white rounded-2xl rounded-tr-sm shadow-md"
                            : "bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>

                    {/* Contact buttons */}
                    {showContact && (
                      <div className="flex justify-start pl-1">
                        <ContactButtons />
                      </div>
                    )}

                    {/* Follow-up chips */}
                    {showFollowUp && (
                      <div className="flex justify-start pl-1">
                        <SuggestionChips
                          chips={getFollowUpSuggestions(m.content as string)}
                          onSelect={handleChipClick}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM INPUT BAR ── */}
      <motion.form
        layout
        onSubmit={onSubmitWrapper}
        onClick={() => setIsOpen(true)}
        className={`w-full max-w-3xl bg-white/80 backdrop-blur-xl border shadow-lg flex items-center p-2 pointer-events-auto transition-all duration-300 ${
          isOpen
            ? "border-slate-300 rounded-2xl shadow-md"
            : "border-slate-200/60 hover:border-slate-300 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        }`}
      >
        <div className="pl-4 pr-2 text-blue-600">
          <Sparkles size={20} />
        </div>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 px-2 py-2 text-[15px]"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`p-2.5 rounded-full flex items-center justify-center transition-all ${
            input.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </button>
      </motion.form>
    </div>
  );
}