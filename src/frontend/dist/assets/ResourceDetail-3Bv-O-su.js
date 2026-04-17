import { c as createLucideIcon, p as useParams, r as reactExports, e as mockStudySets, j as jsxRuntimeExports, d as BookOpen, o as Link, C as ChevronDown } from "./index-D-Ffb-dF.js";
import { S as Sparkles, b as Badge, Q as QuizModal, B as Brain, C as CircleCheck, c as CircleX } from "./QuizModal-eyH2Tk1D.js";
import { B as Button } from "./button-DH7WpwP0.js";
import { A as ArrowLeft } from "./arrow-left-C8HGKXGO.js";
import { L as Languages, F as FlaskConical, C as Calculator } from "./languages-sy1C6g7I.js";
import { C as Clock } from "./clock-CaNC5c_4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode);
const SUBJECT_STYLES = {
  Mathematics: {
    chip: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    dot: "oklch(0.62 0.18 270)"
  },
  Chemistry: {
    chip: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    dot: "oklch(0.65 0.18 220)"
  },
  History: {
    chip: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    dot: "oklch(0.75 0.15 70)"
  },
  Languages: {
    chip: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    dot: "oklch(0.65 0.15 180)"
  },
  "Artificial Intelligence": {
    chip: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    dot: "oklch(0.62 0.2 300)"
  }
};
const DEFAULT_STYLE = {
  chip: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  dot: "oklch(0.62 0.18 270)"
};
function SubjectIcon({ subject }) {
  const props = { size: 14 };
  switch (subject) {
    case "Mathematics":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { ...props });
    case "Chemistry":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { ...props });
    case "History":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { ...props });
    case "Languages":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { ...props });
    case "Artificial Intelligence":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { ...props });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { ...props });
  }
}
function QuizAnswerCard({ studySet }) {
  const [expanded, setExpanded] = reactExports.useState(null);
  if (studySet.quizQuestions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "resource_detail.quiz_empty_state",
        className: "flex items-center gap-3 rounded-xl px-4 py-4",
        style: {
          background: "oklch(0.22 0.02 260)",
          border: "1px solid oklch(0.28 0.02 260 / 0.5)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16, className: "text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground", children: "No quiz questions available yet. AI is still generating questions for this topic." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "resource_detail.quiz_list", children: studySet.quizQuestions.map((q, idx) => {
    const correctIdx = Number(q.correctIndex);
    const isOpen = expanded === idx;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": `resource_detail.quiz_item.${idx + 1}`,
        className: "rounded-xl overflow-hidden transition-all duration-200",
        style: {
          border: `1px solid ${isOpen ? "oklch(0.62 0.18 270 / 0.25)" : "oklch(0.28 0.02 260 / 0.5)"}`,
          background: "oklch(0.18 0.014 260 / 0.8)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-150",
              style: { color: "oklch(0.85 0.01 260)" },
              onClick: () => setExpanded(isOpen ? null : idx),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                    style: {
                      background: "oklch(0.62 0.18 270 / 0.15)",
                      color: "oklch(0.62 0.18 270)"
                    },
                    children: idx + 1
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-[14px] font-medium", children: q.question }),
                isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronUp,
                  {
                    size: 15,
                    className: "shrink-0 text-muted-foreground"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 15,
                    className: "shrink-0 text-muted-foreground"
                  }
                )
              ]
            }
          ),
          isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-4 pb-4 flex flex-col gap-2",
              style: { borderTop: "1px solid oklch(0.28 0.02 260 / 0.3)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground pt-3 pb-1 uppercase tracking-wider", children: "Answer options" }),
                q.options.map((opt, optIdx) => {
                  const isCorrect = optIdx === correctIdx;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2.5 rounded-lg px-3 py-2",
                      style: {
                        background: isCorrect ? "oklch(0.35 0.12 142 / 0.15)" : "oklch(0.22 0.02 260 / 0.5)",
                        border: `1px solid ${isCorrect ? "oklch(0.55 0.15 142 / 0.4)" : "oklch(0.28 0.02 260 / 0.4)"}`
                      },
                      children: [
                        isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            size: 14,
                            style: {
                              color: "oklch(0.65 0.15 142)",
                              flexShrink: 0
                            }
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleX,
                          {
                            size: 14,
                            style: {
                              color: "oklch(0.45 0.05 260)",
                              flexShrink: 0
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[13px]",
                            style: {
                              color: isCorrect ? "oklch(0.78 0.12 142)" : "oklch(0.55 0.01 260)"
                            },
                            children: opt
                          }
                        ),
                        isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            className: "ml-auto text-[10px] px-1.5 py-0",
                            style: {
                              background: "oklch(0.35 0.12 142 / 0.2)",
                              color: "oklch(0.65 0.15 142)",
                              border: "1px solid oklch(0.55 0.15 142 / 0.3)"
                            },
                            children: "Correct"
                          }
                        )
                      ]
                    },
                    opt
                  );
                })
              ]
            }
          )
        ]
      },
      q.id.toString()
    );
  }) });
}
function ResourceDetail() {
  const { id } = useParams({ from: "/layout/resources/$id" });
  const [quizOpen, setQuizOpen] = reactExports.useState(false);
  const studySet = mockStudySets.find((s) => s.id.toString() === id);
  const subjectStyle = studySet ? SUBJECT_STYLES[studySet.subject] ?? DEFAULT_STYLE : DEFAULT_STYLE;
  if (!studySet) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] p-6 text-center", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Resource not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground mb-5", children: "This study set doesn't exist or has been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/resources", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", "data-ocid": "resource_detail.back_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14, className: "mr-1.5" }),
        "Back to Resources"
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-6 py-4 border-b flex items-center gap-3",
        style: {
          background: "oklch(0.18 0.014 260 / 0.7)",
          borderColor: "oklch(0.28 0.02 260 / 0.5)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/resources", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              "data-ocid": "resource_detail.back_button",
              className: "h-8 px-2.5 text-muted-foreground hover:text-foreground gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                "Resources"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-[13px]", children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] text-foreground truncate max-w-[200px]", children: studySet.title })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 flex flex-col gap-6 max-w-3xl w-full mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl overflow-hidden relative",
          style: {
            background: "oklch(0.18 0.014 260 / 0.8)",
            border: "1px solid oklch(0.28 0.02 260 / 0.5)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 left-0 right-0 h-1",
                style: {
                  background: `linear-gradient(90deg, transparent, ${subjectStyle.dot}, transparent)`
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border mb-3 ${subjectStyle.chip}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SubjectIcon, { subject: studySet.subject }),
                      studySet.subject
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3", children: studySet.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[12px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    studySet.quizQuestions.length,
                    " quiz questions"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Sparkles,
                      {
                        size: 11,
                        style: { color: "oklch(0.62 0.18 270)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI-analyzed" })
                  ] })
                ] })
              ] }),
              studySet.quizQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "resource_detail.generate_quiz_button",
                  className: "shrink-0",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))",
                    color: "oklch(0.95 0.01 260)",
                    boxShadow: "0 4px 16px oklch(0.62 0.18 270 / 0.25)"
                  },
                  onClick: () => setQuizOpen(true),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15, className: "mr-2" }),
                    "Generate Quiz"
                  ]
                }
              )
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "resource_detail.summary_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-6 w-6 items-center justify-center rounded-md",
              style: {
                background: "oklch(0.62 0.18 270 / 0.15)",
                border: "1px solid oklch(0.62 0.18 270 / 0.25)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 12, style: { color: "oklch(0.75 0.15 270)" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[15px] font-semibold text-foreground", children: "AI Summary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl px-5 py-4",
            style: {
              background: "oklch(0.18 0.014 260 / 0.6)",
              border: "1px solid oklch(0.62 0.18 270 / 0.12)",
              borderLeft: `3px solid ${subjectStyle.dot}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] text-foreground leading-relaxed", children: studySet.aiSummary || "No AI summary available yet. Check back after the AI has finished analyzing this study set." })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "resource_detail.questions_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-6 w-6 items-center justify-center rounded-md",
                style: {
                  background: "oklch(0.22 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260 / 0.6)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 12, className: "text-muted-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[15px] font-semibold text-foreground", children: "Quiz Questions" })
          ] }),
          studySet.quizQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: "text-[11px]",
              style: {
                background: "oklch(0.22 0.02 260)",
                color: "oklch(0.55 0.01 260)",
                border: "1px solid oklch(0.28 0.02 260 / 0.6)"
              },
              children: [
                studySet.quizQuestions.length,
                " question",
                studySet.quizQuestions.length !== 1 ? "s" : ""
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(QuizAnswerCard, { studySet })
      ] }),
      studySet.quizQuestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap",
          style: {
            background: "oklch(0.62 0.18 270 / 0.06)",
            border: "1px solid oklch(0.62 0.18 270 / 0.15)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[14px] font-semibold text-foreground", children: "Ready to test yourself?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Take the interactive quiz with instant feedback" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "resource_detail.start_quiz_button",
                style: {
                  background: "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))",
                  color: "oklch(0.95 0.01 260)"
                },
                onClick: () => setQuizOpen(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15, className: "mr-2" }),
                  "Start Quiz"
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QuizModal,
      {
        studySet,
        open: quizOpen,
        onClose: () => setQuizOpen(false)
      }
    )
  ] });
}
export {
  ResourceDetail as default
};
