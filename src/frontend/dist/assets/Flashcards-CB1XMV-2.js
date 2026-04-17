import { j as jsxRuntimeExports, r as reactExports, E as mockFlashcardDecks } from "./index-ByjJWIPe.js";
const SUBJECT_COLORS = {
  "Computer Science": "oklch(0.62 0.18 270)",
  "Artificial Intelligence": "oklch(0.65 0.2 300)",
  Mathematics: "oklch(0.65 0.18 240)",
  "Web Development": "oklch(0.62 0.2 200)"
};
function getSubjectColor(subject) {
  return SUBJECT_COLORS[subject] ?? "oklch(0.62 0.15 270)";
}
const SUBJECT_ICONS = {
  "Computer Science": "⚡",
  "Artificial Intelligence": "🤖",
  Mathematics: "∑",
  "Web Development": "🌐"
};
function getSubjectIcon(subject) {
  return SUBJECT_ICONS[subject] ?? "📚";
}
function DeckSelector({ decks, progress, onSelect }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", "data-ocid": "deck_selector.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Flashcard Decks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
        decks.length,
        " decks · Tap a deck to start studying"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: decks.map((deck, i) => {
      const deckProgress = progress.find((p) => p.deckId === deck.id);
      const progressPct = deckProgress ? Math.round(deckProgress.correct / deckProgress.total * 100) : null;
      const color = getSubjectColor(deck.subject);
      const icon = getSubjectIcon(deck.subject);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelect(deck),
          className: "group text-left rounded-2xl p-5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          style: {
            background: "oklch(0.18 0.014 260 / 0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid oklch(0.28 0.02 260 / 0.4)"
          },
          "data-ocid": `deck_selector.item.${i + 1}`,
          "aria-label": `Study ${deck.title}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-11 h-11 rounded-xl flex items-center justify-center text-xl",
                  style: {
                    background: `${color}22`,
                    border: `1px solid ${color}44`
                  },
                  children: icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-semibold px-2.5 py-1 rounded-full",
                  style: {
                    background: `${color}22`,
                    color,
                    border: `1px solid ${color}33`
                  },
                  children: [
                    deck.cards.length,
                    " cards"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth", children: deck.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: deck.subject }),
            progressPct !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color }, children: [
                  progressPct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1.5 rounded-full",
                  style: { background: "oklch(0.28 0.02 260)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full rounded-full transition-all duration-500",
                      style: { width: `${progressPct}%`, background: color }
                    }
                  )
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Not started yet" }) })
          ]
        },
        String(deck.id)
      );
    }) })
  ] });
}
function FlashCard({
  card,
  cardIndex,
  totalCards,
  onResult
}) {
  const [isFlipped, setIsFlipped] = reactExports.useState(false);
  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };
  const handleResult = (correct) => {
    setIsFlipped(false);
    setTimeout(() => onResult(correct), 50);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "w-full cursor-pointer bg-transparent border-0 p-0 text-left",
        style: { perspective: "1200px" },
        onClick: handleFlip,
        "aria-label": isFlipped ? "Card answer visible" : "Tap to reveal answer",
        "data-ocid": "flashcard.canvas_target",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative w-full",
            style: {
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.4s ease-out",
              minHeight: "260px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 rounded-2xl glass flex flex-col items-center justify-center p-8 text-center",
                  style: {
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary uppercase tracking-widest mb-4", children: [
                      "Question ",
                      cardIndex + 1,
                      " of ",
                      totalCards
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-semibold text-foreground leading-snug", children: card.question }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-6", children: "Tap anywhere to reveal" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 text-center",
                  style: {
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "oklch(0.22 0.06 270 / 0.85)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid oklch(0.62 0.18 270 / 0.3)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-widest mb-4", children: "Answer" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-foreground leading-relaxed", children: card.answer })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-full mt-5 transition-all duration-300",
        style: {
          opacity: isFlipped ? 1 : 0,
          transform: isFlipped ? "translateY(0)" : "translateY(8px)",
          pointerEvents: isFlipped ? "auto" : "none"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleResult(false),
              className: "flex items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              style: {
                background: "oklch(0.45 0.18 25 / 0.2)",
                border: "1px solid oklch(0.55 0.2 25 / 0.4)",
                color: "oklch(0.8 0.15 25)"
              },
              "aria-label": "Mark as incorrect",
              "data-ocid": "flashcard.incorrect_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "✗" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Incorrect" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleResult(true),
              className: "flex items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              style: {
                background: "oklch(0.45 0.18 145 / 0.2)",
                border: "1px solid oklch(0.55 0.2 145 / 0.4)",
                color: "oklch(0.8 0.15 145)"
              },
              "aria-label": "Mark as correct",
              "data-ocid": "flashcard.correct_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Correct" })
              ]
            }
          )
        ] })
      }
    ),
    !isFlipped && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground text-center", children: "Click the card to reveal the answer" })
  ] });
}
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}
function StatBubble({ value, label, color, bgColor }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center rounded-2xl p-5",
      style: { background: bgColor, border: `1px solid ${color}33` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-bold", style: { color }, children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-1 text-center", children: label })
      ]
    }
  );
}
function StudySummary({
  deckTitle,
  correct,
  incorrect,
  totalCards,
  elapsedSeconds,
  onStudyAgain,
  onBack
}) {
  const accuracy = totalCards > 0 ? Math.round(correct / totalCards * 100) : 0;
  let grade = "Keep Going!";
  let gradeColor = "oklch(0.7 0.18 25)";
  if (accuracy >= 90) {
    grade = "Excellent!";
    gradeColor = "oklch(0.75 0.18 145)";
  } else if (accuracy >= 70) {
    grade = "Great Work!";
    gradeColor = "oklch(0.75 0.18 200)";
  } else if (accuracy >= 50) {
    grade = "Good Effort!";
    gradeColor = "oklch(0.78 0.18 70)";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center w-full",
      "data-ocid": "study_summary.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4",
              style: {
                background: "oklch(0.22 0.06 270 / 0.5)",
                border: "2px solid oklch(0.62 0.18 270 / 0.4)",
                boxShadow: "0 0 32px oklch(0.62 0.18 270 / 0.2)"
              },
              children: "🎓"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Session Complete!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 truncate max-w-xs", children: deckTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "mt-3 inline-block text-sm font-semibold px-4 py-1.5 rounded-full",
              style: {
                color: gradeColor,
                background: `${gradeColor}22`,
                border: `1px solid ${gradeColor}44`
              },
              children: grade
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 w-full mb-6 sm:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBubble,
            {
              value: correct,
              label: "Correct",
              color: "oklch(0.75 0.18 145)",
              bgColor: "oklch(0.45 0.18 145 / 0.12)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBubble,
            {
              value: incorrect,
              label: "Incorrect",
              color: "oklch(0.75 0.18 25)",
              bgColor: "oklch(0.45 0.18 25 / 0.12)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBubble,
            {
              value: `${accuracy}%`,
              label: "Accuracy",
              color: "oklch(0.78 0.18 200)",
              bgColor: "oklch(0.45 0.18 200 / 0.12)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatBubble,
            {
              value: formatTime(elapsedSeconds),
              label: "Time",
              color: "oklch(0.78 0.18 70)",
              bgColor: "oklch(0.45 0.18 70 / 0.12)"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Accuracy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              accuracy,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-2.5 rounded-full",
              style: { background: "oklch(0.22 0.02 260)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full transition-all duration-700",
                  style: {
                    width: `${accuracy}%`,
                    background: accuracy >= 70 ? "linear-gradient(90deg, oklch(0.62 0.18 145), oklch(0.72 0.18 170))" : "linear-gradient(90deg, oklch(0.62 0.18 25), oklch(0.72 0.18 50))"
                  }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onStudyAgain,
              className: "w-full py-4 rounded-xl font-display font-semibold text-base transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glow-indigo",
              style: {
                background: "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))",
                color: "oklch(0.97 0.01 270)"
              },
              "data-ocid": "study_summary.study_again_button",
              children: "Study Again"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onBack,
              className: "w-full py-4 rounded-xl font-semibold text-sm text-muted-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              style: {
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260)"
              },
              "data-ocid": "study_summary.back_button",
              children: "Back to Decks"
            }
          )
        ] })
      ]
    }
  );
}
function Flashcards() {
  const [phase, setPhase] = reactExports.useState("select");
  const [selectedDeck, setSelectedDeck] = reactExports.useState(null);
  const [cardIndex, setCardIndex] = reactExports.useState(0);
  const [sessionResult, setSessionResult] = reactExports.useState({
    correct: 0,
    incorrect: 0,
    elapsedSeconds: 0
  });
  const [completedDecks, setCompletedDecks] = reactExports.useState([]);
  const startTimeRef = reactExports.useRef(Date.now());
  const [elapsed, setElapsed] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (phase !== "study") return;
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1e3)),
      1e3
    );
    return () => clearInterval(id);
  }, [phase]);
  const handleSelectDeck = (deck) => {
    setSelectedDeck(deck);
    setCardIndex(0);
    setSessionResult({ correct: 0, incorrect: 0, elapsedSeconds: 0 });
    startTimeRef.current = Date.now();
    setElapsed(0);
    setPhase("study");
  };
  const handleResult = (correct) => {
    const next = { ...sessionResult };
    if (correct) next.correct += 1;
    else next.incorrect += 1;
    setSessionResult(next);
    if (!selectedDeck) return;
    const nextIndex = cardIndex + 1;
    if (nextIndex >= selectedDeck.cards.length) {
      const finalElapsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1e3
      );
      const finalResult = { ...next, elapsedSeconds: finalElapsed };
      setSessionResult(finalResult);
      setCompletedDecks((prev) => {
        const filtered = prev.filter((p) => p.deckId !== selectedDeck.id);
        return [
          ...filtered,
          {
            deckId: selectedDeck.id,
            correct: next.correct,
            total: selectedDeck.cards.length
          }
        ];
      });
      setPhase("summary");
    } else {
      setCardIndex(nextIndex);
    }
  };
  const handleBack = () => {
    setSelectedDeck(null);
    setPhase("select");
  };
  const handleStudyAgain = () => {
    if (!selectedDeck) return;
    setCardIndex(0);
    setSessionResult({ correct: 0, incorrect: 0, elapsedSeconds: 0 });
    startTimeRef.current = Date.now();
    setElapsed(0);
    setPhase("study");
  };
  const handlePrev = () => {
    if (cardIndex > 0) setCardIndex((i) => i - 1);
  };
  const handleNext = () => {
    if (selectedDeck && cardIndex < selectedDeck.cards.length - 1) {
      setCardIndex((i) => i + 1);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-[calc(100vh-4rem)]",
      "data-ocid": "flashcards.page",
      children: [
        phase === "select" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-4 py-6 max-w-2xl mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeckSelector,
          {
            decks: mockFlashcardDecks,
            progress: completedDecks,
            onSelect: handleSelectDeck
          }
        ) }),
        phase === "study" && selectedDeck && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 w-full max-w-lg mx-auto px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleBack,
                className: "flex items-center justify-center w-10 h-10 rounded-xl transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                style: {
                  background: "oklch(0.22 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  color: "oklch(0.85 0.01 260)"
                },
                "aria-label": "Back to deck selection",
                "data-ocid": "flashcards.back_button",
                children: "←"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground truncate", children: selectedDeck.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: selectedDeck.subject })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono tabular-nums shrink-0", children: [
              String(Math.floor(elapsed / 60)).padStart(2, "0"),
              ":",
              String(elapsed % 60).padStart(2, "0")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", "data-ocid": "flashcards.progress_indicator", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Card ",
                cardIndex + 1,
                " of ",
                selectedDeck.cards.length
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Math.round(cardIndex / selectedDeck.cards.length * 100),
                "% done"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-1 rounded-full",
                style: { background: "oklch(0.22 0.02 260)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-all duration-400",
                    style: {
                      width: `${(cardIndex + 1) / selectedDeck.cards.length * 100}%`,
                      background: "linear-gradient(90deg, oklch(0.62 0.18 270), oklch(0.65 0.2 290))"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs",
                  style: { color: "oklch(0.75 0.18 145)" },
                  children: [
                    "✓ ",
                    sessionResult.correct
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs",
                  style: { color: "oklch(0.75 0.18 25)" },
                  children: [
                    "✗ ",
                    sessionResult.incorrect
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FlashCard,
            {
              card: selectedDeck.cards[cardIndex],
              cardIndex,
              totalCards: selectedDeck.cards.length,
              onResult: handleResult
            },
            String(selectedDeck.cards[cardIndex].id)
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handlePrev,
                disabled: cardIndex === 0,
                className: "flex-1 flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed",
                style: {
                  background: "oklch(0.22 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  color: "oklch(0.85 0.01 260)",
                  minHeight: "52px"
                },
                "aria-label": "Previous card",
                "data-ocid": "flashcards.prev_button",
                children: "← Prev"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleNext,
                disabled: cardIndex >= selectedDeck.cards.length - 1,
                className: "flex-1 flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed",
                style: {
                  background: "oklch(0.22 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  color: "oklch(0.85 0.01 260)",
                  minHeight: "52px"
                },
                "aria-label": "Next card",
                "data-ocid": "flashcards.next_button",
                children: "Next →"
              }
            )
          ] })
        ] }),
        phase === "summary" && selectedDeck && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-4 py-6 max-w-lg mx-auto w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StudySummary,
          {
            deckTitle: selectedDeck.title,
            correct: sessionResult.correct,
            incorrect: sessionResult.incorrect,
            totalCards: selectedDeck.cards.length,
            elapsedSeconds: sessionResult.elapsedSeconds,
            onStudyAgain: handleStudyAgain,
            onBack: handleBack
          }
        ) })
      ]
    }
  );
}
export {
  Flashcards as default
};
