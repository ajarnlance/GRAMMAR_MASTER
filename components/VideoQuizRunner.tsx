import React, { useState } from 'react';
import { ModuleType, ModuleProgress } from '../types';
import { VideoQuizQuestion } from '../data/videoQuizzesData';
import { ArrowLeft, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

interface VideoQuizRunnerProps {
  moduleId: ModuleType;
  title: string;
  subtitle: string;
  questions: VideoQuizQuestion[];
  initialProgress?: ModuleProgress;
  onUpdateProgress: (progress: ModuleProgress) => void;
  onExit: () => void;
}

export const VideoQuizRunner: React.FC<VideoQuizRunnerProps> = ({
  moduleId,
  title,
  subtitle,
  questions,
  initialProgress,
  onUpdateProgress,
  onExit
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const isAnswered = submitted[currentIndex];
  const selectedOption = userAnswers[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setUserAnswers(prev => ({ ...prev, [currentIndex]: idx }));
  };

  const handleConfirm = () => {
    if (selectedOption === undefined || isAnswered) return;
    
    const newSubmitted = { ...submitted, [currentIndex]: true };
    setSubmitted(newSubmitted);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      const ans = idx === currentIndex ? selectedOption : userAnswers[idx];
      if (ans === q.correct) {
        correctCount++;
      }
    });

    const isLast = currentIndex === questions.length - 1;
    const allAnswered = Object.keys(newSubmitted).length === questions.length;

    onUpdateProgress({
      moduleId,
      completed: allAnswered,
      currentPage: currentIndex + 1,
      totalPages: questions.length,
      score: correctCount,
      maxScore: questions.length,
      lastAttemptedAt: new Date().toISOString()
    });

    if (isLast) {
      setIsFinished(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setSubmitted({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  // Compute stats
  const totalAnswered = Object.keys(submitted).length;
  let correctTotal = 0;
  questions.forEach((q, idx) => {
    if (submitted[idx] && userAnswers[idx] === q.correct) {
      correctTotal++;
    }
  });
  const accuracy = totalAnswered > 0 ? Math.round((correctTotal / totalAnswered) * 100) : 0;
  const finalPercentage = Math.round((correctTotal / questions.length) * 100);

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-in">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <Award className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Quiz Complete
          </span>

          <h2 className="text-2xl font-bold text-slate-900 mb-2">{title} Results</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto text-sm">
            Great job testing your understanding after watching the video lesson!
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-2xl font-extrabold text-slate-900">{correctTotal} / {questions.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Score</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className={`text-2xl font-extrabold ${finalPercentage >= 80 ? 'text-emerald-600' : finalPercentage >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                {finalPercentage}%
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Accuracy</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-2xl font-extrabold text-indigo-600">
                {finalPercentage >= 80 ? 'Mastery' : finalPercentage >= 60 ? 'Proficient' : 'Review'}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Rating</div>
            </div>
          </div>

          {/* Question Breakdown List */}
          <div className="text-left mb-8 max-w-2xl mx-auto space-y-3">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Review Answers</h3>
            {questions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correct;
              return (
                <div key={q.id} className={`p-3.5 rounded-xl border text-sm ${isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium text-slate-900">
                          {idx + 1}. {q.question}
                        </div>
                        <div className="text-xs mt-1 text-slate-600">
                          <span className="font-semibold">Correct answer:</span> {q.options[q.correct]}
                        </div>
                        <div className="text-xs mt-1 text-slate-500 italic">
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
            <button
              onClick={onExit}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl text-sm shadow-md transition-colors"
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
    <div className="max-w-3xl mx-auto py-6 px-4 animate-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hub
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
            Score: {correctTotal} / {totalAnswered} ({accuracy}%)
          </span>
          <span className="text-xs font-medium text-slate-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
        {currentQ.concept && (
          <div className="inline-flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {currentQ.concept}
          </div>
        )}

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const isCorrectOption = optIdx === currentQ.correct;

            let btnStyle = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-slate-700";
            if (isAnswered) {
              if (isCorrectOption) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
              } else if (isSelected && !isCorrectOption) {
                btnStyle = "border-rose-400 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-200 opacity-60 text-slate-500";
              }
            } else if (isSelected) {
              btnStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 font-medium ring-2 ring-indigo-500/20";
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelect(optIdx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start justify-between gap-3 text-sm ${btnStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="mt-0.5">{option}</span>
                </div>

                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback block if answered */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border mb-6 text-sm ${
            selectedOption === currentQ.correct
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-start gap-2.5">
              {selectedOption === currentQ.correct ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold block mb-1">
                  {selectedOption === currentQ.correct ? 'Correct!' : 'Incorrect'}
                </span>
                <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none rounded-lg"
          >
            Previous
          </button>

          {!isAnswered ? (
            <button
              onClick={handleConfirm}
              disabled={selectedOption === undefined}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
            >
              {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
