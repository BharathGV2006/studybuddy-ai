import { useState } from "react";
import type { Flashcard } from "../types";

interface FlashCardProps {
  card: Flashcard;
  cardIndex: number;
  totalCards: number;
  onResult: (correct: boolean) => void;
}

export function FlashCard({
  card,
  cardIndex,
  totalCards,
  onResult,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleResult = (correct: boolean) => {
    setIsFlipped(false);
    setTimeout(() => onResult(correct), 50);
  };

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* Card flip area — full button for accessibility */}
      <button
        type="button"
        className="w-full cursor-pointer bg-transparent border-0 p-0 text-left"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
        aria-label={isFlipped ? "Card answer visible" : "Tap to reveal answer"}
        data-ocid="flashcard.canvas_target"
      >
        <div
          className="relative w-full"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.4s ease-out",
            minHeight: "260px",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl glass flex flex-col items-center justify-center p-8 text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Question {cardIndex + 1} of {totalCards}
            </span>
            <p className="font-display text-2xl font-semibold text-foreground leading-snug">
              {card.question}
            </p>
            <p className="text-muted-foreground text-sm mt-6">
              Tap anywhere to reveal
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 text-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "oklch(0.22 0.06 270 / 0.85)",
              backdropFilter: "blur(16px)",
              border: "1px solid oklch(0.62 0.18 270 / 0.3)",
            }}
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
              Answer
            </span>
            <p className="font-display text-xl font-semibold text-foreground leading-relaxed">
              {card.answer}
            </p>
          </div>
        </div>
      </button>

      {/* Action buttons — shown after flip */}
      <div
        className="w-full mt-5 transition-all duration-300"
        style={{
          opacity: isFlipped ? 1 : 0,
          transform: isFlipped ? "translateY(0)" : "translateY(8px)",
          pointerEvents: isFlipped ? "auto" : "none",
        }}
      >
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleResult(false)}
            className="flex items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              background: "oklch(0.45 0.18 25 / 0.2)",
              border: "1px solid oklch(0.55 0.2 25 / 0.4)",
              color: "oklch(0.8 0.15 25)",
            }}
            aria-label="Mark as incorrect"
            data-ocid="flashcard.incorrect_button"
          >
            <span className="text-lg">✗</span>
            <span>Incorrect</span>
          </button>
          <button
            type="button"
            onClick={() => handleResult(true)}
            className="flex items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              background: "oklch(0.45 0.18 145 / 0.2)",
              border: "1px solid oklch(0.55 0.2 145 / 0.4)",
              color: "oklch(0.8 0.15 145)",
            }}
            aria-label="Mark as correct"
            data-ocid="flashcard.correct_button"
          >
            <span className="text-lg">✓</span>
            <span>Correct</span>
          </button>
        </div>
      </div>

      {!isFlipped && (
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Click the card to reveal the answer
        </p>
      )}
    </div>
  );
}
