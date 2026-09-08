import React, { useState } from 'react';
import { ModuleType, ModuleProgress } from '../types';
import { ExamQuestion } from '../data/postTestsData';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Clock, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface PostLessonTestRunnerProps {
  moduleId: ModuleType;
  title: string;
  description: string;
  questions: ExamQuestion[];
  initialProgress?: ModuleProgress;
  onUpdateProgress: (progress: ModuleProgress) => void;
  onExit: () => void;
}

type TestState = 'START' | 'EXAM' | 'RESULTS' | 'REVIEW';

export const PostLessonTestRunner: React.FC<PostLessonTestRunnerProps> = ({
  moduleId,
  title,
  description,
  questions,
  initialProgress,
  onUpdateProgress,
  onExit
}) => {
  const [testState, setTestState] = useState<TestState>('START');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<number, boolean>>({});

  const currentQ = questions[currentIndex];
  const isConfirmed = confirmedQuestions[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];

  const handleStart = () => {
    setTestState('EXAM');
    setCurrentIndex(0);
    setSelectedAnswers({});
    setConfirmedQuestions({});
  };

  const handleSelectOption = (idx: number) => {
    if (isConfirmed) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: idx }));
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === undefined || isConfirmed) return;
    
    const newConfirmed = { ...confirmedQuestions, [currentIndex]: true };
    setConfirmedQuestions(newConfirmed);

    // Calculate score
    let score = 0;
    questions.forEach((q, idx) => {
      const ans = idx === currentIndex ? selectedOption : selectedAnswers[idx];
      if (ans === q.correctIndex) score++;
    });

    const isAllComplete = Object.keys(newConfirmed).length === questions.length;

    onUpdateProgress({
      moduleId,
      completed: isAllComplete,
      currentPage: currentIndex + 1,
      totalPages: questions.length,
      score,
      maxScore: questions.length,
      lastAttemptedAt: new Date().toISOString()
    });

    if (currentIndex === questions.length - 1) {
      setTestState('RESULTS');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setTestState('RESULTS');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Compute final score
  let finalScore = 0;
  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      finalScore++;
    }
  });
  const percentage = Math.round((finalScore / questions.length) * 100);

  // START SCREEN
  if (testState === 'START') {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 animate-in">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <FileText className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Formal Assessment
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {title}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-10 text-left">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs text-slate-500 font-medium">Questions</div>
              <div className="text-xl font-bold text-slate-900 mt-1">{questions.length} Items</div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs text-slate-500 font-medium">Format</div>
              <div className="text-xl font-bold text-slate-900 mt-1">Multi-Choice</div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="text-xs text-slate-500 font-medium">Passing</div>
              <div className="text-xl font-bold text-indigo-600 mt-1">80%</div>
            </div>
          </div>

          {initialProgress?.completed && (
            <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Previous Attempt: {initialProgress.score} / {initialProgress.maxScore} ({Math.round((initialProgress.score / initialProgress.maxScore) * 100)}%)
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExit}
              className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold text-sm transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handleStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
            >
              Begin Post Test
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (testState === 'RESULTS') {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-in">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            percentage >= 80 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <Award className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Assessment Completed
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            {title} Score Report
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-8">
            {percentage >= 80 
              ? 'Outstanding performance! You have demonstrated a high level of grammar mastery.' 
              : 'Good effort! Review the detailed rule explanations below to strengthen your understanding.'}
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{finalScore} / {questions.length}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Total Points</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className={`text-2xl sm:text-3xl font-extrabold ${percentage >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {percentage}%
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Accuracy</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className={`text-xl sm:text-2xl font-extrabold ${percentage >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {percentage >= 80 ? 'Passed' : 'Needs Review'}
              </div>
              <div className="text-xs text-slate-500 font-medium mt-1">Status</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setTestState('REVIEW')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-sm transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Review All Answers
            </button>
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Test
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

  // REVIEW SCREEN
  if (testState === 'REVIEW') {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-in">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setTestState('RESULTS')}
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Score Report
          </button>
          <div className="text-sm font-semibold text-slate-700">
            Score: {finalScore} / {questions.length} ({percentage}%)
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {questions.map((q, idx) => {
            const userAns = selectedAnswers[idx];
            const isCorrect = userAns === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border ${
                  isCorrect ? 'bg-white border-emerald-200 shadow-sm' : 'bg-white border-rose-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900 text-base mb-4 leading-relaxed">
                  {q.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userAns === optIdx;
                    const isRight = optIdx === q.correctIndex;

                    let optClass = "p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2 ";
                    if (isRight) {
                      optClass += "bg-emerald-50 border-emerald-300 text-emerald-900 font-medium";
                    } else if (isUserChoice && !isRight) {
                      optClass += "bg-rose-50 border-rose-300 text-rose-900 line-through";
                    } else {
                      optClass += "bg-slate-50 border-slate-200 text-slate-600";
                    }

                    return (
                      <div key={optIdx} className={optClass}>
                        <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900">Grammar Rule Explanation: </span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => setTestState('RESULTS')}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-colors"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM QUESTION
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Exam
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
            {title}
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
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-lg">
            Item {currentIndex + 1} / {questions.length}
          </span>
          {isConfirmed && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              selectedOption === currentQ.correctIndex ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {selectedOption === currentQ.correctIndex ? '✓ Correct' : '✕ Incorrect'}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const isCorrectOption = optIdx === currentQ.correctIndex;

            let btnStyle = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 text-slate-800";
            if (isConfirmed) {
              if (isCorrectOption) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
              } else if (isSelected && !isCorrectOption) {
                btnStyle = "border-rose-400 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-200 opacity-50 text-slate-500";
              }
            } else if (isSelected) {
              btnStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-2 ring-indigo-500/20";
            }

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                disabled={isConfirmed}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-3 text-sm ${btnStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="mt-0.5">{option}</span>
                </div>

                {isConfirmed && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                )}
                {isConfirmed && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback */}
        {isConfirmed && (
          <div className={`p-4 rounded-2xl border mb-6 text-sm ${
            selectedOption === currentQ.correctIndex
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-start gap-2.5">
              {selectedOption === currentQ.correctIndex ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold block mb-1">
                  {selectedOption === currentQ.correctIndex ? 'Correct!' : 'Incorrect'}
                </span>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{currentQ.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation & Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none rounded-lg"
          >
            Previous
          </button>

          {!isConfirmed ? (
            <button
              onClick={handleConfirmAnswer}
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
              {currentIndex === questions.length - 1 ? 'View Test Results' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
