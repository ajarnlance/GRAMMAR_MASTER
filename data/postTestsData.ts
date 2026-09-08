// Post Lesson Tests Data extracted from GrammarMaster repo

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const SENTENCE_STRUCTURE_EXAM: ExamQuestion[] = [
        {
          id: 1,
          question: "I wanted to go to the park, ______ it started to rain.",
          options: ["so", "but", "or", "nor"],
          correctIndex: 1,
          explanation: "This is a Compound Sentence using 'but' to show contrast. A comma is required before the conjunction.",
        },
        {
          id: 2,
          question: "______ she studied very hard, she passed the exam with flying colors.",
          options: ["However", "But", "Because", "So"],
          correctIndex: 2,
          explanation: "This is a Complex Sentence. 'Because' is a subordinating conjunction that starts the dependent clause.",
        },
        {
          id: 3,
          question: "The students opened their books ______ started reading immediately.",
          options: [", and", "and", ", but", "but"],
          correctIndex: 1,
          explanation: "This is a Simple Sentence with a compound verb (opened... and started). No comma is needed because there are not two independent clauses.",
        },
        {
          id: 4,
          question: "Which sentence is punctuated CORRECTLY?",
          options: [
            "I like coffee but, my brother prefers tea.",
            "I like coffee, but my brother prefers tea.",
            "I like coffee but my brother prefers tea.",
            "I like coffee, but, my brother prefers tea."
          ],
          correctIndex: 1,
          explanation: "In a Compound Sentence, place the comma BEFORE the coordinating conjunction (FANBOYS).",
        },
        {
          id: 5,
          question: "We can go to the Italian restaurant, ______ we can try the new sushi place.",
          options: ["or", "nor", "yet", "for"],
          correctIndex: 0,
          explanation: "'Or' is the correct conjunction to show a choice between two options in a Compound Sentence.",
        },
        {
          id: 6,
          question: "Which of the following is a COMPLEX sentence?",
          options: [
            "The dog barked loudly at the mailman.",
            "The dog barked, and the mailman ran away.",
            "Although the dog barked, the mailman was not afraid.",
            "The dog and the cat sleep on the sofa."
          ],
          correctIndex: 2,
          explanation: "Option 3 has a dependent clause ('Although the dog barked') and an independent clause. The others are Simple or Compound.",
        },
        {
          id: 7,
          question: "He was late to work ______ he forgot to set his alarm.",
          options: ["so", "because", "although", "unless"],
          correctIndex: 1,
          explanation: "We use 'because' to show the reason/cause. Note: No comma is usually needed when the dependent clause comes second.",
        },
        {
          id: 8,
          question: "The movie was three hours long, ______ it was incredibly interesting.",
          options: ["so", "for", "yet", "nor"],
          correctIndex: 2,
          explanation: "'Yet' is used to show unexpected contrast (similar to 'but'). It connects two independent clauses.",
        },
        {
          id: 9,
          question: "Which sentence requires a comma?",
          options: [
            "I will call you when I arrive home.",
            "When I arrive home I will call you.",
            "She likes apples and bananas.",
            "They ran and jumped in the park."
          ],
          correctIndex: 1,
          explanation: "When a dependent clause ('When I arrive home') starts the sentence, it must be followed by a comma.",
        },
        {
          id: 10,
          question: "Choose the SIMPLE sentence:",
          options: [
            "My friend plays soccer, so he is very fit.",
            "My friend plays soccer and basketball every weekend.",
            "Since he plays soccer, he is very fit.",
            "He plays soccer, but he doesn't like running."
          ],
          correctIndex: 1,
          explanation: "This is a Simple Sentence with a compound object (soccer and basketball). It has only one subject-verb relationship.",
        }
      ];

