import type { FlashcardDeck } from "../types";

interface DeckProgress {
  deckId: bigint;
  correct: number;
  total: number;
}

interface DeckSelectorProps {
  decks: FlashcardDeck[];
  progress: DeckProgress[];
  onSelect: (deck: FlashcardDeck) => void;
}

const SUBJECT_COLORS: Record<string, string> = {
  "Computer Science": "oklch(0.62 0.18 270)",
  "Artificial Intelligence": "oklch(0.65 0.2 300)",
  Mathematics: "oklch(0.65 0.18 240)",
  "Web Development": "oklch(0.62 0.2 200)",
};

function getSubjectColor(subject: string): string {
  return SUBJECT_COLORS[subject] ?? "oklch(0.62 0.15 270)";
}

const SUBJECT_ICONS: Record<string, string> = {
  "Computer Science": "⚡",
  "Artificial Intelligence": "🤖",
  Mathematics: "∑",
  "Web Development": "🌐",
};

function getSubjectIcon(subject: string): string {
  return SUBJECT_ICONS[subject] ?? "📚";
}

export function DeckSelector({ decks, progress, onSelect }: DeckSelectorProps) {
  return (
    <div className="w-full" data-ocid="deck_selector.section">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Flashcard Decks
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          {decks.length} decks · Tap a deck to start studying
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {decks.map((deck, i) => {
          const deckProgress = progress.find((p) => p.deckId === deck.id);
          const progressPct = deckProgress
            ? Math.round((deckProgress.correct / deckProgress.total) * 100)
            : null;
          const color = getSubjectColor(deck.subject);
          const icon = getSubjectIcon(deck.subject);

          return (
            <button
              key={String(deck.id)}
              type="button"
              onClick={() => onSelect(deck)}
              className="group text-left rounded-2xl p-5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                background: "oklch(0.18 0.014 260 / 0.6)",
                backdropFilter: "blur(16px)",
                border: "1px solid oklch(0.28 0.02 260 / 0.4)",
              }}
              data-ocid={`deck_selector.item.${i + 1}`}
              aria-label={`Study ${deck.title}`}
            >
              {/* Icon & Subject */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{
                    background: `${color}22`,
                    border: `1px solid ${color}44`,
                  }}
                >
                  {icon}
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${color}22`,
                    color: color,
                    border: `1px solid ${color}33`,
                  }}
                >
                  {deck.cards.length} cards
                </span>
              </div>

              {/* Title & Subject */}
              <h3 className="font-display text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-smooth">
                {deck.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {deck.subject}
              </p>

              {/* Progress */}
              {progressPct !== null ? (
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span style={{ color }}>{progressPct}%</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ background: "oklch(0.28 0.02 260)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%`, background: color }}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <span className="text-xs text-muted-foreground">
                    Not started yet
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
