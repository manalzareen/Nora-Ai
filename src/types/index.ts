export type NoraEmotion = 
  | 'idle' 
  | 'happy' 
  | 'waving' 
  | 'thinking' 
  | 'explaining' 
  | 'concerned' 
  | 'celebrating' 
  | 'confused';

export type PageView = 
  | 'home' 
  | 'dashboard' 
  | 'debug-studio' 
  | 'languages'
  | 'learn' 
  | 'challenges' 
  | 'mistake-replay' 
  | 'progress';

export type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'sql' | 'cpp' | 'go';

export interface LanguageGuide {
  id: SupportedLanguage;
  name: string;
  tagline: string;
  iconName: string;
  popularityRank: number;
  learningCurve: 'Gentle' | 'Moderate' | 'Steep';
  bestFor: string[];
  whyChoose: string;
  careerImpact: string;
  averageSalary: string;
  keyMindsetDifference: string;
  starterSnippet: string;
  advancedSnippet: string;
}

export interface ExerciseStep {
  stepNumber: number;
  title: string;
  instruction: string;
  noraGuidance: string;
  noraPraise: string;
  checkFnName: string;
}

export interface DebugExercise {
  id: string;
  title: string;
  category: string;
  language: SupportedLanguage;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  buggyCode: string;
  solutionCode: string;
  targetLine: number;
  expectedOutput: string;
  steps: ExerciseStep[];
  noraInitialThought: string;
  plainEnglishExplanation: string;
  realWorldAnalogy: string;
  hints: string[];
  followUpQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface LessonModule {
  id: string;
  title: string;
  language: SupportedLanguage;
  category: string;
  estimatedMinutes: number;
  completed: boolean;
  summary: string;
  keyConcepts: string[];
  interactiveSnippet: string;
  expectedRun: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  language: SupportedLanguage;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xp: number;
  tags: string[];
  prompt: string;
  starterCode: string;
  solutionCode: string;
  testCases: { input: string; expected: string; description: string }[];
}

export interface MistakeLog {
  id: string;
  date: string;
  language: SupportedLanguage;
  topic: string;
  errorType: string;
  codeSnippet: string;
  mentalTrap: string;
  noraCorrection: string;
  mastered: boolean;
  reviewCount: number;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  selectedLanguage: SupportedLanguage;
  currentStreak: number;
  totalXp: number;
  completedLessons: number;
  totalLessons: number;
  appsBuilt: number;
  hoursSpent: number;
  overallScore: number;
  scoreBreakdown: {
    learning: number;
    maxLearning: number;
    building: number;
    maxBuilding: number;
    consistency: number;
    maxConsistency: number;
  };
  weakTopics: { topic: string; accuracy: number; reviewRecommendation: string }[];
}
