// Video Review Quizzes Data extracted from GrammarMaster repo

export interface VideoQuizQuestion {
  id: number;
  concept?: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const SENTENCE_STRUCTURE_QUIZ_QUESTIONS: VideoQuizQuestion[] = [
            {
                id: 1,
                concept: "Independent Clause Definition",
                question: "What is an independent clause?",
                options: [
                    "A group of words that needs another clause to make sense",
                    "A group of words with a subject and verb that expresses a complete thought",
                    "A group of words that starts with a conjunction",
                    "A phrase without a subject or verb"
                ],
                correct: 1,
                explanation: "An independent clause has both a subject and a verb AND expresses a complete thought. It can stand alone as a sentence. For example: <span class='highlight'>'She studies hard'</span> is an independent clause."
            },
            {
                id: 2,
                concept: "Simple Sentence Structure",
                question: "Which sentence is a simple sentence?",
                options: [
                    "Although it was raining, we went outside.",
                    "The cat slept on the couch all afternoon.",
                    "I wanted to go swimming, but the pool was closed.",
                    "When the bell rang, the students left quickly."
                ],
                correct: 1,
                explanation: "A simple sentence contains only ONE independent clause (one subject-verb combination that expresses a complete thought). <span class='highlight'>'The cat slept on the couch all afternoon'</span> has one subject (cat) and one main verb (slept). The other options are compound or complex sentences."
            },
            {
                id: 3,
                concept: "Conjunction Definition",
                question: "What is a conjunction?",
                options: [
                    "A word that describes a noun",
                    "A word that shows action",
                    "A word that connects words, phrases, or clauses",
                    "A word that modifies a verb"
                ],
                correct: 2,
                explanation: "A conjunction is <span class='highlight'>a word that connects words, phrases, or clauses</span>. Examples include coordinating conjunctions (FANBOYS: for, and, nor, but, or, yet, so) and subordinating conjunctions (although, because, when, if, since). They act like bridges, joining parts of sentences together to show relationships between ideas."
            },
            {
                id: 4,
                concept: "Compound Sentence Identification",
                question: "Which sentence is a compound sentence?",
                options: [
                    "Because I was tired, I went to bed early.",
                    "The students who studied hard passed the exam.",
                    "I love pizza, but my sister prefers pasta.",
                    "Running quickly, she caught the bus."
                ],
                correct: 2,
                explanation: "A compound sentence joins TWO independent clauses with a coordinating conjunction (FANBOYS). <span class='highlight'>'I love pizza, but my sister prefers pasta'</span> has two complete thoughts joined by 'but'. Notice the comma before the conjunction! The first option is a complex sentence, not compound."
            },
            {
                id: 5,
                concept: "Compound Sentence Punctuation",
                question: "Which sentence has correct punctuation for a compound sentence?",
                options: [
                    "The movie was long but it was interesting.",
                    "The movie was long, but it was interesting.",
                    "The movie was long but, it was interesting.",
                    "The movie, was long but it was interesting."
                ],
                correct: 1,
                explanation: "When joining two independent clauses with a FANBOYS conjunction, place a comma BEFORE the conjunction. <span class='highlight'>'The movie was long, but it was interesting'</span> follows this rule correctly. The comma goes right before 'but', not after it!"
            },
            {
                id: 6,
                concept: "Dependent Clause Definition",
                question: "What is a dependent clause?",
                options: [
                    "A complete sentence that can stand alone",
                    "A group of words with a subject and verb that CANNOT stand alone",
                    "A phrase without a subject",
                    "Two independent clauses joined together"
                ],
                correct: 1,
                explanation: "A dependent clause has a subject and verb but does NOT express a complete thought—it depends on an independent clause to make sense. Example: <span class='highlight'>'Although she was tired'</span> is a dependent clause. It leaves you wondering: 'What happened even though she was tired?' It needs more information!"
            },
            {
                id: 7,
                concept: "Subordinating Conjunctions",
                question: "Which words are subordinating conjunctions?",
                options: [
                    "and, but, or, so",
                    "although, because, when, if, since",
                    "the, a, an, this",
                    "very, quite, extremely, really"
                ],
                correct: 1,
                explanation: "Subordinating conjunctions like <span class='highlight'>although, because, when, if, since, while, after, before, unless, until</span> are used to create complex sentences. They introduce dependent clauses and show relationships like time, cause, contrast, or condition between clauses."
            },
            {
                id: 8,
                concept: "Complex Sentence Identification",
                question: "Which sentence is a complex sentence?",
                options: [
                    "I studied hard, and I passed the test.",
                    "The teacher explained the lesson clearly.",
                    "Although it was raining, we went to the park.",
                    "She likes chocolate ice cream and vanilla cake."
                ],
                correct: 2,
                explanation: "A complex sentence has ONE independent clause and ONE dependent clause joined by a subordinating conjunction. <span class='highlight'>'Although it was raining, we went to the park'</span> has a dependent clause ('Although it was raining') and an independent clause ('we went to the park'). The first option is compound, not complex."
            },
            {
                id: 9,
                concept: "Complex Sentence Punctuation - Dependent First",
                question: "Which sentence shows correct punctuation when the dependent clause comes FIRST?",
                options: [
                    "Because I was late the teacher was angry.",
                    "Because, I was late the teacher was angry.",
                    "Because I was late, the teacher was angry.",
                    "Because I was late; the teacher was angry."
                ],
                correct: 2,
                explanation: "When a dependent clause starts the sentence, place a comma AFTER it, before the independent clause. <span class='highlight'>'Because I was late, the teacher was angry'</span> is correct. Think of it this way: dependent clause first = comma needed. The comma helps readers pause before the main idea."
            },
            {
                id: 10,
                concept: "Complex Sentence Punctuation - Independent First",
                question: "Which sentence shows correct punctuation when the independent clause comes FIRST?",
                options: [
                    "I stayed inside, because it was raining.",
                    "I stayed inside because it was raining.",
                    "I stayed, inside because it was raining.",
                    "I stayed inside because, it was raining."
                ],
                correct: 1,
                explanation: "When the independent clause comes first and the dependent clause comes last, you generally do NOT use a comma. <span class='highlight'>'I stayed inside because it was raining'</span> is correct. Remember: independent first = no comma needed (in most cases). Exceptions include 'whereas' and non-defining relative clauses."
            }
        ];

export const SUBJECT_VERB_AGREEMENT_QUIZ_QUESTIONS: VideoQuizQuestion[] = [
            {
                id: 1,
                concept: "The S Switch - Basic Rule",
                question: "What is the 'S Switch' rule in subject-verb agreement?",
                options: [
                    "The subject and verb both take 's' at the same time",
                    "When the subject has 's', the verb doesn't; when the subject doesn't have 's', the verb does",
                    "Only plural subjects take 's'",
                    "Verbs always end in 's'"
                ],
                correct: 1,
                explanation: "The <span class='highlight'>S Switch</span> means that 's' can only appear on EITHER the subject OR the verb, but not both. For example: 'The student works' (no 's' on subject, 's' on verb) vs. 'The students work' ('s' on subject, no 's' on verb)."
            },
            {
                id: 2,
                concept: "Singular vs. Plural Subjects",
                question: "Which sentence demonstrates correct subject-verb agreement?",
                options: [
                    "The teachers teaches English.",
                    "The teacher teach English.",
                    "The teacher teaches English.",
                    "The teachers teachs English."
                ],
                correct: 2,
                explanation: "<span class='highlight'>'The teacher teaches English'</span> is correct. 'Teacher' is singular (no 's'), so the verb needs 's' (teaches). This follows the S Switch rule - the 's' switches from subject to verb when the subject is singular."
            },
            {
                id: 3,
                concept: "Trap Phrases",
                question: "Identify the correct verb: 'The box of cookies ___ on the table.'",
                options: [
                    "are",
                    "is",
                    "were",
                    "have been"
                ],
                correct: 1,
                explanation: "The correct answer is <span class='highlight'>'is'</span>. The subject is 'box' (singular), not 'cookies.' The phrase 'of cookies' is a trap phrase that comes between the subject and verb. Always identify the real subject first: What is on the table? The box (singular) is."
            },
            {
                id: 4,
                concept: "Compound Subjects with AND",
                question: "When two subjects are joined by 'and', the verb should be:",
                options: [
                    "Always singular",
                    "Always plural",
                    "Singular if both subjects are singular",
                    "It depends on the second subject only"
                ],
                correct: 1,
                explanation: "When subjects are joined by <span class='highlight'>AND</span>, they form a compound subject that is always PLURAL. Example: 'Tom and Jerry run fast' (not 'runs'). Even if both subjects are singular individually, together they make a plural subject."
            },
            {
                id: 5,
                concept: "Compound Subjects with OR/NOR",
                question: "Choose the correct verb: 'Either the teacher or the students ___ responsible.'",
                options: [
                    "is",
                    "are",
                    "was",
                    "has been"
                ],
                correct: 1,
                explanation: "The correct answer is <span class='highlight'>'are'</span>. With OR/NOR, the verb agrees with the subject CLOSEST to it. Here, 'students' (plural) is closest to the verb, so we use 'are.' If it were 'Either the students or the teacher,' we would use 'is' (singular)."
            },
            {
                id: 6,
                concept: "Indefinite Pronouns - Singular",
                question: "Which indefinite pronouns are ALWAYS singular?",
                options: [
                    "Everyone, someone, anyone, no one",
                    "All, some, most",
                    "Both, few, several, many",
                    "None of the above"
                ],
                correct: 0,
                explanation: "<span class='highlight'>Everyone, someone, anyone, no one, everybody, somebody, anybody, nobody, each, either, neither</span> are ALWAYS singular. Example: 'Everyone is here' (not 'are'). Even though 'everyone' feels plural, it's grammatically singular."
            },
            {
                id: 7,
                concept: "Indefinite Pronouns - Context Dependent",
                question: "Identify the correct verb: 'Some of the cake ___ eaten.'",
                options: [
                    "was",
                    "were",
                    "are",
                    "have"
                ],
                correct: 0,
                explanation: "The correct answer is <span class='highlight'>'was'</span>. With words like some, all, most, none, the verb depends on the object of the preposition. Here, 'cake' (singular) determines the verb. But 'Some of the cakes were eaten' uses 'were' because 'cakes' is plural."
            },
            {
                id: 8,
                concept: "Collective Nouns",
                question: "What is true about collective nouns (team, family, group, class)?",
                options: [
                    "They are always plural",
                    "They are always singular in American English",
                    "They can be singular or plural depending on context",
                    "They always take plural verbs"
                ],
                correct: 1,
                explanation: "In American English, collective nouns are <span class='highlight'>usually treated as singular</span> because they represent one unit. Example: 'The team is winning' (the team as one unit). However, when emphasizing individual members, British English sometimes uses plural verbs: 'The team are arguing among themselves.'"
            },
            {
                id: 9,
                concept: "Subjects with Prepositional Phrases",
                question: "Choose the correct verb: 'The students in the classroom ___ studying.'",
                options: [
                    "is",
                    "are",
                    "was",
                    "has"
                ],
                correct: 1,
                explanation: "The correct answer is <span class='highlight'>'are'</span>. The subject is 'students' (plural), not 'classroom.' The prepositional phrase 'in the classroom' is just extra information. Cross out prepositional phrases to find the real subject: The students [in the classroom] are studying."
            },
            {
                id: 10,
                concept: "Special Cases - Neither/Nor",
                question: "Identify the correct verb: 'Neither the books nor the pen ___ on the desk.'",
                options: [
                    "is",
                    "are",
                    "were",
                    "have"
                ],
                correct: 0,
                explanation: "The correct answer is <span class='highlight'>'is'</span>. With neither/nor, the verb agrees with the subject CLOSEST to the verb. Here, 'pen' (singular) is closest, so we use 'is.' If it were 'Neither the pen nor the books,' we would use 'are' because 'books' would be closest."
            }
        ];

export const RELATIVE_CLAUSES_QUIZ_QUESTIONS: VideoQuizQuestion[] = [
            {
                id: 1,
                concept: "Relative Clause Definition",
                question: "What is a relative clause?",
                options: [
                    "A clause that describes a family member",
                    "A dependent clause that modifies a noun and begins with a relative pronoun",
                    "An independent clause that stands alone",
                    "A clause that shows time relationships"
                ],
                correct: 1,
                explanation: "A relative clause is <span class='highlight'>a dependent clause that gives more information about a noun and begins with a relative pronoun</span> (who, whom, whose, which, that). Example: 'The student WHO studies hard will succeed.' The relative clause 'who studies hard' describes 'the student.'"
            },
            {
                id: 2,
                concept: "Relative Pronouns for People",
                question: "Which relative pronouns are used for PEOPLE?",
                options: [
                    "Which, that",
                    "Who, whom, whose, that",
                    "Which, whose, where",
                    "That, which, when"
                ],
                correct: 1,
                explanation: "For people, we use <span class='highlight'>who, whom, whose, and that</span>. Examples: 'The teacher WHO helps me' (subject), 'The friend WHOM I called' (object), 'The student WHOSE book is here' (possession). 'Which' is NEVER used for people."
            },
            {
                id: 3,
                concept: "Relative Pronouns for Things",
                question: "Which relative pronouns are used for THINGS?",
                options: [
                    "Who, whom, whose",
                    "Which, that",
                    "Who, which",
                    "Whom, that"
                ],
                correct: 1,
                explanation: "For things and animals, we use <span class='highlight'>which and that</span>. Examples: 'The book WHICH I read' or 'The book THAT I read.' Both are correct for things. Never use 'who' or 'whom' for objects or animals."
            },
            {
                id: 4,
                concept: "Who vs. Whom",
                question: "When do we use 'whom' instead of 'who'?",
                options: [
                    "When the relative pronoun is the subject of the clause",
                    "When the relative pronoun is the object of the clause",
                    "When talking about things",
                    "Whom and who are always interchangeable"
                ],
                correct: 1,
                explanation: "<span class='highlight'>WHO is the subject; WHOM is the object</span>. Use WHO when it does the action: 'The girl WHO called me.' Use WHOM when someone does something to it: 'The girl WHOM I called.' Trick: If you can replace it with 'he/she,' use WHO. If you can replace it with 'him/her,' use WHOM."
            },
            {
                id: 5,
                concept: "Whose for Possession",
                question: "What does 'whose' show in a relative clause?",
                options: [
                    "Location",
                    "Time",
                    "Possession or belonging",
                    "Reason"
                ],
                correct: 2,
                explanation: "<span class='highlight'>WHOSE shows possession or belonging</span> and can be used for both people and things. Examples: 'The student WHOSE book was lost' (the book belongs to the student), 'The car WHOSE engine broke' (the engine belongs to the car). WHOSE replaces possessive pronouns like his, her, its, their."
            },
            {
                id: 6,
                concept: "Identifying Relative Clauses",
                question: "Identify the relative clause: 'The movie that we watched last night was amazing.'",
                options: [
                    "The movie",
                    "that we watched last night",
                    "was amazing",
                    "last night"
                ],
                correct: 1,
                explanation: "The relative clause is <span class='highlight'>'that we watched last night'</span>. It starts with the relative pronoun 'that' and gives more information about 'the movie.' The relative clause modifies the noun and tells us WHICH movie - the one we watched last night."
            },
            {
                id: 7,
                concept: "Essential vs. Non-Essential Clauses",
                question: "Which sentence contains a NON-ESSENTIAL relative clause (needs commas)?",
                options: [
                    "The students who study hard get good grades.",
                    "My sister, who lives in Paris, is a teacher.",
                    "The book that I borrowed is overdue.",
                    "People who exercise regularly are healthier."
                ],
                correct: 1,
                explanation: "<span class='highlight'>'My sister, who lives in Paris, is a teacher'</span> has a non-essential clause. It needs commas because the information is EXTRA - you already know which sister. Essential clauses (no commas) are NECESSARY to identify which person/thing: 'Students WHO study hard' - which students? The ones who study hard (essential)."
            },
            {
                id: 8,
                concept: "That vs. Which",
                question: "Which is correct for an ESSENTIAL clause about things?",
                options: [
                    "The car, which I bought, is red.",
                    "The car which I bought is red.",
                    "The car that I bought is red.",
                    "Both B and C are correct"
                ],
                correct: 3,
                explanation: "For essential clauses (no commas), both <span class='highlight'>THAT and WHICH are acceptable</span>, but THAT is preferred in American English. 'The car THAT I bought is red' or 'The car WHICH I bought is red.' For non-essential clauses (with commas), only WHICH is used: 'My car, WHICH is red, is new.'"
            },
            {
                id: 9,
                concept: "Where, When, Why in Relative Clauses",
                question: "Choose the correct sentence with a relative adverb:",
                options: [
                    "The city which I was born is beautiful.",
                    "The city where I was born is beautiful.",
                    "The city who I was born is beautiful.",
                    "The city whom I was born is beautiful."
                ],
                correct: 1,
                explanation: "<span class='highlight'>'The city WHERE I was born is beautiful'</span> is correct. WHERE is used for places, WHEN for times, and WHY for reasons. Examples: 'The day WHEN we met' (time), 'The reason WHY I left' (reason), 'The place WHERE we live' (location). These are relative adverbs, not pronouns."
            },
            {
                id: 10,
                concept: "Omitting Relative Pronouns",
                question: "In which sentence can the relative pronoun be omitted?",
                options: [
                    "The teacher who teaches English is nice.",
                    "The book that I read was interesting.",
                    "The student whose book is here should come.",
                    "The girl who called me is my friend."
                ],
                correct: 1,
                explanation: "<span class='highlight'>'The book (that) I read was interesting'</span> - THAT can be omitted because it's the OBJECT of the clause. You can omit who/whom/which/that when they are OBJECTS, but NOT when they are SUBJECTS. 'The teacher who teaches' - WHO is the subject (can't omit). 'The book that I read' - THAT is the object (can omit)."
            }
        ];

export const FRAGMENTS_RUNONS_QUIZ_QUESTIONS: VideoQuizQuestion[] = [
            {
                id: 1,
                concept: "Complete Sentence Definition",
                question: "What makes a complete sentence?",
                options: [
                    "A group of words with a capital letter and period",
                    "A group of words with a subject, verb, and complete thought",
                    "Any group of words longer than five words",
                    "A group of words with descriptive adjectives"
                ],
                correct: 1,
                explanation: "A complete sentence must have THREE things: <span class='highlight'>a subject (who or what), a verb (action or state), and a complete thought</span>. For example, 'The dog barked' is complete because it has all three elements and makes sense on its own."
            },
            {
                id: 2,
                concept: "Fragment Definition",
                question: "What is a sentence fragment?",
                options: [
                    "A very short sentence",
                    "An incomplete sentence missing a subject, verb, or complete thought",
                    "A sentence with difficult vocabulary",
                    "Two sentences joined together"
                ],
                correct: 1,
                explanation: "A fragment is <span class='highlight'>an incomplete sentence that is missing a subject, verb, or complete thought</span>. Examples: 'Running down the street' (no subject), 'The tall building' (no verb), 'Because I was tired' (incomplete thought). Fragments cannot stand alone as sentences."
            },
            {
                id: 3,
                concept: "Identifying Fragments",
                question: "Which of the following is a fragment?",
                options: [
                    "The cat slept on the couch.",
                    "She runs every morning.",
                    "Because it was raining outside.",
                    "They finished their homework."
                ],
                correct: 2,
                explanation: "<span class='highlight'>'Because it was raining outside'</span> is a fragment because it's an incomplete thought. When you read it, you're left wondering: 'What happened because it was raining?' It has a subject (it) and verb (was raining), but the word 'because' makes it dependent - it needs more information to be complete."
            },
            {
                id: 4,
                concept: "Fragment Types - Missing Subject",
                question: "Which fragment is missing a subject?",
                options: [
                    "Although she studied hard.",
                    "Ran quickly to the store.",
                    "The old red car.",
                    "When the bell rang."
                ],
                correct: 1,
                explanation: "<span class='highlight'>'Ran quickly to the store'</span> is missing a subject. We have the verb 'ran' and we know where (to the store), but we don't know WHO ran. To fix it, add a subject: 'She ran quickly to the store' or 'The boy ran quickly to the store.'"
            },
            {
                id: 5,
                concept: "Fragment Types - Missing Verb",
                question: "Which fragment is missing a verb?",
                options: [
                    "The students in the classroom.",
                    "After we finished dinner.",
                    "Walking down the street.",
                    "Because the weather was bad."
                ],
                correct: 0,
                explanation: "<span class='highlight'>'The students in the classroom'</span> is missing a verb. We know WHO (the students) and WHERE (in the classroom), but we don't know what they DID or WERE. To fix it, add a verb: 'The students in the classroom were studying' or 'The students in the classroom finished their test.'"
            },
            {
                id: 6,
                concept: "Run-on Sentence Definition",
                question: "What is a run-on sentence?",
                options: [
                    "A sentence that is too long",
                    "Two or more complete sentences joined incorrectly without proper punctuation or conjunctions",
                    "A sentence with too many commas",
                    "A sentence about running"
                ],
                correct: 1,
                explanation: "A run-on sentence occurs when <span class='highlight'>two or more complete sentences are joined together without proper punctuation or connecting words</span>. Example: 'I went to the store I bought milk' - these are two complete thoughts that need to be separated or connected properly."
            },
            {
                id: 7,
                concept: "Comma Splice",
                question: "What is a comma splice?",
                options: [
                    "Using too many commas in a sentence",
                    "A type of run-on where two complete sentences are joined with only a comma",
                    "Forgetting to use commas in a list",
                    "Using a comma before 'and'"
                ],
                correct: 1,
                explanation: "A comma splice is <span class='highlight'>a type of run-on sentence where two complete sentences are incorrectly joined with only a comma</span>. Example: 'I love pizza, my sister prefers pasta.' This is wrong because you need more than just a comma to join two complete sentences. Fix it by adding a conjunction: 'I love pizza, but my sister prefers pasta.'"
            },
            {
                id: 8,
                concept: "Identifying Run-ons",
                question: "Which sentence is a run-on?",
                options: [
                    "The movie was long, but it was interesting.",
                    "I finished my homework and went to bed.",
                    "She studied hard she passed the test.",
                    "Although it was raining, we went outside."
                ],
                correct: 2,
                explanation: "<span class='highlight'>'She studied hard she passed the test'</span> is a run-on sentence (fused sentence). These are two complete sentences joined together with nothing separating them. Fix it by: (1) adding a period: 'She studied hard. She passed the test.' (2) adding a comma and conjunction: 'She studied hard, so she passed the test.' or (3) using a semicolon: 'She studied hard; she passed the test.'"
            },
            {
                id: 9,
                concept: "Fixing Fragments",
                question: "How can you fix the fragment 'When I arrived at school'?",
                options: [
                    "Add a capital letter at the beginning",
                    "Add a period at the end",
                    "Add a complete independent clause: 'When I arrived at school, the bell had already rung.'",
                    "Make it shorter"
                ],
                correct: 2,
                explanation: "The fragment 'When I arrived at school' needs <span class='highlight'>a complete independent clause to finish the thought</span>. The word 'when' creates a dependent clause that leaves you wondering 'What happened when you arrived?' Complete it by adding what happened: 'When I arrived at school, the bell had already rung' or 'When I arrived at school, I saw my friends.'"
            },
            {
                id: 10,
                concept: "Fixing Run-ons",
                question: "Which is the BEST way to fix this run-on: 'The test was difficult I studied all night'?",
                options: [
                    "The test was difficult, I studied all night.",
                    "The test was difficult I, studied all night.",
                    "The test was difficult, so I studied all night.",
                    "The test was difficult I studied, all night."
                ],
                correct: 2,
                explanation: "<span class='highlight'>'The test was difficult, so I studied all night'</span> is correct because it uses a comma + coordinating conjunction (FANBOYS) to properly join the two complete sentences. Option A is a comma splice (just a comma without a conjunction). The conjunction 'so' shows the relationship between the ideas - the difficult test caused the studying."
            }
        ];

export const PAST_MODALS_QUIZ_QUESTIONS: VideoQuizQuestion[] = [
    {
        id: 1,
        concept: "Core Meaning of Past Modals",
        question: "What is the primary function of past modals (could have, should have, would have)?",
        options: [
            "To describe daily routines and present habits",
            "To talk hypothetically about past events, regrets, and missed possibilities that did not happen",
            "To make predictions about the distant future",
            "To form continuous action verbs in the past"
        ],
        correct: 1,
        explanation: "Past modals (<span class='highlight'>could have, should have, would have + past participle</span>) are the engine of hindsight. They step out of reality to discuss hypothetical scenarios, missed opportunities, and decisions in the imaginary past."
    },
    {
        id: 2,
        concept: "Could Have (Past Possibility)",
        question: "When do we use 'could have + past participle'?",
        options: [
            "When an action was strictly required by law",
            "When something was genuinely possible or in our ability, but we chose not to do it",
            "When something was completely impossible",
            "When we are asking for permission in the present"
        ],
        correct: 1,
        explanation: "<span class='highlight'>'Could have'</span> expresses untaken paths—situations where you had the genuine ability, energy, or opportunity to do something in the past, but made an active choice not to do it (e.g., 'You could have stayed up late, but you went to bed early')."
    },
    {
        id: 3,
        concept: "Couldn't Have (Impossibility)",
        question: "Complete the sentence: 'Even if we tried our hardest, we _____ arrived on time because of the massive traffic jam.'",
        options: [
            "should have",
            "couldn't have",
            "wouldn't",
            "must have"
        ],
        correct: 1,
        explanation: "<span class='highlight'>'Couldn't have'</span> is used when an action was literally impossible due to insurmountable past circumstances, such as severe traffic making arrival completely impossible."
    },
    {
        id: 4,
        concept: "Should Have (Late Advice & Regret)",
        question: "Which modal phrase best expresses late advice or regret about a good idea that did NOT happen?",
        options: [
            "Should have + past participle",
            "Could have + base form",
            "Would + base form",
            "Will have + past participle"
        ],
        correct: 0,
        explanation: "<span class='highlight'>'Should have + past participle'</span> conveys the nagging sting of hindsight ('I know better now'). It marks a good idea or better decision that unfortunately did not take place."
    },
    {
        id: 5,
        concept: "Expressing Regret with Shouldn't Have",
        question: "The hosts hosted a party and completely ran out of food. Which sentence best expresses their regret?",
        options: [
            "We should invited so many guests.",
            "We could have invite so many guests.",
            "We wouldn't invite so many guests.",
            "We shouldn't have invited so many guests."
        ],
        correct: 3,
        explanation: "<span class='highlight'>'We shouldn't have invited so many guests'</span> uses 'shouldn't have + past participle' to voice clear regret over a past action that turned out to be a mistake."
    },
    {
        id: 6,
        concept: "Would Have (Blocked Desires)",
        question: "Why do sentences with 'would have' frequently include the word 'but'?",
        options: [
            "Because 'would have' is only used for questions",
            "Because our intention to act was genuine, but was blocked by an external circumstance",
            "Because 'but' is always required after every modal verb",
            "Because it indicates a future prediction"
        ],
        correct: 1,
        explanation: "<span class='highlight'>'Would have'</span> expresses blocked desires. It shows we had the full intention and willingness to do something, but external circumstances (introduced by 'but') intervened (e.g., 'I would have studied harder, but it was my aunt\\'s wedding')."
    },
    {
        id: 7,
        concept: "Missed Opportunity Scenario",
        question: "Fill in the blanks: 'I _____ have won the car raffle, but I _____ enter the draw.'",
        options: [
            "could / didn't",
            "should / did",
            "would / don't",
            "couldn't / wasn't"
        ],
        correct: 0,
        explanation: "<span class='highlight'>'I could have won, but I didn't enter the draw'</span> pairs 'could have' (for the missed possibility of winning) with the simple past 'didn't' (for the literal action not taken)."
    },
    {
        id: 8,
        concept: "Question Forms & Unfulfilled Conditions",
        question: "Which of the following is a grammatically correct question asking about an alternate past outcome?",
        options: [
            "Would you have won if you had entered?",
            "Did you could have won?",
            "Should have you win the prize?",
            "Would you had won the prize?"
        ],
        correct: 0,
        explanation: "<span class='highlight'>'Would you have won if you had entered?'</span> follows the correct question structure for past hypotheticals (Modal + Subject + have + past participle)."
    }
];

export const PARALLEL_STRUCTURE_QUIZ_QUESTIONS: VideoQuizQuestion[] = [
    {
        id: 1,
        concept: "Core Definition of Parallel Structure",
        question: "According to the Purdue OWL definition, what is parallel structure?",
        options: [
            "Writing sentences that have the exact same number of letters",
            "Using the same pattern of words to show that two or more ideas have the same level of importance",
            "Beginning every sentence in a paragraph with the same preposition",
            "Avoiding the use of conjunctions like 'and' or 'or'"
        ],
        correct: 1,
        explanation: "<span class='highlight'>Parallel structure</span> means using the same grammatical pattern of words to show that two or more ideas have equal grammatical weight and importance."
    },
    {
        id: 2,
        concept: "Rule 1: Matching Verb Forms (Gerunds)",
        question: "Which of the following sentences correctly maintains parallel structure?",
        options: [
            "Mary likes hiking, swimming, and to ride a bicycle.",
            "Mary likes hiking, swimming, and riding a bicycle.",
            "Mary likes to hike, swimming, and rides a bicycle.",
            "Mary likes hiking, to swim, and riding a bicycle."
        ],
        correct: 1,
        explanation: "<span class='highlight'>'Mary likes hiking, swimming, and riding a bicycle'</span> correctly balances all three items with gerund (-ing) forms. Switching to an infinitive ('to ride') breaks the rhythmic pattern."
    },
    {
        id: 3,
        concept: "Rule 1: Matching Adverb Forms",
        question: "Identify the sentence that properly fixes the broken pattern in: 'The manager wrote the report quickly, accurately, and in a detailed manner.'",
        options: [
            "The manager wrote the report quickly, accurately, and thoroughly.",
            "The manager wrote the report quick, accurately, and detailed.",
            "The manager wrote the report in speed, accurately, and detailed.",
            "The manager wrote the report quickly, with accuracy, and thoroughly."
        ],
        correct: 0,
        explanation: "<span class='highlight'>'quickly, accurately, and thoroughly'</span> matches three single-word adverbs ending in -ly, replacing the clunky 4-word prepositional phrase 'in a detailed manner'."
    },
    {
        id: 4,
        concept: "Rule 1: Consistent Active Subject & Verbs",
        question: "How should you correct: 'He waited, completed his lab problems carelessly, and his motivation was low'?",
        options: [
            "He waited, completed his lab problems carelessly, and motivation lacked.",
            "He waited, completed his lab problems carelessly, and lacked motivation.",
            "He waited, careless completion of lab problems, and low motivation.",
            "He was waiting, completed his problems, and motivation was low."
        ],
        correct: 1,
        explanation: "<span class='highlight'>'He waited, completed..., and lacked motivation'</span> maintains the student as the active subject for all three past-tense verbs (waited, completed, lacked)."
    },
    {
        id: 5,
        concept: "Rule 2: Consistent Subordinate Clauses",
        question: "Which version maintains parallel structure across multiple subordinate clauses?",
        options: [
            "The coach told players that they should sleep, that they should not overeat, and to do warm-ups.",
            "The coach told players to sleep, that they shouldn't overeat, and doing warm-ups.",
            "The coach told players that they should sleep, that they should not overeat, and that they should do warm-up exercises.",
            "The coach told players sleeping well, not to overeat, and that they do warm-ups."
        ],
        correct: 2,
        explanation: "<span class='highlight'>Repeating 'that they should...'</span> creates a clear, consistent grammatical anchor that guides the reader effortlessly through the coach's three instructions."
    },
    {
        id: 6,
        concept: "Rule 2: Active vs. Passive Voice Consistency",
        question: "Why is this sentence faulty: 'The salesman expected that he would present, that he would have time, and that questions would be asked by buyers'?",
        options: [
            "It has too many commas",
            "The first two clauses are active voice, but the third clause abruptly switches to passive voice",
            "The word 'expected' cannot take that-clauses",
            "Salesmen cannot be the subject of a sentence"
        ],
        correct: 1,
        explanation: "The first two clauses ('he would present', 'he would have time') use active voice with 'he', while the third clause ('questions would be asked') derails the momentum into passive voice. It should be: <span class='highlight'>'and that buyers would ask questions'</span>."
    },
    {
        id: 7,
        concept: "Rule 3: Parallel Lists After Colons",
        question: "Choose the correct parallel list to complete: 'The dictionary provides: meanings, pronunciations, spellings, and _____.'",
        options: [
            "looking up irregular verbs",
            "irregular verbs",
            "to find irregular verbs",
            "how to use irregular verbs"
        ],
        correct: 1,
        explanation: "<span class='highlight'>'irregular verbs'</span> is a noun phrase that matches the preceding nouns in the list ('meanings, pronunciations, spellings'), keeping everything neat and parallel."
    },
    {
        id: 8,
        concept: "Workshop: Fixing Broken Thesis Statements",
        question: "How do you correctly balance the two reasons in this thesis: 'Cars should be banned on campus to make better use of space and for setting a positive example'?",
        options: [
            "to make better use of space and to set a positive example",
            "for making better use of space and to set a positive example",
            "to make better use of space and setting a positive example",
            "making better use of space and to set a positive example"
        ],
        correct: 0,
        explanation: "<span class='highlight'>'to make better use of space and to set a positive example'</span> pairs two matching infinitive phrases ('to make' / 'to set'), creating an authoritative and balanced academic thesis."
    }
];


