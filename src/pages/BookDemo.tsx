import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Calendar,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  Building,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { SITE_CONFIG } from '@/lib/constants';
import { createRateLimiter } from '@/lib/rate-limit';
import { CalEmbed } from '@/components/scheduling';
import { SEOHead } from '@/components/seo/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

// Client-side rate limiter (defense in depth — server has its own)
const formRateLimiter = createRateLimiter(3, 5 * 60 * 1000);

// Sanitize user input — strip HTML tags, newlines, and SMTP metacharacters
function sanitize(value: FormDataEntryValue | null): string {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/[\r\n]/g, ' ')
    .trim()
    .substring(0, 500);
}

// Basic email format validation (stricter than type="email")
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

// Basic phone format validation
function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(phone);
}

const benefits = [
  'See the AI act on real school data',
  'Tailored to how your school actually runs',
  'Straight answers from the founders',
  'No commitment required',
];

const BookDemo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rate limiting check
    if (!formRateLimiter.canProceed()) {
      toast({
        title: "Too many requests",
        description: "Please wait a few minutes before trying again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Client-side validation (defense in depth — server validates too)
      const email = sanitize(formData.get('email'));
      const phone = sanitize(formData.get('phone'));

      if (!isValidEmail(email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (!isValidPhone(phone)) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid phone number.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send to serverless function (credentials stay server-side)
      const res = await fetch('/api/send-demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: sanitize(formData.get('firstName')),
          lastName: sanitize(formData.get('lastName')),
          email,
          phone,
          school: sanitize(formData.get('school')),
          students: sanitize(formData.get('students')),
          message: sanitize(formData.get('message')) || 'No specific challenges mentioned',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send request');
      }

      formRateLimiter.recordAttempt();
      formRef.current?.reset();
      setIsSubmitted(true);
      toast({
        title: "Demo request received!",
        description: "We'll be in touch within 24 hours to schedule your personalized demo.",
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Submit error:', error);
      }
      const message = error instanceof Error ? error.message : '';
      toast({
        title: "Something went wrong",
        description: message || `Please try again or email us directly at ${SITE_CONFIG.email}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the EmailJS contact form
  const renderContactForm = () => (
    <>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Your demo request has been received. Our team will contact you within 24 hours to schedule your personalized session.
          </p>
        </motion.div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                required
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@school.edu"
                required
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                pattern="^\+?[\d\s\-()]{7,20}$"
                title="Enter a valid phone number (e.g. +91 98765 43210)"
                required
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School Name</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="school"
                name="school"
                placeholder="Enter your school name"
                required
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="students">Approximate Student Count</Label>
            <Input
              id="students"
              name="students"
              type="number"
              min="1"
              max="100000"
              placeholder="e.g., 500"
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">What challenges are you looking to solve?</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your current pain points..."
              rows={4}
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.span
                  className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Submitting...
              </span>
            ) : (
              'Request Demo'
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to our privacy policy. We'll never share your information.
          </p>
        </form>
      )}
    </>
  );

  // Info sidebar content (shared between both layouts)
  const renderInfoSidebar = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">What to expect</h2>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4 text-accent" />
              </div>
              <span className="text-foreground/80">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">15-Minute Demo</h3>
            <p className="text-sm text-muted-foreground">Quick, focused, no fluff</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold">Flexible Scheduling</h3>
            <p className="text-sm text-muted-foreground">Pick a time that works for you</p>
          </div>
        </div>
      </GlassCard>

      <div className="text-sm text-muted-foreground">
        <p className="mb-2">Have questions first?</p>
        <p>
          Email us at{' '}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
            {SITE_CONFIG.email}
          </a>
        </p>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <SEOHead />
      <OrganizationSchema />
      <BreadcrumbSchema pageName="Book a Demo" pagePath="/book-demo" />
      {/* Hero Section */}
      <section className="section-padding gradient-hero relative overflow-hidden">
        <div className="container-wide relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-display mb-6">
              See what Gyanama would{' '}
              <span className="text-gradient-primary">notice in your school.</span>
            </h1>
            <p className="text-subtitle">
              {SITE_CONFIG.isCalConfigured
                ? 'Pick a time — a focused 20-minute demo on real screens: the attendance calling, the health scores, and AI assignment generation.'
                : 'Book a focused 20-minute demo on real screens: the attendance calling, the student and school health scores, and AI assignment generation.'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white -mt-16">
        <div className="container-wide">
          {SITE_CONFIG.isCalConfigured ? (
            /* ---- Cal.com Scheduling Layout (direct — Cal.com collects name/email) ---- */
            <div className="max-w-6xl mx-auto">
              <AnimatedSection direction="up">
                <GlassCard className="p-4 md:p-6 mb-12">
                  <div className="min-h-[600px]">
                    <CalEmbed />
                  </div>
                </GlassCard>
              </AnimatedSection>

              <div className="grid lg:grid-cols-2 gap-12">
                <AnimatedSection direction="left">
                  {renderInfoSidebar()}
                </AnimatedSection>

                <AnimatedSection direction="right">
                  <GlassCard className="p-6 md:p-8">
                    <button
                      type="button"
                      onClick={() => setShowForm(!showForm)}
                      className="w-full flex items-center justify-between text-left group"
                      aria-expanded={showForm}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Prefer to send a message?</h3>
                          <p className="text-sm text-muted-foreground">Fill out a quick form instead</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${showForm ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {showForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-border/50"
                      >
                        {renderContactForm()}
                      </motion.div>
                    )}
                  </GlassCard>
                </AnimatedSection>
              </div>
            </div>
          ) : (
            /* ---- Fallback: Original EmailJS Form Layout ---- */
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <AnimatedSection direction="left">
                <GlassCard className="p-8 md:p-10">
                  {renderContactForm()}
                </GlassCard>
              </AnimatedSection>

              <AnimatedSection direction="right" className="lg:pt-12">
                {renderInfoSidebar()}
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default BookDemo;
