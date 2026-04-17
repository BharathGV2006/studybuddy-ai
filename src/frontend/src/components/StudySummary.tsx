interface StudySummaryProps {
  deckTitle: string;
  correct: number;
  incorrect: number;
  totalCards: number;
  elapsedSeconds: number;
  onStudyAgain: () => void;
  onBack: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

interface StatBubbleProps {
  value: string | number;
  label: string;
  color: string;
  bgColor: string;
}

function StatBubble({ value, label, color, bgColor }: StatBubbleProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl p-5"
      style={{ background: bgColor, border: `1px solid ${color}33` }}
    >
      <span className="font-display text-3xl font-bold" style={{ color }}>
        {value}
      </span>
      <span className="text-xs text-muted-foreground mt-1 text-center">
        {label}
      </span>
    </div>
  );
}

export function StudySummary({
  deckTitle,
  correct,
  incorrect,
  totalCards,
  elapsedSeconds,
  onStudyAgain,
  onBack,
}: StudySummaryProps) {
  const accuracy =
    totalCards > 0 ? Math.round((correct / totalCards) * 100) : 0;

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

  return (
    <div
      className="flex flex-col items-center w-full"
      data-ocid="study_summary.section"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4"
          style={{
            background: "oklch(0.22 0.06 270 / 0.5)",
            border: "2px solid oklch(0.62 0.18 270 / 0.4)",
            boxShadow: "0 0 32px oklch(0.62 0.18 270 / 0.2)",
          }}
        >
          🎓
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Session Complete!
        </h2>
        <p className="text-muted-foreground text-sm mt-1 truncate max-w-xs">
          {deckTitle}
        </p>
        <span
          className="mt-3 inline-block text-sm font-semibold px-4 py-1.5 rounded-full"
          style={{
            color: gradeColor,
            background: `${gradeColor}22`,
            border: `1px solid ${gradeColor}44`,
          }}
        >
          {grade}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 w-full mb-6 sm:grid-cols-4">
        <StatBubble
          value={correct}
          label="Correct"
          color="oklch(0.75 0.18 145)"
          bgColor="oklch(0.45 0.18 145 / 0.12)"
        />
        <StatBubble
          value={incorrect}
          label="Incorrect"
          color="oklch(0.75 0.18 25)"
          bgColor="oklch(0.45 0.18 25 / 0.12)"
        />
        <StatBubble
          value={`${accuracy}%`}
          label="Accuracy"
          color="oklch(0.78 0.18 200)"
          bgColor="oklch(0.45 0.18 200 / 0.12)"
        />
        <StatBubble
          value={formatTime(elapsedSeconds)}
          label="Time"
          color="oklch(0.78 0.18 70)"
          bgColor="oklch(0.45 0.18 70 / 0.12)"
        />
      </div>

      {/* Accuracy bar */}
      <div className="w-full mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Accuracy</span>
          <span>{accuracy}%</span>
        </div>
        <div
          className="h-2.5 rounded-full"
          style={{ background: "oklch(0.22 0.02 260)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${accuracy}%`,
              background:
                accuracy >= 70
                  ? "linear-gradient(90deg, oklch(0.62 0.18 145), oklch(0.72 0.18 170))"
                  : "linear-gradient(90deg, oklch(0.62 0.18 25), oklch(0.72 0.18 50))",
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full">
        <button
          type="button"
          onClick={onStudyAgain}
          className="w-full py-4 rounded-xl font-display font-semibold text-base transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glow-indigo"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.18 270), oklch(0.55 0.15 260))",
            color: "oklch(0.97 0.01 270)",
          }}
          data-ocid="study_summary.study_again_button"
        >
          Study Again
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full py-4 rounded-xl font-semibold text-sm text-muted-foreground transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            background: "oklch(0.22 0.02 260)",
            border: "1px solid oklch(0.28 0.02 260)",
          }}
          data-ocid="study_summary.back_button"
        >
          Back to Decks
        </button>
      </div>
    </div>
  );
}
