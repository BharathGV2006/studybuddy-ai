import { useEffect, useRef, useState } from "react";
import { DeckSelector } from "../components/DeckSelector";
import { FlashCard } from "../components/FlashCard";
import { StudySummary } from "../components/StudySummary";
import { mockFlashcardDecks } from "../data/mockData";
import type { FlashcardDeck } from "../types";

type StudyPhase = "select" | "study" | "summary";

interface DeckProgress {
  deckId: bigint;
  correct: number;
  total: number;
}

interface SessionResult {
  correct: number;
  incorrect: number;
  elapsedSeconds: number;
}

export default function Flashcards() {
  const [phase, setPhase] = useState<StudyPhase>("select");
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionResult, setSessionResult] = useState<SessionResult>({
    correct: 0,
    incorrect: 0,
    elapsedSeconds: 0,
  });
  const [completedDecks, setCompletedDecks] = useState<DeckProgress[]>([]);
  const startTimeRef = useRef<number>(Date.now());

  // Track live elapsed time for session
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (phase !== "study") return;
    const id = setInterval(
      () => setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000)),
      1000,
    );
    return () => clearInterval(id);
  }, [phase]);

  const handleSelectDeck = (deck: FlashcardDeck) => {
    setSelectedDeck(deck);
    setCardIndex(0);
    setSessionResult({ correct: 0, incorrect: 0, elapsedSeconds: 0 });
    startTimeRef.current = Date.now();
    setElapsed(0);
    setPhase("study");
  };

  const handleResult = (correct: boolean) => {
    const next = { ...sessionResult };
    if (correct) next.correct += 1;
    else next.incorrect += 1;
    setSessionResult(next);

    if (!selectedDeck) return;
    const nextIndex = cardIndex + 1;

    if (nextIndex >= selectedDeck.cards.length) {
      const finalElapsed = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      const finalResult = { ...next, elapsedSeconds: finalElapsed };
      setSessionResult(finalResult);

      // Save progress
      setCompletedDecks((prev) => {
        const filtered = prev.filter((p) => p.deckId !== selectedDeck.id);
        return [
          ...filtered,
          {
            deckId: selectedDeck.id,
            correct: next.correct,
            total: selectedDeck.cards.length,
          },
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

  return (
    <div
      className="flex flex-col min-h-[calc(100vh-4rem)]"
      data-ocid="flashcards.page"
    >
      {/* ── DECK SELECT ── */}
      {phase === "select" && (
        <div className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
          <DeckSelector
            decks={mockFlashcardDecks}
            progress={completedDecks}
            onSelect={handleSelectDeck}
          />
        </div>
      )}

      {/* ── STUDY MODE ── */}
      {phase === "study" && selectedDeck && (
        <div className="flex flex-col flex-1 w-full max-w-lg mx-auto px-4 py-4">
          {/* Top bar */}
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260)",
                color: "oklch(0.85 0.01 260)",
              }}
              aria-label="Back to deck selection"
              data-ocid="flashcards.back_button"
            >
              ←
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-semibold text-foreground truncate">
                {selectedDeck.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedDeck.subject}
              </p>
            </div>
            <span className="text-xs text-muted-foreground font-mono tabular-nums shrink-0">
              {String(Math.floor(elapsed / 60)).padStart(2, "0")}:
              {String(elapsed % 60).padStart(2, "0")}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-5" data-ocid="flashcards.progress_indicator">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>
                Card {cardIndex + 1} of {selectedDeck.cards.length}
              </span>
              <span>
                {Math.round((cardIndex / selectedDeck.cards.length) * 100)}%
                done
              </span>
            </div>
            <div
              className="h-1 rounded-full"
              style={{ background: "oklch(0.22 0.02 260)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-400"
                style={{
                  width: `${((cardIndex + 1) / selectedDeck.cards.length) * 100}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.62 0.18 270), oklch(0.65 0.2 290))",
                }}
              />
            </div>
            {/* Mini correct/incorrect tally */}
            <div className="flex gap-3 mt-2">
              <span
                className="text-xs"
                style={{ color: "oklch(0.75 0.18 145)" }}
              >
                ✓ {sessionResult.correct}
              </span>
              <span
                className="text-xs"
                style={{ color: "oklch(0.75 0.18 25)" }}
              >
                ✗ {sessionResult.incorrect}
              </span>
            </div>
          </div>

          {/* Flashcard */}
          <div className="flex-1 flex flex-col justify-start">
            <FlashCard
              key={String(selectedDeck.cards[cardIndex].id)}
              card={selectedDeck.cards[cardIndex]}
              cardIndex={cardIndex}
              totalCards={selectedDeck.cards.length}
              onResult={handleResult}
            />
          </div>

          {/* Bottom nav buttons */}
          <div className="flex gap-3 mt-6 pb-4">
            <button
              type="button"
              onClick={handlePrev}
              disabled={cardIndex === 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260)",
                color: "oklch(0.85 0.01 260)",
                minHeight: "52px",
              }}
              aria-label="Previous card"
              data-ocid="flashcards.prev_button"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={cardIndex >= selectedDeck.cards.length - 1}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: "oklch(0.22 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260)",
                color: "oklch(0.85 0.01 260)",
                minHeight: "52px",
              }}
              aria-label="Next card"
              data-ocid="flashcards.next_button"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* ── SUMMARY ── */}
      {phase === "summary" && selectedDeck && (
        <div className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
          <StudySummary
            deckTitle={selectedDeck.title}
            correct={sessionResult.correct}
            incorrect={sessionResult.incorrect}
            totalCards={selectedDeck.cards.length}
            elapsedSeconds={sessionResult.elapsedSeconds}
            onStudyAgain={handleStudyAgain}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
}
