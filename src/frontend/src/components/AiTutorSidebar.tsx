import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  Bot,
  ChevronRight,
  Paperclip,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";
import type { ChatMessage } from "../backend.d.ts";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: string;
  hasCode?: boolean;
  codeSnippet?: string;
  codeLanguage?: string;
  isError?: boolean;
}

function renderTextWithLatex(text: string) {
  const parts = text.split(/(\$[^$]+\$|\*\*[^*]+\*\*)/g);
  return parts.map((part) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      const inner = part.slice(1, -1);
      return (
        <em
          key={`latex-${inner}`}
          className="font-mono text-[0.85em] not-italic px-0.5"
          style={{ color: "oklch(0.78 0.15 70)" }}
        >
          {inner}
        </em>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return (
        <strong key={`bold-${inner}`} className="font-semibold text-foreground">
          {inner}
        </strong>
      );
    }
    return <span key={`text-${part.slice(0, 20)}`}>{part}</span>;
  });
}

function getTimestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Detect if message text has a code block (``` fenced) */
function parseCodeBlock(text: string): {
  text: string;
  codeSnippet?: string;
  codeLanguage?: string;
  hasCode?: boolean;
} {
  const match = text.match(/```(\w*)\n?([\s\S]*?)```/);
  if (!match) return { text };
  const lang = match[1] || "code";
  const code = match[2].trim();
  const cleanText = text.replace(/```[\s\S]*?```/, "").trim();
  return {
    text: cleanText,
    hasCode: true,
    codeSnippet: code,
    codeLanguage: lang,
  };
}

interface AiTutorSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AiTutorSidebar({ open, onClose }: AiTutorSidebarProps) {
  const { actor } = useActor(createActor);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Hi! I'm your AI tutor powered by Gemini. Ask me anything about your study materials — I can explain concepts, help with problems, and walk you through examples.",
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Scroll when messages update or sidebar opens
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: input.trim(),
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input.trim();
    setInput("");
    setLoading(true);

    try {
      if (!actor) throw new Error("Service unavailable");

      // Build history from existing messages (excluding welcome)
      const history: ChatMessage[] = messagesRef.current
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          content: m.text,
        }));

      const result = await actor.askGemini(history, currentInput);

      if (result.__kind__ === "ok") {
        const parsed = parseCodeBlock(result.ok);
        const aiMsg: Message = {
          id: `a-${Date.now()}`,
          role: "ai",
          text: parsed.text || result.ok,
          timestamp: getTimestamp(),
          hasCode: parsed.hasCode,
          codeSnippet: parsed.codeSnippet,
          codeLanguage: parsed.codeLanguage,
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errMsg: Message = {
          id: `err-${Date.now()}`,
          role: "ai",
          text:
            result.err || "Sorry, I couldn't get a response. Please try again.",
          timestamp: getTimestamp(),
          isError: true,
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    } catch {
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: "ai",
        text: "Network error. Please check your connection and try again.",
        timestamp: getTimestamp(),
        isError: true,
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, loading, actor]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "fixed top-14 right-0 bottom-0 z-30 w-[320px] flex flex-col",
            "bg-card border-l border-border",
          )}
          data-ocid="ai_sidebar"
          aria-label="AI Tutor sidebar"
        >
          {/* Header */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 border-b border-border"
            style={{ background: "oklch(0.18 0.014 260 / 0.95)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: "oklch(0.62 0.18 270 / 0.2)",
                border: "1px solid oklch(0.62 0.18 270 / 0.4)",
                boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.3)",
              }}
            >
              <Sparkles size={15} style={{ color: "oklch(0.72 0.18 270)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold font-display text-foreground">
                AI Tutor
              </p>
              <p className="text-[11px] text-muted-foreground">
                Powered by Gemini
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-ocid="ai_sidebar.close_button"
              aria-label="Close AI Tutor"
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center",
                "text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex gap-2",
                  msg.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {msg.role === "ai" && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: msg.isError
                        ? "oklch(0.55 0.2 25 / 0.2)"
                        : "oklch(0.62 0.18 270 / 0.2)",
                      border: `1px solid ${msg.isError ? "oklch(0.55 0.2 25 / 0.3)" : "oklch(0.62 0.18 270 / 0.3)"}`,
                    }}
                  >
                    {msg.isError ? (
                      <AlertCircle
                        size={12}
                        style={{ color: "oklch(0.72 0.15 25)" }}
                      />
                    ) : (
                      <Bot
                        size={12}
                        style={{ color: "oklch(0.72 0.18 270)" }}
                      />
                    )}
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[240px] rounded-xl px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "rounded-tr-sm text-primary-foreground"
                      : "rounded-tl-sm glass text-foreground",
                  )}
                  style={
                    msg.role === "user"
                      ? {
                          background: "oklch(0.62 0.18 270)",
                          boxShadow: "0 2px 8px oklch(0.62 0.18 270 / 0.3)",
                        }
                      : msg.isError
                        ? {
                            background: "oklch(0.55 0.2 25 / 0.08)",
                            border: "1px solid oklch(0.55 0.2 25 / 0.2)",
                          }
                        : undefined
                  }
                >
                  <p className="leading-relaxed text-[13px]">
                    {renderTextWithLatex(msg.text)}
                  </p>

                  {msg.hasCode && msg.codeSnippet && (
                    <div
                      className="mt-2 rounded-lg overflow-hidden"
                      style={{ border: "1px solid oklch(0.28 0.02 260 / 0.6)" }}
                    >
                      <div
                        className="px-2.5 py-1 text-[10px] font-mono flex items-center gap-1.5"
                        style={{
                          background: "oklch(0.12 0.01 260)",
                          color: "oklch(0.55 0.01 260)",
                          borderBottom: "1px solid oklch(0.28 0.02 260 / 0.4)",
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ background: "oklch(0.62 0.18 270 / 0.6)" }}
                        />
                        {msg.codeLanguage ?? "code"}
                      </div>
                      <pre
                        className="px-2.5 py-2 text-[11px] font-mono overflow-x-auto leading-relaxed"
                        style={{
                          background: "oklch(0.12 0.01 260)",
                          color: "oklch(0.78 0.06 260)",
                        }}
                      >
                        <code>{msg.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  <p className="text-[10px] mt-1 opacity-50">{msg.timestamp}</p>
                </div>
              </motion.div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2 justify-start"
                data-ocid="ai_sidebar.loading_state"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.62 0.18 270 / 0.2)",
                    border: "1px solid oklch(0.62 0.18 270 / 0.3)",
                  }}
                >
                  <Bot size={12} style={{ color: "oklch(0.72 0.18 270)" }} />
                </div>
                <div className="glass rounded-xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: "oklch(0.62 0.18 270)" }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 0.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            className={cn(
              "px-3 py-3 border-t border-border transition-smooth",
              focused ? "border-t" : "",
            )}
            style={
              focused
                ? { boxShadow: "0 -4px 20px oklch(0.62 0.18 270 / 0.12)" }
                : undefined
            }
          >
            <div
              className={cn(
                "rounded-xl overflow-hidden transition-smooth",
                "border",
              )}
              style={{
                background: "oklch(0.15 0.012 260)",
                borderColor: focused
                  ? "oklch(0.62 0.18 270 / 0.6)"
                  : "oklch(0.28 0.02 260 / 0.5)",
                boxShadow: focused
                  ? "0 0 0 2px oklch(0.62 0.18 270 / 0.15), 0 0 20px oklch(0.62 0.18 270 / 0.1)"
                  : undefined,
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Ask your AI tutor..."
                rows={2}
                data-ocid="ai_sidebar.input"
                aria-label="Message to AI tutor"
                className={cn(
                  "w-full px-3 pt-2.5 pb-1 text-[13px] text-foreground bg-transparent",
                  "placeholder:text-muted-foreground resize-none outline-none",
                  "font-body leading-relaxed",
                )}
              />
              <div className="flex items-center justify-between px-2 pb-2">
                <button
                  type="button"
                  data-ocid="ai_sidebar.upload_button"
                  aria-label="Attach file (coming soon)"
                  title="Attach file"
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center",
                    "text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  <Paperclip size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  data-ocid="ai_sidebar.submit_button"
                  aria-label="Send message"
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center transition-smooth",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    input.trim() && !loading
                      ? "text-primary-foreground"
                      : "text-muted-foreground opacity-40 cursor-not-allowed",
                  )}
                  style={
                    input.trim() && !loading
                      ? {
                          background: "oklch(0.62 0.18 270)",
                          boxShadow: "0 2px 8px oklch(0.62 0.18 270 / 0.4)",
                        }
                      : { background: "oklch(0.22 0.02 260)" }
                  }
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// Toggle button for outside usage
export function AiTutorToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid="ai_tutor.toggle"
      aria-label={open ? "Close AI Tutor" : "Open AI Tutor"}
      aria-expanded={open}
      className={cn(
        "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        open
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
      )}
      style={
        open
          ? {
              background: "oklch(0.62 0.18 270)",
              boxShadow: "0 0 16px oklch(0.62 0.18 270 / 0.35)",
            }
          : undefined
      }
    >
      {open ? <X size={15} /> : <Sparkles size={15} />}
      <span className="hidden sm:inline">{open ? "Close" : "AI Tutor"}</span>
      {!open && (
        <ChevronRight
          size={13}
          className="text-muted-foreground"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
