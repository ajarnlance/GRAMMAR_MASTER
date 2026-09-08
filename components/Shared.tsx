import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, RotateCw, ArrowLeft, Trophy, Award, Star, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '../types';

export const LessonContainer = ({ 
  title, 
  subtitle, 
  progress, 
  children, 
  onBack,
  score,
  maxScore
}: {
  title: string;
  subtitle?: string;
  progress: number;
  children: React.ReactNode;
  onBack: () => void;
  score?: number;
  maxScore?: number;
}) => (
  <div className="min-h-screen bg-slate-50 pb-12">
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={onBack}
            id="lesson-back-button"
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-full transition-colors shrink-0"
            title="Return to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="truncate">
            <h1 className="font-bold text-base md:text-lg text-slate-900 leading-tight truncate">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 truncate hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {score !== undefined && maxScore !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-xs font-bold text-indigo-700">
              <Trophy size={14} className="text-indigo-600" />
              <span>Score: {score}/{maxScore}</span>
            </div>
          )}
          <div className="flex flex-col items-end w-32 sm:w-44">
            <div className="flex justify-between w-full text-[11px] font-semibold text-slate-500 mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto px-4 mt-8">
      {children}
    </div>
  </div>
);

export const FlipCard = ({ front, back, colorClass = "from-indigo-500 to-purple-600" }: { front: React.ReactNode; back: React.ReactNode; colorClass?: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="h-40 w-full cursor-pointer perspective-1000 group select-none"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full text-center rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className={`absolute w-full h-full backface-hidden rounded-xl p-4 flex flex-col justify-center items-center bg-gradient-to-br ${colorClass} text-white`}>
          {front}
          <p className="absolute bottom-3 text-xs opacity-75 flex items-center gap-1">
            <RotateCw size={12} /> Tap to flip
          </p>
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl p-4 flex flex-col justify-center items-center bg-white text-slate-800 border-2 border-indigo-100 rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  );
};

