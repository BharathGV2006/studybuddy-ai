import { QuizModal } from "@/components/QuizModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockStudySets } from "@/data/mockData";
import type { StudySet } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Languages,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const SUBJECT_STYLES: Record<string, { chip: string; dot: string }> = {
  Mathematics: {
    chip: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    dot: "oklch(0.62 0.18 270)",
  },
  Chemistry: {
    chip: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    dot: "oklch(0.65 0.18 220)",
  },
  History: {
    chip: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    dot: "oklch(0.75 0.15 70)",
  },
  Languages: {
    chip: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    dot: "oklch(0.65 0.15 180)",
  },
  "Artificial Intelligence": {
    chip: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    dot: "oklch(0.62 0.2 300)",
  },
};

const DEFAULT_STYLE = {
  chip: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  dot: "oklch(0.62 0.18 270)",
};

function SubjectIcon({ subject }: { subject: string }) {
  const props = { size: 14 };
  switch (subject) {
    case "Mathematics":
      return <Calculator {...props} />;
    case "Chemistry":
      return <FlaskConical {...props} />;
    case "History":
      return <Clock {...props} />;
    case "Languages":
      return <Languages {...props} />;
    case "Artificial Intelligence":
      return <Brain {...props} />;
    default:
      return <BookOpen {...props} />;
  }
}

