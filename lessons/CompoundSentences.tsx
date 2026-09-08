import React, { useState, useEffect } from 'react';
import { LessonContainer, FlipCard, MultipleChoice, NavControls, InfoBox, LessonCompletionSummary } from '../components/Shared';
import { ModuleProgress, ModuleType } from '../types';

interface CompoundSentencesProps {
  onBack: () => void;
  initialProgress?: ModuleProgress;
  onUpdateProgress?: (data: ModuleProgress) => void;
}

export default function CompoundSentences({ onBack, initialProgress, onUpdateProgress }: CompoundSentencesProps) {
  const [page, setPage] = useState(initialProgress?.currentPage && initialProgress.currentPage > 1 ? Math.min(initialProgress.currentPage, 4) : 1);
  const totalPages = 4;
  const progress = (page / totalPages) * 100;

  const [quizAnswers, setQuizAnswers] = useState<Record<string, { isCorrect: boolean; selectedIndex: number }>>({});

  const fanboys = [
    { l: 'F', w: 'For', m: 'Reason/Because' },
    { l: 'A', w: 'And', m: 'Addition' },
    { l: 'N', w: 'Nor', m: 'Negative Addition' },
    { l: 'B', w: 'But', m: 'Contrast' },
    { l: 'O', w: 'Or', m: 'Choice' },
    { l: 'Y', w: 'Yet', m: 'Contrast/However' },
    { l: 'S', w: 'So', m: 'Result' },
  ];

  const quizQuestions = [
    {
      id: 'cp_q1',
      question: 'Which is a compound sentence?',
      options: [
        'Ice cream and gelato are popular desserts.',
        'I like chocolate ice cream, but my sister prefers vanilla.',
        'The ice cream melted and turned sour.',
        'Many people enjoy eating ice cream.'
      ],
      correctIndex: 1,
      feedback: 'Correct! It has two independent clauses joined by ", but".'
    },
    {
      id: 'cp_q2',
      question: 'Which sentence is punctuated correctly?',
      options: [
        'I wanted to go outside but it rained.',
        'I wanted to go outside, but it rained.',
        'I wanted, to go outside but it rained.',
        'I wanted to go outside, but, it rained.'
      ],
      correctIndex: 1,
      feedback: 'Correct! Use a comma before the FANBOYS when joining two complete sentences.'
    },
    {
      id: 'cp_q3',
      question: 'Which coordinating conjunction indicates a result or effect?',
      options: [
        'for',
        'so',
        'nor',
        'yet'
      ],
      correctIndex: 1,
      feedback: 'Correct! "So" connects a cause with its result (e.g., "It was raining, so we stayed indoors").'
    },
    {
      id: 'cp_q4',
      question: 'Identify the sentence with a comma splice error (incorrectly joined without a conjunction):',
      options: [
        'The bell rang, and the students left the classroom.',
        'The bell rang, the students left the classroom.',
        'The bell rang; the students left the classroom.',
        'When the bell rang, the students left the classroom.'
      ],
      correctIndex: 1,
      feedback: 'Correct! Joining two independent clauses with only a comma and no coordinating conjunction is a comma splice error.'
    },
    {
      id: 'cp_q5',
      question: 'Complete the sentence: "He did not study for the exam, _______ did he attend the review session."',
      options: [
        'so',
        'or',
        'nor',
        'for'
      ],
      correctIndex: 2,
      feedback: 'Correct! "Nor" is used for negative addition and causes subject-verb inversion ("did he attend").'
    }
  ];

  const maxScore = quizQuestions.length;
  const currentScore = Object.values(quizAnswers).filter(a => a.isCorrect).length;

  useEffect(() => {
    if (onUpdateProgress) {
      const isCompleted = page === 4 || (initialProgress?.completed && page >= 4);
      onUpdateProgress({
        moduleId: ModuleType.COMPOUND,
        completed: Boolean(isCompleted),
        currentPage: page,
        totalPages,
        score: currentScore,
        maxScore,
        lastAttemptedAt: new Date().toISOString(),
        quizScores: Object.entries(quizAnswers).reduce((acc, [qid, ans]) => {
          acc[qid] = ans.isCorrect;
          return acc;
        }, {} as Record<string, boolean>)
      });
    }
  }, [page, currentScore, quizAnswers]);

  const handleQuizAnswer = (qid: string, isCorrect: boolean, selectedIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qid]: { isCorrect, selectedIndex }
    }));
  };

  const handleResetModule = () => {
    setPage(1);
    setQuizAnswers({});
  };

  return (
    <LessonContainer 
      title="Compound Sentences" 
      subtitle="Two independent clauses joined together."
      progress={progress}
      onBack={onBack}
      score={currentScore}
      maxScore={maxScore}
    >
      {page === 1 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What is a Compound Sentence?</h2>
          
          <InfoBox title="Definition" type="info">
            <p>A <strong>compound sentence</strong> is made by joining two <strong>independent clauses</strong> (complete sentences) with a comma and a coordinating conjunction (FANBOYS).</p>
          </InfoBox>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 my-8 text-center">
            <div className="text-xl mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="bg-blue-100 text-blue-900 px-3 py-1.5 rounded-xl font-medium">I like ice cream</span>
              <span className="text-2xl font-bold text-slate-400">+</span>
              <span className="bg-purple-100 text-purple-900 px-3 py-1.5 rounded-xl font-bold">, but</span>
              <span className="text-2xl font-bold text-slate-400">+</span>
              <span className="bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl font-medium">Ali prefers gelato</span>
            </div>
            <p className="text-slate-500 italic mt-2">Two complete thoughts connected by punctuation and a coordinating conjunction.</p>
          </div>

          <NavControls onNext={() => setPage(2)} showNext={true} />
        </div>
      )}

      {page === 2 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">The FANBOYS</h2>
          <p className="mb-6 text-slate-600">Memorize these 7 coordinating conjunctions. They are the glue for compound sentences.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {fanboys.map((f, i) => (
              <FlipCard 
                key={i}
                colorClass="from-purple-500 to-indigo-600"
                front={<span className="text-4xl font-black">{f.l}</span>}
                back={
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600 mb-1">{f.w}</div>
                    <div className="text-xs text-slate-500">{f.m}</div>
                  </div>
                }
              />
            ))}
          </div>

          <InfoBox title="Punctuation Rule" type="warning">
            <p><strong>Comma + Conjunction:</strong> Place a comma <em>before</em> the coordinating conjunction.</p>
            <p className="mt-2 font-mono text-sm bg-white/70 p-3 rounded-xl text-slate-800 border border-amber-200">
              [Complete Sentence] <strong>, FANBOYS</strong> [Complete Sentence].
            </p>
          </InfoBox>

          <NavControls onPrev={() => setPage(1)} onNext={() => setPage(3)} showPrev showNext />
        </div>
      )}

      {page === 3 && (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Check Your Understanding</h2>
              <p className="text-slate-600 mt-1">Answer the following questions to test your compound sentence skills.</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 text-purple-700 px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
              Score: {currentScore}/{maxScore}
            </div>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q) => (
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
          moduleTitle="Compound Sentences"
          score={currentScore}
          maxScore={maxScore}
          onReturn={onBack}
          onRetake={handleResetModule}
        />
      )}
    </LessonContainer>
  );
}
