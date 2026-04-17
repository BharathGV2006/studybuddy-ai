import { QuizModal } from "@/components/QuizModal";
import { SmartCard } from "@/components/SmartCard";
import { Button } from "@/components/ui/button";
import { mockStudySets } from "@/data/mockData";
import type { StudySet } from "@/types";
import { BookOpen, Filter, Sparkles } from "lucide-react";
import { useState } from "react";

const SUBJECTS = [
  "All",
  "Computer Science",
  "Mathematics",
  "Chemistry",
  "History",
  "Artificial Intelligence",
] as const;
type SubjectFilter = (typeof SUBJECTS)[number];

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState<SubjectFilter>("All");
  const [quizTarget, setQuizTarget] = useState<StudySet | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  const filtered =
    activeFilter === "All"
      ? mockStudySets
      : mockStudySets.filter((s) => s.subject === activeFilter);

  const handleGenerateQuiz = (studySet: StudySet) => {
    setQuizTarget(studySet);
    setQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setQuizOpen(false);
    setTimeout(() => setQuizTarget(null), 300);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Page header */}
      <div
        className="px-6 py-6 border-b"
        style={{
          background: "oklch(0.18 0.014 260 / 0.7)",
          borderColor: "oklch(0.28 0.02 260 / 0.5)",
        }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  background: "oklch(0.62 0.18 270 / 0.15)",
                  border: "1px solid oklch(0.62 0.18 270 / 0.25)",
                }}
              >
                <BookOpen size={16} style={{ color: "oklch(0.75 0.15 270)" }} />
              </div>
              <h1 className="font-display text-2xl font-semibold text-foreground tracking-tight">
                Smart Resources
              </h1>
            </div>
            <p className="text-[13px] text-muted-foreground ml-10">
              AI-powered study sets with instant quiz generation
            </p>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <Sparkles size={13} style={{ color: "oklch(0.62 0.18 270)" }} />
            <span>{mockStudySets.length} study sets</span>
          </div>
        </div>

        {/* Subject filters */}
        <div
          data-ocid="resources.filter.tab"
          className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 scrollbar-hide"
        >
          <Filter size={13} className="shrink-0 text-muted-foreground mr-1" />
          {SUBJECTS.map((subject) => {
            const isActive = activeFilter === subject;
            return (
              <button
                key={subject}
                type="button"
                onClick={() => setActiveFilter(subject)}
                className="shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-200 whitespace-nowrap"
                style={{
                  background: isActive
                    ? "oklch(0.62 0.18 270 / 0.2)"
                    : "oklch(0.22 0.02 260)",
                  color: isActive
                    ? "oklch(0.75 0.15 270)"
                    : "oklch(0.55 0.01 260)",
                  border: `1px solid ${isActive ? "oklch(0.62 0.18 270 / 0.4)" : "oklch(0.28 0.02 260 / 0.6)"}`,
                }}
              >
                {subject}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards grid */}
      <div className="flex-1 p-6">
        {filtered.length === 0 ? (
          <div
            data-ocid="resources.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260 / 0.6)",
              }}
            >
              <BookOpen size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-display text-[16px] font-semibold text-foreground mb-1">
              No resources found
            </h3>
            <p className="text-[13px] text-muted-foreground max-w-xs">
              No study sets match the selected subject filter. Try selecting a
              different category.
            </p>
            <Button
              size="sm"
              className="mt-4"
              onClick={() => setActiveFilter("All")}
            >
              Show all resources
            </Button>
          </div>
        ) : (
          <div
            data-ocid="resources.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((studySet, idx) => (
              <SmartCard
                key={studySet.id.toString()}
                studySet={studySet}
                index={idx}
                onGenerateQuiz={handleGenerateQuiz}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quiz modal */}
      <QuizModal
        studySet={quizTarget}
        open={quizOpen}
        onClose={handleCloseQuiz}
      />
    </div>
  );
}
