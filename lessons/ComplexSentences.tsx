import React, { useState, useEffect } from 'react';
import { LessonContainer, FlipCard, MultipleChoice, NavControls, InfoBox, LessonCompletionSummary } from '../components/Shared';
import { ModuleProgress, ModuleType } from '../types';

interface ComplexSentencesProps {
  onBack: () => void;
  initialProgress?: ModuleProgress;
  onUpdateProgress?: (data: ModuleProgress) => void;
}

export default function ComplexSentences({ onBack, initialProgress, onUpdateProgress }: ComplexSentencesProps) {
  const [page, setPage] = useState(initialProgress?.currentPage && initialProgress.currentPage > 1 ? Math.min(initialProgress.currentPage, 4) : 1);
  const totalPages = 4;
  const progress = (page / totalPages) * 100;

  const [quizAnswers, setQuizAnswers] = useState<Record<string, { isCorrect: boolean; selectedIndex: number }>>({});

  const subordinators = [
    { w: 'Because', m: 'Reason / Cause' },
    { w: 'Although', m: 'Contrast / Concession' },
    { w: 'When', m: 'Time' },
    { w: 'If', m: 'Condition' },
    { w: 'Since', m: 'Time or Reason' },
    { w: 'Unless', m: 'Negative Condition' },
  ];

  const quizQuestions = [
    {
      id: 'cx_q1',
      question: 'Which is a complex sentence?',
      options: [
        'I like ice cream and gelato.',
        'Although Ali likes ice cream, he prefers gelato.',
        'I like ice cream, but Ali prefers gelato.',
        'Ice cream and gelato are popular desserts.'
      ],
      correctIndex: 1,
      feedback: 'Correct! It contains a dependent clause ("Although Ali likes ice cream") and an independent clause.'
    },
    {
      id: 'cx_q2',
      question: 'Which sentence needs a comma?',
      options: [
        'Although the weather was perfect we decided to stay home.',
        'We decided to stay home although the weather was perfect.',
        'The students passed the test because they studied hard.',
        'She went to the store and bought some groceries.'
      ],
      correctIndex: 0,
      feedback: 'Correct! When the dependent clause comes FIRST, you must separate it with a comma.'
    },
    {
      id: 'cx_q3',
      question: 'Which is a dependent (subordinate) clause that cannot stand alone?',
      options: [
        'The professor explained the grammar rules clearly.',
        'Unless you submit the assignment before midnight.',
        'We finished our homework on time.',
        'She loves writing essays.'
      ],
      correctIndex: 1,
      feedback: 'Correct! "Unless you submit the assignment before midnight" starts with a subordinator and expresses an incomplete idea.'
    },
    {
      id: 'cx_q4',
      question: 'Which sentence is punctuated correctly when the independent clause comes first?',
      options: [
        'The game was postponed, because the field was flooded.',
        'The game was postponed because the field was flooded.',
        'Because the field was flooded the game was postponed.',
        'The game was postponed because, the field was flooded.'
      ],
      correctIndex: 1,
      feedback: 'Correct! No comma is needed when the independent clause comes before the dependent clause ("because...").'
    },
    {
      id: 'cx_q5',
      question: 'Select the best subordinating conjunction for a condition:',
      options: [
        'If you practice regularly, your English writing will improve rapidly.',
        'Because you practice regularly, your English writing will improve rapidly.',
        'Although you practice regularly, your English writing will improve rapidly.',
        'While you practice regularly, your English writing will improve rapidly.'
      ],
      correctIndex: 0,
      feedback: 'Correct! "If" introduces a conditional relationship between regular practice and rapid improvement.'
    }
  ];

  const maxScore = quizQuestions.length;
  const currentScore = Object.values(quizAnswers).filter(a => a.isCorrect).length;

  useEffect(() => {
    if (onUpdateProgress) {
      const isCompleted = page === 4 || (initialProgress?.completed && page >= 4);
      onUpdateProgress({
        moduleId: ModuleType.COMPLEX,
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
      title="Complex Sentences" 
      subtitle="Independent + Dependent Clauses."
      progress={progress}
      onBack={onBack}
      score={currentScore}
      maxScore={maxScore}
    >
      {page === 1 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What is a Complex Sentence?</h2>
          
          <InfoBox title="Definition" type="info">
            <p>A <strong>complex sentence</strong> joins an <strong>independent clause</strong> (complete thought) with a <strong>dependent clause</strong> (incomplete thought) using a <em>subordinating conjunction</em>.</p>
          </InfoBox>

          <div className="grid gap-4 my-8">
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-200">
              <h4 className="font-bold text-orange-900">Dependent Clause (Needs help!)</h4>
              <p className="text-lg font-serif italic text-slate-800 mt-1">"Because she studied hard"</p>
              <p className="text-xs text-orange-700 font-medium mt-1">This cannot stand alone as a sentence.</p>
            </div>
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
              <h4 className="font-bold text-emerald-900">Independent Clause (Complete thought!)</h4>
              <p className="text-lg font-serif italic text-slate-800 mt-1">"She passed the exam."</p>
              <p className="text-xs text-emerald-700 font-medium mt-1">This is a full complete sentence on its own.</p>
            </div>
            <div className="text-center text-xl font-bold text-slate-400">⬇️ Combined Together ⬇️</div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center text-lg font-medium text-slate-900">
              "<span className="bg-orange-100 px-2 py-0.5 rounded text-orange-900 font-semibold">Because she studied hard,</span> <span className="bg-emerald-100 px-2 py-0.5 rounded text-emerald-900 font-semibold">she passed the exam.</span>"
            </div>
          </div>

          <NavControls onNext={() => setPage(2)} showNext={true} />
        </div>
      )}

      {page === 2 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Subordinating Conjunctions</h2>
          <p className="mb-6 text-slate-600">These words start dependent clauses and show relationships of cause, time, condition, or contrast.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {subordinators.map((s, i) => (
              <FlipCard 
                key={i}
                colorClass="from-orange-500 to-rose-600"
                front={<span className="text-2xl font-bold">{s.w}</span>}
                back={
                  <div className="text-center">
                    <div className="text-sm font-bold text-orange-600">{s.m}</div>
                  </div>
                }
              />
            ))}
          </div>

          <InfoBox title="Comma Rule" type="warning">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Dependent Clause First:</strong> Use a comma.<br/>
                <span className="font-mono text-sm bg-white/70 px-2 py-1 rounded inline-block mt-1 border border-amber-200">
                  Because it rained<strong>,</strong> we stayed inside.
                </span>
              </li>
              <li>
                <strong>Independent Clause First:</strong> NO comma.<br/>
                <span className="font-mono text-sm bg-white/70 px-2 py-1 rounded inline-block mt-1 border border-amber-200">
                  We stayed inside because it rained.
                </span>
              </li>
            </ul>
          </InfoBox>

          <NavControls onPrev={() => setPage(1)} onNext={() => setPage(3)} showPrev showNext />
        </div>
      )}

      {page === 3 && (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Mastery Check</h2>
              <p className="text-slate-600 mt-1">Test your understanding of dependent clauses, subordinators, and comma rules.</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 text-orange-700 px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
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
          moduleTitle="Complex Sentences"
          score={currentScore}
          maxScore={maxScore}
          onReturn={onBack}
          onRetake={handleResetModule}
        />
      )}
    </LessonContainer>
  );
}
