import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Shield, Lock, BookOpen, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const EFFECTIVE_DATE = 'May 4, 2026';

const SECTIONS: Array<{ id: string; label: string }> = [
  { id: 'who-we-are', label: '1. Who We Are' },
  { id: 'at-a-glance', label: '2. At a Glance — Data Safety Summary' },
  { id: 'information-we-collect', label: '3. Information We Collect' },
  { id: 'how-we-use', label: '4. How We Use Information' },
  { id: 'ai-features', label: '5. AI Features' },
  { id: 'children', label: "6. Children's Privacy & Families Policy" },
  { id: 'sharing', label: '7. How We Share Information' },
  { id: 'storage-location', label: '8. Data Storage and Location' },
  { id: 'security', label: '9. Data Security' },
  { id: 'incidents', label: '10. Security Incident Response' },
  { id: 'retention', label: '11. Data Retention' },
  { id: 'rights', label: '12. Your Rights Under the DPDP Act' },
  { id: 'account-deletion', label: '13. Account Deletion' },
  { id: 'cookies', label: '14. Cookies and Similar Technologies' },
  { id: 'third-party-links', label: '15. Third-Party Links' },
  { id: 'grievance', label: '16. Grievance Officer and Contact' },
  { id: 'changes', label: '17. Changes to This Policy' },
];

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <SEOHead title="Privacy Policy" />
      <BreadcrumbSchema pageName="Privacy Policy" pagePath="/privacy-policy" />

      {/* Hero — privacy uses a blue/violet badge */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-6">
              <Shield className="w-3.5 h-3.5" /> Privacy &amp; Data Protection
            </div>
            <h1 className="text-display mb-6">Privacy Policy</h1>
            <p className="text-subtitle">
              How GYANAMA collects, uses, stores, shares, and protects information across our website, web dashboard, and Android application.
            </p>
            <p className="text-sm text-muted-foreground/80 mt-4">
              Effective {EFFECTIVE_DATE} &middot; ARCOS Technologies Private Limited &middot; India
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-wide max-w-3xl mx-auto">

          {/* Table of Contents — distinctive blue/violet card */}
          <nav
            aria-label="On this page"
            className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 via-violet-50/40 to-white p-6 mb-12 shadow-sm"
          >
            <div className="flex items-center gap-2 text-blue-900 font-semibold mb-4">
              <BookOpen className="w-4 h-4" /> On this page
            </div>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-slate-700 hover:text-blue-700 hover:underline transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              This Privacy Policy describes how ARCOS Technologies Private Limited, operator of the GYANAMA brand (&ldquo;GYANAMA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), handles personal information when you use the GYANAMA website at{' '}
              <a href="https://gyanama.com/" className="text-primary hover:underline">https://gyanama.com</a>, our school management dashboard, and the &ldquo;Gyanama&rdquo; Android mobile application (collectively, the &ldquo;Services&rdquo;). We are based in India and currently serve schools and users located in India only. By using the Services, you agree to the practices described below.
            </p>

            <h2 id="who-we-are" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">1. Who We Are</h2>
            <p className="text-muted-foreground mb-6">
              GYANAMA is an AI-powered school management platform built for K-12 schools in India. The Services are owned and operated by <strong>ARCOS Technologies Private Limited</strong>, a company incorporated in India with its registered office at 04, Block C, Sector 63 (near Sector 62 Metro), Noida &mdash; 201309, Uttar Pradesh, India. The Services are intended to be used by school administrators, principals, teachers, non-teaching staff, students, and the parents or legal guardians of those students, on behalf of and under the authority of the school that subscribes to GYANAMA.
            </p>
            <p className="text-muted-foreground mb-6">
              Under the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), the subscribing school is the Data Fiduciary for student, parent, teacher, and staff data processed through the Services, and GYANAMA acts as a Data Processor on the school&apos;s behalf in accordance with our agreement with the school. For information you submit directly to GYANAMA through this website (for example, a demo request), GYANAMA is the Data Fiduciary.
            </p>

            {/* At a Glance — visually distinctive panel mapping to Google Play Data Safety categories */}
            <h2 id="at-a-glance" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">2. At a Glance &mdash; Data Safety Summary</h2>
            <p className="text-muted-foreground mb-4">
              The plain-language summary below mirrors the categories that the Google Play &ldquo;Data Safety&rdquo; form asks about. Complete details and qualifications are in the rest of this Policy.
            </p>
            <div className="not-prose grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
                <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">What we DO</div>
                <ul className="text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                  <li>Collect only the data the school needs to run school operations.</li>
                  <li>Encrypt all traffic in transit using HTTPS/TLS.</li>
                  <li>Allow users to request deletion of their data.</li>
                  <li>Restrict access using role-based permissions.</li>
                  <li>Store primary data on servers located in India.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-5">
                <div className="text-xs font-semibold text-rose-700 uppercase tracking-wider mb-2">What we do NOT do</div>
                <ul className="text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                  <li>Sell personal data to anyone.</li>
                  <li>Show third-party advertisements anywhere in the Services.</li>
                  <li>Build advertising or behavioural-tracking profiles of users (including children).</li>
                  <li>Allow our AI sub-processors to train on student data.</li>
                  <li>Collect precise location, contacts, SMS, call logs, or microphone audio from your device.</li>
                </ul>
              </div>
            </div>
            <div className="not-prose rounded-xl border border-slate-200 bg-white p-5 mb-6">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Data we collect, by Google Play category</div>
              <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                <li><strong>Personal info:</strong> name, email, phone number, date of birth, gender, role, school identifiers (employee ID, roll number).</li>
                <li><strong>Photos &amp; videos:</strong> profile pictures and chat / homework attachments that the user explicitly chooses to upload.</li>
                <li><strong>Files &amp; docs:</strong> documents the user explicitly chooses to share or upload (e.g. PDFs in the Quiz feature).</li>
                <li><strong>Messages:</strong> in-app chats, announcements, doubts, and form responses entered by the user.</li>
                <li><strong>App activity:</strong> features used, screens viewed, last-seen presence, audit logs, crash logs.</li>
                <li><strong>App info and performance:</strong> device model, OS version, app version, language, IP address.</li>
                <li><strong>Device or other identifiers:</strong> push-notification token, per-device identifier used to bind the token to your account.</li>
                <li><strong>Audio (AI Voice Assistant only):</strong> audio is streamed to a multimodal AI model during outbound calls placed by the school&apos;s AI School Voice Assistant; raw call audio is not retained after the call ends.</li>
              </ul>
            </div>

            <h2 id="information-we-collect" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">3. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect only the information necessary to operate the Services. The categories below describe what we collect, depending on how you interact with us.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">a. Information you or your school provide</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Demo and contact requests (website):</strong> first name, last name, email address, phone number, school name, approximate number of students, and any message you choose to send.</li>
              <li><strong>School onboarding:</strong> school name, address, principal contact details, school logo (optional), academic configuration (classes, sections, subjects), and the subscription plan.</li>
              <li><strong>Internal administrator accounts (used only by GYANAMA staff and authorised school super-admins on the operations console):</strong> username and a password stored as a one-way salted hash, plus an optional time-based one-time password (TOTP) secret for two-factor authentication.</li>
              <li><strong>App user accounts (Principal, Teacher, Coordinator, Manager, Student):</strong> name, mobile phone number, optional email, gender (Male/Female), date of birth, role, school, role-specific identifiers (employee ID, roll number, class, section, subjects, designation), and an optional profile setup. App users sign in with their mobile number and a one-time password (OTP); the platform does not store an app-user password.</li>
              <li><strong>Student records (entered by the school):</strong> name, date of birth, gender, class and section, roll number, attendance counts, marks and assessments, and parent/guardian information including father&apos;s name, mother&apos;s name, guardian&apos;s name, and their phone numbers and email addresses.</li>
              <li><strong>Communication and academic content:</strong> chat messages, announcements, homework, doubts, calendar events, leave requests, forms and form responses, syllabus entries, and chat attachments (images, videos in MP4/MOV, and documents in PDF / Word / Excel / PowerPoint formats) that users send through the platform.</li>
              <li><strong>Anti-bullying / incident reports:</strong> if a user submits a Report Bullying entry from inside the app, we record the reporter, the name of the alleged bully, the class concerned, and the description of the incident, so that the school administration can review and resolve it.</li>
              <li><strong>Uploaded files:</strong> academic content such as PDFs uploaded to the Quiz feature, attachments shared in chat, announcements, doubts, or homework.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">b. Information collected automatically</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Device and log information:</strong> device model, operating system version, app version, language, timestamps of activity, error and crash logs, and the IP address used to reach our servers.</li>
              <li><strong>Usage data:</strong> features used, screens viewed, authentication events, presence (last-seen) timestamps, and audit-log entries describing actions taken in the platform &mdash; used for security, troubleshooting, and improving the product.</li>
              <li><strong>Push notification identifiers:</strong> a push-notification token generated by the device, used solely to deliver in-app notifications, and a per-device identifier used to bind the token to your account.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              The mobile app does not collect precise location (GPS), contacts, SMS, call logs, microphone audio, or background activity from your device.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">c. Information from optional Android permissions</h3>
            <p className="text-muted-foreground mb-4">The app requests the following permissions only when needed:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>INTERNET:</strong> required for the app to talk to GYANAMA servers.</li>
              <li><strong>POST_NOTIFICATIONS</strong> (Android 13+): used to deliver alerts you have subscribed to (announcements, attendance, homework, fee reminders, chat messages, etc.).</li>
              <li><strong>CAMERA:</strong> used only when you explicitly choose to capture a photo (for example, a profile picture or a chat attachment). The camera is never used in the background.</li>
              <li><strong>READ_MEDIA_IMAGES, READ_MEDIA_VIDEO</strong> (Android 13+): used only when you explicitly pick an image or video from your gallery to attach to a chat or upload to your profile.</li>
              <li><strong>File picker (system):</strong> used only when you explicitly select a document to share through chat or upload as homework, doubt, announcement attachment, or PDF for the Quiz feature.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Each of these permissions can be revoked at any time from your device settings; revoking a permission may disable the corresponding feature.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">d. Information stored on your device</h3>
            <p className="text-muted-foreground mb-6">
              The Android app stores authentication tokens in Android&apos;s encrypted secure storage and keeps an on-device cache of your messages, drafts, and conversations (using a local database) so the app works offline and starts quickly. This data stays on your device and is removed when you sign out or uninstall the app.
            </p>

            <h2 id="how-we-use" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">4. How We Use Information</h2>
            <p className="text-muted-foreground mb-4">We use information for the following purposes only:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>To provide, operate, and maintain the school management features (attendance, marks, exam reports, timetable, calendar, announcements, chat messaging, homework, doubts, leave applications, forms, syllabus, anti-bullying reports, and an in-app AI assistant).</li>
              <li>To authenticate users via mobile-number OTP, secure accounts, prevent fraud, and detect abuse of the Services.</li>
              <li>To deliver in-app and push notifications that the school or user has configured.</li>
              <li>To deliver outbound voice calls from the AI School Voice Assistant for the absentee-call workflow (see Section 5), using the parent&apos;s phone number on record, when the school has enabled the relevant escalation feature.</li>
              <li>To respond to demo requests, sales enquiries, and support tickets.</li>
              <li>To diagnose crashes, fix bugs, and improve performance and reliability.</li>
              <li>To generate aggregated, de-identified analytics that help schools understand their own usage of the platform. We do not build advertising profiles.</li>
              <li>To comply with applicable Indian law and respond to lawful requests from public authorities.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              <strong>We do not sell personal information.</strong> We do not share personal information with third parties for their own advertising or marketing, and we do not display third-party advertisements anywhere in the Services.
            </p>

            <h2 id="ai-features" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">5. AI Features</h2>
            <p className="text-muted-foreground mb-6">
              GYANAMA includes optional AI-powered features. These features are enabled by the subscribing school for its own users.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>AI Quiz / homework generator:</strong> when an authorised user uploads a textbook PDF or chapter, the file (or the relevant portion of it) is sent to a large-language-model service to extract chapters, build a search index, and generate quiz questions. Numeric representations of the text are stored in our infrastructure to power retrieval.</li>
              <li><strong>AI School Voice Assistant:</strong> when the school enables attendance escalation or similar workflows, our system can place an outbound voice call to the parent&apos;s registered phone number. During the call the audio is streamed in real time to a multimodal AI model that understands the audio and generates a spoken reply. We store call metadata (start/end time, status, duration), a text transcript and summary of the conversation, and the alert that triggered the call. We do not retain raw call audio after the call ends unless required by law or for fraud investigation.</li>
              <li><strong>AI helpers in the dashboard</strong> (where present) operate on inputs explicitly submitted by an authorised user for that feature.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              We do not allow our AI sub-processors to use student personal data to train their foundation models. Only the minimum data required for the requested output is sent, and our agreements with these sub-processors restrict them from retaining or training on that data. AI outputs may be incomplete or inaccurate; the school is responsible for reviewing AI-generated content before relying on it or distributing it.
            </p>

            <h2 id="children" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">6. Children&apos;s Privacy &amp; Google Play Families Policy</h2>
            <p className="text-muted-foreground mb-6">
              The Services are intended for use in schools and may include records of children under the age of 18. GYANAMA does not market the Services directly to children, and children do not create accounts on their own. All student accounts are created and administered by the subscribing school.
            </p>
            <p className="text-muted-foreground mb-6">
              In line with the DPDP Act, 2023, processing of a child&apos;s personal data requires verifiable consent of the parent or lawful guardian. By onboarding a school onto GYANAMA, the school confirms to us that it has obtained the necessary consents from parents and guardians at the time of admission to enable a school management system, and that the school has the legal authority to share student information with GYANAMA for that purpose.
            </p>
            <p className="text-muted-foreground mb-4">
              In addition, where the Gyanama Android application is distributed through the Google Play Store and may reach users under the age of 13, GYANAMA commits to compliance with Google Play&apos;s Families Policy and the related Designed for Families requirements. Specifically:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>The app contains no third-party advertisements, no behavioural advertising, and no monetisation that would otherwise be restricted under the Families Policy.</li>
              <li>The app does not include any SDK that the developer has not whitelisted as suitable for child-directed services.</li>
              <li>The app does not collect persistent advertising identifiers (Android Advertising ID) or use them for any purpose.</li>
              <li>The app does not transmit personal information to third parties for advertising or behavioural-profiling purposes.</li>
              <li>The app does not include in-app purchases targeted at children, social-network features that allow strangers to contact a child, or location-based features.</li>
              <li>Where age-restricted features become available, the app applies a neutral age-screen and treats users under the relevant threshold as children for the purposes of this Policy.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              Parents and guardians who wish to review, correct, or request deletion of their child&apos;s data should contact the school directly; the school can act on the request through its GYANAMA administrator console, and we will assist the school as needed. Parents may also contact our Grievance Officer (Section 16) at any time.
            </p>

            <h2 id="sharing" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">7. How We Share Information</h2>
            <p className="text-muted-foreground mb-4">We share personal information only in the following limited circumstances:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Within the school:</strong> Information entered into the Services is visible to authorised users of the same school based on role-based permissions configured by the school administrator (for example, a class teacher sees their class; a parent sees only their own child).</li>
              <li><strong>With service providers</strong> who help us run the Services. Each is bound by confidentiality and data-protection obligations and processes data only on our instructions, strictly for the purposes described below:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Cloud hosting and database services (located in India) for application servers, databases, and backups.</li>
                  <li>Object storage for files you upload, accessed via short-lived signed URLs.</li>
                  <li>Push-notification delivery services for in-app and lock-screen notifications.</li>
                  <li>Telephony services to place outbound voice calls from the AI School Voice Assistant.</li>
                  <li>Artificial-intelligence model services to power the AI Quiz, summarisation, and Voice Assistant features.</li>
                  <li>Website hosting, form processing, scheduling, and bot-protection services for the public marketing site at <a href="https://gyanama.com/" className="text-primary hover:underline">gyanama.com</a>.</li>
                </ul>
              </li>
              <li><strong>For legal reasons:</strong> when required to comply with Indian law, a valid court order, or a lawful request from a competent authority, or to protect the rights, safety, or property of GYANAMA, our users, or the public.</li>
              <li><strong>Business transfers:</strong> in the event of a merger, acquisition, or sale of assets, personal data may be transferred to the successor entity, subject to the same protections described in this Policy. We will notify subscribing schools before any such transfer takes effect.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              We do not share personal information with advertisers, data brokers, or analytics services that build cross-app or cross-site profiles. Subscribing schools may request the current list of named service providers under the terms of their agreement with GYANAMA. We give schools reasonable advance notice when we add or replace a category of service provider that materially affects how their data is processed.
            </p>

            <h2 id="storage-location" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">8. Data Storage and Location</h2>
            <p className="text-muted-foreground mb-6">
              Our primary application servers, databases, and backups are located in India. Some of the service providers referred to in Section 7 (such as the push-notification, object-storage, AI-model, and telephony providers, and the website hosting and form services) operate global infrastructure, so limited operational data may be processed outside India by those providers. Such transfers are governed by each provider&apos;s contractual safeguards and applicable Indian law, and they are limited to the data each provider needs for its specific function. We do not transfer personal data to any country that the Government of India has notified as a restricted jurisdiction under the DPDP Act.
            </p>

            <h2 id="security" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">9. Data Security</h2>
            <p className="text-muted-foreground mb-4">We take reasonable security measures to protect personal data, including:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>HTTPS/TLS encryption for all traffic between the app, the dashboard, and our servers (including a Let&apos;s Encrypt certificate on our API endpoints).</li>
              <li>One-way salted hashing of internal staff passwords using bcrypt; no app-user password is stored at all (sign-in is by mobile-number OTP).</li>
              <li>One-way salted hashing of OTPs in our cache, with an automatic 5-minute expiry.</li>
              <li>Two-factor authentication for the internal operations console.</li>
              <li>Role-based access control inside each school&apos;s tenant, configured by the school administrator.</li>
              <li>Audit logging of administrative actions.</li>
              <li>Rate limiting and CSRF protection on web endpoints; bot-protection on the public marketing forms.</li>
              <li>Short-lived signed URLs for uploaded files, so direct download links are not shareable indefinitely.</li>
              <li>Least-privilege access for our staff, granted only on a need-to-know basis.</li>
              <li>Multi-tenant isolation so one school&apos;s data is not visible to another.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              No method of transmission or storage is perfectly secure; if you believe your account has been compromised, please contact us immediately at{' '}
              <a href="mailto:info@gyanama.com" className="text-primary hover:underline">info@gyanama.com</a>.
            </p>

            <h2 id="incidents" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">10. Security Incident Response</h2>
            <p className="text-muted-foreground mb-6">
              In the unlikely event of a personal-data breach affecting the Services, we will (a) investigate and contain the incident as soon as we become aware of it, (b) notify the Data Protection Board of India and affected schools within the timelines required by the DPDP Act and the rules made under it, and (c) provide schools with the information they need to inform affected individuals. Schools are responsible for cascading such notifications to their own users (parents, students, teachers, staff) where required.
            </p>

            <h2 id="retention" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">11. Data Retention</h2>
            <p className="text-muted-foreground mb-6">
              We retain personal data for as long as the school&apos;s subscription is active and for a reasonable period thereafter to allow the school to export records and to meet our legal, accounting, and audit obligations. When a school terminates its subscription, we delete or anonymise the school&apos;s personal data within 90 days of the end of the contractual wind-down period, except where retention is required by law. AI voice-call audio is not retained after the call ends; transcripts and summaries follow the same retention as the school&apos;s other records. OTPs are stored as one-way hashes in our cache and are automatically removed after 5 minutes. Demo and enquiry leads submitted through the website are retained for up to 24 months and then deleted, unless you become a customer.
            </p>

            <h2 id="rights" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">12. Your Rights Under the DPDP Act</h2>
            <p className="text-muted-foreground mb-4">
              Subject to the DPDP Act, 2023 and other applicable Indian law, you may:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Access the personal data we hold about you and obtain a summary of how it is processed.</li>
              <li>Request correction or updating of inaccurate or incomplete data.</li>
              <li>Request erasure of your personal data, subject to lawful retention obligations.</li>
              <li>Withdraw consent that you have previously given, without affecting the lawfulness of processing carried out before withdrawal.</li>
              <li>Nominate another individual to exercise these rights on your behalf in the event of death or incapacity.</li>
              <li>Lodge a grievance with our Grievance Officer (see Section 16). If your grievance is not resolved, you may approach the Data Protection Board of India.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              If you are a student, parent, teacher, or staff member of a GYANAMA-subscribed school, please first raise these requests with your school. The school has the controls in the GYANAMA administrator console to fulfil most requests directly. We will assist the school where additional support is needed.
            </p>

            <h2 id="account-deletion" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">13. Account Deletion</h2>
            <div className="not-prose rounded-xl border border-blue-100 bg-blue-50/40 p-5 mb-6">
              <div className="flex items-center gap-2 text-blue-900 font-semibold mb-3">
                <Lock className="w-4 h-4" /> How to delete your account and personal data
              </div>
              <ol className="text-sm text-slate-700 space-y-2 list-decimal pl-5">
                <li>If you are a student, parent, teacher, or staff member of a subscribing school: contact your school administrator to deactivate your account or remove your personal data from the school&apos;s GYANAMA tenant. The school can act on the request immediately through its administrator console.</li>
                <li>If you are a school administrator wishing to delete the entire school account, or if your school is unable to act on your request: send an email from the email address on file (or from the registered mobile number for app users) to <a href="mailto:info@gyanama.com" className="text-primary hover:underline">info@gyanama.com</a> with the subject line &ldquo;Account Deletion Request&rdquo;.</li>
                <li>We will verify the identity of the requester and confirm receipt within 7 days, and complete deletion within 30 days, except where retention is required by law (for example, tax or audit records).</li>
                <li>What is deleted: profile information, content you uploaded, communication history, and identifiers we hold about you. What may be retained for up to the period required by law: minimum financial / billing records, tamper-evident audit logs (with personal identifiers redacted where feasible), and content that other users have legitimately preserved (for example, an announcement received by another school user before deletion).</li>
              </ol>
            </div>
            <p className="text-muted-foreground mb-6">
              The web URL of this section, <a href="#account-deletion" className="text-primary hover:underline">https://gyanama.com/privacy-policy#account-deletion</a>, can be used as the &ldquo;Account deletion&rdquo; URL when filling out the Google Play store listing.
            </p>

            <h2 id="cookies" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">14. Cookies and Similar Technologies</h2>
            <p className="text-muted-foreground mb-6">
              Our website and web dashboard use strictly necessary cookies and local storage to keep you signed in, remember preferences, and protect against abuse (including a bot-protection token from our security provider). We do not use third-party advertising cookies or cross-site tracking. The Android application does not use browser cookies; it uses encrypted local secure storage for session tokens and an on-device database for offline data, as described in Section 3(d).
            </p>

            <h2 id="third-party-links" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">15. Third-Party Links</h2>
            <p className="text-muted-foreground mb-6">
              The Services may contain links to third-party websites or services (for example, links shared in chat, links inside an announcement, or links to our scheduling provider on the website). We do not control those websites and are not responsible for their privacy practices. Please review their privacy policies before submitting any personal information to them.
            </p>

            <h2 id="grievance" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">16. Grievance Officer and Contact</h2>
            <p className="text-muted-foreground mb-2">
              If you have questions, concerns, or grievances about this Policy or about how your personal data is handled, please contact our Grievance Officer:
            </p>
            <ul className="list-none pl-0 text-muted-foreground mb-6 space-y-1">
              <li><strong>Mr. Rachit Mittal</strong> &mdash; Grievance Officer (Co-founder &amp; CTO)</li>
              <li>ARCOS Technologies Private Limited</li>
              <li>04, Block C, Sector 63 (near Sector 62 Metro), Noida &mdash; 201309, Uttar Pradesh, India</li>
              <li>
                <Mail className="inline w-4 h-4 mr-1 -mt-0.5" />
                Email:{' '}
                <a href="mailto:info@gyanama.com" className="text-primary hover:underline">
                  info@gyanama.com
                </a>
              </li>
              <li>
                Phone:{' '}
                <a href="tel:+916375869217" className="text-primary hover:underline">
                  +91 63758 69217
                </a>
                {' '}(direct) or{' '}
                <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-primary hover:underline">
                  {SITE_CONFIG.phone}
                </a>
                {' '}(office)
              </li>
            </ul>
            <p className="text-muted-foreground mb-6">
              For general support and account-related questions you can also write to{' '}
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
                {SITE_CONFIG.email}
              </a>. We will acknowledge grievances within a reasonable time and aim to resolve them within the timelines required by the DPDP Act, 2023 and the rules made under it.
            </p>

            <h2 id="changes" className="text-2xl font-semibold mb-4 mt-10 scroll-mt-24">17. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-6">
              We may update this Policy from time to time to reflect changes in our Services, technology, legal requirements, or business practices. When we make material changes, we will update the &ldquo;Effective Date&rdquo; below and, where appropriate, notify subscribing schools through the dashboard or by email. The previous version of this Policy will be archived and made available on request to subscribing schools. Your continued use of the Services after changes take effect constitutes acceptance of the updated Policy.
            </p>

            <p className="text-sm text-muted-foreground/60 mt-12">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;
