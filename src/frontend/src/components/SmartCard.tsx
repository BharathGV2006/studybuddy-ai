import { Button } from "@/components/ui/button";
import type { StudySet } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  Calculator,
  Clock,
  FlaskConical,
  Languages,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

interface SubjectConfig {
  label: string;
  className: string;
  icon: React.ReactNode;
}

const SUBJECT_CONFIG: Record<string, SubjectConfig> = {
  Mathematics: {
    label: "Math",
    className: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    icon: <Calculator size={11} />,
  },
  Chemistry: {
    label: "Science",
    className: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    icon: <FlaskConical size={11} />,
  },
  History: {
    label: "History",
    className: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    icon: <Clock size={11} />,
  },
  Languages: {
    label: "Languages",
    className: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    icon: <Languages size={11} />,
  },
  "Artificial Intelligence": {
    label: "AI",
    className: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    icon: <Brain size={11} />,
  },
};

const DEFAULT_SUBJECT: SubjectConfig = {
  label: "CS",
  className: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  icon: <BookOpen size={11} />,
};

function getSubjectConfig(subject: string): SubjectConfig {
  return SUBJECT_CONFIG[subject] ?? DEFAULT_SUBJECT;
}

interface SmartCardProps {
  studySet: StudySet;
  index: number;
  onGenerateQuiz: (studySet: StudySet) => void;
}

export function SmartCard({ studySet, index, onGenerateQuiz }: SmartCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = getSubjectConfig(studySet.subject);
  const hasQuiz = studySet.quizQuestions.length > 0;

  return (
    <article
      data-ocid={`resources.card.${index + 1}`}
      className="group relative flex flex-col rounded-xl border transition-all duration-200"
      style={{
        background: "oklch(0.18 0.014 260 / 0.6)",
        borderColor: isHovered
          ? "oklch(0.62 0.18 270 / 0.35)"
          : "oklch(0.28 0.02 260 / 0.5)",
        boxShadow: isHovered
          ? "0 8px 32px oklch(0.62 0.18 270 / 0.18), 0 2px 8px oklch(0 0 0 / 0.3)"
          : "0 2px 8px oklch(0 0 0 / 0.2)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px rounded-t-xl transition-opacity duration-200"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.62 0.18 270 / 0.6), transparent)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Subject chip */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${config.className}`}
          >
            {config.icon}
            {config.label !== studySet.subject
              ? studySet.subject
              : config.label}
          </span>
          {hasQuiz && (
            <span className="text-[10px] text-muted-foreground">
              {studySet.quizQuestions.length}Q
            </span>
          )}
        </div>

        {/* Title */}
        <Link
          to="/resources/$id"
          params={{ id: studySet.id.toString() }}
          data-ocid={`resources.card.${index + 1}.link`}
          className="block"
        >
          <h3 className="font-display font-semibold text-[15px] text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {studySet.title}
          </h3>
        </Link>

        {/* AI Summary */}
        <p className="text-muted-foreground text-[13px] leading-relaxed line-clamp-3 flex-1">
          {studySet.aiSummary ||
            "No AI summary available for this study set yet."}
        </p>

        {/* AI indicator */}
        <div className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-primary/60" />
          <span className="text-[11px] text-muted-foreground">
            AI-generated summary
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-5 py-3 border-t flex items-center gap-2"
        style={{ borderColor: "oklch(0.28 0.02 260 / 0.4)" }}
      >
        <Button
          size="sm"
          data-ocid={`resources.generate_quiz_button.${index + 1}`}
          className="flex-1 h-8 text-[13px] font-medium transition-all duration-200"
          style={{
            background: hasQuiz
              ? "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))"
              : "oklch(0.22 0.02 260)",
            color: hasQuiz ? "oklch(0.95 0.01 260)" : "oklch(0.45 0.01 260)",
            cursor: hasQuiz ? "pointer" : "not-allowed",
            border: hasQuiz ? "none" : "1px solid oklch(0.28 0.02 260)",
          }}
          onClick={() => hasQuiz && onGenerateQuiz(studySet)}
          disabled={!hasQuiz}
          title={
            !hasQuiz
              ? "No quiz questions available for this study set"
              : undefined
          }
        >
          <Sparkles size={13} className="mr-1.5" />
          Generate Quiz
        </Button>
        <Link
          to="/resources/$id"
          params={{ id: studySet.id.toString() }}
          data-ocid={`resources.view_button.${index + 1}`}
        >
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <BookOpen size={14} />
          </Button>
        </Link>
      </div>
    </article>
  );
}
