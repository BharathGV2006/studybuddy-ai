import type {
  FlashcardDeck,
  StudySession,
  StudySet,
  UserProfile,
} from "../types";

// Helper to create BigInt timestamps
const now = BigInt(Date.now()) * BigInt(1_000_000);
const dayAgo = now - BigInt(86_400_000_000_000);
const weekAgo = now - BigInt(604_800_000_000_000);

// Mock Principal placeholder
const mockPrincipal = {
  toText: () => "user-principal",
  _principal: null,
} as unknown as import("@icp-sdk/core/principal").Principal;

export const mockStudySets: StudySet[] = [
  {
    id: BigInt(1),
    title: "Advanced JavaScript Concepts",
    subject: "Computer Science",
    owner: mockPrincipal,
    createdAt: weekAgo,
    updatedAt: dayAgo,
    aiSummary:
      "Covers closures, prototypal inheritance, async/await patterns, and the event loop. Key focus on understanding V8 optimization techniques.",
    quizQuestions: [
      {
        id: BigInt(1),
        question: "What is a closure in JavaScript?",
        correctIndex: BigInt(0),
        options: [
          "A function that has access to its outer scope variables",
          "A method that closes a database connection",
          "A loop that terminates early",
          "A module pattern",
        ],
      },
      {
        id: BigInt(2),
        question: "What does async/await simplify?",
        correctIndex: BigInt(1),
        options: [
          "Synchronous code",
          "Promise-based asynchronous code",
          "Class inheritance",
          "Module imports",
        ],
      },
    ],
  },
  {
    id: BigInt(2),
    title: "Data Structures & Algorithms",
    subject: "Computer Science",
    owner: mockPrincipal,
    createdAt: weekAgo,
    updatedAt: now,
    aiSummary:
      "Binary trees, graph traversal (BFS/DFS), dynamic programming patterns, and time complexity analysis. Essential for technical interviews.",
    quizQuestions: [
      {
        id: BigInt(3),
        question: "What is the time complexity of binary search?",
        correctIndex: BigInt(2),
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
      },
    ],
  },
  {
    id: BigInt(3),
    title: "Machine Learning Fundamentals",
    subject: "Artificial Intelligence",
    owner: mockPrincipal,
    createdAt: dayAgo,
    updatedAt: now,
    aiSummary:
      "Supervised vs unsupervised learning, gradient descent, neural network architectures, and evaluation metrics. Practical ML with Python.",
    quizQuestions: [],
  },
  {
    id: BigInt(4),
    title: "Calculus II: Integration Techniques",
    subject: "Mathematics",
    owner: mockPrincipal,
    createdAt: weekAgo,
    updatedAt: dayAgo,
    aiSummary:
      "Integration by parts, trigonometric substitution, partial fractions, and improper integrals. Includes worked examples from MIT OCW.",
    quizQuestions: [],
  },
  {
    id: BigInt(5),
    title: "Organic Chemistry Mechanisms",
    subject: "Chemistry",
    owner: mockPrincipal,
    createdAt: weekAgo,
    updatedAt: weekAgo,
    aiSummary:
      "SN1/SN2 reactions, electrophilic addition, carbonyl chemistry. Stereochemistry fundamentals and reaction mechanism arrows.",
    quizQuestions: [],
  },
  {
    id: BigInt(6),
    title: "World History: 20th Century",
    subject: "History",
    owner: mockPrincipal,
    createdAt: dayAgo,
    updatedAt: now,
    aiSummary:
      "WWI causes, interwar period, WWII major events, Cold War dynamics, and decolonization movements. Primary source analysis included.",
    quizQuestions: [],
  },
];

export const mockFlashcardDecks: FlashcardDeck[] = [
  {
    id: BigInt(1),
    title: "JavaScript Core Concepts",
    subject: "Computer Science",
    owner: mockPrincipal,
    createdAt: weekAgo,
    updatedAt: dayAgo,
    cards: [
      {
        id: BigInt(1),
        question: "What is a prototype chain?",
        answer:
          "A mechanism for JavaScript objects to inherit properties from other objects through linked prototype objects.",
      },
      {
        id: BigInt(2),
        question: "Explain event delegation",
        answer:
          "A technique where a single event listener on a parent element handles events from child elements using event bubbling.",
      },
      {
        id: BigInt(3),
        question: "What is the difference between == and ===?",
        answer:
          "== performs type coercion before comparison, while === checks both value and type without coercion (strict equality).",
      },
      {
        id: BigInt(4),
        question: "What are Promises?",
        answer:
          "Objects representing the eventual completion or failure of an asynchronous operation, with .then() and .catch() handlers.",
      },
      {
        id: BigInt(5),
        question: "Explain the spread operator",
        answer:
          "The ... syntax that expands an iterable (array, string) or object into individual elements or key-value pairs.",
      },
    ],
  },
  {
    id: BigInt(2),
    title: "ML Algorithms",
    subject: "Artificial Intelligence",
    owner: mockPrincipal,
    createdAt: dayAgo,
    updatedAt: now,
    cards: [
      {
        id: BigInt(6),
        question: "What is gradient descent?",
        answer:
          "An optimization algorithm that iteratively adjusts model parameters to minimize a loss function by moving in the direction of the negative gradient.",
      },
      {
        id: BigInt(7),
        question: "Define overfitting",
        answer:
          "When a model learns training data too well, including noise, resulting in poor generalization to new, unseen data.",
      },
      {
        id: BigInt(8),
        question: "What is a confusion matrix?",
        answer:
          "A table showing true positives, false positives, true negatives, and false negatives for evaluating classification model performance.",
      },
    ],
  },
  {
    id: BigInt(3),
    title: "Calculus Formulas",
    subject: "Mathematics",
    owner: mockPrincipal,
    createdAt: weekAgo,
    updatedAt: weekAgo,
    cards: [
      {
        id: BigInt(9),
        question: "Integration by parts formula",
        answer:
          "∫u dv = uv - ∫v du, where u and dv are chosen to simplify the resulting integral.",
      },
      {
        id: BigInt(10),
        question: "Chain rule",
        answer:
          "d/dx[f(g(x))] = f'(g(x)) · g'(x) — derivative of outer function times derivative of inner function.",
      },
    ],
  },
  {
    id: BigInt(4),
    title: "React Hooks",
    subject: "Web Development",
    owner: mockPrincipal,
    createdAt: dayAgo,
    updatedAt: now,
    cards: [
      {
        id: BigInt(11),
        question: "When to use useCallback?",
        answer:
          "When passing callbacks to optimized child components to prevent unnecessary re-renders by memoizing the function reference.",
      },
      {
        id: BigInt(12),
        question: "What does useEffect cleanup do?",
        answer:
          "Returns a function from useEffect that runs before the next effect execution or component unmount to clean up subscriptions and timers.",
      },
    ],
  },
];