export const SUBJECT_VERB_AGREEMENT_EXAM: ExamQuestion[] = [
        {
          id: 1,
          question: "The toaster and the dryer ______ repair.",
          options: ["needs", "need"],
          correctIndex: 1,
          explanation: "Rule 1: Two subjects joined by 'and' (toaster AND dryer) are plural. Plural verbs do not end in 's'.",
        },
        {
          id: 2,
          question: "Either the players or the coach ______ wrong about the call.",
          options: ["is", "are"],
          correctIndex: 0,
          explanation: "Rule 3: With 'or'/'nor', the verb agrees with the subject closest to it. 'Coach' is singular, so we use 'is'.",
        },
        {
          id: 3,
          question: "Each of the books ______ a unique cover.",
          options: ["has", "have"],
          correctIndex: 0,
          explanation: "Rule 2: 'Each' acts as a singular subject, even if followed by a plural prepositional phrase.",
        },
        {
          id: 4,
          question: "The perspective of the artists ______ dramatically.",
          options: ["varies", "vary"],
          correctIndex: 0,
          explanation: "Rule 5: The subject is 'perspective' (singular). Ignore the prepositional phrase 'of the artists'.",
        },
        {
          id: 5,
          question: "The committee ______ its decision today.",
          options: ["announces", "announce"],
          correctIndex: 0,
          explanation: "Rule 7: Collective nouns like 'committee' are treated as singular units.",
        },
        {
          id: 6,
          question: "Mathematics ______ difficult for many students.",
          options: ["is", "are"],
          correctIndex: 0,
          explanation: "Rule 8: Nouns ending in 's' like 'Mathematics', 'Measles', or 'Economics' are singular.",
        },
        {
          id: 7,
          question: "Five miles ______ a long way to walk.",
          options: ["is", "are"],
          correctIndex: 0,
          explanation: "Rule 9: Units of measurement (distance, time, money) are singular.",
        },
        {
          id: 8,
          question: "Here ______ the energetic puppies.",
          options: ["comes", "come"],
          correctIndex: 1,
          explanation: "Rule 10: In sentences starting with 'Here', the subject follows the verb. 'Puppies' is plural.",
        },
        {
          id: 9,
          question: "The athletes who ______ daily will improve.",
          options: ["train", "trains"],
          correctIndex: 0,
          explanation: "Rule 13: The relative pronoun 'who' refers to 'athletes' (plural), so the verb must be plural (no 's').",
        },
        {
          id: 10,
          question: "Listening to music ______ me focus.",
          options: ["helps", "help"],
          correctIndex: 0,
          explanation: "Rule 12: Gerunds ('Listening') acting as subjects are always singular.",
        }
      ];

export const CLAUSE_MATCHING_COL_A = [
                { id: 1, text: "Many students struggle with time management" },
                { id: 2, text: "Lab-grown meat is produced in a controlled environment" },
                { id: 3, text: "Because solar power depends on sunlight" },
                { id: 4, text: "The university library provides online resources" },
                { id: 5, text: "Lab-grown meat may be better for the environment" },
                { id: 6, text: "Climate change is accelerating" },
                { id: 7, text: "Wind turbines generate electricity" },
                { id: 8, text: "Although nuclear energy is highly efficient" },
                { id: 9, text: "The professor extended the deadline" },
                { id: 10, text: "University courses require independent study" },
                { id: 11, text: "While some students prefer studying in groups" },
                { id: 12, text: "Fossil fuels are still widely used" },
                { id: 13, text: "Scientists continue to develop lab-grown meat" },
                { id: 14, text: "Due to rising CO2 levels in the atmosphere" },
                { id: 15, text: "The campus cafeteria only offers plant-based options" },
                { id: 16, text: "Students must complete their assignments before the deadline" },
                { id: 17, text: "As climate policies become stricter" },
                { id: 18, text: "The new research lab is fully equipped" },
                { id: 19, text: "Universities provide career counseling" },
                { id: 20, text: "Some students attend lectures in person" },
                { id: 21, text: "Given that university fees are rising" },
                { id: 22, text: "Given the increasing demand for renewable energy" },
                { id: 23, text: "Given the advancements in lab-grown meat" },
                { id: 24, text: "While some universities offer free online courses" },
                { id: 25, text: "Whereas traditional meat production requires extensive resources" }
            ];

