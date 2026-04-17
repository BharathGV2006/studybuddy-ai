import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, q as Link, f as BookOpen, g as mockStudySets } from "./index-ByjJWIPe.js";
import { S as Sparkles, B as Brain, Q as QuizModal } from "./QuizModal-Bf4lEk65.js";
import { B as Button } from "./button-l8sA9bzf.js";
import { L as Languages, F as FlaskConical, C as Calculator } from "./languages-BzQa-v48.js";
import { C as Clock } from "./clock-CYHnsB2a.js";
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
const SUBJECT_CONFIG = {
  Mathematics: {
    label: "Math",
    className: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { size: 11 })
  },
  Chemistry: {
    label: "Science",
    className: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { size: 11 })
  },
  History: {
    label: "History",
    className: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 11 })
  },
  Languages: {
    label: "Languages",
    className: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { size: 11 })
  },
  "Artificial Intelligence": {
    label: "AI",
    className: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { size: 11 })
  }
};
const DEFAULT_SUBJECT = {
  label: "CS",
  className: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 11 })
};
function getSubjectConfig(subject) {
  return SUBJECT_CONFIG[subject] ?? DEFAULT_SUBJECT;
}
function SmartCard({ studySet, index, onGenerateQuiz }) {
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const config = getSubjectConfig(studySet.subject);
  const hasQuiz = studySet.quizQuestions.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `resources.card.${index + 1}`,
      className: "group relative flex flex-col rounded-xl border transition-all duration-200",
      style: {
        background: "oklch(0.18 0.014 260 / 0.6)",
        borderColor: isHovered ? "oklch(0.62 0.18 270 / 0.35)" : "oklch(0.28 0.02 260 / 0.5)",
        boxShadow: isHovered ? "0 8px 32px oklch(0.62 0.18 270 / 0.18), 0 2px 8px oklch(0 0 0 / 0.3)" : "0 2px 8px oklch(0 0 0 / 0.2)",
        backdropFilter: "blur(12px)"
      },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-px rounded-t-xl transition-opacity duration-200",
            style: {
              background: "linear-gradient(90deg, transparent, oklch(0.62 0.18 270 / 0.6), transparent)",
              opacity: isHovered ? 1 : 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-5 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${config.className}`,
                children: [
                  config.icon,
                  config.label !== studySet.subject ? studySet.subject : config.label
                ]
              }
            ),
            hasQuiz && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              studySet.quizQuestions.length,
              "Q"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/resources/$id",
              params: { id: studySet.id.toString() },
              "data-ocid": `resources.card.${index + 1}.link`,
              className: "block",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-[15px] text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2", children: studySet.title })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[13px] leading-relaxed line-clamp-3 flex-1", children: studySet.aiSummary || "No AI summary available for this study set yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, className: "text-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: "AI-generated summary" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-5 py-3 border-t flex items-center gap-2",
            style: { borderColor: "oklch(0.28 0.02 260 / 0.4)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  "data-ocid": `resources.generate_quiz_button.${index + 1}`,
                  className: "flex-1 h-8 text-[13px] font-medium transition-all duration-200",
                  style: {
                    background: hasQuiz ? "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))" : "oklch(0.22 0.02 260)",
                    color: hasQuiz ? "oklch(0.95 0.01 260)" : "oklch(0.45 0.01 260)",
                    cursor: hasQuiz ? "pointer" : "not-allowed",
                    border: hasQuiz ? "none" : "1px solid oklch(0.28 0.02 260)"
                  },
                  onClick: () => hasQuiz && onGenerateQuiz(studySet),
                  disabled: !hasQuiz,
                  title: !hasQuiz ? "No quiz questions available for this study set" : void 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13, className: "mr-1.5" }),
                    "Generate Quiz"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/resources/$id",
                  params: { id: studySet.id.toString() },
                  "data-ocid": `resources.view_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "h-8 w-8 p-0 text-muted-foreground hover:text-foreground",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 14 })
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const SUBJECTS = [
  "All",
  "Computer Science",
  "Mathematics",
  "Chemistry",
  "History",
  "Artificial Intelligence"
];
function Resources() {
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const [quizTarget, setQuizTarget] = reactExports.useState(null);
  const [quizOpen, setQuizOpen] = reactExports.useState(false);
  const filtered = activeFilter === "All" ? mockStudySets : mockStudySets.filter((s) => s.subject === activeFilter);
  const handleGenerateQuiz = (studySet) => {
    setQuizTarget(studySet);
    setQuizOpen(true);
  };
  const handleCloseQuiz = () => {
    setQuizOpen(false);
    setTimeout(() => setQuizTarget(null), 300);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-6 py-6 border-b",
        style: {
          background: "oklch(0.18 0.014 260 / 0.7)",
          borderColor: "oklch(0.28 0.02 260 / 0.5)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-8 w-8 items-center justify-center rounded-lg",
                    style: {
                      background: "oklch(0.62 0.18 270 / 0.15)",
                      border: "1px solid oklch(0.62 0.18 270 / 0.25)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 16, style: { color: "oklch(0.75 0.15 270)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-semibold text-foreground tracking-tight", children: "Smart Resources" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground ml-10", children: "AI-powered study sets with instant quiz generation" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[12px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 13, style: { color: "oklch(0.62 0.18 270)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                mockStudySets.length,
                " study sets"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "resources.filter.tab",
              className: "flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 scrollbar-hide",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 13, className: "shrink-0 text-muted-foreground mr-1" }),
                SUBJECTS.map((subject) => {
                  const isActive = activeFilter === subject;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveFilter(subject),
                      className: "shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-200 whitespace-nowrap",
                      style: {
                        background: isActive ? "oklch(0.62 0.18 270 / 0.2)" : "oklch(0.22 0.02 260)",
                        color: isActive ? "oklch(0.75 0.15 270)" : "oklch(0.55 0.01 260)",
                        border: `1px solid ${isActive ? "oklch(0.62 0.18 270 / 0.4)" : "oklch(0.28 0.02 260 / 0.6)"}`
                      },
                      children: subject
                    },
                    subject
                  );
                })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-6", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "resources.empty_state",
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
              style: {
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260 / 0.6)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 24, className: "text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-[16px] font-semibold text-foreground mb-1", children: "No resources found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground max-w-xs", children: "No study sets match the selected subject filter. Try selecting a different category." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "mt-4",
              onClick: () => setActiveFilter("All"),
              children: "Show all resources"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "resources.list",
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        children: filtered.map((studySet, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          SmartCard,
          {
            studySet,
            index: idx,
            onGenerateQuiz: handleGenerateQuiz
          },
          studySet.id.toString()
        ))
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizModal,
      {
        studySet: quizTarget,
        open: quizOpen,
        onClose: handleCloseQuiz
      }
    )
  ] });
}
export {
  Resources as default
};
