import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { ScrollText, Scale, Gavel } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const EFFECTIVE_DATE = 'May 4, 2026';

const SECTIONS: Array<{ id: string; label: string }> = [
  { id: 'parties', label: 'Who These Terms Apply To' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'accounts', label: 'Accounts and Authentication' },
  { id: 'subscriptions', label: 'Subscriptions, Fees, and Plans' },
  { id: 'school-responsibilities', label: 'School Responsibilities and Data' },
  { id: 'acceptable-use', label: 'Acceptable Use' },
  { id: 'ai-features', label: 'AI Features' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'privacy', label: 'Privacy and Data Protection' },
  { id: 'availability', label: 'Service Availability and Support' },
  { id: 'termination', label: 'Suspension and Termination' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnity', label: 'Indemnity' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'changes', label: 'Changes to the Services and Terms' },
  { id: 'governing-law', label: 'Governing Law and Jurisdiction' },
  { id: 'notices', label: 'Notices' },
  { id: 'misc', label: 'Miscellaneous' },
  { id: 'contact', label: 'Contact' },
];

const TermsSection = ({
  num,
  id,
  title,
  children,
}: {
  num: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <div className="flex items-baseline gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-amber-100 text-amber-800 font-mono text-sm font-bold flex-shrink-0">
        {num.toString().padStart(2, '0')}
      </span>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
    </div>
    <div className="pl-12 space-y-4 text-muted-foreground leading-relaxed">
      {children}
    </div>
  </section>
);

const TermsOfService = () => {
  return (
    <PageLayout>
      <SEOHead title="Terms of Service" />
      <BreadcrumbSchema pageName="Terms of Service" pagePath="/terms-of-service" />

      {/* Hero — terms uses an amber/parchment scroll badge, distinct from privacy */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 py-24 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-xs font-semibold text-amber-800 mb-6">
              <Scale className="w-3.5 h-3.5" /> Legal Agreement
            </div>
            <h1 className="text-display mb-6">Terms of Service</h1>
            <p className="text-subtitle">
              The agreement that governs your use of the GYANAMA platform, mobile app, and AI-powered school services.
            </p>
            <p className="text-sm text-muted-foreground/80 mt-4">
              Effective {EFFECTIVE_DATE} &middot; ARCOS Technologies Private Limited &middot; Governed by the laws of India
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-wide max-w-4xl mx-auto">

          {/* Two-column layout: contract-style index on the left, body on the right */}
          <div className="grid lg:grid-cols-[220px_1fr] gap-10">

            {/* Section index — sticky on desktop, distinctive amber side rail */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 text-amber-900 font-semibold mb-4 text-sm uppercase tracking-wider">
                  <ScrollText className="w-4 h-4" /> Index
                </div>
                <ol className="space-y-1.5 border-l-2 border-amber-200 pl-4">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id} className="text-sm">
                      <a
                        href={`#${s.id}`}
                        className="text-slate-600 hover:text-amber-800 hover:underline transition-colors"
                      >
                        <span className="text-amber-700 font-mono mr-1.5">{(i + 1).toString().padStart(2, '0')}.</span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Mobile-only collapsed index */}
            <details className="lg:hidden mb-8 rounded-lg border border-amber-200 bg-amber-50/40 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-amber-900 flex items-center gap-2">
                <ScrollText className="w-4 h-4" /> Section Index ({SECTIONS.length})
              </summary>
              <ol className="mt-3 space-y-1.5 list-decimal pl-5 text-sm text-slate-700">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="hover:text-amber-800 hover:underline">{s.label}</a>
                  </li>
                ))}
              </ol>
            </details>

            <div>
              {/* Preamble */}
              <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50/30 p-6 mb-12">
                <p className="text-slate-700 leading-relaxed">
                  These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement between you and ARCOS Technologies Private Limited, the operator of the GYANAMA brand (&ldquo;GYANAMA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), governing your access to and use of the GYANAMA website at{' '}
                  <a href="https://gyanama.com/" className="text-amber-800 font-medium hover:underline">https://gyanama.com</a>, our school management dashboard, the &ldquo;Gyanama&rdquo; Android mobile application, and any related products, APIs, content, and features (collectively, the &ldquo;Services&rdquo;). By creating an account, signing in, or using any part of the Services, you agree to these Terms.
                </p>
              </div>

              <TermsSection num={1} id="parties" title="Who These Terms Apply To">
                <p>
                  The Services are provided to schools that subscribe to GYANAMA (each, a &ldquo;School&rdquo;) and to the users authorised by that School &mdash; principals, teachers, coordinators, managers, non-teaching staff, students, and the parents or legal guardians of those students (each, a &ldquo;User&rdquo;). The School is responsible for its Users and for the conduct of its Users on the Services.
                </p>
                <p>
                  If you are accepting these Terms on behalf of a School or other organisation, you represent that you have authority to bind that organisation. If you do not have that authority, you must not use the Services on the organisation&apos;s behalf.
                </p>
              </TermsSection>

              <TermsSection num={2} id="eligibility" title="Eligibility">
                <p>
                  The Services are intended for use by schools and authorised users in India. You must be at least 18 years old to enter into a subscription on behalf of a School. Student and parent accounts may be created for individuals under 18 only by the School, on the basis of consent obtained from a parent or lawful guardian at the time of admission, in accordance with the Digital Personal Data Protection Act, 2023 and our{' '}
                  <a href="/privacy-policy" className="text-amber-800 font-medium hover:underline">Privacy Policy</a>.
                </p>
              </TermsSection>

              <TermsSection num={3} id="accounts" title="Accounts and Authentication">
                <p>
                  App users sign in to the GYANAMA Android application using their registered mobile phone number and a one-time password (OTP). The administrator console for school super-admins and GYANAMA staff uses username, password, and two-factor authentication. You are responsible for keeping your sign-in credentials and OTPs confidential, for all activity that occurs under your account, and for promptly notifying us at{' '}
                  <a href="mailto:info@gyanama.com" className="text-amber-800 font-medium hover:underline">info@gyanama.com</a>{' '}
                  if you suspect unauthorised access to your account.
                </p>
                <p>
                  We may suspend or restrict an account that we reasonably believe is being used in violation of these Terms or applicable law.
                </p>
              </TermsSection>

              <TermsSection num={4} id="subscriptions" title="Subscriptions, Fees, and Plans">
                <p>
                  Schools subscribe to the Services on the basis of a written agreement, order form, or invoice that specifies the subscription plan, term, fees, and payment schedule. Unless otherwise agreed in writing, fees are payable in Indian Rupees (INR) and are exclusive of applicable taxes (including GST), which the School is responsible for paying. Late payments may attract interest and may result in suspension of the Services after reasonable written notice.
                </p>
                <p>
                  Individual app users (teachers, students, parents) do not pay GYANAMA directly; their access is provided by the subscribing School.
                </p>
              </TermsSection>

              <TermsSection num={5} id="school-responsibilities" title="School Responsibilities and Data">
                <p>The School is responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Obtaining all consents required from parents and lawful guardians for the processing of student personal data through the Services.</li>
                  <li>Providing accurate information about the School, its staff, students, and parents, and keeping that information up to date.</li>
                  <li>Configuring role-based access in the administrator console so that each User sees only what their role authorises.</li>
                  <li>The lawful, appropriate, and accurate content of any data, message, attachment, announcement, homework, doubt, form, exam, or other input it or its Users submit to the Services (&ldquo;School Content&rdquo;).</li>
                  <li>Promptly removing or correcting School Content that becomes inaccurate, obsolete, or unlawful.</li>
                </ul>
                <p>
                  As between GYANAMA and the School, the School owns its School Content. By using the Services, the School grants GYANAMA a limited, non-exclusive, worldwide, royalty-free licence to host, store, transmit, display, back up, and otherwise process the School Content solely as needed to provide and improve the Services and to comply with law.
                </p>
              </TermsSection>

              <TermsSection num={6} id="acceptable-use" title="Acceptable Use">
                <p>You agree not to, and not to permit any User to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Services to upload, send, or store content that is unlawful, defamatory, obscene, sexually explicit, harassing, hateful, threatening, infringes any intellectual-property right, or violates any person&apos;s privacy.</li>
                  <li>Use the Services to harass, bully, intimidate, or shame any student, teacher, parent, or other person.</li>
                  <li>Attempt to gain unauthorised access to any part of the Services, to other Users&apos; accounts or data, or to any systems or networks connected to the Services.</li>
                  <li>Probe, scan, reverse-engineer, decompile, or otherwise attempt to extract source code or trade secrets from the Services, except to the limited extent permitted by law.</li>
                  <li>Interfere with or disrupt the Services or the infrastructure that supports them, including via denial-of-service attacks, automated scraping, or excessive request volumes that exceed our published limits.</li>
                  <li>Use the Services to send spam, phishing, or unsolicited marketing communications.</li>
                  <li>Use the Services or any output of the AI features to train, fine-tune, or improve any third-party machine-learning model, or to build a product that competes with the Services.</li>
                  <li>Resell, sublicense, or otherwise commercially exploit the Services or any part of them, except as expressly permitted by your subscription.</li>
                </ul>
              </TermsSection>

              <TermsSection num={7} id="ai-features" title="AI Features">
                <p>
                  The Services include AI-powered features such as the AI Quiz / homework generator, AI summarisation, and the AI School Voice Assistant. These features rely on third-party machine-learning models and are subject to known limitations of generative AI: outputs may be incomplete, inaccurate, biased, or unsuitable for a particular purpose. AI outputs are provided for the convenience of educators and parents and are <strong>not</strong> a substitute for human review, professional advice, or formal academic assessment. The School is responsible for reviewing AI-generated content (such as quizzes, summaries, or messages) before relying on it or distributing it.
                </p>
                <p>
                  You must not use the AI features to generate content that violates Section 6 (Acceptable Use), that targets a child for harm, or that misrepresents an AI output as the work of a specific human.
                </p>
              </TermsSection>

              <TermsSection num={8} id="ip" title="Intellectual Property">
                <p>
                  The Services, including all software, designs, layouts, logos, trademarks (including the &ldquo;GYANAMA&rdquo; name and logo), and documentation, are owned by GYANAMA or its licensors and are protected by Indian and international intellectual-property laws. Subject to your compliance with these Terms and payment of applicable fees, GYANAMA grants you a limited, non-exclusive, non-transferable, revocable licence to access and use the Services for the internal educational purposes of your School during the subscription term.
                </p>
                <p>
                  No rights are granted to you by implication, estoppel, or otherwise, beyond the licence expressly stated above.
                </p>
              </TermsSection>

              <TermsSection num={9} id="confidentiality" title="Confidentiality">
                <p>
                  Each party may receive non-public information from the other (&ldquo;Confidential Information&rdquo;), including pricing, technical details, roadmaps, student records, and operational information. Each party will use the other&apos;s Confidential Information only as necessary to perform under these Terms, will protect it with at least the same care as its own confidential information of similar importance (and in any event with reasonable care), and will not disclose it to any third party except on a need-to-know basis under similar confidentiality obligations or as required by law.
                </p>
              </TermsSection>

              <TermsSection num={10} id="privacy" title="Privacy and Data Protection">
                <p>
                  Our handling of personal data is described in our{' '}
                  <a href="/privacy-policy" className="text-amber-800 font-medium hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference. For the purposes of the Digital Personal Data Protection Act, 2023, the School is the Data Fiduciary in respect of student, parent, teacher, and staff personal data processed through the Services, and GYANAMA acts as a Data Processor on the School&apos;s behalf, in accordance with our written agreement with the School.
                </p>
              </TermsSection>

              <TermsSection num={11} id="availability" title="Service Availability and Support">
                <p>
                  We aim to keep the Services available on a 24/7 basis, subject to scheduled maintenance, emergency maintenance, and incidents beyond our reasonable control. We do not guarantee uninterrupted or error-free operation. Any service-level commitments, support response times, or uptime targets, if applicable, are set out in the School&apos;s subscription agreement.
                </p>
              </TermsSection>

              <TermsSection num={12} id="termination" title="Suspension and Termination">
                <p>
                  We may suspend or terminate access to the Services, in whole or in part, with reasonable notice where practicable, if (a) the School fails to pay undisputed fees when due, (b) you or a User breach these Terms in a way that is material or that exposes the Services or other Users to risk, (c) we are required to do so by law or by a competent authority, or (d) the School&apos;s subscription term ends.
                </p>
                <p>
                  On termination, the School&apos;s licence to use the Services ends, and we will retain or delete School Content in accordance with the retention schedule in our Privacy Policy. The School may request an export of its data during a reasonable wind-down period; we will provide such an export in a structured, commonly used format.
                </p>
              </TermsSection>

              <TermsSection num={13} id="disclaimers" title="Disclaimers">
                <p>
                  To the maximum extent permitted by law, the Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, accuracy, non-infringement, and quiet enjoyment. GYANAMA does not warrant that the Services will be uninterrupted, secure, error-free, or that AI outputs will be accurate or suitable for any specific use. Use of the Services is at your own risk.
                </p>
              </TermsSection>

              <TermsSection num={14} id="liability" title="Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, GYANAMA, its affiliates, and its officers, directors, employees, and service providers will not be liable for (a) any indirect, incidental, special, consequential, exemplary, or punitive damages, (b) any loss of profits, revenue, goodwill, data, or business opportunity, however caused, arising out of or in connection with the Services or these Terms. Our aggregate liability for all claims arising out of or related to the Services or these Terms in any twelve-month period will not exceed the fees actually paid by the School to GYANAMA for the Services during that twelve-month period, or, if no fees were paid, ten thousand Indian Rupees (INR 10,000).
                </p>
                <p>
                  Nothing in these Terms excludes or limits liability for fraud, gross negligence, or any other liability that cannot be excluded under applicable Indian law.
                </p>
              </TermsSection>

              <TermsSection num={15} id="indemnity" title="Indemnity">
                <p>
                  The School agrees to indemnify and hold GYANAMA harmless from and against any claims, demands, losses, damages, liabilities, costs, and expenses (including reasonable legal fees) arising out of (a) the School&apos;s or any of its Users&apos; use of the Services in breach of these Terms or applicable law, (b) the School Content, including any claim that it infringes any third-party right or violates any person&apos;s privacy, or (c) the School&apos;s failure to obtain required consents from parents or guardians in respect of student data.
                </p>
              </TermsSection>

              <TermsSection num={16} id="third-party" title="Third-Party Services">
                <p>
                  The Services rely on a number of third-party service providers (including cloud hosting, object storage for files and photos you upload, push-notification, SMS gateways for OTP delivery, telephony for outbound voice calls, and AI-model providers). Their performance is outside our direct control, and your use of the Services is subject to those providers&apos; underlying terms where they apply to you. We will use commercially reasonable efforts to select reputable providers and to manage their performance. The current categories of providers and the data they receive are described in our{' '}
                  <a href="/privacy-policy#sharing" className="text-amber-800 font-medium hover:underline">Privacy Policy &sect; 7</a>.
                </p>
              </TermsSection>

              <TermsSection num={17} id="changes" title="Changes to the Services and to These Terms">
                <p>
                  We may modify, add, or remove features of the Services from time to time to improve performance, security, or functionality. We may also update these Terms. Where changes are material we will give Schools reasonable advance notice through the dashboard or by email. Your continued use of the Services after a change takes effect constitutes acceptance of the updated Terms; if you do not agree, you must stop using the Services.
                </p>
              </TermsSection>

              <TermsSection num={18} id="governing-law" title="Governing Law and Jurisdiction">
                <div className="not-prose flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/40 p-4 mb-2">
                  <Gavel className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 leading-relaxed">
                    These Terms are governed by the laws of India. Subject to any mandatory consumer-protection jurisdiction, the parties submit to the exclusive jurisdiction of the courts at <strong>Gautam Buddh Nagar (Noida), Uttar Pradesh, India</strong>.
                  </p>
                </div>
                <p>
                  These Terms are governed by the laws of India, without regard to its conflict-of-laws principles. Subject to any mandatory jurisdiction of the consumer&apos;s place of residence, the parties submit to the exclusive jurisdiction of the courts at Gautam Buddh Nagar (Noida), Uttar Pradesh, India for any dispute arising out of or in connection with these Terms or the Services.
                </p>
              </TermsSection>

              <TermsSection num={19} id="notices" title="Notices">
                <p>
                  Notices to GYANAMA must be sent in writing to{' '}
                  <a href="mailto:info@gyanama.com" className="text-amber-800 font-medium hover:underline">info@gyanama.com</a>{' '}
                  or to ARCOS Technologies Private Limited, 04, Block C, Sector 63 (near Sector 62 Metro), Noida &mdash; 201309, Uttar Pradesh, India. Notices to a School or User may be sent through the Services, to the email address on file, or to the registered mobile number.
                </p>
              </TermsSection>

              <TermsSection num={20} id="misc" title="Miscellaneous">
                <p>
                  These Terms, together with the subscription agreement (if any) and the Privacy Policy, constitute the entire agreement between the parties on this subject and supersede prior discussions and writings on the same subject. If any provision is held unenforceable, the remaining provisions remain in full force and effect, and the unenforceable provision will be modified to the minimum extent necessary to make it enforceable. No party may assign these Terms without the other&apos;s written consent, except that GYANAMA may assign in connection with a merger, acquisition, or sale of all or substantially all of its assets. A waiver of any breach is not a waiver of any subsequent breach. The headings in these Terms are for convenience only.
                </p>
              </TermsSection>

              <TermsSection num={21} id="contact" title="Contact">
                <p>For questions about these Terms or the Services, please contact:</p>
                <ul className="list-none pl-0 space-y-1 not-prose">
                  <li><strong className="text-slate-900">ARCOS Technologies Private Limited</strong> (operator of GYANAMA)</li>
                  <li>04, Block C, Sector 63 (near Sector 62 Metro), Noida &mdash; 201309, Uttar Pradesh, India</li>
                  <li>
                    Email:{' '}
                    <a href="mailto:info@gyanama.com" className="text-amber-800 font-medium hover:underline">info@gyanama.com</a>
                    {' '}or{' '}
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-amber-800 font-medium hover:underline">{SITE_CONFIG.email}</a>
                  </li>
                  <li>
                    Phone:{' '}
                    <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-amber-800 font-medium hover:underline">{SITE_CONFIG.phone}</a>
                  </li>
                </ul>
              </TermsSection>

              <p className="text-sm text-muted-foreground/60 mt-12 pt-8 border-t border-slate-100">
                Effective Date: {EFFECTIVE_DATE}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfService;
