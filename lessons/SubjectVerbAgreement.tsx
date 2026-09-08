
import React, { useState, useEffect } from 'react';
import { LessonContainer, InfoBox, NavControls, FlipCard, MultipleChoice, LessonCompletionSummary } from '../components/Shared';
import { Trophy, RefreshCcw } from 'lucide-react';
import { ModuleProgress, ModuleType } from '../types';

interface SubjectVerbAgreementProps {
  onBack: () => void;
  initialProgress?: ModuleProgress;
  onUpdateProgress?: (data: ModuleProgress) => void;
}

const RULES = [
  { id: 1, title: 'The "And" Rule', description: 'Two or more subjects joined by "and" are considered plural and require a verb form WITHOUT an "s".', exampleCorrect: 'Jan, John, and Bob walk to the store.', note: 'Think: 1 + 1 = 2 (Plural)' },
  { id: 2, title: 'Each & Every', description: 'If a subject is modified by "each" or "every", that subject is singular and will take a verb form that ends in "s".', exampleCorrect: 'Each boy and girl walks to the store.', note: 'Treat them one at a time.' },
  { id: 3, title: 'Or, Nor, But', description: 'If plural subjects are joined by "or", "nor", or "but", the verb must agree with the subject closest to it.', exampleCorrect: 'Neither Bob nor his brothers walk to the store.', note: 'Look at the noun neighbor!' },
  { id: 4, title: 'Indefinite Pronouns', description: 'Indefinite pronouns (everyone, someone, nothing) are usually singular and take a verb ending in "s".', exampleCorrect: 'Everyone walks to the store.', note: 'Usually singular.' },
  { id: 5, title: 'Prepositional Phrases', description: 'The subject is NEVER in a prepositional phrase. Ignore words between the subject and verb.', exampleCorrect: 'The mother duck (with all her ducklings) walks to the store.', note: 'Cross out the phrase to find the real subject.' },
];

const SORT_ITEMS = [
  { id: 's1', text: 'The cat', type: 'singular' },
  { id: 's2', text: 'They', type: 'plural' },
  { id: 's3', text: 'Everyone', type: 'singular' },
  { id: 's4', text: 'Bob and John', type: 'plural' },
  { id: 's5', text: 'The team', type: 'singular' },
];

const QUIZ_QUESTIONS = [
  {
    id: 'sva_q1',
    question: 'The list of items _______ on the desk.',
    options: ['is', 'are', 'were', 'have been'],
    correctIndex: 0,
    feedback: 'Correct! The true subject is singular ("The list"), not "items" (which is inside the prepositional phrase "of items").'
  },
  {
    id: 'sva_q2',
    question: 'Neither the teacher nor the students _______ happy about the delay.',
    options: ['was', 'is', 'were', 'has been'],
    correctIndex: 2,
    feedback: 'Correct! With "neither...nor", the verb agrees with the closer subject ("students", which is plural).'
  },
  {
    id: 'sva_q3',
    question: 'Every student and teacher _______ required to wear an ID badge.',
    options: ['are', 'is', 'were', 'have'],
    correctIndex: 1,
    feedback: 'Correct! When modified by "Every" or "Each", the subject is treated as singular ("is").'
  },
  {
    id: 'sva_q4',
    question: 'The boy who plays with the dogs _______ my nephew.',
    options: ['is', 'are', 'were', 'have been'],
    correctIndex: 0,
    feedback: 'Correct! The main subject is "The boy" (singular), so use "is".'
  },
  {
    id: 'sva_q5',
    question: 'Each of the participants _______ a certificate of completion.',
    options: ['receive', 'receives', 'are receiving', 'have received'],
    correctIndex: 1,
    feedback: 'Correct! "Each" is singular, so it takes the singular verb ending in -s ("receives").'
  }
];