export const CLAUSE_MATCHING_COL_B = [
                { id: 'A', text: "so students can access journals anytime." },
                { id: 'B', text: "but the cost remains a major challenge." },
                { id: 'C', text: "which helps students develop critical thinking skills." },
                { id: 'D', text: "it is much more expensive than fossil fuels." },
                { id: 'E', text: "and global temperatures are rising every year." },
                { id: 'F', text: "because some students still submitted their work late." },
                { id: 'G', text: "or they will receive a 10% deduction." },
                { id: 'H', text: "and it does not require traditional farming methods." },
                { id: 'I', text: "so that students can make informed decisions about their future." },
                { id: 'J', text: "others work better alone." },
                { id: 'K', text: "despite their environmental impact." },
                { id: 'L', text: "while others prefer online learning." },
                { id: 'M', text: "weather patterns are changing." },
                { id: 'N', text: "so they find it challenging to balance their workload" },
                { id: 'O', text: "its efficiency varies in different regions." },
                { id: 'P', text: "and they do not produce carbon emissions." },
                { id: 'Q', text: "which is why most students eat in the student mall." },
                { id: 'R', text: "as it is designed for advanced research." },
                { id: 'S', text: "because it requires fewer resources." },
                { id: 'T', text: "but some students still submitted their work late." },
                { id: 'U', text: "wind and solar power are becoming more popular worldwide." },
                { id: 'V', text: "many students rely on scholarships and part-time jobs to afford tuition." },
                { id: 'W', text: "lab-grown meat is becoming much cheaper." },
                { id: 'X', text: "others require students to pay for certifications." },
                { id: 'Y', text: "lab-grown meat requires significantly less land and water" },
                { id: 'Z', text: "are reducing fossil fuel use and investing in renewable energy." }
            ];

export const CLAUSE_MATCHING_ANSWERS: Record<number, string> = {
                1: { secondClause: 'N', fullSentence: "Many students struggle with time management, so they find it challenging to balance their workload." },
                2: { secondClause: 'H', fullSentence: "Lab-grown meat is produced in a controlled environment, and it does not require traditional farming methods." },
                3: { secondClause: 'O', fullSentence: "Because solar power depends on sunlight, its efficiency varies in different regions." },
                4: { secondClause: 'A', fullSentence: "The university library provides online resources, so students can access journals anytime." },
                5: { secondClause: 'S', fullSentence: "Lab-grown meat may be better for the environment because it requires fewer resources." },
                6: { secondClause: 'E', fullSentence: "Climate change is accelerating, and global temperatures are rising every year." },
                7: { secondClause: 'P', fullSentence: "Wind turbines generate electricity, and they do not produce carbon emissions." },
                8: { secondClause: 'D', fullSentence: "Although nuclear energy is highly efficient, it is much more expensive than fossil fuels." },
                9: { secondClause: 'T', fullSentence: "The professor extended the deadline, but some students still submitted their work late." },
                10: { secondClause: 'C', fullSentence: "University courses require independent study, which helps students develop critical thinking skills." },
                11: { secondClause: 'J', fullSentence: "While some students prefer studying in groups, others work better alone." },
                12: { secondClause: 'K', fullSentence: "Fossil fuels are still widely used despite their environmental impact." },
                13: { secondClause: 'B', fullSentence: "Scientists continue to develop lab-grown meat, but the cost remains a major challenge." },
                14: { secondClause: 'M', fullSentence: "Due to rising CO2 levels in the atmosphere, weather patterns are changing." },
                15: { secondClause: 'Q', fullSentence: "The campus cafeteria only offers plant-based options, which is why most students eat in the student mall." },
                16: { secondClause: 'G', fullSentence: "Students must complete their assignments before the deadline, or they will receive a 10% deduction." },
                17: { secondClause: 'Z', fullSentence: "As climate policies become stricter, companies are reducing fossil fuel use and investing in renewable energy." },
                18: { secondClause: 'R', fullSentence: "The new research lab is fully equipped as it is designed for advanced research." },
                19: { secondClause: 'I', fullSentence: "Universities provide career counseling so that students can make informed decisions about their future." },
                20: { secondClause: 'L', fullSentence: "Some students attend lectures in person, while others prefer online learning." },
                21: { secondClause: 'V', fullSentence: "Given that university fees are rising, many students rely on scholarships and part-time jobs to afford tuition." },
                22: { secondClause: 'U', fullSentence: "Given the increasing demand for renewable energy, wind and solar power are becoming more popular worldwide." },
                23: { secondClause: 'W', fullSentence: "Given the advancements in lab-grown meat, lab-grown meat is becoming much cheaper." },
                24: { secondClause: 'X', fullSentence: "While some universities offer free online courses, others require students to pay for certifications." },
                25: { secondClause: 'Y', fullSentence: "Whereas traditional meat production requires extensive resources, lab-grown meat requires significantly less land and water." }
            };

