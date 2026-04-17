import { c as createLucideIcon, j as jsxRuntimeExports, B as Bot, U as Users, m as motion, a as cn, r as reactExports, A as AnimatePresence, X, b as mockUserProfile, d as BookOpen, e as mockStudySets, L as Layers, f as recentActivity } from "./index-D-Ffb-dF.js";
import { B as Brain, C as CircleCheck, S as Sparkles, a as ChevronRight, Q as QuizModal } from "./QuizModal-eyH2Tk1D.js";
import { C as Clock } from "./clock-CaNC5c_4.js";
import { F as Flame, T as TrendingUp } from "./trending-up-uXbhHKWK.js";
import "./button-DH7WpwP0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M13.234 20.252 21 12.3", key: "1cbrk9" }],
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486",
      key: "1pkts6"
    }
  ]
];
const Paperclip = createLucideIcon("paperclip", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
const Pin = createLucideIcon("pin", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const typeConfig = {
  quiz: {
    icon: CircleCheck,
    bg: "oklch(0.7 0.17 162 / 0.15)",
    border: "oklch(0.7 0.17 162 / 0.3)",
    color: "oklch(0.72 0.15 162)"
  },
  cards: {
    icon: Brain,
    bg: "oklch(0.63 0.27 304 / 0.15)",
    border: "oklch(0.63 0.27 304 / 0.3)",
    color: "oklch(0.72 0.22 304)"
  },
  session: {
    icon: Users,
    bg: "oklch(0.77 0.19 70 / 0.15)",
    border: "oklch(0.77 0.19 70 / 0.3)",
    color: "oklch(0.78 0.17 70)"
  },
  ai: {
    icon: Bot,
    bg: "oklch(0.62 0.18 270 / 0.15)",
    border: "oklch(0.62 0.18 270 / 0.3)",
    color: "oklch(0.72 0.18 270)"
  }
};
function ActivityFeed({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "activity.list", children: items.map((item, index) => {
    const config = typeConfig[item.type];
    const Icon = config.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        animate: { opacity: 1, x: 0 },
        transition: {
          duration: 0.25,
          delay: 0.05 * index,
          ease: [0.25, 0.46, 0.45, 0.94]
        },
        "data-ocid": `activity.item.${index + 1}`,
        className: cn(
          "group flex items-center gap-3 px-3 py-2.5 rounded-lg",
          "glass hover:border-border transition-smooth cursor-default"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              style: {
                background: config.bg,
                border: `1px solid ${config.border}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, style: { color: config.color } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: item.text }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.time })
          ] })
        ]
      },
      item.id
    );
  }) });
}
const AI_RESPONSES = [
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
console.log(counter()); // 2`
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
    return theta`
  },
  {
    id: "r3",
    role: "ai",
    text: "The time complexity of different sorting algorithms varies significantly. QuickSort averages $O(n \\log n)$, while BubbleSort is $O(n^2)$. For your technical interview prep, focus on: Merge Sort $O(n \\log n)$ guaranteed, and HeapSort for in-place $O(n \\log n)$.",
    timestamp: ""
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
  = eˣ(x - 1) + C`
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
));`
  }
];
function renderTextWithLatex(text) {
  const parts = text.split(/(\$[^$]+\$|\*\*[^*]+\*\*)/g);
  return parts.map((part) => {
    if (part.startsWith("$") && part.endsWith("$")) {
      const inner = part.slice(1, -1);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "em",
        {
          className: "font-mono text-[0.85em] not-italic px-0.5",
          style: { color: "oklch(0.78 0.15 70)" },
          children: inner
        },
        `latex-${inner}`
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: inner }, `bold-${inner}`);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, `text-${part.slice(0, 20)}`);
  });
}
function getTimestamp() {
  return (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function AiTutorSidebar({ open, onClose }) {
  const [messages, setMessages] = reactExports.useState([
    {
      id: "welcome",
      role: "ai",
      text: "Hi! I'm your AI tutor. Ask me anything about your study materials — I can explain concepts, help with problems, and walk you through examples.",
      timestamp: getTimestamp()
    }
  ]);
  const [input, setInput] = reactExports.useState("");
  const [focused, setFocused] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const responseIndexRef = reactExports.useRef(0);
  const bottomRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const scrollToBottom = reactExports.useCallback(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, []);
  reactExports.useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);
  reactExports.useEffect(() => {
    if (open) {
      setTimeout(() => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      }, 250);
    }
  }, [open]);
  const handleSend = reactExports.useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: input.trim(),
      timestamp: getTimestamp()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    const responseTemplate = AI_RESPONSES[responseIndexRef.current % AI_RESPONSES.length];
    responseIndexRef.current++;
    const aiMsg = {
      ...responseTemplate,
      id: `a-${Date.now()}`,
      timestamp: getTimestamp()
    };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  }, [input, loading]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.aside,
    {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
      className: cn(
        "fixed top-14 right-0 bottom-0 z-30 w-[320px] flex flex-col",
        "bg-card border-l border-border"
      ),
      "data-ocid": "ai_sidebar",
      "aria-label": "AI Tutor sidebar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5 px-4 py-3 border-b border-border",
            style: {
              background: "oklch(0.18 0.014 260 / 0.95)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  style: {
                    background: "oklch(0.62 0.18 270 / 0.2)",
                    border: "1px solid oklch(0.62 0.18 270 / 0.4)",
                    boxShadow: "0 0 12px oklch(0.62 0.18 270 / 0.3)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15, style: { color: "oklch(0.72 0.18 270)" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold font-display text-foreground", children: "AI Tutor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Always ready to help" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "data-ocid": "ai_sidebar.close_button",
                  "aria-label": "Close AI Tutor",
                  className: cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center",
                    "text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3",
            style: { scrollbarWidth: "thin" },
            children: [
              messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.2 },
                  className: cn(
                    "flex gap-2",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  ),
                  children: [
                    msg.role === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                        style: {
                          background: "oklch(0.62 0.18 270 / 0.2)",
                          border: "1px solid oklch(0.62 0.18 270 / 0.3)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 12, style: { color: "oklch(0.72 0.18 270)" } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: cn(
                          "max-w-[240px] rounded-xl px-3 py-2 text-sm",
                          msg.role === "user" ? "rounded-tr-sm text-primary-foreground" : "rounded-tl-sm glass text-foreground"
                        ),
                        style: msg.role === "user" ? {
                          background: "oklch(0.62 0.18 270)",
                          boxShadow: "0 2px 8px oklch(0.62 0.18 270 / 0.3)"
                        } : void 0,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed text-[13px]", children: renderTextWithLatex(msg.text) }),
                          msg.hasCode && msg.codeSnippet && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "mt-2 rounded-lg overflow-hidden",
                              style: { border: "1px solid oklch(0.28 0.02 260 / 0.6)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    className: "px-2.5 py-1 text-[10px] font-mono flex items-center gap-1.5",
                                    style: {
                                      background: "oklch(0.12 0.01 260)",
                                      color: "oklch(0.55 0.01 260)",
                                      borderBottom: "1px solid oklch(0.28 0.02 260 / 0.4)"
                                    },
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "w-2 h-2 rounded-full inline-block",
                                          style: { background: "oklch(0.62 0.18 270 / 0.6)" }
                                        }
                                      ),
                                      msg.codeLanguage ?? "code"
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "pre",
                                  {
                                    className: "px-2.5 py-2 text-[11px] font-mono overflow-x-auto leading-relaxed",
                                    style: {
                                      background: "oklch(0.12 0.01 260)",
                                      color: "oklch(0.78 0.06 260)"
                                    },
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: msg.codeSnippet })
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] mt-1 opacity-50", children: msg.timestamp })
                        ]
                      }
                    )
                  ]
                },
                msg.id
              )),
              loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  className: "flex gap-2 justify-start",
                  "data-ocid": "ai_sidebar.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                        style: {
                          background: "oklch(0.62 0.18 270 / 0.2)",
                          border: "1px solid oklch(0.62 0.18 270 / 0.3)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 12, style: { color: "oklch(0.72 0.18 270)" } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        className: "w-1.5 h-1.5 rounded-full inline-block",
                        style: { background: "oklch(0.62 0.18 270)" },
                        animate: { scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] },
                        transition: {
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2
                        }
                      },
                      i
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "px-3 py-3 border-t border-border transition-smooth",
              focused ? "border-t" : ""
            ),
            style: focused ? { boxShadow: "0 -4px 20px oklch(0.62 0.18 270 / 0.12)" } : void 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: cn(
                  "rounded-xl overflow-hidden transition-smooth",
                  "border"
                ),
                style: {
                  background: "oklch(0.15 0.012 260)",
                  borderColor: focused ? "oklch(0.62 0.18 270 / 0.6)" : "oklch(0.28 0.02 260 / 0.5)",
                  boxShadow: focused ? "0 0 0 2px oklch(0.62 0.18 270 / 0.15), 0 0 20px oklch(0.62 0.18 270 / 0.1)" : void 0
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      ref: inputRef,
                      value: input,
                      onChange: (e) => setInput(e.target.value),
                      onKeyDown: handleKeyDown,
                      onFocus: () => setFocused(true),
                      onBlur: () => setFocused(false),
                      placeholder: "Ask your AI tutor...",
                      rows: 2,
                      "data-ocid": "ai_sidebar.input",
                      "aria-label": "Message to AI tutor",
                      className: cn(
                        "w-full px-3 pt-2.5 pb-1 text-[13px] text-foreground bg-transparent",
                        "placeholder:text-muted-foreground resize-none outline-none",
                        "font-body leading-relaxed"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-2 pb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "ai_sidebar.upload_button",
                        "aria-label": "Attach file (coming soon)",
                        title: "Attach file",
                        className: cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center",
                          "text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        ),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 14 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleSend,
                        disabled: !input.trim() || loading,
                        "data-ocid": "ai_sidebar.submit_button",
                        "aria-label": "Send message",
                        className: cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center transition-smooth",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          input.trim() && !loading ? "text-primary-foreground" : "text-muted-foreground opacity-40 cursor-not-allowed"
                        ),
                        style: input.trim() && !loading ? {
                          background: "oklch(0.62 0.18 270)",
                          boxShadow: "0 2px 8px oklch(0.62 0.18 270 / 0.4)"
                        } : { background: "oklch(0.22 0.02 260)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 13 })
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  ) });
}
function AiTutorToggle({
  open,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": "ai_tutor.toggle",
      "aria-label": open ? "Close AI Tutor" : "Open AI Tutor",
      "aria-expanded": open,
      className: cn(
        "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        open ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      ),
      style: open ? {
        background: "oklch(0.62 0.18 270)",
        boxShadow: "0 0 16px oklch(0.62 0.18 270 / 0.35)"
      } : void 0,
      children: [
        open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: open ? "Close" : "AI Tutor" }),
        !open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            size: 13,
            className: "text-muted-foreground",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp,
  delay = 0,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      "data-ocid": ocid,
      className: cn(
        "group relative overflow-hidden rounded-xl p-4",
        "glass border border-border",
        "hover:glow-indigo transition-smooth cursor-default select-none",
        "hover:border-primary"
      ),
      style: { borderColor: "oklch(0.28 0.02 260 / 0.4)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at 20% 50%, oklch(0.62 0.18 270 / 0.06) 0%, transparent 60%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-9 h-9 rounded-lg flex items-center justify-center mb-3",
              "transition-smooth group-hover:scale-110"
            ),
            style: {
              background: "oklch(0.62 0.18 270 / 0.15)",
              border: "1px solid oklch(0.62 0.18 270 / 0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, style: { color: "oklch(0.72 0.18 270)" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground leading-none mb-1", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium", children: label }),
        trend && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "mt-2 text-xs font-medium",
              trendUp ? "text-emerald-400" : "text-rose-400"
            ),
            children: [
              trendUp ? "↑" : "↓",
              " ",
              trend
            ]
          }
        )
      ]
    }
  );
}
const QUICK_STATS = [
  {
    label: "Hours Today",
    value: "4.5",
    icon: Clock,
    trend: "+1.2h vs yesterday",
    trendUp: true,
    ocid: "stat.hours_today"
  },
  {
    label: "Current Streak",
    value: "12",
    icon: Flame,
    trend: "Personal best!",
    trendUp: true,
    ocid: "stat.streak"
  },
  {
    label: "Study Sets",
    value: mockStudySets.length,
    icon: BookOpen,
    trend: "+1 this week",
    trendUp: true,
    ocid: "stat.study_sets"
  },
  {
    label: "Cards Due",
    value: "24",
    icon: Layers,
    trend: "Review now",
    trendUp: false,
    ocid: "stat.cards_due"
  }
];
const PINNED_RESOURCES = mockStudySets.slice(0, 3);
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [selectedQuizSet, setSelectedQuizSet] = reactExports.useState(null);
  const firstName = mockUserProfile.name.split(" ")[0];
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex min-h-full transition-smooth",
        sidebarOpen ? "mr-[320px]" : ""
      ),
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-6 max-w-5xl mx-auto w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3 },
              className: "flex items-start justify-between mb-6 gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground", children: [
                    greeting,
                    ", ",
                    firstName,
                    " 👋"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                    "You're on a",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-semibold",
                        style: { color: "oklch(0.78 0.17 70)" },
                        children: "12-day streak"
                      }
                    ),
                    ". Keep it going!"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AiTutorToggle,
                  {
                    open: sidebarOpen,
                    onClick: () => setSidebarOpen((v) => !v)
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Quick stats", className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: QUICK_STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: stat.label,
              value: stat.value,
              icon: stat.icon,
              trend: stat.trend,
              trendUp: stat.trendUp,
              delay: i * 0.06,
              ocid: stat.ocid
            },
            stat.label
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3, delay: 0.2 },
                "aria-label": "Recent activity",
                className: "lg:col-span-3",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-elevated rounded-xl overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-4 pb-3 border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TrendingUp,
                        {
                          size: 16,
                          style: { color: "oklch(0.72 0.18 270)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold font-display text-foreground", children: "Recent Activity" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Last 7 days" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityFeed, { items: recentActivity }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "mx-3 mb-3 px-3 py-2.5 rounded-lg flex items-center justify-between",
                      style: {
                        background: "oklch(0.62 0.18 270 / 0.08)",
                        border: "1px solid oklch(0.62 0.18 270 / 0.2)"
                      },
                      "data-ocid": "dashboard.session_summary",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14, style: { color: "oklch(0.72 0.18 270)" } }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-medium", children: "Start today's focus session" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "dashboard.start_session_button",
                            className: cn(
                              "text-xs font-semibold px-2.5 py-1 rounded-lg transition-smooth",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            ),
                            style: {
                              background: "oklch(0.62 0.18 270)",
                              color: "oklch(0.145 0.014 270)"
                            },
                            children: "Start"
                          }
                        )
                      ]
                    }
                  )
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.section,
              {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3, delay: 0.28 },
                "aria-label": "Pinned resources",
                className: "lg:col-span-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-elevated rounded-xl overflow-hidden h-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { size: 15, style: { color: "oklch(0.78 0.17 70)" } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold font-display text-foreground", children: "Pinned Resources" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 flex flex-col gap-2", children: PINNED_RESOURCES.map((set, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: 10 },
                      animate: { opacity: 1, x: 0 },
                      transition: { duration: 0.2, delay: 0.3 + index * 0.07 },
                      "data-ocid": `pinned.item.${index + 1}`,
                      className: cn(
                        "group p-3 rounded-lg border border-border",
                        "hover:border-primary transition-smooth cursor-pointer"
                      ),
                      style: {
                        background: "oklch(0.15 0.012 260 / 0.6)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                              style: {
                                background: "oklch(0.62 0.18 270 / 0.12)",
                                border: "1px solid oklch(0.62 0.18 270 / 0.25)"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                BookOpen,
                                {
                                  size: 13,
                                  style: { color: "oklch(0.72 0.18 270)" }
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: set.title }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 truncate", children: set.subject })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-2 leading-relaxed line-clamp-2", children: set.aiSummary }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": `pinned.quiz_button.${index + 1}`,
                            onClick: () => setSelectedQuizSet(set),
                            className: cn(
                              "mt-2.5 w-full py-1.5 rounded-lg text-xs font-semibold transition-smooth",
                              "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              "hover:opacity-90"
                            ),
                            style: {
                              background: "oklch(0.62 0.18 270 / 0.1)",
                              borderColor: "oklch(0.62 0.18 270 / 0.3)",
                              color: "oklch(0.72 0.18 270)"
                            },
                            children: "Generate Quiz"
                          }
                        )
                      ]
                    },
                    set.id.toString()
                  )) })
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AiTutorSidebar,
          {
            open: sidebarOpen,
            onClose: () => setSidebarOpen(false)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuizModal,
          {
            studySet: selectedQuizSet,
            open: selectedQuizSet !== null,
            onClose: () => setSelectedQuizSet(null)
          }
        )
      ]
    }
  );
}
export {
  Dashboard as default
};
