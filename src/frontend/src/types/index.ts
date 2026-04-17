// Re-export backend types for convenience
export type {
  StudySet,
  StudySetInput,
  FlashcardDeck,
  FlashcardDeckInput,
  Flashcard,
  StudySession,
  StudySessionInput,
  UserProfile,
  UserProfileInput,
  AnalyticsSummary,
  QuizQuestion,
  ResourceId,
  UserId,
  Timestamp,
} from "../backend.d.ts";

export interface SearchResult {
  id: string;
  title: string;
  category: "ai" | "buddies" | "notes";
  subtitle?: string;
  icon?: string;
}

export type SearchCategory = "ai" | "buddies" | "notes";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface StudyRoomParticipant {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
}

export interface OnboardingStep {
  step: number;
  title: string;
  description: string;
}
