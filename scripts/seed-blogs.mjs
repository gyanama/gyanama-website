/**
 * Seeds 5 published blog posts into Supabase.
 * Run with:  node --env-file=.env scripts/seed-blogs.mjs
 * Idempotent — upserts on `slug`, so re-running updates rather than duplicates.
 */
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const p = (t) => ({ type: 'paragraph', value: t });
const h = (t) => ({ type: 'heading', value: t });
const ul = (items) => ({ type: 'list', value: items });
const quote = (t) => ({ type: 'quote', value: t });
const split = (layout, v) => ({ type: 'split_section', layout, image: '', value: v });

const wordsOf = (blocks) =>
  blocks
    .map((b) =>
      typeof b.value === 'string'
        ? b.value
        : Array.isArray(b.value)
          ? b.value.join(' ')
          : [b.value.title, b.value.description, b.value.subTitle, b.value.footer, ...(b.value.list || [])].join(' '),
    )
    .join(' ');
const readTime = (blocks) => `${Math.max(1, Math.round(wordsOf(blocks).trim().split(/\s+/).length / 200))} min read`;

const POSTS = [
  {
    slug: 'ai-attendance-indian-schools',
    title: '5 Ways AI Is Transforming Attendance in Indian Schools',
    category: 'AI in Education',
    author: 'GYANAMA Team',
    tags: ['attendance', 'ai', 'automation'],
    excerpt:
      'Manual roll-calls cost teachers hours every week and still miss the kids who need follow-up. Here is how AI-driven attendance changes that.',
    meta_description:
      'Discover 5 ways AI transforms school attendance in India — from automated absentee calls to early-warning analytics that reduce dropouts.',
    content: [
      p('For most Indian schools, attendance is still a register, a pen, and a teacher reading out names. It works — but it quietly eats 15–20 minutes of every class and tells you nothing until it is too late. AI changes the equation from record-keeping to early action.'),
      h('1. One-tap and automated marking'),
      p('Instead of calling out names, teachers mark a whole class in seconds from a phone — or let the system pre-fill from the timetable. The minutes saved per period add up to hours every week, given back to actual teaching.'),
      h('2. Automated absentee calls to parents'),
      p('When a student is marked absent, the system can instantly notify parents by call, SMS, or app. No staff member has to dial 40 numbers — and parents hear about an absence within minutes, not at the next PTM.'),
      ul([
        'Same-day awareness for every parent',
        'No manual calling load on the front office',
        'A clear, automatic record of who was informed and when',
      ]),
      h('3. Early-warning analytics'),
      p('AI spots patterns a register never could: the student whose attendance is quietly sliding, the class with a Monday-morning dip, the term-on-term trend. Flagging these early is the single biggest lever schools have against dropouts.'),
      quote('You cannot fix what you cannot see. Attendance analytics turn a pile of ticks into a list of students who need a phone call today.'),
      h('4. Less proxy, more accuracy'),
      p('Biometric and device-based check-ins remove proxy attendance and transcription errors, so the numbers leadership sees actually reflect reality.'),
      h('5. Board-ready reporting in one click'),
      p('Monthly and annual attendance reports — by student, class, or section — generate themselves, ready for board submissions and audits without a late night of spreadsheet work.'),
      p('Attendance is the heartbeat of a school day. Automating it does not just save time; it surfaces the students who need attention while there is still time to help.'),
    ],
  },
  {
    slug: 'principals-guide-paperless-school',
    title: "A Principal's Guide to Going Paperless",
    category: 'School Management',
    author: 'GYANAMA Team',
    tags: ['paperless', 'operations', 'digital'],
    excerpt:
      'Going paperless is less about technology and more about sequencing. Here is a practical order of operations that actually sticks.',
    meta_description:
      'A practical, step-by-step guide for principals to move a school from paper registers and files to a single digital dashboard — without chaos.',
    content: [
      p('Every principal has heard "go digital." Far fewer have a plan that survives contact with a busy school. The schools that succeed do not digitise everything at once — they sequence it.'),
      h('Start where the pain is loudest'),
      p('Begin with the process that wastes the most staff time and generates the most parent complaints. For most schools that is fee collection or attendance. Win there first, and the rest of the staff buys in.'),
      split('left', {
        title: 'A simple rollout order that works',
        description: 'Tackle one system per month so staff never feel overwhelmed, and each step builds on the last.',
        subTitle: 'Suggested sequence',
        list: [
          'Month 1: Attendance + parent notifications',
          'Month 2: Fees and digital receipts',
          'Month 3: Timetable and substitutions',
          'Month 4: Exams, marks, and report cards',
        ],
        footer: 'Adjust to your calendar — the principle is one win at a time.',
      }),
      h('Bring teachers along, not just systems'),
      p('The best software fails if teachers are not trained. Run short, hands-on sessions with the actual app on their phones, and appoint one tech-comfortable teacher per section as a go-to helper.'),
      ul([
        'Train on phones, not slides',
        'Keep one printed fallback for the first month',
        'Celebrate the first "we did not use the register today" moment',
      ]),
      quote('Paperless is a habit, not a purchase. The tool only matters once the routine around it changes.'),
      p('Done in this order, a school can be substantially paperless in a single term — with less stress and far less staff resistance than a big-bang switch.'),
    ],
  },
  {
    slug: 'automated-fee-reminders-collection',
    title: 'How Automated Fee Reminders Improve Collection Rates',
    category: 'School Management',
    author: 'GYANAMA Team',
    tags: ['fees', 'automation', 'finance'],
    excerpt:
      'Late fees are rarely about unwillingness — they are about forgetting. Gentle, automated reminders quietly fix most of the gap.',
    meta_description:
      'Learn how automated, multi-channel fee reminders raise school collection rates, cut awkward follow-up calls, and improve cash flow.',
    content: [
      p('Ask any accountant at a school where the late fees come from, and the honest answer is rarely "parents who will not pay." It is parents who forgot, missed the notice in a school bag, or meant to pay next week. Automation closes that gap without anyone feeling chased.'),
      h('Reminders that meet parents where they are'),
      p('A reminder on the school app, an SMS, and a WhatsApp nudge reach parents far more reliably than a paper slip. Scheduled before the due date — not after — they prevent the late payment instead of punishing it.'),
      ul([
        'A friendly heads-up a week before the due date',
        'A due-date reminder with a one-tap payment link',
        'A gentle follow-up only if still unpaid',
      ]),
      h('Less awkwardness, better relationships'),
      p('Automated reminders take the office out of the role of debt collector. Parents get neutral, consistent nudges, and staff are freed from uncomfortable phone calls — which protects the school-parent relationship.'),
      quote('The goal is not to chase payments harder. It is to make paying on time the easy, obvious default.'),
      h('Cash flow you can plan around'),
      p('When most fees arrive on time, leadership can plan salaries, vendors, and investments with confidence instead of guessing. Real-time dashboards show exactly what is collected and what is outstanding, by class or by student.'),
      p('The schools that adopt automated reminders routinely see on-time collection climb — not by pushing harder, but by removing the friction that caused most delays in the first place.'),
    ],
  },
  {
    slug: 'building-parent-trust-communication',
    title: 'Building Parent Trust Through Transparent Communication',
    category: 'Guides & Tips',
    author: 'GYANAMA Team',
    tags: ['parents', 'communication', 'trust'],
    excerpt:
      'Trust is not built at the annual PTM. It is built in the small, consistent updates parents receive between them.',
    meta_description:
      'Practical ways schools build lasting parent trust through transparent, timely communication — attendance, marks, fees, and announcements.',
    content: [
      p('Parents do not lose trust in a school because of one bad result. They lose it from silence — from finding out about a problem too late, or never. Transparent, timely communication is the cheapest and most powerful trust-builder a school has.'),
      h('Share the day, not just the year'),
      p('A parent who sees today’s attendance, this week’s homework, and last test’s marks feels like a partner in their child’s education. One who only hears at the annual meeting feels like an outsider.'),
      split('right', {
        title: 'What to share, and how often',
        description: 'Small, regular signals beat occasional big reports. Aim for steady visibility, not noise.',
        subTitle: 'A healthy rhythm',
        list: [
          'Daily: attendance and urgent notices',
          'Weekly: homework and upcoming events',
          'Per assessment: marks and teacher remarks',
          'Per term: a consolidated progress view',
        ],
        footer: 'Consistency matters more than volume.',
      }),
      h('Make it two-way'),
      p('Trust grows when parents can ask a question and get a timely answer. A simple in-app channel for queries — with clear ownership on the school side — turns communication from broadcast into relationship.'),
      quote('Parents forgive a lot when they feel informed. They forgive very little when they feel kept in the dark.'),
      p('When communication is transparent and routine, the annual PTM stops being a moment of surprises and becomes a confirmation of what parents already knew. That is what trust feels like.'),
    ],
  },
  {
    slug: 'school-management-system-buyers-guide-2026',
    title: "What to Look for in a School Management System (2026 Buyer's Guide)",
    category: 'Guides & Tips',
    author: 'GYANAMA Team',
    tags: ['buyers-guide', 'erp', 'evaluation'],
    excerpt:
      'A school management system is a multi-year commitment. These are the questions that separate a tool you will love from one you will fight.',
    meta_description:
      'A 2026 buyer’s guide to choosing a school management system: the features, integrations, support, and red flags that matter for Indian K-12 schools.',
    content: [
      p('Choosing a school management system is not a software purchase — it is a multi-year operating decision for your whole school. The flashy demo matters far less than how the system behaves on a chaotic Monday in July. Here is what to actually evaluate.'),
      h('1. Does it cover the whole school day?'),
      p('Attendance, fees, timetable, exams, communication, and analytics should live in one place. Stitching together five tools means five logins, five support numbers, and data that never quite agrees.'),
      h('2. Will teachers and parents actually use it?'),
      p('A powerful system nobody opens is worthless. Test the parent app and the teacher flow on a real phone. If marking attendance takes more than a few taps, adoption will quietly die.'),
      ul([
        'Mobile-first for teachers, parents, and students',
        'Works on low-end phones and patchy networks',
        'Available in the languages your community uses',
      ]),
      h('3. How good is the support and onboarding?'),
      p('Software is bought once and supported forever. Ask how migration from your current records works, how fast support responds during admissions season, and whether training is included.'),
      split('left', {
        title: 'Red flags to watch for',
        description: 'A great demo can hide painful realities. Probe these before signing.',
        subTitle: 'Ask directly',
        list: [
          'No clear data-export path (you should own your data)',
          'Per-feature pricing that balloons over time',
          'No references from schools your size',
          'Support only by email with slow turnaround',
        ],
        footer: 'A confident vendor answers all of these without hesitation.',
      }),
      h('4. Is your data secure and portable?'),
      p('Student data is sensitive. Confirm where data is stored, who can access it, and that you can export everything if you ever leave. Lock-in is a hidden cost.'),
      quote('Buy for the boring Tuesday, not the impressive demo. The system you live with is the one that handles routine without friction.'),
      p('A school management system should make your school calmer, your staff faster, and your parents more informed. If a tool cannot show you that on a real device with real questions answered, keep looking.'),
    ],
  },
];

async function run() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const rows = POSTS.map((post, i) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    content_markdown: '',
    category: post.category,
    author: post.author,
    tags: post.tags,
    read_time: readTime(post.content),
    meta_title: post.title,
    meta_description: post.meta_description,
    status: 'published',
    // Stagger publish dates so ordering looks natural (newest first = index 0).
    published_at: new Date(now - i * 2 * day).toISOString(),
  }));

  const res = await fetch(`${url}/rest/v1/posts?on_conflict=slug`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
  });
  const body = await res.text();
  if (!res.ok) {
    console.error('Seed failed:', res.status, body);
    process.exit(1);
  }
  const data = JSON.parse(body);
  console.log(`Seeded ${data.length} posts:`);
  for (const r of data) console.log(`  - ${r.title}  (/blog/${r.slug}, ${r.read_time})`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
