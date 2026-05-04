import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';

const EFFECTIVE_DATE = 'May 4, 2026';

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <SEOHead title="Privacy Policy" />
      <BreadcrumbSchema pageName="Privacy Policy" pagePath="/privacy-policy" />
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-display mb-6">Privacy Policy</h1>
            <p className="text-subtitle">
              How GYANAMA collects, uses, stores, shares, and protects information across our website, web dashboard, and Android application.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              This Privacy Policy describes how ARCOS Technologies Private Limited, operator of the GYANAMA brand (&ldquo;GYANAMA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), handles personal information when you use the GYANAMA website at{' '}
              <a href="https://gyanama.com/" className="text-primary hover:underline">https://gyanama.com</a>, our school management dashboard, and the &ldquo;Gyanama&rdquo; Android mobile application (collectively, the &ldquo;Services&rdquo;). We are based in India and currently serve schools and users located in India only. By using the Services, you agree to the practices described below.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">1. Who We Are</h2>
            <p className="text-muted-foreground mb-6">
              GYANAMA is an AI-powered school management platform built for K-12 schools in India. The Services are owned and operated by <strong>ARCOS Technologies Private Limited</strong>, a company incorporated in India with its registered office at 04, Block C, Sector 63 (near Sector 62 Metro), Noida &mdash; 201309, Uttar Pradesh, India. The Services are intended to be used by school administrators, principals, teachers, non-teaching staff, students, and the parents or legal guardians of those students, on behalf of and under the authority of the school that subscribes to GYANAMA.
            </p>
            <p className="text-muted-foreground mb-6">
              Under the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), the subscribing school is the Data Fiduciary for student, parent, teacher, and staff data processed through the Services, and GYANAMA acts as a Data Processor on the school&apos;s behalf in accordance with our agreement with the school. For information you submit directly to GYANAMA through this website (for example, a demo request), GYANAMA is the Data Fiduciary.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect only the information necessary to operate the Services. The categories below describe what we collect, depending on how you interact with us.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">a. Information you or your school provide</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Demo and contact requests (website):</strong> first name, last name, email address, phone number, school name, approximate number of students, and any message you choose to send.</li>
              <li><strong>School onboarding:</strong> school name, address, principal contact details, school logo (optional), academic configuration (classes, sections, subjects), and the subscription plan.</li>
              <li><strong>Internal administrator accounts (used only by GYANAMA staff and authorised school super-admins on the operations console):</strong> username and a password stored as a bcrypt hash, plus an optional time-based one-time password (TOTP) secret for two-factor authentication.</li>
              <li><strong>App user accounts (Principal, Teacher, Coordinator, Manager, Student):</strong> name, mobile phone number, optional email, gender (Male/Female), date of birth, role, school, role-specific identifiers (employee ID, roll number, class, section, subjects, designation), and an optional profile setup. App users sign in with their mobile number and a one-time password (OTP); the platform does not store an app-user password.</li>
              <li><strong>Student records (entered by the school):</strong> name, date of birth, gender, class and section, roll number, attendance counts, marks and assessments, and parent/guardian information including father&apos;s name, mother&apos;s name, guardian&apos;s name, and their phone numbers and email addresses.</li>
              <li><strong>Communication content:</strong> messages, announcements, homework, doubts, calendar events, leave requests, forms and form responses, and chat attachments (images, documents, videos, voice notes) that users send through the platform.</li>
              <li><strong>Uploaded files:</strong> academic content such as PDFs uploaded to the Quiz/AI features, attachments shared in chat, announcements, doubts, or homework.</li>
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

            <h2 className="text-2xl font-semibold mb-4 mt-10">3. How We Use Information</h2>
            <p className="text-muted-foreground mb-4">We use information for the following purposes only:</p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>To provide, operate, and maintain the school management features (attendance, marks, exams, fees, timetable, calendar, communication, homework, doubts, forms, leaves, transport, and similar modules).</li>
              <li>To authenticate users via mobile-number OTP, secure accounts, prevent fraud, and detect abuse of the Services.</li>
              <li>To deliver in-app and push notifications that the school or user has configured.</li>
              <li>To deliver outbound voice calls from the AI School Assistant (see Section 4) using the parent&apos;s phone number on record, when the school has enabled the relevant escalation feature.</li>
              <li>To respond to demo requests, sales enquiries, and support tickets.</li>
              <li>To diagnose crashes, fix bugs, and improve performance and reliability.</li>
              <li>To generate aggregated, de-identified analytics that help schools understand their own usage of the platform. We do not build advertising profiles.</li>
              <li>To comply with applicable Indian law and respond to lawful requests from public authorities.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              <strong>We do not sell personal information.</strong> We do not share personal information with third parties for their own advertising or marketing, and we do not display third-party advertisements anywhere in the Services.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">4. AI Features</h2>
            <p className="text-muted-foreground mb-6">
              GYANAMA includes optional AI-powered features. These features are enabled by the subscribing school for its own users.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>AI Quiz / homework generator:</strong> when an authorised user uploads a textbook PDF or chapter, the file (or the relevant portion of it) is sent to a large-language-model service to extract chapters, build a search index, and generate quiz questions. Numeric representations of the text are stored in our infrastructure to power retrieval.</li>
              <li><strong>AI School Voice Assistant:</strong> when the school enables attendance escalation or similar workflows, our system can place an outbound voice call to the parent&apos;s registered phone number. During the call the audio is streamed in real time to a multimodal AI model that understands the audio and generates a spoken reply. We store call metadata (start/end time, status, duration), a text transcript and summary of the conversation, and the alert that triggered the call. We do not retain raw call audio after the call ends unless required by law or for fraud investigation.</li>
              <li><strong>AI helpers in the dashboard</strong> (where present) operate on inputs explicitly submitted by an authorised user for that feature.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              We do not allow our AI sub-processors to use student personal data to train their foundation models. Only the minimum data required for the requested output is sent, and our agreements with these sub-processors restrict them from retaining or training on that data.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">5. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground mb-6">
              The Services are intended for use in schools and may include records of children under the age of 18. GYANAMA does not market the Services directly to children, and children do not create accounts on their own. All student accounts are created and administered by the subscribing school.
            </p>
            <p className="text-muted-foreground mb-6">
              In line with the DPDP Act, 2023, processing of a child&apos;s personal data requires verifiable consent of the parent or lawful guardian. By onboarding a school onto GYANAMA, the school confirms to us that it has obtained the necessary consents from parents and guardians at the time of admission to enable a school management system, and that the school has the legal authority to share student information with GYANAMA for that purpose.
            </p>
            <p className="text-muted-foreground mb-6">
              We do not engage in tracking, behavioural advertising, or profiling of children. Parents and guardians who wish to review, correct, or request deletion of their child&apos;s data should contact the school directly; the school can act on the request through its GYANAMA administrator console, and we will assist the school as needed.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">6. How We Share Information</h2>
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
              We do not share personal information with advertisers, data brokers, or analytics services that build cross-app or cross-site profiles. Subscribing schools may request the current list of named service providers under the terms of their agreement with GYANAMA.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">7. Data Storage and Location</h2>
            <p className="text-muted-foreground mb-6">
              Our primary application servers, databases, and backups are located in India. Some of the service providers referred to in Section 6 (such as the push-notification, object-storage, AI-model, and telephony providers, and the website hosting and form services) operate global infrastructure, so limited operational data may be processed outside India by those providers. Such transfers are governed by each provider&apos;s contractual safeguards and applicable Indian law, and they are limited to the data each provider needs for its specific function.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">8. Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We take reasonable security measures to protect personal data, including encryption in transit, encryption at rest for backups, role-based access control, two-factor authentication for our internal operations console, audit logging of administrative actions, rate limiting and abuse protection on web endpoints, mobile-number OTP verification for app sign-in, and least-privilege access for our staff. Internal staff passwords are stored only as one-way salted hashes; app users sign in with a mobile-number one-time password (OTP) and the platform does not store an app-user password. No method of transmission or storage is perfectly secure; if you believe your account has been compromised, please contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">9. Data Retention</h2>
            <p className="text-muted-foreground mb-6">
              We retain personal data for as long as the school&apos;s subscription is active and for a reasonable period thereafter to allow the school to export records and to meet our legal, accounting, and audit obligations. When a school terminates its subscription, we delete or anonymise the school&apos;s personal data within 90 days of the end of the contractual wind-down period, except where retention is required by law. AI voice-call audio is not retained after the call ends; transcripts and summaries follow the same retention as the school&apos;s other records. OTPs are stored only in encrypted cache for the 5 minutes they are valid. Demo and enquiry leads submitted through the website are retained for up to 24 months and then deleted, unless you become a customer.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">10. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              Subject to the DPDP Act, 2023 and other applicable Indian law, you may:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Access the personal data we hold about you and obtain a summary of how it is processed.</li>
              <li>Request correction or updating of inaccurate or incomplete data.</li>
              <li>Request erasure of your personal data, subject to lawful retention obligations.</li>
              <li>Withdraw consent that you have previously given, without affecting the lawfulness of processing carried out before withdrawal.</li>
              <li>Nominate another individual to exercise these rights on your behalf in the event of death or incapacity.</li>
              <li>Lodge a grievance with our Grievance Officer (see Section 13). If your grievance is not resolved, you may approach the Data Protection Board of India.</li>
            </ul>
            <p className="text-muted-foreground mb-6">
              If you are a student, parent, teacher, or staff member of a GYANAMA-subscribed school, please first raise these requests with your school. The school has the controls in the GYANAMA administrator console to fulfil most requests directly. We will assist the school where additional support is needed.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">11. Account Deletion</h2>
            <p className="text-muted-foreground mb-6">
              Individual accounts in the GYANAMA app are managed by the subscribing school; please contact your school administrator to deactivate or remove an account. To request deletion of an entire school account or your personal information held by GYANAMA directly, email{' '}
              <a href="mailto:info@gyanama.com" className="text-primary hover:underline">
                info@gyanama.com
              </a>{' '}
              from the email address on file (or from the registered mobile number for app users). We will verify the request and complete deletion within 30 days, except where retention is required by law.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">12. Cookies and Similar Technologies</h2>
            <p className="text-muted-foreground mb-6">
              Our website and web dashboard use strictly necessary cookies and local storage to keep you signed in, remember preferences, and protect against abuse (including a bot-protection token from our security provider). We do not use third-party advertising cookies or cross-site tracking. The Android application does not use browser cookies; it uses encrypted local secure storage for session tokens and an on-device database for offline data, as described in Section 2(d).
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-10">13. Grievance Officer and Contact</h2>
            <p className="text-muted-foreground mb-2">
              If you have questions, concerns, or grievances about this Policy or about how your personal data is handled, please contact our Grievance Officer:
            </p>
            <ul className="list-none pl-0 text-muted-foreground mb-6 space-y-1">
              <li><strong>Mr. Rachit Mittal</strong> &mdash; Grievance Officer (Co-founder &amp; CTO)</li>
              <li>ARCOS Technologies Private Limited</li>
              <li>04, Block C, Sector 63 (near Sector 62 Metro), Noida &mdash; 201309, Uttar Pradesh, India</li>
              <li>
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

            <h2 className="text-2xl font-semibold mb-4 mt-10">14. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-6">
              We may update this Policy from time to time to reflect changes in our Services, technology, legal requirements, or business practices. When we make material changes, we will update the &ldquo;Effective Date&rdquo; below and, where appropriate, notify subscribing schools through the dashboard or by email. Your continued use of the Services after changes take effect constitutes acceptance of the updated Policy.
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