export default function SubjectVerbAgreement({ onBack, initialProgress, onUpdateProgress }: SubjectVerbAgreementProps) {
  const [page, setPage] = useState(initialProgress?.currentPage && initialProgress.currentPage > 1 ? Math.min(initialProgress.currentPage, 4) : 1);
  const totalPages = 4;
  const progress = (page / totalPages) * 100;

  // Sorting Game State
  const [unassignedItems, setUnassignedItems] = useState<{ id: string; text: string; type: string }[]>(SORT_ITEMS);
  const [completedItems, setCompletedItems] = useState<{ id: string; text: string; type: string }[]>([]);
  const [sortingScore, setSortingScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, { isCorrect: boolean; selectedIndex: number }>>({});

  const maxScore = SORT_ITEMS.length + QUIZ_QUESTIONS.length;
  const quizCorrectCount = Object.values(quizAnswers).filter(a => a.isCorrect).length;
  const currentScore = sortingScore + quizCorrectCount;

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (onUpdateProgress) {
      const isCompleted = page === 4 || (initialProgress?.completed && page >= 4);
      onUpdateProgress({
        moduleId: ModuleType.AGREEMENT,
        completed: Boolean(isCompleted),
        currentPage: page,
        totalPages,
        score: currentScore,
        maxScore,
        lastAttemptedAt: new Date().toISOString(),
        quizScores: {
          ...Object.entries(quizAnswers).reduce((acc, [qid, ans]) => {
            acc[qid] = ans.isCorrect;
            return acc;
          }, {} as Record<string, boolean>),
          sorting_challenge: completedItems.length === SORT_ITEMS.length
        }
      });
    }
  }, [page, currentScore, quizAnswers, sortingScore]);

  const resetGame = () => {
    setUnassignedItems([...SORT_ITEMS]);
    setCompletedItems([]);
    setSortingScore(0);
    setFeedback(null);
  };

  const handleSort = (targetType: string) => {
    if (unassignedItems.length === 0) return;
    const currentItem = unassignedItems[0];
    if (currentItem.type === targetType) {
      setCompletedItems(prev => [...prev, currentItem]);
      setUnassignedItems(prev => prev.slice(1));
      setSortingScore(prev => prev + 1);
      setFeedback('Correct!');
      setTimeout(() => setFeedback(null), 1200);
    } else {
      setFeedback('Try Again!');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const handleQuizAnswer = (qid: string, isCorrect: boolean, selectedIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qid]: { isCorrect, selectedIndex }
    }));
  };

  const handleResetModule = () => {
    setPage(1);
    resetGame();
    setQuizAnswers({});
  };

  return (
    <LessonContainer 
      title="Subject-Verb Agreement" 
      subtitle="Matching the number of the subject with the verb."
      progress={progress}
      onBack={onBack}
      score={currentScore}
      maxScore={maxScore}
    >
      {page === 1 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Rules</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {RULES.map((rule) => (
              <FlipCard 
                key={rule.id}
                colorClass="from-cyan-500 to-blue-600"
                front={
                  <div className="text-center">
                    <div className="text-sm opacity-75 uppercase tracking-widest mb-2 font-bold">Rule #{rule.id}</div>
                    <div className="text-2xl font-bold">{rule.title}</div>
                  </div>
                }
                back={
                  <div className="text-left text-sm">
                    <p className="mb-3 text-slate-700">{rule.description}</p>
                    <div className="bg-emerald-50 border-l-2 border-emerald-500 pl-2 py-1 mb-2 text-xs">
                      <span className="font-bold text-emerald-800">Correct: </span>
                      {rule.exampleCorrect}
                    </div>
                    <p className="text-xs text-slate-400 italic">Tip: {rule.note}</p>
                  </div>
                }
              />
            ))}
          </div>
          <NavControls onNext={() => setPage(2)} showNext={true} />
        </div>
      )}

      {page === 2 && (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Sorting Challenge</h2>
              <p className="text-slate-600 mt-1">Sort each subject into the correct bin according to the verb form it takes.</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 text-cyan-700 px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
              Sorted: {completedItems.length}/{SORT_ITEMS.length}
            </div>
          </div>

          <InfoBox title="Instructions" type="tip">
            <p>Does the subject take a <strong>Singular verb</strong> (ends in -s, e.g. <em>walks</em>) or a <strong>Plural verb</strong> (no -s, e.g. <em>walk</em>)? Tap a bin to sort.</p>
          </InfoBox>

          <div className="flex flex-col md:flex-row gap-4 min-h-80 items-stretch my-6">
            {/* Plural Bin */}
            <button 
              type="button"
              onClick={() => handleSort('plural')}
              className="flex-1 bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-indigo-100/80 transition-colors text-center"
            >
              <div className="text-4xl mb-2">👥</div>
              <h3 className="font-bold text-indigo-900 text-lg">PLURAL SUBJECT</h3>
              <p className="text-xs text-indigo-700 mt-1">Verb has NO "s"<br/>(e.g., <em>run, study, eat</em>)</p>
            </button>

            {/* Card Stack */}
            <div className="w-full md:w-72 flex flex-col items-center justify-center relative min-h-60">
              {unassignedItems.length > 0 ? (
                <div className="bg-white w-full aspect-square shadow-lg rounded-2xl border border-slate-200 flex items-center justify-center p-6 text-center z-10">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Current Subject</p>
                    <h3 className="text-2xl font-serif font-bold text-slate-800">{unassignedItems[0].text}</h3>
                    <p className="mt-4 text-xs font-semibold text-slate-500">Tap Left (Plural) or Right (Singular) box</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm w-full">
                  <Trophy size={54} className="text-amber-500 mx-auto mb-3" />
                  <h3 className="font-bold text-xl text-slate-900 mb-2">All Sorted!</h3>
                  <p className="text-sm text-slate-500 mb-4">Score: {sortingScore}/{SORT_ITEMS.length}</p>
                  <button 
                    onClick={resetGame} 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800 bg-cyan-50 px-4 py-2 rounded-xl"
                  >
                    <RefreshCcw size={14}/> Replay Sorting
                  </button>
                </div>
              )}
              {feedback && (
                <div className={`mt-3 font-bold px-4 py-1 rounded-full text-xs animate-bounce ${feedback === 'Correct!' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}`}>
                  {feedback}
                </div>
              )}
            </div>

            {/* Singular Bin */}
            <button 
              type="button"
              onClick={() => handleSort('singular')}
              className="flex-1 bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-amber-100/80 transition-colors text-center"
            >
              <div className="text-4xl mb-2">👤</div>
              <h3 className="font-bold text-amber-900 text-lg">SINGULAR SUBJECT</h3>
              <p className="text-xs text-amber-700 mt-1">Verb ends in "s"<br/>(e.g., <em>runs, studies, eats</em>)</p>
            </button>
          </div>

          <NavControls onPrev={() => setPage(1)} onNext={() => setPage(3)} showPrev showNext />
        </div>
      )}

      {page === 3 && (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Agreement Assessment</h2>
              <p className="text-slate-600 mt-1">Choose the correct verb for each sentence.</p>
            </div>
            <div className="bg-cyan-50 border border-cyan-200 text-cyan-700 px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
              Quiz: {quizCorrectCount}/{QUIZ_QUESTIONS.length}
            </div>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q) => (
              <MultipleChoice 
                key={q.id} 
                question={q} 
                onAnswer={(isCorrect, selectedIndex) => handleQuizAnswer(q.id, isCorrect, selectedIndex)}
                initialAnswer={quizAnswers[q.id]}
              />
            ))}
          </div>
          <NavControls onPrev={() => setPage(2)} onNext={() => setPage(4)} showPrev showNext />
        </div>
      )}

      {page === 4 && (
        <LessonCompletionSummary 
          moduleTitle="Subject-Verb Agreement"
          score={currentScore}
          maxScore={maxScore}
          onReturn={onBack}
          onRetake={handleResetModule}
        />
      )}
    </LessonContainer>
  );
}

