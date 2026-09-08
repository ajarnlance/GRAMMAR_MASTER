import React, { useState, useEffect } from 'react';
import { StudentProfile, ModuleType, StudentProgressMap, ModuleProgress } from './types';
import { 
  GraduationCap, 
  User, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  BarChart3, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  LogOut,
  Film,
  FileCheck,
  Layers,
  HelpCircle,
  Play,
  FileText
} from 'lucide-react';

// Import Module Components
import SimpleSentences from './lessons/SimpleSentences';
import CompoundSentences from './lessons/CompoundSentences';
import ComplexSentences from './lessons/ComplexSentences';
import SubjectVerbAgreement from './lessons/SubjectVerbAgreement';

// Import Video & Post Test Components
import { VideoHub } from './components/VideoHub';
import { VideoQuizRunner } from './components/VideoQuizRunner';
import { PostLessonTestRunner } from './components/PostLessonTestRunner';
import { ClauseMatchingRunner } from './components/ClauseMatchingRunner';

// Import Quiz & Test Data
import { 
  SENTENCE_STRUCTURE_QUIZ_QUESTIONS,
  SUBJECT_VERB_AGREEMENT_QUIZ_QUESTIONS,
  RELATIVE_CLAUSES_QUIZ_QUESTIONS,
  FRAGMENTS_RUNONS_QUIZ_QUESTIONS,
  PAST_MODALS_QUIZ_QUESTIONS,
  PARALLEL_STRUCTURE_QUIZ_QUESTIONS
} from './data/videoQuizzesData';

import {
  SENTENCE_STRUCTURE_EXAM,
  SUBJECT_VERB_AGREEMENT_EXAM
} from './data/postTestsData';

const DEFAULT_MODULE_PROGRESS: StudentProgressMap = {
  // Lessons
  [ModuleType.SIMPLE]: {
    moduleId: ModuleType.SIMPLE,
    completed: false,
    currentPage: 1,
    totalPages: 6,
    score: 0,
    maxScore: 8,
  },
  [ModuleType.COMPOUND]: {
    moduleId: ModuleType.COMPOUND,
    completed: false,
    currentPage: 1,
    totalPages: 4,
    score: 0,
    maxScore: 5,
  },
  [ModuleType.COMPLEX]: {
    moduleId: ModuleType.COMPLEX,
    completed: false,
    currentPage: 1,
    totalPages: 4,
    score: 0,
    maxScore: 5,
  },
  [ModuleType.SVA]: {
    moduleId: ModuleType.SVA,
    completed: false,
    currentPage: 1,
    totalPages: 4,
    score: 0,
    maxScore: 10,
  },
  // Video Quizzes
  [ModuleType.VIDEO_SENTENCE_STRUCTURE]: {
    moduleId: ModuleType.VIDEO_SENTENCE_STRUCTURE,
    completed: false,
    currentPage: 1,
    totalPages: 8,
    score: 0,
    maxScore: 8,
  },
  [ModuleType.VIDEO_SVA]: {
    moduleId: ModuleType.VIDEO_SVA,
    completed: false,
    currentPage: 1,
    totalPages: 8,
    score: 0,
    maxScore: 8,
  },
  [ModuleType.VIDEO_RELATIVE_CLAUSES]: {
    moduleId: ModuleType.VIDEO_RELATIVE_CLAUSES,
    completed: false,
    currentPage: 1,
    totalPages: 8,
    score: 0,
    maxScore: 8,
  },
  [ModuleType.VIDEO_FRAGMENTS]: {
    moduleId: ModuleType.VIDEO_FRAGMENTS,
    completed: false,
    currentPage: 1,
    totalPages: 8,
    score: 0,
    maxScore: 8,
  },
  [ModuleType.VIDEO_PAST_MODALS]: {
    moduleId: ModuleType.VIDEO_PAST_MODALS,
    completed: false,
    currentPage: 1,
    totalPages: 8,
    score: 0,
    maxScore: 8,
  },
  [ModuleType.VIDEO_PARALLEL_STRUCTURE]: {
    moduleId: ModuleType.VIDEO_PARALLEL_STRUCTURE,
    completed: false,
    currentPage: 1,
    totalPages: 8,
    score: 0,
    maxScore: 8,
  },
  // Post Lesson Tests
  [ModuleType.TEST_SENTENCE_STRUCTURE]: {
    moduleId: ModuleType.TEST_SENTENCE_STRUCTURE,
    completed: false,
    currentPage: 1,
    totalPages: 10,
    score: 0,
    maxScore: 10,
  },
  [ModuleType.TEST_SUBJECT_VERB]: {
    moduleId: ModuleType.TEST_SUBJECT_VERB,
    completed: false,
    currentPage: 1,
    totalPages: 10,
    score: 0,
    maxScore: 10,
  },
  [ModuleType.TEST_CLAUSE_MATCHING]: {
    moduleId: ModuleType.TEST_CLAUSE_MATCHING,
    completed: false,
    currentPage: 1,
    totalPages: 25,
    score: 0,
    maxScore: 25,
  }
};

