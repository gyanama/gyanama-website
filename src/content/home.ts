export const hero = {
  eyebrow: 'For CBSE, ICSE and State Board schools',
  headline: 'When a child keeps missing school, Gyanama calls the parent.',
  sub: 'Gyanama checks attendance, fees and marks every day. When attendance slips, it messages the family and then calls. When fees are overdue, it calls. When a student starts slipping, it tells the teacher. Every outcome is logged.',
  primary: 'Book a 20-minute demo',
  secondary: 'See how a call goes',
  proof: ['Calls families about absences', 'Follows up on overdue fees', 'Flags students who are slipping'],
};

export const call = {
  label: 'From a real call. Names changed.',
  trigger: 'Attendance below the school limit',
  status: ['Attendance drop found', 'Calling the family', 'On call', 'Logged'],
  transcript: {
    english: [
      { who: 'Gyanama', text: "Namaste! I'm calling from [School]. Am I speaking with Aarav's parent?" },
      { who: 'Parent', text: 'Yes.' },
      { who: 'Gyanama', text: "Aarav's attendance is a little low. Was there a reason?" },
      { who: 'Parent', text: 'He had a fever.' },
      { who: 'Gyanama', text: 'I see. How many days of leave should I put in?' },
      { who: 'Parent', text: 'He came to school today.' },
      { who: 'Gyanama', text: "Okay, so no leave is needed. I'll let the class teacher know. Thank you!" },
    ],
    hinglish: [
      { who: 'Gyanama', text: 'Namaste! Main [School] se bol rahi hoon. Kya main Aarav ke parent se baat kar rahi hoon?' },
      { who: 'Parent', text: 'Ji.' },
      { who: 'Gyanama', text: 'Aarav ki attendance thodi kam hai. Koi reason tha?' },
      { who: 'Parent', text: 'Usko bukhar ho gaya tha.' },
      { who: 'Gyanama', text: 'Acha. Abhi kitne din ki leave daal doon?' },
      { who: 'Parent', text: 'Aaj toh woh school aa gaya.' },
      { who: 'Gyanama', text: 'Theek hai, toh leave nahi chahiye. Main class teacher ko bata deti hoon. Thank you!' },
    ],
  },
  logged: [
    { k: 'Reason', v: 'Fever' },
    { k: 'Leave', v: 'Not needed' },
    { k: 'Follow-up', v: 'Class teacher informed' },
  ],
};

export const faqs = [
  { q: 'Is Gyanama just another school ERP?', a: 'It does what an ERP does: attendance, fees, exams, report cards, timetable. The difference is the follow-up. Gyanama messages and calls families, chases overdue fees and flags students who are slipping.' },
  { q: 'How do the attendance calls work?', a: 'Gyanama checks monthly attendance every day. Below 60%, the family gets a message and reminders. If it keeps dropping, or falls below 40%, Gyanama calls between 10 am and 6 pm and logs the reason against the student.' },
  { q: 'Which boards does Gyanama support?', a: 'CBSE, ICSE and State Boards, from playgroup to Class 12.' },
  { q: 'How do we move our data in?', a: 'Send us your students, staff, classes and timetable in Excel. We import it for you.' },
  { q: 'Can we set the attendance limit to 75%?', a: 'Yes. 60% and 40% are the starting limits. Each school sets its own limits, so a CBSE school can use 75%.' },
  { q: 'Which languages are the calls in?', a: 'Hindi, Hinglish or English. The call starts in Hindi or Hinglish and switches to English if the parent replies in English. Families can also chat with the school assistant in the app in Marathi and Tamil. Calls in other regional languages are not available yet.' },
  { q: 'What happens if a parent asks for the teacher?', a: 'The call cannot be transferred. A teacher callback is logged against the student with the reason. If the parent is busy, Gyanama calls back later.' },
  { q: 'What question types do test papers have?', a: 'MCQ, true or false, fill in the blank, short answer and long answer, from easy to hard, in English or Hindi. Papers come from your own textbook PDF or the NCERT library, with an answer key, and the teacher edits every question before it is used.' },
];

export const parentFaqs = [
  { q: 'Will the call ask parents for money?', a: 'No. The call is about attendance or a fee that is overdue. It never takes a payment, quotes an amount or sends a link. Families pay the school directly, in the app or at the school office.' },
  { q: 'Does a child on approved leave get a call?', a: 'No. Approved leave, weekends and school holidays are skipped when attendance is checked.' },
];