export const mockStudySessions: StudySession[] = [
  {
    id: BigInt(1),
    startedAt: now - BigInt(3_600_000_000_000),
    subject: "Computer Science",
    owner: mockPrincipal,
    aiAssisted: true,
    durationSeconds: BigInt(3600),
  },
  {
    id: BigInt(2),
    startedAt: dayAgo,
    subject: "Mathematics",
    owner: mockPrincipal,
    aiAssisted: false,
    durationSeconds: BigInt(2700),
  },
  {
    id: BigInt(3),
    startedAt: dayAgo - BigInt(7_200_000_000_000),
    subject: "Artificial Intelligence",
    owner: mockPrincipal,
    aiAssisted: true,
    durationSeconds: BigInt(5400),
  },
  {
    id: BigInt(4),
    startedAt: weekAgo,
    subject: "Computer Science",
    owner: mockPrincipal,
    aiAssisted: false,
    durationSeconds: BigInt(1800),
  },
  {
    id: BigInt(5),
    startedAt: weekAgo + BigInt(86_400_000_000_000),
    subject: "Chemistry",
    owner: mockPrincipal,
    aiAssisted: true,
    durationSeconds: BigInt(4200),
  },
  {
    id: BigInt(6),
    startedAt: weekAgo + BigInt(172_800_000_000_000),
    subject: "History",
    owner: mockPrincipal,
    aiAssisted: false,
    durationSeconds: BigInt(3000),
  },
];

export const mockUserProfile: UserProfile = {
  owner: mockPrincipal,
  name: "Alex Chen",
  createdAt: weekAgo,
  onboardingComplete: true,
  updatedAt: dayAgo,
  studyGoals: [
    "Master React and TypeScript",
    "Complete ML specialization",
    "Prepare for technical interviews",
    "Improve calculus skills",
  ],
};

export const mockAnalyticsSummary = {
  totalSessions: BigInt(mockStudySessions.length),
  totalDurationSeconds: mockStudySessions.reduce(
    (acc, s) => acc + s.durationSeconds,
    BigInt(0),
  ),
  aiAssistedSeconds: mockStudySessions
    .filter((s) => s.aiAssisted)
    .reduce((acc, s) => acc + s.durationSeconds, BigInt(0)),
  soloSeconds: mockStudySessions
    .filter((s) => !s.aiAssisted)
    .reduce((acc, s) => acc + s.durationSeconds, BigInt(0)),
  sessions: mockStudySessions,
};

export const studyBuddies = [
  {
    id: "1",
    name: "Sarah Kim",
    subject: "Computer Science",
    avatar: "SK",
    streak: 12,
    online: true,
  },
  {
    id: "2",
    name: "Marcus Rivera",
    subject: "Mathematics",
    avatar: "MR",
    streak: 7,
    online: true,
  },
  {
    id: "3",
    name: "Priya Patel",
    subject: "Machine Learning",
    avatar: "PP",
    streak: 23,
    online: false,
  },
  {
    id: "4",
    name: "Jordan Lee",
    subject: "Chemistry",
    avatar: "JL",
    streak: 5,
    online: true,
  },
];

export const recentActivity = [
  {
    id: "1",
    text: "Completed JS Closures quiz",
    time: "30 min ago",
    type: "quiz",
  },
  {
    id: "2",
    text: "Added 12 cards to React Hooks deck",
    time: "2 hrs ago",
    type: "cards",
  },
  {
    id: "3",
    text: "Live study session with Sarah Kim",
    time: "Yesterday",
    type: "session",
  },
  {
    id: "4",
    text: "AI tutor explained gradient descent",
    time: "Yesterday",
    type: "ai",
  },
];
