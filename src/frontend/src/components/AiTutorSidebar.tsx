import { cn } from "@/lib/utils";
import { Bot, ChevronRight, Paperclip, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: string;
  hasCode?: boolean;
  codeSnippet?: string;
  codeLanguage?: string;
}

// Mock AI responses cycling through different scenarios
const AI_RESPONSES: Message[] = [
  {
    id: "r1",
    role: "ai",
    text: "Great question! A **closure** is a function that retains access to variables from its outer (enclosing) scope even after the outer function has returned. Here's a simple example:",
    timestamp: "",
    hasCode: true,
    codeLanguage: "javascript",
    codeSnippet: `function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2`,
  },
  {
    id: "r2",
    role: "ai",
    text: "The gradient descent algorithm can be expressed mathematically. For a parameter $\\theta$, the update rule is $\\theta = \\theta - \\alpha \\nabla J(\\theta)$ where $\\alpha$ is the learning rate and $\\nabla J(\\theta)$ is the gradient of the cost function.",
    timestamp: "",
    hasCode: true,
    codeLanguage: "python",
    codeSnippet: `def gradient_descent(X, y, learning_rate=0.01, iterations=1000):
    m = len(y)
    theta = np.zeros(X.shape[1])
    for _ in range(iterations):
        predictions = X.dot(theta)
        errors = predictions - y
        gradient = X.T.dot(errors) / m
        theta -= learning_rate * gradient
    return theta`,
  },
  {
    id: "r3",
    role: "ai",
    text: "The time complexity of different sorting algorithms varies significantly. QuickSort averages $O(n \\log n)$, while BubbleSort is $O(n^2)$. For your technical interview prep, focus on: Merge Sort $O(n \\log n)$ guaranteed, and HeapSort for in-place $O(n \\log n)$.",
    timestamp: "",
  },
  {
    id: "r4",
    role: "ai",
    text: "Integration by parts uses the formula $\\int u \\, dv = uv - \\int v \\, du$. The key is choosing $u$ and $dv$ wisely using the LIATE rule: **L**ogarithmic, **I**nverse trig, **A**lgebraic, **T**rigonometric, **E**xponential.",
    timestamp: "",
    hasCode: true,
    codeLanguage: "math",
    codeSnippet: `Example: ∫ x·eˣ dx
  Let u = x,      dv = eˣ dx
  Then du = dx,   v = eˣ
  
  = x·eˣ - ∫ eˣ dx
  = x·eˣ - eˣ + C
  = eˣ(x - 1) + C`,
  },
  {
    id: "r5",
    role: "ai",
    text: "React's reconciliation algorithm (Fiber) compares virtual DOM trees using a diffing strategy. Key rules: components of the same type preserve state, different types unmount/remount. The $O(n)$ algorithm assumes stable keys in lists.",
    timestamp: "",
    hasCode: true,
    codeLanguage: "typescript",
    codeSnippet: `// Always use stable keys for lists
const items = data.map((item) => (
  <ListItem
    key={item.id}  // stable, not index!
    data={item}
  />
));`,
  },
];

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

interface AiTutorSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AiTutorSidebar({ open, onClose }: AiTutorSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Hi! I'm your AI tutor. Ask me anything about your study materials — I can explain concepts, help with problems, and walk you through examples.",
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const responseIndexRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

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
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));

    const responseTemplate =
      AI_RESPONSES[responseIndexRef.current % AI_RESPONSES.length];
    responseIndexRef.current++;

    const aiMsg: Message = {
      ...responseTemplate,
      id: `a-${Date.now()}`,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  }, [input, loading]);

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
            style={{
              background: "oklch(0.18 0.014 260 / 0.95)",
            }}
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
                Always ready to help
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
                {/* AI avatar */}
                {msg.role === "ai" && (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: "oklch(0.62 0.18 270 / 0.2)",
                      border: "1px solid oklch(0.62 0.18 270 / 0.3)",
                    }}
                  >
                    <Bot size={12} style={{ color: "oklch(0.72 0.18 270)" }} />
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
                {/* File upload (UX only) */}
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

                {/* Send */}
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