function QuizAnswerCard({ studySet }: { studySet: StudySet }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  if (studySet.quizQuestions.length === 0) {
    return (
      <div
        data-ocid="resource_detail.quiz_empty_state"
        className="flex items-center gap-3 rounded-xl px-4 py-4"
        style={{
          background: "oklch(0.22 0.02 260)",
          border: "1px solid oklch(0.28 0.02 260 / 0.5)",
        }}
      >
        <Sparkles size={16} className="text-muted-foreground shrink-0" />
        <p className="text-[13px] text-muted-foreground">
          No quiz questions available yet. AI is still generating questions for
          this topic.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3" data-ocid="resource_detail.quiz_list">
      {studySet.quizQuestions.map((q, idx) => {
        const correctIdx = Number(q.correctIndex);
        const isOpen = expanded === idx;

        return (
          <div
            key={q.id.toString()}
            data-ocid={`resource_detail.quiz_item.${idx + 1}`}
            className="rounded-xl overflow-hidden transition-all duration-200"
            style={{
              border: `1px solid ${isOpen ? "oklch(0.62 0.18 270 / 0.25)" : "oklch(0.28 0.02 260 / 0.5)"}`,
              background: "oklch(0.18 0.014 260 / 0.8)",
            }}
          >
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors duration-150"
              style={{ color: "oklch(0.85 0.01 260)" }}
              onClick={() => setExpanded(isOpen ? null : idx)}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  background: "oklch(0.62 0.18 270 / 0.15)",
                  color: "oklch(0.62 0.18 270)",
                }}
              >
                {idx + 1}
              </span>
              <span className="flex-1 text-[14px] font-medium">
                {q.question}
              </span>
              {isOpen ? (
                <ChevronUp
                  size={15}
                  className="shrink-0 text-muted-foreground"
                />
              ) : (
                <ChevronDown
                  size={15}
                  className="shrink-0 text-muted-foreground"
                />
              )}
            </button>

            {isOpen && (
              <div
                className="px-4 pb-4 flex flex-col gap-2"
                style={{ borderTop: "1px solid oklch(0.28 0.02 260 / 0.3)" }}
              >
                <p className="text-[11px] text-muted-foreground pt-3 pb-1 uppercase tracking-wider">
                  Answer options
                </p>
                {q.options.map((opt, optIdx) => {
                  const isCorrect = optIdx === correctIdx;
                  return (
                    <div
                      key={opt}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                      style={{
                        background: isCorrect
                          ? "oklch(0.35 0.12 142 / 0.15)"
                          : "oklch(0.22 0.02 260 / 0.5)",
                        border: `1px solid ${isCorrect ? "oklch(0.55 0.15 142 / 0.4)" : "oklch(0.28 0.02 260 / 0.4)"}`,
                      }}
                    >
                      {isCorrect ? (
                        <CheckCircle2
                          size={14}
                          style={{
                            color: "oklch(0.65 0.15 142)",
                            flexShrink: 0,
                          }}
                        />
                      ) : (
                        <XCircle
                          size={14}
                          style={{
                            color: "oklch(0.45 0.05 260)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span
                        className="text-[13px]"
                        style={{
                          color: isCorrect
                            ? "oklch(0.78 0.12 142)"
                            : "oklch(0.55 0.01 260)",
                        }}
                      >
                        {opt}
                      </span>
                      {isCorrect && (
                        <Badge
                          className="ml-auto text-[10px] px-1.5 py-0"
                          style={{
                            background: "oklch(0.35 0.12 142 / 0.2)",
                            color: "oklch(0.65 0.15 142)",
                            border: "1px solid oklch(0.55 0.15 142 / 0.3)",
                          }}
                        >
                          Correct
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ResourceDetail() {
  const { id } = useParams({ from: "/layout/resources/$id" });
  const [quizOpen, setQuizOpen] = useState(false);

  const studySet = mockStudySets.find((s) => s.id.toString() === id);
  const subjectStyle = studySet
    ? (SUBJECT_STYLES[studySet.subject] ?? DEFAULT_STYLE)
    : DEFAULT_STYLE;

  if (!studySet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: "oklch(0.22 0.02 260)",
            border: "1px solid oklch(0.28 0.02 260 / 0.6)",
          }}
        >
          <BookOpen size={24} className="text-muted-foreground" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">
          Resource not found
        </h2>
        <p className="text-[13px] text-muted-foreground mb-5">
          This study set doesn't exist or has been removed.
        </p>
        <Link to="/resources">
          <Button size="sm" data-ocid="resource_detail.back_button">
            <ArrowLeft size={14} className="mr-1.5" />
            Back to Resources
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Top bar */}
      <div
        className="px-6 py-4 border-b flex items-center gap-3"
        style={{
          background: "oklch(0.18 0.014 260 / 0.7)",
          borderColor: "oklch(0.28 0.02 260 / 0.5)",
        }}
      >
        <Link to="/resources">
          <Button
            size="sm"
            variant="ghost"
            data-ocid="resource_detail.back_button"
            className="h-8 px-2.5 text-muted-foreground hover:text-foreground gap-1.5"
          >
            <ArrowLeft size={14} />
            Resources
          </Button>
        </Link>
        <span className="text-muted-foreground text-[13px]">/</span>
        <span className="text-[13px] text-foreground truncate max-w-[200px]">
          {studySet.title}
        </span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 max-w-3xl w-full mx-auto">
        {/* Hero section */}
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            background: "oklch(0.18 0.014 260 / 0.8)",
            border: "1px solid oklch(0.28 0.02 260 / 0.5)",
          }}
        >
          {/* Gradient accent top */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${subjectStyle.dot}, transparent)`,
            }}
          />

          <div className="px-6 py-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                {/* Subject tag */}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border mb-3 ${subjectStyle.chip}`}
                >
                  <SubjectIcon subject={studySet.subject} />
                  {studySet.subject}
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
                  {studySet.title}
                </h1>

                <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
                  <span>{studySet.quizQuestions.length} quiz questions</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Sparkles
                      size={11}
                      style={{ color: "oklch(0.62 0.18 270)" }}
                    />
                    <span>AI-analyzed</span>
                  </div>
                </div>
              </div>

              {studySet.quizQuestions.length > 0 && (
                <Button
                  data-ocid="resource_detail.generate_quiz_button"
                  className="shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))",
                    color: "oklch(0.95 0.01 260)",
                    boxShadow: "0 4px 16px oklch(0.62 0.18 270 / 0.25)",
                  }}
                  onClick={() => setQuizOpen(true)}
                >
                  <Sparkles size={15} className="mr-2" />
                  Generate Quiz
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <section data-ocid="resource_detail.summary_section">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{
                background: "oklch(0.62 0.18 270 / 0.15)",
                border: "1px solid oklch(0.62 0.18 270 / 0.25)",
              }}
            >
              <Sparkles size={12} style={{ color: "oklch(0.75 0.15 270)" }} />
            </div>
            <h2 className="font-display text-[15px] font-semibold text-foreground">
              AI Summary
            </h2>
          </div>
          <div
            className="rounded-xl px-5 py-4"
            style={{
              background: "oklch(0.18 0.014 260 / 0.6)",
              border: "1px solid oklch(0.62 0.18 270 / 0.12)",
              borderLeft: `3px solid ${subjectStyle.dot}`,
            }}
          >
            <p className="text-[14px] text-foreground leading-relaxed">
              {studySet.aiSummary ||
                "No AI summary available yet. Check back after the AI has finished analyzing this study set."}
            </p>
          </div>
        </section>

        {/* Quiz questions */}
        <section data-ocid="resource_detail.questions_section">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{
                  background: "oklch(0.22 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260 / 0.6)",
                }}
              >
                <BookOpen size={12} className="text-muted-foreground" />
              </div>
              <h2 className="font-display text-[15px] font-semibold text-foreground">
                Quiz Questions
              </h2>
            </div>
            {studySet.quizQuestions.length > 0 && (
              <Badge
                className="text-[11px]"
                style={{
                  background: "oklch(0.22 0.02 260)",
                  color: "oklch(0.55 0.01 260)",
                  border: "1px solid oklch(0.28 0.02 260 / 0.6)",
                }}
              >
                {studySet.quizQuestions.length} question
                {studySet.quizQuestions.length !== 1 ? "s" : ""}
              </Badge>
            )}
          </div>
          <QuizAnswerCard studySet={studySet} />
        </section>

        {/* Bottom CTA */}
        {studySet.quizQuestions.length > 0 && (
          <div
            className="rounded-xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap"
            style={{
              background: "oklch(0.62 0.18 270 / 0.06)",
              border: "1px solid oklch(0.62 0.18 270 / 0.15)",
            }}
          >
            <div>
              <p className="font-display text-[14px] font-semibold text-foreground">
                Ready to test yourself?
              </p>
              <p className="text-[12px] text-muted-foreground">
                Take the interactive quiz with instant feedback
              </p>
            </div>
            <Button
              data-ocid="resource_detail.start_quiz_button"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))",
                color: "oklch(0.95 0.01 260)",
              }}
              onClick={() => setQuizOpen(true)}
            >
              <Sparkles size={15} className="mr-2" />
              Start Quiz
            </Button>
          </div>
        )}
      </div>

      <QuizModal
        studySet={studySet}
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
      />
    </div>
  );
}