export const MultipleChoice = ({ 
  question, 
  onAnswer,
  initialAnswer
}: { 
  question: QuizQuestion; 
  onAnswer: (isCorrect: boolean, selectedIndex: number) => void;
  initialAnswer?: { selectedIndex: number; isCorrect: boolean };
}) => {
  const [selected, setSelected] = useState<number | null>(initialAnswer ? initialAnswer.selectedIndex : null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(initialAnswer !== undefined);

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelected(idx);
    setIsSubmitted(true);
    const correct = idx === question.correctIndex;
    onAnswer(correct, idx);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 mb-6">
      <h3 className="font-semibold text-lg mb-4 text-slate-800">{question.question}</h3>
      <div className="space-y-3">
        {question.options.map((opt: string, idx: number) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
          if (isSubmitted) {
            if (idx === question.correctIndex) btnClass += "border-emerald-500 bg-emerald-50/80 text-emerald-900";
            else if (idx === selected) btnClass += "border-rose-400 bg-rose-50/80 text-rose-900";
            else btnClass += "border-slate-100 text-slate-400 opacity-60";
          } else {
            btnClass += "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-700";
          }

          return (
            <button 
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={btnClass}
            >
              <div className="flex justify-between items-center gap-3">
                <span className="leading-snug">{opt}</span>
                {isSubmitted && idx === question.correctIndex && <CheckCircle size={20} className="text-emerald-600 shrink-0" />}
                {isSubmitted && idx === selected && idx !== question.correctIndex && <XCircle size={20} className="text-rose-500 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>
      {isSubmitted && (
        <div className={`mt-4 p-4 rounded-xl text-sm ${selected === question.correctIndex ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'}`}>
          <span className="font-bold">{selected === question.correctIndex ? 'Correct! ' : 'Incorrect. '}</span>
          {question.feedback}
        </div>
      )}
    </div>
  );
};

export const NavControls = ({ 
  onNext, 
  onPrev, 
  showPrev, 
  showNext, 
  nextLabel = "Next" 
}: {
  onNext?: () => void;
  onPrev?: () => void;
  showPrev?: boolean;
  showNext?: boolean;
  nextLabel?: string;
}) => (
  <div className="flex justify-center items-center gap-4 mt-12 pb-12">
    {showPrev && (
      <button 
        onClick={onPrev}
        className="px-6 py-3 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all active:scale-95"
      >
        Back
      </button>
    )}
    {showNext && (
      <button 
        onClick={onNext}
        className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform active:scale-95 transition-all"
      >
        {nextLabel} <ArrowRight size={18} />
      </button>
    )}
  </div>
);

export const InfoBox = ({ title, children, type = "info" }: { title?: string; children: React.ReactNode; type?: 'info' | 'success' | 'warning' | 'tip' }) => {
  const colors = {
    info: "bg-blue-50/80 border-blue-200 text-blue-950",
    success: "bg-emerald-50/80 border-emerald-200 text-emerald-950",
    warning: "bg-amber-50/80 border-amber-200 text-amber-950",
    tip: "bg-purple-50/80 border-purple-200 text-purple-950"
  };
  
  return (
    <div className={`p-6 rounded-2xl border ${colors[type]} mb-6`}>
      {title && <h4 className="font-bold mb-2 text-lg">{title}</h4>}
      <div className="leading-relaxed text-slate-700">{children}</div>
    </div>
  );
};

export const LessonCompletionSummary = ({
  moduleTitle,
  score,
  maxScore,
  onReturn,
  onRetake
}: {
  moduleTitle: string;
  score: number;
  maxScore: number;
  onReturn: () => void;
  onRetake?: () => void;
}) => {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;
  
  let gradeText = "Great effort!";
  let gradeBadge = "Good Progress";
  let badgeColor = "bg-blue-100 text-blue-800 border-blue-200";

  if (percentage >= 90) {
    gradeText = "Outstanding! You have mastered this concept!";
    gradeBadge = "Mastery Level";
    badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
  } else if (percentage >= 70) {
    gradeText = "Well done! You have a solid grasp of this topic.";
    gradeBadge = "Proficient";
    badgeColor = "bg-indigo-100 text-indigo-800 border-indigo-200";
  } else {
    gradeText = "Good start! Practice makes perfect — feel free to review again.";
    gradeBadge = "Needs Review";
    badgeColor = "bg-amber-100 text-amber-800 border-amber-200";
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-8 max-w-xl mx-auto">
      <div className="inline-flex p-5 bg-gradient-to-tr from-emerald-100 to-indigo-100 text-emerald-600 rounded-3xl mb-6 shadow-sm">
        <Trophy size={56} className="text-indigo-600" />
      </div>
      
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Lesson Complete!</h2>
      <p className="text-slate-600 mb-8">
        You've completed all activities in <span className="font-semibold text-slate-800">{moduleTitle}</span>.
      </p>

      {/* Score Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 text-left">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Your Result</span>
            <div className="text-2xl font-bold text-slate-900">Module Score</div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>
            {gradeBadge}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="text-xs font-semibold text-slate-500 mb-1">Points Earned</div>
            <div className="text-3xl font-black text-indigo-600">{score} <span className="text-base text-slate-400 font-medium">/ {maxScore}</span></div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <div className="text-xs font-semibold text-slate-500 mb-1">Accuracy</div>
            <div className="text-3xl font-black text-slate-800">{percentage}%</div>
          </div>
        </div>

        {/* Accuracy Bar */}
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Performance Score</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 60 ? 'bg-indigo-500' : 'bg-amber-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-slate-600 italic text-center mt-4">{gradeText}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onRetake && (
          <button 
            onClick={onRetake}
            id="retake-module-button"
            className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> Retake Lesson
          </button>
        )}
        <button 
          onClick={onReturn}
          id="return-to-dashboard-button"
          className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          Return to Dashboard <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
