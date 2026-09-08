export interface StudentProfile {
  name: string;
  id: string;
  sectionNumber?: string;
}

export enum ModuleType {
  // Interactive Lessons
  SIMPLE = 'SIMPLE',
  COMPOUND = 'COMPOUND',
  COMPLEX = 'COMPLEX',
  SVA = 'SVA',

  // Videos & Review Quizzes
  VIDEO_SENTENCE_STRUCTURE = 'VIDEO_SENTENCE_STRUCTURE',
  VIDEO_SVA = 'VIDEO_SVA',
  VIDEO_RELATIVE_CLAUSES = 'VIDEO_RELATIVE_CLAUSES',
  VIDEO_FRAGMENTS = 'VIDEO_FRAGMENTS',
  VIDEO_CONDITIONALS = 'VIDEO_CONDITIONALS',
  VIDEO_PRESENT_PERFECT = 'VIDEO_PRESENT_PERFECT',
  VIDEO_PAST_MODALS = 'VIDEO_PAST_MODALS',
  VIDEO_PARALLEL_STRUCTURE = 'VIDEO_PARALLEL_STRUCTURE',

  // Post Lesson Tests & Review
  TEST_CLAUSE_MATCHING = 'TEST_CLAUSE_MATCHING',
  TEST_SENTENCE_STRUCTURE = 'TEST_SENTENCE_STRUCTURE',
  TEST_SUBJECT_VERB = 'TEST_SUBJECT_VERB'
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

export interface SortItem {
  id: string;
  text: string;
  type: 'singular' | 'plural';
}

export interface FanboyCard {
  letter: string;
  word: string;
  meaning: string;
}

export interface SubordinatorCard {
  word: string;
  meaning: string;
}

export interface ModuleProgress {
  moduleId: ModuleType;
  completed: boolean;
  currentPage: number;
  totalPages: number;
  score: number;
  maxScore: number;
  lastAttemptedAt?: string;
  quizScores?: Record<string, boolean>;
  activityScores?: Record<string, number>;
}

export type StudentProgressMap = Record<string, ModuleProgress>;

export interface VideoInfo {
  id: ModuleType;
  title: string;
  description: string;
  videoSrc: string;
  duration: string;
  quizType?: ModuleType;
  quizTitle?: string;
  category: 'core' | 'advanced';
}

