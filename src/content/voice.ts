export const voice = {
  eyebrow: 'Voice agent for schools',
  headline: 'A voice agent that calls families for your school.',
  sub: 'Gyanama calls parents about absences and overdue fees, straight from your school data. No call lists to upload, no scripts to write. Every call is logged against the student.',
  steps: [
    { n: '1', title: 'Checks every day', body: 'Each student\'s monthly attendance and every overdue fee is checked daily.' },
    { n: '2', title: 'Messages first', body: 'Below 60% attendance, the family gets a message in the app and up to three reminders.' },
    { n: '3', title: 'Then calls', body: 'If attendance keeps dropping, or falls below 40%, Gyanama calls. Overdue fees get a call the next day.' },
    { n: '4', title: 'Logs the outcome', body: 'The reason, how the parent responded and any follow-up are saved. The class teacher sees what needs a human.' },
  ],
  languages: {
    heading: 'Speaks the way your families speak.',
    body: 'Calls start in Hindi or Hinglish and switch to English when the parent does. App messages also go out in Marathi and Tamil.',
    list: ['Hindi', 'Hinglish', 'English'],
  },
  controls: {
    heading: 'Your school stays in control.',
    items: [
      { k: 'Call hours', v: '10 am to 6 pm only' },
      { k: 'Do Not Call list', v: 'Numbers you add are never called' },
      { k: 'Daily limit', v: 'Up to 50 calls per school per day' },
      { k: 'Call length', v: 'Four minutes at most' },
    ],
    footnote: 'These are the default settings.',
  },
  logFields: ['Reason given', 'Reason type', 'How the parent responded', 'Follow-up needed', 'Planned absence', 'Leave confirmed'],
  faqs: [
    { q: 'Can parents talk back to the call?', a: 'Yes. The AI voice listens and replies, so parents can explain why their child is absent.' },
    { q: 'What if a parent asks for a teacher?', a: 'The call is logged with a request for the class teacher to call back.' },
    { q: 'Can we stop calls to some families?', a: 'Yes. Add their number to your Do Not Call list and any queued call to them is cancelled.' },
  ],
};
