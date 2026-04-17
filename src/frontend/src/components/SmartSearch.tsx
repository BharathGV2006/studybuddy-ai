import { cn } from "@/lib/utils";
import { Bot, ChevronDown, FileText, Search, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  mockFlashcardDecks,
  mockStudySets,
  studyBuddies,
} from "../data/mockData";
import type { SearchCategory, SearchResult } from "../types";

const categories: { value: SearchCategory; label: string; icon: typeof Bot }[] =
  [
    { value: "ai", label: "AI Search", icon: Bot },
    { value: "buddies", label: "Find Buddies", icon: Users },
    { value: "notes", label: "Browse Notes", icon: FileText },
  ];

function getResults(query: string, category: SearchCategory): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  if (category === "notes") {
    const sets = mockStudySets
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.subject.toLowerCase().includes(q),
      )
      .map((s) => ({
        id: s.id.toString(),
        title: s.title,
        category: "notes" as const,
        subtitle: s.subject,
      }));
    const decks = mockFlashcardDecks
      .filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.subject.toLowerCase().includes(q),
      )
      .map((d) => ({
        id: d.id.toString(),
        title: d.title,
        category: "notes" as const,
        subtitle: `${d.cards.length} cards · ${d.subject}`,
      }));
    return [...sets, ...decks].slice(0, 6);
  }

  if (category === "buddies") {
    return studyBuddies
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.subject.toLowerCase().includes(q),
      )
      .map((b) => ({
        id: b.id,
        title: b.name,
        category: "buddies" as const,
        subtitle: b.subject,
      }))
      .slice(0, 4);
  }

  // AI search — return contextual suggestions
  if (q.length > 2) {
    return [
      {
        id: "ai-1",
        title: `Explain "${query}"`,
        category: "ai",
        subtitle: "Ask AI Tutor",
      },
      {
        id: "ai-2",
        title: `Generate quiz on "${query}"`,
        category: "ai",
        subtitle: "Create flashcards",
      },
      {
        id: "ai-3",
        title: `Summarize notes about "${query}"`,
        category: "ai",
        subtitle: "AI summary",
      },
    ];
  }
  return [];
}

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory>("ai");
  const [isOpen, setIsOpen] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ActiveCategoryIcon =
    categories.find((c) => c.value === category)?.icon ?? Bot;

  useEffect(() => {
    setResults(getResults(query, category));
  }, [query, category]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setShowCategoryMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setShowCategoryMenu(false);
      setQuery("");
    }
  };

  const categoryLabel =
    categories.find((c) => c.value === category)?.label ?? "AI Search";
  const showDropdown = isOpen && (results.length > 0 || showCategoryMenu);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px]"
      data-ocid="search.container"
    >
      {/* Search input */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border transition-smooth",
          "bg-secondary border-border",
          isOpen ? "border-ring shadow-glow" : "hover:border-muted-foreground",
        )}
      >
        {/* Category selector */}
        <button
          type="button"
          onClick={() => setShowCategoryMenu((v) => !v)}
          data-ocid="search.category_select"
          className={cn(
            "flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium transition-smooth shrink-0",
            "text-muted-foreground hover:text-foreground hover:bg-card",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          aria-label="Change search category"
          aria-expanded={showCategoryMenu}
        >
          <ActiveCategoryIcon size={13} />
          <span className="hidden sm:inline">{categoryLabel}</span>
          <ChevronDown
            size={12}
            className={cn(
              "transition-smooth",
              showCategoryMenu && "rotate-180",
            )}
          />
        </button>

        <div className="w-px h-4 bg-border shrink-0" />

        <Search size={15} className="text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${categoryLabel.toLowerCase()}...`}
          data-ocid="search.input"
          className={cn(
            "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none min-w-0",
          )}
          aria-label="Smart search"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            data-ocid="search.clear_button"
            className="text-muted-foreground hover:text-foreground transition-smooth shrink-0"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full mt-2 left-0 right-0 z-50 rounded-lg border border-border",
              "bg-card shadow-elevated overflow-hidden",
            )}
            aria-label="Search results"
          >
            {/* Category menu */}
            {showCategoryMenu && (
              <div className="p-1.5 border-b border-border">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-2 py-1">
                  Search in
                </p>
                {categories.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setCategory(cat.value);
                        setShowCategoryMenu(false);
                        inputRef.current?.focus();
                      }}
                      data-ocid={`search.category.${cat.value}`}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-smooth text-left",
                        "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        category === cat.value
                          ? "text-foreground font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      <CatIcon size={15} />
                      {cat.label}
                      {category === cat.value && (
                        <span className="ml-auto text-primary text-xs">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="p-1.5">
                {results.map((result, i) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    data-ocid={`search.result.item.${i + 1}`}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-smooth text-left",
                      "hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                    aria-label={result.title}
                  >
                    <Search
                      size={13}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="min-w-0">
                      <span className="text-foreground truncate block">
                        {result.title}
                      </span>
                      {result.subtitle && (
                        <span className="text-muted-foreground text-xs truncate block">
                          {result.subtitle}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
