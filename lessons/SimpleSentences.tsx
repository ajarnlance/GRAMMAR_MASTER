
import React, { useState, useEffect } from 'react';
import { LessonContainer, FlipCard, MultipleChoice, NavControls, InfoBox, LessonCompletionSummary } from '../components/Shared';
import { CheckCircle, XCircle, RefreshCcw, MoveRight, GripVertical } from 'lucide-react';
import { ModuleProgress, ModuleType } from '../types';

interface SimpleSentencesProps {
  onBack: () => void;
  initialProgress?: ModuleProgress;
  onUpdateProgress?: (data: ModuleProgress) => void;
}

export default function SimpleSentences({ onBack, initialProgress, onUpdateProgress }: SimpleSentencesProps) {
  const [page, setPage] = useState(initialProgress?.currentPage && initialProgress.currentPage > 1 ? Math.min(initialProgress.currentPage, 6) : 1);
  const totalPages = 6; 
  const progress = (page / totalPages) * 100;

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, { isCorrect: boolean; selectedIndex: number }>>({});
  // Activity 1: Sentence Builder completed questions
  const [completedBuilderQuestions, setCompletedBuilderQuestions] = useState<number[]>([]);
  // Activity 2: Matching score
  const [matchingScore, setMatchingScore] = useState<number>(0);

  // --- Data ---
  const fanboys = [
    { l: 'F', w: 'For', m: 'Joins nouns/phrases (Reason)' },
    { l: 'A', w: 'And', m: 'Addition' },
    { l: 'N', w: 'Nor', m: 'Negative addition' },
    { l: 'B', w: 'But', m: 'Contrast' },
    { l: 'O', w: 'Or', m: 'Choice' },
    { l: 'Y', w: 'Yet', m: 'Contrast/However' },
    { l: 'S', w: 'So', m: 'Result (rare in simple sentences)' },
  ];

  const quizQuestions = [
    {
      id: 'q1',
      question: 'Which is a simple sentence?',
      options: [
        'Ice cream and gelato are popular desserts.',
        'I like ice cream, but Ali prefers gelato.',
        'Although Ali likes ice cream, he prefers gelato.',
        'She studied hard, so she passed the exam.'
      ],
      correctIndex: 0,
      feedback: 'Correct! One independent clause with a compound subject.'
    },
    {
      id: 'q1b',
      question: 'Which is a simple sentence?',
      options: [
        'When I arrived home, I made dinner.',
        'The children ran and jumped on the playground.',
        'He wanted to go, but he was too tired.',
        'Because it was raining, we stayed inside.'
      ],
      correctIndex: 1,
      feedback: 'Correct! One subject ("children") with a compound verb ("ran and jumped").'
    },
    {
      id: 'q1c',
      question: 'Which is NOT a simple sentence?',
      options: [
        'On hot days throughout summer, many people eat ice cream.',
        'The ice cream melted and turned sour.',
        'I wanted ice cream, but the store was closed.',
        'Students can study in the library, at home, or in the cafeteria.'
      ],
      correctIndex: 2,
      feedback: 'Correct! This is a compound sentence (two independent clauses joined by "but").'
    },
    {
      id: 'q2',
      question: 'Which sentence needs a comma?',
      options: [
        'The students studied hard and passed the exam.',
        'In summer sales at ice cream shops increase significantly.',
        'She likes chocolate and vanilla ice cream.',
        'My brother plays soccer and basketball.'
      ],
      correctIndex: 1,
      feedback: 'Correct! "In summer" is an introductory phrase.'
    },
    {
      id: 'q2b',
      question: 'Which sentence needs commas?',
      options: [
        'I enjoy reading and writing in my free time.',
        'I like chocolate vanilla and strawberry ice cream.',
        'The movie was long but interesting.',
        'Students can study in the library or at home.'
      ],
      correctIndex: 1,
      feedback: 'Correct! Items in a list of three or more require commas.'
    },
    {
      id: 'q4',
      question: 'Which sentence is correctly punctuated?',
      options: [
        'I like ice cream such as, Baskin Robbins and Haagen-Dazs.',
        'I like ice cream, such as Baskin Robbins and Haagen-Dazs.',
        'I like ice cream such as Baskin Robbins, and Haagen-Dazs.',
        'I like, ice cream such as Baskin Robbins and Haagen-Dazs.'
      ],
      correctIndex: 1,
      feedback: 'Correct! Use a comma before "such as".'
    },
    {
      id: 'q6',
      question: 'Which sentence correctly uses a coordinating conjunction?',
      options: [
        'The students studied, and prepared for the exam.',
        'The students studied and prepared for the exam.',
        'The students studied and, prepared for the exam.',
        'The students, studied and prepared for the exam.'
      ],
      correctIndex: 1,
      feedback: 'Correct! No comma needed when joining two verbs with the same subject.'
    }
  ];

  const totalMaxScore = 7 + 3 + 10; // 7 quizzes + 3 builder + 10 matching

  // Calculate current score
  const quizCorrectCount = Object.values(quizAnswers).filter(a => a.isCorrect).length;
  const currentTotalScore = quizCorrectCount + completedBuilderQuestions.length + matchingScore;

  // Sync progress updates
  useEffect(() => {
    if (onUpdateProgress) {
      const isCompleted = page === 6 || (initialProgress?.completed && page >= 6);
      onUpdateProgress({
        moduleId: ModuleType.SIMPLE,
        completed: Boolean(isCompleted),
        currentPage: page,
        totalPages,
        score: currentTotalScore,
        maxScore: totalMaxScore,
        lastAttemptedAt: new Date().toISOString(),
        quizScores: Object.entries(quizAnswers).reduce((acc, [qid, ans]) => {
          acc[qid] = ans.isCorrect;
          return acc;
        }, {} as Record<string, boolean>),
        activityScores: {
          builder: completedBuilderQuestions.length,
          matching: matchingScore
        }
      });
    }
  }, [page, currentTotalScore, quizAnswers, completedBuilderQuestions, matchingScore]);

  const handleQuizAnswer = (qid: string, isCorrect: boolean, selectedIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qid]: { isCorrect, selectedIndex }
    }));
  };

  const handleResetModule = () => {
    setPage(1);
    setQuizAnswers({});
    setCompletedBuilderQuestions([]);
    setMatchingScore(0);
  };

  // --- Activity Components ---

  const SentenceBuilder = () => {
    const questions = [
      {
        id: 1,
        words: ["In summer", "sales at ice cream shops", "increase significantly"],
        punctuation: [", "],
        correctOrder: ["In summer", ", ", "sales at ice cream shops", "increase significantly"],
        explanation: 'The introductory phrase "In summer" needs a comma after it.'
      },
      {
        id: 2,
        words: ["I like", "chocolate", "vanilla", "and strawberry ice cream"],
        punctuation: [", ", ", "],
        correctOrder: ["I like", "chocolate", ", ", "vanilla", ", ", "and strawberry ice cream"],
        explanation: 'Three items in a list need commas between them.'
      },
      {
        id: 3,
        words: ["The children", "ran", "and jumped", "on the playground"],
        punctuation: [", ", ", "], // Distractors
        correctOrder: ["The children", "ran", "and jumped", "on the playground"],
        explanation: 'No comma needed when joining two verbs.'
      }
    ];

    const [qIndex, setQIndex] = useState(0);
    const [built, setBuilt] = useState<{id: string, text: string}[]>([]);
    const [bank, setBank] = useState<{id: string, text: string}[]>([]);
    const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [draggedItem, setDraggedItem] = useState<{id: string, text: string, source: 'bank' | 'built'} | null>(null);

    const initQuestion = (index: number) => {
        const q = questions[index];
        const items = [...q.words, ...q.punctuation].map((text, idx) => ({
            id: `${text}-${idx}`,
            text
        })).sort(() => Math.random() - 0.5);
        
        setBank(items);
        setBuilt([]);
        setStatus('idle');
    };

    useEffect(() => {
        initQuestion(qIndex);
    }, [qIndex]);

    const handleDragStart = (e: React.DragEvent, item: {id: string, text: string}, source: 'bank' | 'built') => {
        setDraggedItem({ ...item, source });
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDrop = (e: React.DragEvent, target: 'bank' | 'built') => {
        e.preventDefault();
        if (!draggedItem) return;

        if (draggedItem.source === target) return;

        if (target === 'built') {
            setBuilt([...built, { id: draggedItem.id, text: draggedItem.text }]);
            setBank(bank.filter(i => i.id !== draggedItem.id));
        } else {
            setBank([...bank, { id: draggedItem.id, text: draggedItem.text }]);
            setBuilt(built.filter(i => i.id !== draggedItem.id));
        }
        setDraggedItem(null);
        setStatus('idle');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const checkAnswer = () => {
        const q = questions[qIndex];
        const currentSentence = built.map(b => b.text);
        const isCorrect = currentSentence.length === q.correctOrder.length && 
                          currentSentence.every((val, index) => val === q.correctOrder[index]);
        
        if (isCorrect) {
          setStatus('correct');
          if (!completedBuilderQuestions.includes(q.id)) {
            setCompletedBuilderQuestions(prev => [...prev, q.id]);
          }
        } else {
          setStatus('incorrect');
        }
    };

    const resetExercise = () => {
        initQuestion(qIndex);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-800">Sentence Builder ({qIndex + 1}/{questions.length})</h3>
              <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Solved: {completedBuilderQuestions.length}/{questions.length}
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-4">Drag words or punctuation marks into the box to build the correct simple sentence.</p>
            
            <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'built')}
                className={`min-h-[100px] bg-slate-50 border-2 border-dashed rounded-xl p-4 mb-6 flex flex-wrap gap-2 items-center transition-colors ${status === 'correct' ? 'border-green-300 bg-green-50/70' : status === 'incorrect' ? 'border-red-300 bg-red-50/70' : 'border-slate-300'}`}
            >
                {built.length === 0 && <span className="text-slate-400 text-sm pointer-events-none">Drag items here...</span>}
                {built.map((item) => (
                    <div 
                        key={item.id} 
                        draggable 
                        onDragStart={(e) => handleDragStart(e, item, 'built')}
                        className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg font-bold cursor-grab active:cursor-grabbing shadow-sm flex items-center gap-2"
                    >
                        <GripVertical size={14} className="opacity-50" /> {item.text}
                    </div>
                ))}
            </div>

            <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'bank')}
                className="flex flex-wrap gap-3 mb-8 min-h-[60px] p-3 bg-slate-100/60 rounded-xl border border-slate-200/60"
            >
                {bank.map((item) => (
                    <div 
                        key={item.id} 
                        draggable 
                        onDragStart={(e) => handleDragStart(e, item, 'bank')}
                        className="px-4 py-2 bg-white border-2 border-slate-200 text-slate-700 rounded-lg font-medium cursor-grab active:cursor-grabbing shadow-sm hover:border-indigo-300 transition-colors"
                    >
                        {item.text}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4">
                {status !== 'incorrect' ? (
                    <button 
                        onClick={checkAnswer}
                        disabled={status === 'correct' || built.length === 0}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all transform active:scale-95"
                    >
                        Check Answer
                    </button>
                ) : (
                    <button 
                        onClick={resetExercise}
                        className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 shadow-md transition-all transform active:scale-95 flex items-center gap-2"
                    >
                        <RefreshCcw size={18}/> Try Again
                    </button>
                )}

                {status === 'correct' && (
                    <div className="flex items-center gap-2 text-green-600 font-bold animate-in fade-in slide-in-from-left-2">
                        <CheckCircle size={20}/> Excellent! (+1 pt)
                    </div>
                )}
                {status === 'incorrect' && (
                    <div className="flex items-center gap-2 text-red-500 font-bold animate-in fade-in slide-in-from-left-2">
                        <XCircle size={20}/> Not quite right. Check punctuation!
                    </div>
                )}
            </div>

            {status === 'correct' && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 animate-in zoom-in-95 duration-300">
                    <p className="text-green-800 mb-3 font-medium">{questions[qIndex].explanation}</p>
                    {qIndex < questions.length - 1 ? (
                        <button onClick={() => setQIndex(qIndex + 1)} className="text-sm font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                            Next Sentence <MoveRight size={16} />
                        </button>
                    ) : (
                        <div className="text-sm font-bold text-indigo-600 flex items-center gap-2">
                            <CheckCircle size={16}/> All 3 sentences completed! (+3 pts)
                        </div>
                    )}
                </div>
            )}
        </div>
    );
  };

  const MatchingExercise = () => {
    const pairs = [
      { id: 1, start: "The ice cream melted", end: "and turned sour.", explanation: "No comma - joining two verbs with same subject" },
      { id: 2, start: "In summer,", end: "ice cream sales increase.", explanation: "Comma after introductory phrase" },
      { id: 3, start: "I like ice cream,", end: "especially Baskin Robbins.", explanation: "Comma before 'especially'" },
      { id: 4, start: "Would you like toast", end: "or cereal for breakfast?", explanation: "No comma - joining two nouns" },
      { id: 5, start: "The students studied, prepared,", end: "and took the exam.", explanation: "Commas in list of three verbs" },
      { id: 6, start: "Ice cream", end: "and gelato are popular.", explanation: "No comma - compound subject" },
      { id: 7, start: "Ideally,", end: "ice cream should be kept frozen.", explanation: "Comma after introductory word" },
      { id: 8, start: "She laughed", end: "and cried at the movie.", explanation: "No comma - compound verbs with same subject" },
      { id: 9, start: "I enjoy reading, writing,", end: "and studying.", explanation: "Commas in list of three activities" },
      { id: 10, start: "My brother and sister", end: "laughed and cried at the movie.", explanation: "No comma - compound subject and compound verb" }
    ];

    const [matches, setMatches] = useState<Record<number, string>>({});
    const [correctMatches, setCorrectMatches] = useState<number[]>([]);
    const [errors, setErrors] = useState<Record<number, string>>({});
    const [shuffledEnds, setShuffledEnds] = useState<string[]>([]);

    useEffect(() => {
        setShuffledEnds(pairs.map(p => p.end).sort(() => Math.random() - 0.5));
    }, []);

    const handleSelect = (id: number, value: string) => {
        const newErrors = { ...errors };
        delete newErrors[id];
        setErrors(newErrors);

        const newMatches = { ...matches, [id]: value };
        setMatches(newMatches);

        const pair = pairs.find(p => p.id === id);
        if (value === pair?.end) {
            const updated = [...correctMatches, id];
            setCorrectMatches(updated);
            setMatchingScore(updated.length);
        } else if (value !== "") {
            setErrors({ ...newErrors, [id]: "✗ Not quite right. Think about punctuation rules." });
        }
    };

    const resetRow = (id: number) => {
        const newMatches = { ...matches };
        delete newMatches[id];
        setMatches(newMatches);
        
        const newErrors = { ...errors };
        delete newErrors[id];
        setErrors(newErrors);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Match the Fragments</h3>
                  <p className="text-xs text-slate-500">Pair each beginning with its correct punctuation rule ending.</p>
                </div>
                <div className="text-sm font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100">
                    Matches: <span className="font-bold">{correctMatches.length}</span>/{pairs.length} pts
                </div>
            </div>
            <div className="space-y-4">
                {pairs.map((pair) => {
                    const isCorrect = correctMatches.includes(pair.id);
                    const error = errors[pair.id];
                    
                    return (
                        <div key={pair.id} className={`p-4 rounded-xl border-2 transition-all ${isCorrect ? 'bg-emerald-50/80 border-emerald-300' : error ? 'bg-rose-50 border-rose-200' : 'bg-slate-50/70 border-slate-200/80'}`}>
                            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                                <div className="font-bold text-slate-800 md:w-1/2 text-base">{pair.start}</div>
                                <div className="md:w-1/2">
                                    <select 
                                        className={`w-full p-2.5 text-sm rounded-lg border-2 outline-none transition-all cursor-pointer ${
                                            isCorrect 
                                                ? 'border-emerald-500 bg-white text-emerald-900 font-semibold' 
                                                : error 
                                                    ? 'border-rose-300 bg-white text-rose-800' 
                                                    : 'border-slate-200 focus:border-indigo-400 hover:border-indigo-200'
                                        }`}
                                        onChange={(e) => handleSelect(pair.id, e.target.value)}
                                        disabled={isCorrect}
                                        value={matches[pair.id] || ""}
                                    >
                                        <option value="">Select the ending...</option>
                                        {shuffledEnds.map((end, i) => (
                                            <option 
                                                key={i} 
                                                value={end}
                                                disabled={correctMatches.some(cid => matches[cid] === end && cid !== pair.id)}
                                            >
                                                {end}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {isCorrect && (
                                    <div className="shrink-0 bg-emerald-100 p-1 rounded-full text-emerald-600 animate-in zoom-in">
                                        <CheckCircle size={22} />
                                    </div>
                                )}
                            </div>
                            
                            {isCorrect && (
                                <div className="mt-2 text-xs text-emerald-800 font-medium animate-in fade-in slide-in-from-top-1">
                                    ✓ Correct! {pair.explanation}
                                </div>
                            )}
                            {error && (
                                <div className="mt-2 flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                                    <span className="text-xs text-rose-600 font-bold">{error}</span>
                                    <button 
                                        onClick={() => resetRow(pair.id)}
                                        className="text-xs bg-rose-100 text-rose-700 px-3 py-1 rounded-full font-bold hover:bg-rose-200 transition-colors flex items-center gap-1"
                                    >
                                        <RefreshCcw size={12}/> Try Again
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
  };

  return (
    <LessonContainer 
      title="Simple Sentences" 
      subtitle="Structure, Conjunctions, and Punctuation"
      progress={progress}
      onBack={onBack}
      score={currentTotalScore}
      maxScore={totalMaxScore}
    >
      {page === 1 && (
        <div className="animate-in fade-in duration-500 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What is a Sentence?</h2>
            <InfoBox title="Basic Requirements" type="info">
                <ul className="list-disc pl-5 space-y-1">
                    <li>A <strong>subject</strong> (who/what)</li>
                    <li>A <strong>verb</strong> (action/state)</li>
                    <li>A <strong>complete idea</strong></li>
                    <li>Starts with a capital letter, ends with punctuation.</li>
                </ul>
            </InfoBox>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h4 className="font-bold text-emerald-700 mb-2">✅ Complete</h4>
                    <ul className="space-y-2 text-sm">
                        <li><span className="bg-blue-100 px-1.5 py-0.5 rounded font-semibold text-blue-900">I</span> <span className="bg-yellow-100 px-1.5 py-0.5 rounded font-semibold text-yellow-900">smiled</span>.</li>
                        <li><span className="bg-blue-100 px-1.5 py-0.5 rounded font-semibold text-blue-900">She</span> <span className="bg-yellow-100 px-1.5 py-0.5 rounded font-semibold text-yellow-900">is</span> a musician.</li>
                    </ul>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h4 className="font-bold text-rose-700 mb-2">❌ Incomplete</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li>I like. (Missing object/complete idea)</li>
                        <li>Running in the park. (No subject)</li>
                    </ul>
                </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What is a Simple Sentence?</h2>
            <InfoBox title="Definition" type="tip">
                A <strong>simple sentence</strong> contains ONE independent clause with ONE subject-verb combination expressing ONE complete thought.
            </InfoBox>
            
            <div className="bg-slate-100/70 p-6 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold mb-4 text-slate-800">Examples:</h4>
                <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Basic</span>
                        I like vanilla ice cream.
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Compound Subject</span>
                        Ice cream and gelato are popular desserts.
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Compound Verb</span>
                        The ice cream melted and turned sour.
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">With Phrases</span>
                        On hot days throughout summer, many people like to eat ice cream.
                    </div>
                </div>
            </div>
          </div>

          <NavControls onNext={() => setPage(2)} showNext={true} />
        </div>
      )}

      {page === 2 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Coordinating Conjunctions (FANBOYS)</h2>
          <p className="mb-6 text-slate-600">In simple sentences, these connect equal parts (nouns, verbs, phrases).</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {fanboys.map((f, i) => (
              <FlipCard 
                key={i}
                front={<span className="text-4xl font-black">{f.l}</span>}
                back={
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600 mb-1">{f.w}</div>
                    <div className="text-xs text-slate-500">{f.m}</div>
                  </div>
                }
              />
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
            <h4 className="font-bold text-lg mb-4 text-slate-800">What FANBOYS Connect</h4>
            <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                    <span className="font-bold min-w-[80px] text-indigo-600">Nouns:</span>
                    <span>Toast <strong>or</strong> cereal?</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold min-w-[80px] text-indigo-600">Verbs:</span>
                    <span>The children ran <strong>and</strong> jumped.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold min-w-[80px] text-indigo-600">Adjectives:</span>
                    <span>Grand <strong>yet</strong> mysterious.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold min-w-[80px] text-indigo-600">Phrases:</span>
                    <span>To pay for school <strong>and</strong> to buy a home.</span>
                </li>
            </ul>
          </div>

          <InfoBox title="Key Rule" type="warning">
            <p>When FANBOYS join words or phrases (not complete sentences), <strong>NO comma</strong> is usually needed.</p>
          </InfoBox>

          <NavControls onPrev={() => setPage(1)} onNext={() => setPage(3)} showPrev showNext />
        </div>
      )}

      {page === 3 && (
        <div className="animate-in fade-in duration-500 space-y-6">
          <h2 className="text-3xl font-bold text-slate-900">Punctuation Rules</h2>
          
          <div className="space-y-6">
            <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Rule 1: Joining Two Items</h3>
                <p className="text-slate-700 mb-3">When joining TWO nouns, verbs, or phrases: <strong>NO comma</strong>.</p>
                <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-emerald-700 font-medium"><CheckCircle size={16}/> Ice cream and gelato are popular.</div>
                    <div className="flex items-center gap-2 text-rose-700 font-medium"><XCircle size={16}/> Ice cream, and gelato are popular.</div>
                </div>
            </div>

            <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-purple-800 mb-2">Rule 2: Lists (3+ Items)</h3>
                <p className="text-slate-700 mb-3">Use commas between items, including before "and" (Oxford Comma).</p>
                <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-emerald-700 font-medium"><CheckCircle size={16}/> I like chocolate, vanilla, and strawberry.</div>
                    <div className="flex items-center gap-2 text-rose-700 font-medium"><XCircle size={16}/> I like chocolate vanilla and strawberry.</div>
                </div>
            </div>

            <div className="bg-white border-l-4 border-orange-500 p-6 rounded-r-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-orange-800 mb-2">Rule 3: Introductory Phrases</h3>
                <p className="text-slate-700 mb-3">Use a comma AFTER introductory phrases at the start of a sentence.</p>
                <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-emerald-700 font-medium"><CheckCircle size={16}/> In summer, sales increase.</div>
                    <div className="flex items-center gap-2 text-emerald-700 font-medium"><CheckCircle size={16}/> Ideally, keep ice cream frozen.</div>
                </div>
            </div>

            <div className="bg-white border-l-4 border-cyan-500 p-6 rounded-r-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-cyan-800 mb-2">Rule 4: Transitions</h3>
                <p className="text-slate-700 mb-3">Use commas for "such as", "especially", "including".</p>
                <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-emerald-700 font-medium"><CheckCircle size={16}/> I like ice cream, especially chocolate.</div>
                </div>
            </div>
          </div>

          <NavControls onPrev={() => setPage(2)} onNext={() => setPage(4)} showPrev showNext />
        </div>
      )}

      {page === 4 && (
        <div className="animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Practice Quizzes</h2>
              <p className="text-slate-600 mt-1">Test your knowledge of simple sentence structures and punctuation.</p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto">
              Quiz Score: {quizCorrectCount}/{quizQuestions.length}
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

          <NavControls onPrev={() => setPage(3)} onNext={() => setPage(5)} showPrev showNext />
        </div>
      )}

      {page === 5 && (
        <div className="animate-in fade-in duration-500">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Hands-on Activities</h2>
          <p className="text-slate-600 mb-6">Apply your punctuation knowledge to build and match sentence structures.</p>
          
          <div className="space-y-12">
            <SentenceBuilder />
            <MatchingExercise />
          </div>

          <NavControls onPrev={() => setPage(4)} onNext={() => setPage(6)} showPrev showNext />
        </div>
      )}

      {page === 6 && (
        <LessonCompletionSummary 
          moduleTitle="Simple Sentences"
          score={currentTotalScore}
          maxScore={totalMaxScore}
          onReturn={onBack}
          onRetake={handleResetModule}
        />
      )}
    </LessonContainer>
  );
}