const LoginScreen = ({ onLogin }: { onLogin: (profile: StudentProfile) => void }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [sectionNumber, setSectionNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && id.trim()) {
      onLogin({ 
        name: name.trim(), 
        id: id.trim(),
        sectionNumber: sectionNumber.trim() || undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 animate-in">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-indigo-200">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">GrammarMaster</h1>
          <h2 className="text-base font-medium text-indigo-600">ESL Writing & Grammar Hub</h2>
          <p className="text-slate-500 text-sm mt-2">Enter your student information to access videos, lessons, quizzes & tests</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800 text-sm placeholder:text-slate-400"
              placeholder="e.g., Alex Johnson"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Student ID</label>
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800 text-sm placeholder:text-slate-400"
              placeholder="e.g., ESL-2026"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class / Section Number (Optional)</label>
            <input 
              type="text" 
              value={sectionNumber}
              onChange={(e) => setSectionNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800 text-sm placeholder:text-slate-400"
              placeholder="e.g., Section 102"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            Start Learning <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

interface DashboardProps {
  student: StudentProfile;
  progressMap: StudentProgressMap;
  onSelectModule: (m: ModuleType) => void;
  onLogout: () => void;
}

const Dashboard = ({ student, progressMap, onSelectModule, onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'videos' | 'lessons' | 'tests'>('all');

  const lessonModules = [
    { 
      id: ModuleType.SIMPLE, 
      title: 'Simple Sentences', 
      desc: 'Master the basics of subject-verb pairs, single clauses, and complete independent thoughts.', 
      color: 'bg-blue-600',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
      badge: 'Core Foundation'
    },
    { 
      id: ModuleType.COMPOUND, 
      title: 'Compound Sentences', 
      desc: 'Learn to use the FANBOYS coordinating conjunctions and commas effectively between clauses.', 
      color: 'bg-purple-600',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
      badge: 'Clause Linking'
    },
    { 
      id: ModuleType.COMPLEX, 
      title: 'Complex Sentences', 
      desc: 'Master subordinating conjunctions and dependent vs independent clauses with proper punctuation.', 
      color: 'bg-orange-600',
      tagColor: 'text-orange-700 bg-orange-50 border-orange-200',
      badge: 'Advanced Variety'
    },
    { 
      id: ModuleType.SVA, 
      title: 'Subject-Verb Agreement', 
      desc: 'Ensure singular and plural subjects always match their corresponding verbs in all 13 rules.', 
      color: 'bg-cyan-600',
      tagColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
      badge: 'Grammar Accuracy'
    },
  ];

  const postTestModules = [
    {
      id: ModuleType.TEST_CLAUSE_MATCHING,
      title: 'Matching Clauses Review',
      desc: 'Practice identifying and matching 25 clauses to build complete, coherent sentences.',
      badge: 'Interactive Review',
      color: 'bg-emerald-600',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: '🎯'
    },
    {
      id: ModuleType.TEST_SENTENCE_STRUCTURE,
      title: 'Sentence Structure Post Test',
      desc: 'Comprehensive 10-question assessment on Simple, Compound, and Complex sentence structures.',
      badge: 'Final Exam',
      color: 'bg-indigo-600',
      tagColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      icon: '📝'
    },
    {
      id: ModuleType.TEST_SUBJECT_VERB,
      title: 'Subject-Verb Agreement Post Test',
      desc: '10-question mastery assessment testing the rules of subject-verb agreement with detailed rule feedback.',
      badge: 'Final Exam',
      color: 'bg-teal-600',
      tagColor: 'text-teal-700 bg-teal-50 border-teal-200',
      icon: '✅'
    }
  ];

  // Calculate Overall Metrics across all tracked modules
  const allKeys = Object.keys(progressMap);
  const completedCount = allKeys.filter(k => progressMap[k]?.completed).length;
  const totalScore = allKeys.reduce((sum, k) => sum + (progressMap[k]?.score || 0), 0);
  const totalMaxScore = allKeys.reduce((sum, k) => sum + (progressMap[k]?.maxScore || 0), 0);
  const overallPercentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-indigo-600">
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
              <GraduationCap size={20} />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">Grammar<span className="text-indigo-600">Master</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
              <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-900 leading-tight">{student.name}</div>
                <div className="text-slate-500 font-mono text-[11px]">
                  ID: {student.id} {student.sectionNumber ? `• Sec ${student.sectionNumber}` : ''}
                </div>
              </div>
            </div>
            <button 
              onClick={onLogout}
              title="Sign Out"
              className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Welcome & Overview Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                <Sparkles size={13} /> ESL Grammar Master Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {student.name.split(' ')[0]}!
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Stream grammar video lessons, practice interactive modules, and complete post-lesson tests.
              </p>
            </div>
          </div>
        </div>

        {/* Global Progress & Performance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Card 1: Completed Activities */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Activities</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {completedCount} <span className="text-sm font-medium text-slate-400">/ 13 items</span>
              </div>
              <div className="text-xs text-emerald-600 font-medium mt-0.5">
                {Math.round((completedCount / 13) * 100)}% activities finished
              </div>
            </div>
          </div>

          {/* Card 2: Total Score Earned */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <Award size={24} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Score Earned</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {totalScore} <span className="text-sm font-medium text-slate-400">/ {totalMaxScore} pts</span>
              </div>
              <div className="text-xs text-amber-600 font-medium mt-0.5">
                {overallPercentage}% overall accuracy
              </div>
            </div>
          </div>

          {/* Card 3: Overall Completion Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-center">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Progress</span>
              <span className="text-xs font-bold text-indigo-600">{Math.round((completedCount / 13) * 100)}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max((completedCount / 13) * 100, 4)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <Clock size={12} /> {completedCount === 13 ? 'All modules completed!' : `${13 - completedCount} items remaining`}
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-slate-200 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            All Learning Hub
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'videos'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Film size={16} />
            Grammar Videos & Quizzes
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'lessons'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen size={16} />
            Interactive Lessons
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === 'tests'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileCheck size={16} />
            Post-Lesson Tests
          </button>
        </div>

        {/* 1. GRAMMAR VIDEOS SECTION */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Film className="w-5 h-5 text-indigo-600" />
                  Grammar Video Lessons & Review Quizzes
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Watch instructional video explanations and test your understanding with instant review quizzes
                </p>
              </div>
            </div>

            <VideoHub 
              progressMap={progressMap}
              onLaunchQuiz={(quizId) => onSelectModule(quizId)}
            />
          </section>
        )}

        {/* 2. INTERACTIVE LESSONS SECTION */}
        {(activeTab === 'all' || activeTab === 'lessons') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  Interactive Grammar Lessons
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Step-by-step interactive lessons with flashcards, rule summaries, and guided exercises
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium">4 Lessons Available</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {lessonModules.map((mod) => {
                const prog = progressMap[mod.id] || {
                  moduleId: mod.id,
                  completed: false,
                  currentPage: 1,
                  totalPages: 4,
                  score: 0,
                  maxScore: 5,
                };

                const isCompleted = Boolean(prog.completed);
                const isInProgress = !isCompleted && prog.currentPage > 1;
                const progressPercent = Math.min(Math.round(((prog.currentPage || 1) / (prog.totalPages || 4)) * 100), 100);
                const scorePercent = prog.maxScore > 0 ? Math.round(((prog.score || 0) / prog.maxScore) * 100) : 0;

                return (
                  <div 
                    key={mod.id}
                    onClick={() => onSelectModule(mod.id)}
                    className="group relative bg-white rounded-3xl p-6 shadow-xs hover:shadow-xl border border-slate-200/90 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${mod.color} rounded-2xl text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                          <BookOpen size={24} />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${mod.tagColor}`}>
                            {mod.badge}
                          </span>
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 size={12} /> Completed
                            </span>
                          ) : isInProgress ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                              In Progress (Pg {prog.currentPage}/{prog.totalPages})
                            </span>
                          ) : (
                            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                              Not Started
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {mod.title}
                      </h4>
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                        {mod.desc}
                      </p>
                    </div>

                    {/* Bottom Section */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <BarChart3 size={14} className="text-indigo-500" />
                          <span className="font-semibold text-slate-700">Score:</span>
                          <span className="font-bold text-slate-900">
                            {prog.score || 0} / {prog.maxScore} pts
                          </span>
                          <span className="text-slate-400 text-[11px]">({scorePercent}%)</span>
                        </div>

                        <div className="text-slate-500 font-medium">
                          Page {prog.currentPage} of {prog.totalPages}
                        </div>
                      </div>

                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                          style={{ width: `${isCompleted ? 100 : Math.max(progressPercent, 5)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-400 font-medium">
                          {prog.lastAttemptedAt ? `Last active: ${new Date(prog.lastAttemptedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Ready to start'}
                        </span>
                        <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                          {isCompleted ? 'Review Lesson' : isInProgress ? 'Resume Lesson' : 'Start Module'} 
                          <ArrowRight size={14} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. POST LESSON TESTS SECTION */}
        {(activeTab === 'all' || activeTab === 'tests') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-indigo-600" />
                  Post-Lesson Tests & Review Exercises
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Evaluate comprehensive grammar mastery, matching clauses, and sentence structures
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium">3 Tests Available</span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {postTestModules.map((test) => {
                const prog = progressMap[test.id] || {
                  moduleId: test.id,
                  completed: false,
                  currentPage: 1,
                  totalPages: 10,
                  score: 0,
                  maxScore: 10,
                };

                const isCompleted = Boolean(prog.completed);
                const scorePercent = prog.maxScore > 0 ? Math.round(((prog.score || 0) / prog.maxScore) * 100) : 0;

                return (
                  <div
                    key={test.id}
                    onClick={() => onSelectModule(test.id)}
                    className="group bg-white rounded-3xl p-6 shadow-xs hover:shadow-xl border border-slate-200/90 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                          {test.icon}
                        </div>

                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 size={12} /> Passed
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border text-indigo-700 bg-indigo-50 border-indigo-200">
                            {test.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {test.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
                        {test.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <BarChart3 size={14} className="text-indigo-500" />
                          <span className="font-semibold text-slate-700">Score:</span>
                          <span className="font-bold text-slate-900">{prog.score || 0} / {prog.maxScore}</span>
                        </div>
                        <span className={`font-bold ${scorePercent >= 80 ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {scorePercent}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                          style={{ width: `${isCompleted ? 100 : 0}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs font-bold text-indigo-600">
                        <span>{isCompleted ? 'Retake / Review' : 'Start Test'}</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default function App() {
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('grammar_student');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [progressMap, setProgressMap] = useState<StudentProgressMap>(() => {
    const saved = localStorage.getItem('grammar_progress');
    if (saved) {
      try {
        return { ...DEFAULT_MODULE_PROGRESS, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_MODULE_PROGRESS;
      }
    }
    return DEFAULT_MODULE_PROGRESS;
  });

  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);

  // Sync student & progress with localStorage
  useEffect(() => {
    if (student) {
      localStorage.setItem('grammar_student', JSON.stringify(student));
    } else {
      localStorage.removeItem('grammar_student');
    }
  }, [student]);

  useEffect(() => {
    localStorage.setItem('grammar_progress', JSON.stringify(progressMap));
  }, [progressMap]);

  const handleLogin = (profile: StudentProfile) => {
    setStudent(profile);
  };

  const handleLogout = () => {
    setStudent(null);
    setActiveModule(null);
  };

  const handleUpdateProgress = (updatedProgress: ModuleProgress) => {
    setProgressMap(prev => ({
      ...prev,
      [updatedProgress.moduleId]: {
        ...(prev[updatedProgress.moduleId] || {}),
        ...updatedProgress,
      }
    }));
  };

  const handleBack = () => {
    setActiveModule(null);
  };

  if (!student) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (!activeModule) {
    return (
      <Dashboard 
        student={student} 
        progressMap={progressMap} 
        onSelectModule={setActiveModule}
        onLogout={handleLogout}
      />
    );
  }

  // Route to the active lesson, video quiz, or post-lesson test
  switch (activeModule) {
    // 1. Lessons
    case ModuleType.SIMPLE:
      return (
        <SimpleSentences 
          onBack={handleBack} 
          initialProgress={progressMap[ModuleType.SIMPLE]}
          onUpdateProgress={handleUpdateProgress}
        />
      );
    case ModuleType.COMPOUND:
      return (
        <CompoundSentences 
          onBack={handleBack} 
          initialProgress={progressMap[ModuleType.COMPOUND]}
          onUpdateProgress={handleUpdateProgress}
        />
      );
    case ModuleType.COMPLEX:
      return (
        <ComplexSentences 
          onBack={handleBack} 
          initialProgress={progressMap[ModuleType.COMPLEX]}
          onUpdateProgress={handleUpdateProgress}
        />
      );
    case ModuleType.SVA:
      return (
        <SubjectVerbAgreement 
          onBack={handleBack} 
          initialProgress={progressMap[ModuleType.SVA]}
          onUpdateProgress={handleUpdateProgress}
        />
      );

    // 2. Video Review Quizzes
    case ModuleType.VIDEO_SENTENCE_STRUCTURE:
      return (
        <VideoQuizRunner
          moduleId={ModuleType.VIDEO_SENTENCE_STRUCTURE}
          title="Sentence Structure Review Quiz"
          subtitle="Test your comprehension of clauses, subjects, and predicates after watching the video"
          questions={SENTENCE_STRUCTURE_QUIZ_QUESTIONS}
          initialProgress={progressMap[ModuleType.VIDEO_SENTENCE_STRUCTURE]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );
    case ModuleType.VIDEO_SVA:
      return (
        <VideoQuizRunner
          moduleId={ModuleType.VIDEO_SVA}
          title="Subject-Verb Agreement Review Quiz"
          subtitle="Test your comprehension of the S-Switch rule and compound subjects"
          questions={SUBJECT_VERB_AGREEMENT_QUIZ_QUESTIONS}
          initialProgress={progressMap[ModuleType.VIDEO_SVA]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );
    case ModuleType.VIDEO_RELATIVE_CLAUSES:
      return (
        <VideoQuizRunner
          moduleId={ModuleType.VIDEO_RELATIVE_CLAUSES}
          title="Relative Clauses Review Quiz"
          subtitle="Test your comprehension of defining & non-defining relative clauses"
          questions={RELATIVE_CLAUSES_QUIZ_QUESTIONS}
          initialProgress={progressMap[ModuleType.VIDEO_RELATIVE_CLAUSES]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );
    case ModuleType.VIDEO_FRAGMENTS:
      return (
        <VideoQuizRunner
          moduleId={ModuleType.VIDEO_FRAGMENTS}
          title="Fragments & Run-ons Review Quiz"
          subtitle="Test your comprehension of avoiding sentence fragments and comma splices"
          questions={FRAGMENTS_RUNONS_QUIZ_QUESTIONS}
          initialProgress={progressMap[ModuleType.VIDEO_FRAGMENTS]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );
    case ModuleType.VIDEO_PAST_MODALS:
      return (
        <VideoQuizRunner
          moduleId={ModuleType.VIDEO_PAST_MODALS}
          title="Past Modals Review Quiz"
          subtitle="Test your comprehension of could have, should have, and would have"
          questions={PAST_MODALS_QUIZ_QUESTIONS}
          initialProgress={progressMap[ModuleType.VIDEO_PAST_MODALS]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );
    case ModuleType.VIDEO_PARALLEL_STRUCTURE:
      return (
        <VideoQuizRunner
          moduleId={ModuleType.VIDEO_PARALLEL_STRUCTURE}
          title="Parallel Structure Review Quiz"
          subtitle="Test your mastery of matching word forms, consistent clauses, lists, and thesis statements"
          questions={PARALLEL_STRUCTURE_QUIZ_QUESTIONS}
          initialProgress={progressMap[ModuleType.VIDEO_PARALLEL_STRUCTURE]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );

    // 3. Post Lesson Tests & Review
    case ModuleType.TEST_SENTENCE_STRUCTURE:
      return (
        <PostLessonTestRunner
          moduleId={ModuleType.TEST_SENTENCE_STRUCTURE}
          title="Sentence Structure Post Test"
          description="This assessment consists of 10 multiple-choice questions testing Simple, Compound, and Complex sentences, including punctuation rules and conjunctions."
          questions={SENTENCE_STRUCTURE_EXAM}
          initialProgress={progressMap[ModuleType.TEST_SENTENCE_STRUCTURE]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );
    case ModuleType.TEST_SUBJECT_VERB:
      return (
        <PostLessonTestRunner
          moduleId={ModuleType.TEST_SUBJECT_VERB}
          title="Subject-Verb Agreement Post Test"
          description="This comprehensive exam tests your mastery across the 13 essential rules of subject-verb agreement with detailed grammar rule feedback."
          questions={SUBJECT_VERB_AGREEMENT_EXAM}
          initialProgress={progressMap[ModuleType.TEST_SUBJECT_VERB]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );
    case ModuleType.TEST_CLAUSE_MATCHING:
      return (
        <ClauseMatchingRunner
          initialProgress={progressMap[ModuleType.TEST_CLAUSE_MATCHING]}
          onUpdateProgress={handleUpdateProgress}
          onExit={handleBack}
        />
      );

    default:
      return (
        <Dashboard 
          student={student} 
          progressMap={progressMap} 
          onSelectModule={setActiveModule}
          onLogout={handleLogout}
        />
      );
  }
}
