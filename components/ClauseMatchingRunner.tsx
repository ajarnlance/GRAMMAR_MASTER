import React, { useState } from 'react';
import { ModuleType, ModuleProgress } from '../types';
import { CLAUSE_MATCHING_COL_A, CLAUSE_MATCHING_COL_B, CLAUSE_MATCHING_ANSWERS } from '../data/postTestsData';
import { ArrowLeft, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface ClauseMatchingRunnerProps {
  initialProgress?: ModuleProgress;
  onUpdateProgress: (progress: ModuleProgress) => void;
  onExit: () => void;
}

export const ClauseMatchingRunner: React.FC<ClauseMatchingRunnerProps> = ({
  initialProgress,
  onUpdateProgress,
  onExit
}) => {
  const [selectedA, setSelectedA] = useState<number | null>(CLAUSE_MATCHING_COL_A[0].id);
  const [matches, setMatches] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentItemA = CLAUSE_MATCHING_COL_A.find(item => item.id === selectedA) || CLAUSE_MATCHING_COL_A[0];
  const isCurrentSubmitted = selectedA !== null ? submitted[selectedA] : false;
  const currentMatch = selectedA !== null ? matches[selectedA] : undefined;

  const handleSelectB = (letterId: string) => {
    if (selectedA === null || submitted[selectedA]) return;
    setMatches(prev => ({ ...prev, [selectedA]: letterId }));
  };

  const handleCheckAnswer = () => {
    if (selectedA === null || !currentMatch || submitted[selectedA]) return;
    
    const newSubmitted = { ...submitted, [selectedA]: true };
    setSubmitted(newSubmitted);

    // Calculate score
    let score = 0;
    CLAUSE_MATCHING_COL_A.forEach(item => {
      const chosen = item.id === selectedA ? currentMatch : matches[item.id];
      if (chosen && chosen === CLAUSE_MATCHING_ANSWERS[item.id]) {
        score++;
      }
    });

    const isAllDone = Object.keys(newSubmitted).length === CLAUSE_MATCHING_COL_A.length;

    onUpdateProgress({
      moduleId: ModuleType.TEST_CLAUSE_MATCHING,
      completed: isAllDone,
      currentPage: Object.keys(newSubmitted).length,
      totalPages: CLAUSE_MATCHING_COL_A.length,
      score,
      maxScore: CLAUSE_MATCHING_COL_A.length,
      lastAttemptedAt: new Date().toISOString()
    });

    if (isAllDone) {
      setIsFinished(true);
    }
  };

  const handleNextItem = () => {
    if (selectedA === null) return;
    const currentIndex = CLAUSE_MATCHING_COL_A.findIndex(i => i.id === selectedA);
    if (currentIndex < CLAUSE_MATCHING_COL_A.length - 1) {
      setSelectedA(CLAUSE_MATCHING_COL_A[currentIndex + 1].id);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setMatches({});
    setSubmitted({});
    setSelectedA(CLAUSE_MATCHING_COL_A[0].id);
    setIsFinished(false);
  };

  // Stats
  let totalScore = 0;
  CLAUSE_MATCHING_COL_A.forEach(item => {
    if (submitted[item.id] && matches[item.id] === CLAUSE_MATCHING_ANSWERS[item.id]) {
      totalScore++;
    }
  });
  const answeredCount = Object.keys(submitted).length;
  const percentage = answeredCount > 0 ? Math.round((totalScore / answeredCount) * 100) : 0;
  const finalPercentage = Math.round((totalScore / CLAUSE_MATCHING_COL_A.length) * 100);

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-in">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <Award className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Exercise Complete
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Matching Clauses Review</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto text-sm sm:text-base">
            You matched sentence clauses to formulate coherent, grammatically sound compound and complex structures.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-slate-900">{totalScore} / {CLAUSE_MATCHING_COL_A.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Score</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className={`text-2xl font-extrabold ${finalPercentage >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {finalPercentage}%
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Accuracy</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-xl font-extrabold text-indigo-600">
                {finalPercentage >= 80 ? 'Mastery' : 'Completed'}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Status</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Matching
            </button>
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors"
            >
              Back to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 animate-in">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
            Score: {totalScore} / {answeredCount} ({percentage}%)
          </span>
          <span className="text-xs font-medium text-slate-500">
            Completed: {answeredCount} / {CLAUSE_MATCHING_COL_A.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${(answeredCount / CLAUSE_MATCHING_COL_A.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Clauses (Column A) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-md">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Part A: Initial Clauses ({CLAUSE_MATCHING_COL_A.length})
            </h3>
            <span className="text-xs text-slate-400 font-medium">Select item</span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {CLAUSE_MATCHING_COL_A.map((item, idx) => {
              const isSelected = selectedA === item.id;
              const isDone = submitted[item.id];
              const isCorrect = matches[item.id] === CLAUSE_MATCHING_ANSWERS[item.id];

              let itemStyle = "border-slate-200 hover:border-indigo-300 bg-white text-slate-700";
              if (isSelected) {
                itemStyle = "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-2 ring-indigo-500/20";
              } else if (isDone) {
                itemStyle = isCorrect 
                  ? "border-emerald-200 bg-emerald-50/40 text-slate-800" 
                  : "border-rose-200 bg-rose-50/40 text-slate-800";
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedA(item.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${itemStyle}`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                    isDone 
                      ? (isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white')
                      : (isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600')
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="flex-1 leading-snug">{item.text}</span>
                  {isDone && (
                    isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    )
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Matching Area */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Question Focus Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                Clause #{currentItemA.id}
              </span>
              {isCurrentSubmitted && (
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  currentMatch === CLAUSE_MATCHING_ANSWERS[currentItemA.id] 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {currentMatch === CLAUSE_MATCHING_ANSWERS[currentItemA.id] ? '✓ Correct Match' : '✕ Incorrect'}
                </span>
              )}
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4">
              <div className="text-xs font-medium text-slate-500 mb-1">Clause to match:</div>
              <div className="text-base sm:text-lg font-bold text-slate-900">
                "{currentItemA.text}..."
              </div>
            </div>

            {/* Selected Matching Ending Preview */}
            {currentMatch && (
              <div className={`p-4 rounded-2xl border mb-4 text-sm ${
                isCurrentSubmitted 
                  ? (currentMatch === CLAUSE_MATCHING_ANSWERS[currentItemA.id] 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium' 
                      : 'bg-rose-50 border-rose-200 text-rose-950')
                  : 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-medium'
              }`}>
                <div className="text-xs font-semibold text-slate-500 mb-1">Combined Sentence:</div>
                <div className="text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold text-slate-900">{currentItemA.text}</span>{' '}
                  <span className="text-indigo-700 underline decoration-indigo-300">
                    {CLAUSE_MATCHING_COL_B.find(b => b.id === currentMatch)?.text}
                  </span>
                </div>
                {isCurrentSubmitted && currentMatch !== CLAUSE_MATCHING_ANSWERS[currentItemA.id] && (
                  <div className="mt-2 pt-2 border-t border-rose-200 text-xs text-rose-800">
                    <span className="font-bold">Correct ending: </span>
                    {CLAUSE_MATCHING_COL_B.find(b => b.id === CLAUSE_MATCHING_ANSWERS[currentItemA.id])?.text}
                  </div>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-500">
                {!currentMatch ? 'Select an ending from Column B below' : isCurrentSubmitted ? 'Proceed to next clause' : 'Ready to verify'}
              </div>
              {!isCurrentSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!currentMatch}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-colors"
                >
                  Verify Match
                </button>
              ) : (
                <button
                  onClick={handleNextItem}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-colors"
                >
                  Next Clause
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Column B Option Pool */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
              Part B: Select Matching Clause Ending
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {CLAUSE_MATCHING_COL_B.map(b => {
                const isSelectedForCurrent = currentMatch === b.id;
                const isCorrectForCurrent = isCurrentSubmitted && b.id === CLAUSE_MATCHING_ANSWERS[currentItemA.id];

                let bStyle = "border-slate-200 hover:border-indigo-300 bg-white text-slate-700";
                if (isCurrentSubmitted) {
                  if (isCorrectForCurrent) {
                    bStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                  } else if (isSelectedForCurrent && !isCorrectForCurrent) {
                    bStyle = "border-rose-300 bg-rose-50 text-rose-900";
                  } else {
                    bStyle = "border-slate-200 opacity-50 text-slate-400";
                  }
                } else if (isSelectedForCurrent) {
                  bStyle = "border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-500/20";
                }

                return (
                  <button
                    key={b.id}
                    onClick={() => handleSelectB(b.id)}
                    disabled={isCurrentSubmitted}
                    className={`text-left p-3 rounded-xl border text-xs flex items-start gap-2 transition-all ${bStyle}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                      isSelectedForCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {b.id}
                    </span>
                    <span className="leading-snug">{b.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
