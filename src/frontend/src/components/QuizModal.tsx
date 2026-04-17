import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { QuizQuestion, StudySet } from "@/types";
import {
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface QuizModalProps {
  studySet: StudySet | null;
  open: boolean;
  onClose: () => void;
}

type AnswerState = "unanswered" | "correct" | "wrong";

interface QuestionState {
  selectedIndex: number | null;
  state: AnswerState;
}

function QuizQuestionCard({
  question,
  qIndex,
  state,
  onSelect,
}: {
  question: QuizQuestion;
  qIndex: number;
  state: QuestionState;
  onSelect: (optionIdx: number) => void;
}) {
  const correctIdx = Number(question.correctIndex);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
          style={{
            background: "oklch(0.62 0.18 270 / 0.15)",
            color: "oklch(0.62 0.18 270)",
          }}
        >
          {qIndex + 1}
        </span>
        <p className="text-[14px] font-medium text-foreground leading-snug">
          {question.question}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 ml-7">
        {question.options.map((option, idx) => {
          const isSelected = state.selectedIndex === idx;
          const isCorrect = idx === correctIdx;
          const answered = state.state !== "unanswered";

          let style: React.CSSProperties = {
            background: "oklch(0.22 0.02 260)",
            borderColor: "oklch(0.28 0.02 260 / 0.6)",
            color: "oklch(0.75 0.01 260)",
          };

          if (answered && isCorrect) {
            style = {
              background: "oklch(0.35 0.12 142 / 0.2)",
              borderColor: "oklch(0.55 0.15 142 / 0.7)",
              color: "oklch(0.8 0.1 142)",
            };
          } else if (answered && isSelected && !isCorrect) {
            style = {
              background: "oklch(0.35 0.12 25 / 0.2)",
              borderColor: "oklch(0.55 0.2 25 / 0.7)",
              color: "oklch(0.75 0.1 25)",
            };
          } else if (!answered) {
            style = {
              background: "oklch(0.22 0.02 260)",
              borderColor: "oklch(0.28 0.02 260 / 0.6)",
              color: "oklch(0.75 0.01 260)",
              cursor: "pointer",
            };
          }

          return (
            <button
              key={option}
              type="button"
              data-ocid={`quiz.option.${qIndex + 1}.${idx + 1}`}
              className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-left text-[13px] transition-all duration-150 disabled:cursor-default"
              style={style}
              onClick={() => !answered && onSelect(idx)}
              disabled={answered}
              onMouseEnter={(e) => {
                if (!answered) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "oklch(0.62 0.18 270 / 0.5)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.95 0.01 260)";
                }
              }}
              onMouseLeave={(e) => {
                if (!answered) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "oklch(0.28 0.02 260 / 0.6)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.75 0.01 260)";
                }
              }}
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold"
                style={{
                  borderColor:
                    answered && isCorrect
                      ? "oklch(0.55 0.15 142)"
                      : answered && isSelected && !isCorrect
                        ? "oklch(0.55 0.2 25)"
                        : "oklch(0.35 0.02 260)",
                  color:
                    answered && isCorrect
                      ? "oklch(0.55 0.15 142)"
                      : answered && isSelected && !isCorrect
                        ? "oklch(0.55 0.2 25)"
                        : "oklch(0.55 0.01 260)",
                }}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>
              {answered && isCorrect && (
                <CheckCircle2
                  size={15}
                  style={{ color: "oklch(0.55 0.15 142)" }}
                />
              )}
              {answered && isSelected && !isCorrect && (
                <XCircle size={15} style={{ color: "oklch(0.55 0.2 25)" }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function QuizModal({ studySet, open, onClose }: QuizModalProps) {
  const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = studySet?.quizQuestions ?? [];

  const initStates = () =>
    questions.map(() => ({
      selectedIndex: null,
      state: "unanswered" as AnswerState,
    }));

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
      setTimeout(() => {
        setQuestionStates([]);
        setQuizComplete(false);
      }, 300);
    } else {
      setQuestionStates(initStates());
    }
  };

  // Initialize on open
  if (open && questionStates.length === 0 && questions.length > 0) {
    setQuestionStates(initStates());
  }

  const handleSelect = (qIndex: number, optionIdx: number) => {
    const correctIdx = Number(questions[qIndex].correctIndex);
    const isCorrect = optionIdx === correctIdx;
    const newStates = [...questionStates];
    newStates[qIndex] = {
      selectedIndex: optionIdx,
      state: isCorrect ? "correct" : "wrong",
    };
    setQuestionStates(newStates);

    // Check if all questions answered
    if (newStates.every((s) => s.state !== "unanswered")) {
      setTimeout(() => setQuizComplete(true), 600);
    }
  };

  const handleReset = () => {
    setQuestionStates(initStates());
    setQuizComplete(false);
  };

  const score = questionStates.filter((s) => s.state === "correct").length;
  const total = questions.length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-ocid="quiz.dialog"
        className="max-w-lg w-full p-0 overflow-hidden border-0"
        style={{
          background: "oklch(0.16 0.014 260)",
          border: "1px solid oklch(0.28 0.02 260 / 0.5)",
          boxShadow:
            "0 24px 64px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(0.62 0.18 270 / 0.08)",
        }}
      >
        {/* Indigo header */}
        <div
          className="px-6 py-4 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.28 0.1 270), oklch(0.22 0.08 260))",
            borderBottom: "1px solid oklch(0.62 0.18 270 / 0.2)",
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 80% 50%, oklch(0.62 0.18 270 / 0.3), transparent)",
            }}
          />
          <DialogHeader className="relative">
            <div className="flex items-center gap-2 mb-0.5">
              <Sparkles size={15} style={{ color: "oklch(0.75 0.15 270)" }} />
              <span
                className="text-[11px] font-medium uppercase tracking-wider"
                style={{ color: "oklch(0.65 0.12 270)" }}
              >
                AI Quiz
              </span>
            </div>
            <DialogTitle className="font-display text-[17px] font-semibold text-foreground leading-snug">
              {studySet?.title}
            </DialogTitle>
            <p
              className="text-[12px] mt-0.5"
              style={{ color: "oklch(0.65 0.01 260)" }}
            >
              {total} question{total !== 1 ? "s" : ""} · test your knowledge
            </p>
          </DialogHeader>
        </div>

        {/* Questions */}
        <div className="px-6 py-5 flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
          {questions.map((q, idx) => (
            <QuizQuestionCard
              key={q.id.toString()}
              question={q}
              qIndex={idx}
              state={
                questionStates[idx] ?? {
                  selectedIndex: null,
                  state: "unanswered",
                }
              }
              onSelect={(optionIdx) => handleSelect(idx, optionIdx)}
            />
          ))}
        </div>

        {/* Footer */}
        {quizComplete && (
          <div
            className="px-6 py-4 flex items-center justify-between border-t"
            style={{ borderColor: "oklch(0.28 0.02 260 / 0.4)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-muted-foreground">Score:</span>
              <Badge
                data-ocid="quiz.score_badge"
                className="font-bold text-[13px]"
                style={{
                  background:
                    score === total
                      ? "oklch(0.35 0.12 142 / 0.2)"
                      : "oklch(0.35 0.1 270 / 0.2)",
                  color:
                    score === total
                      ? "oklch(0.7 0.15 142)"
                      : "oklch(0.75 0.15 270)",
                  border: `1px solid ${score === total ? "oklch(0.55 0.15 142 / 0.4)" : "oklch(0.62 0.18 270 / 0.4)"}`,
                }}
              >
                {score}/{total}
              </Badge>
              {score === total && (
                <span
                  className="text-[12px]"
                  style={{ color: "oklch(0.7 0.15 142)" }}
                >
                  Perfect! 🎉
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                data-ocid="quiz.retry_button"
                className="h-8 text-[13px] text-muted-foreground hover:text-foreground"
                onClick={handleReset}
              >
                <RotateCcw size={13} className="mr-1.5" />
                Retry
              </Button>
              <Button
                size="sm"
                data-ocid="quiz.close_button"
                className="h-8 text-[13px]"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))",
                  color: "oklch(0.95 0.01 260)",
                }}
                onClick={onClose}
              >
                Done
                <ChevronRight size={13} className="ml-1" />
              </Button>
            </div>
          </div>
        )}

        {!quizComplete && (
          <div
            className="px-6 py-3 border-t flex justify-end"
            style={{ borderColor: "oklch(0.28 0.02 260 / 0.4)" }}
          >
            <Button
              size="sm"
              variant="ghost"
              data-ocid="quiz.cancel_button"
              className="h-8 text-[13px] text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
