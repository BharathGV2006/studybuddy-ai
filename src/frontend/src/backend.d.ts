import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface AnalyticsSummary {
    soloSeconds: bigint;
    totalDurationSeconds: bigint;
    sessions: Array<StudySession>;
    aiAssistedSeconds: bigint;
    totalSessions: bigint;
}
export interface QuizQuestion {
    id: ResourceId;
    question: string;
    correctIndex: bigint;
    options: Array<string>;
}
export interface FlashcardDeck {
    id: ResourceId;
    title: string;
    subject: string;
    owner: UserId;
    cards: Array<Flashcard>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export type AuthError = {
    __kind__: "EmailAlreadyExists";
    EmailAlreadyExists: null;
} | {
    __kind__: "InvalidCredentials";
    InvalidCredentials: null;
} | {
    __kind__: "NotAuthenticated";
    NotAuthenticated: null;
} | {
    __kind__: "InternalError";
    InternalError: string;
};
export type AskGeminiResult = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export type UserId = Principal;
export type RegisterResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: AuthError;
};
export interface FlashcardDeckInput {
    title: string;
    subject: string;
    cards: Array<Flashcard>;
}
export interface StudySet {
    id: ResourceId;
    title: string;
    subject: string;
    owner: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    quizQuestions: Array<QuizQuestion>;
    aiSummary: string;
}
export interface StudySetInput {
    title: string;
    subject: string;
    quizQuestions: Array<QuizQuestion>;
    aiSummary: string;
}
export interface Flashcard {
    id: ResourceId;
    question: string;
    answer: string;
}
export interface ChatMessage {
    content: string;
    role: string;
}
export interface StudySession {
    id: ResourceId;
    startedAt: Timestamp;
    subject: string;
    owner: UserId;
    aiAssisted: boolean;
    durationSeconds: bigint;
}
export type LoginResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: AuthError;
};
export type ResourceId = bigint;
export interface UserProfileInput {
    name: string;
    onboardingComplete: boolean;
    studyGoals: Array<string>;
}
export interface StudySessionInput {
    startedAt: Timestamp;
    subject: string;
    aiAssisted: boolean;
    durationSeconds: bigint;
}
export interface UserProfile {
    owner: UserId;
    name: string;
    createdAt: Timestamp;
    onboardingComplete: boolean;
    updatedAt: Timestamp;
    studyGoals: Array<string>;
}
export interface backendInterface {
    askGemini(history: Array<ChatMessage>, message: string): Promise<AskGeminiResult>;
    createDeck(input: FlashcardDeckInput): Promise<FlashcardDeck>;
    createStudySet(input: StudySetInput): Promise<StudySet>;
    deleteDeck(id: ResourceId): Promise<boolean>;
    deleteStudySet(id: ResourceId): Promise<boolean>;
    getAnalyticsSummary(): Promise<AnalyticsSummary>;
    getDeck(id: ResourceId): Promise<FlashcardDeck | null>;
    getProfile(): Promise<UserProfile | null>;
    getStudySet(id: ResourceId): Promise<StudySet | null>;
    listDecks(): Promise<Array<FlashcardDeck>>;
    listSessions(): Promise<Array<StudySession>>;
    listStudySets(): Promise<Array<StudySet>>;
    logSession(input: StudySessionInput): Promise<StudySession>;
    login(email: string, password: string): Promise<LoginResult>;
    logout(): Promise<void>;
    register(email: string, password: string): Promise<RegisterResult>;
    updateDeck(id: ResourceId, input: FlashcardDeckInput): Promise<FlashcardDeck | null>;
    updateStudySet(id: ResourceId, input: StudySetInput): Promise<StudySet | null>;
    upsertProfile(input: UserProfileInput): Promise<UserProfile>;
}
