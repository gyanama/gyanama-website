import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Phone, Bell, Zap, Shield, ArrowRight, CheckCircle2, GraduationCap, Users, Heart, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/lib/constants';

export function MobileAppSection() {
    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-secondary/5 -skew-y-3 transform origin-top-left scale-110" />

            <div className="container-wide relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <AnimatedSection>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm font-semibold">Mobile First Experience</span>
                            </div>

                            <div className="overflow-hidden mb-6">
                                <motion.h2
                                    className="text-display leading-tight"
                                    initial={{ x: -100, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    viewport={{ once: false }}
                                >
                                    Your School in
                                </motion.h2>
                                <motion.h2
                                    className="text-display leading-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 pb-2"
                                    initial={{ x: 100, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                    viewport={{ once: false }}
                                >
                                    Your Pocket.
                                </motion.h2>
                            </div>

                            <p className="text-subtitle mb-8">
                                Manage your entire institution on the go. Available for Principals, Teachers, Parents, and Students with a seamless native app experience.
                            </p>

                            <div className="space-y-6 mb-10">
                                {[
                                    {
                                        icon: Bell,
                                        title: "Instant Notifications",
                                        desc: "Real-time updates for attendance, homework, and urgent announcements."
                                    },
                                    {
                                        icon: Zap,
                                        title: "One-Tap Actions",
                                        desc: "Mark attendance, approve leave requests, or pay fees in seconds."
                                    },
                                    {
                                        icon: Shield,
                                        title: "Secure & Private",
                                        desc: "Enterprise-grade security ensuring your data stays protected on any device."
                                    }
                                ].map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-secondary/10 flex items-center justify-center shrink-0">
                                            <feature.icon className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                                            <p className="text-muted-foreground text-sm">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Link to="/book-demo">
                                    <Button variant="hero" size="lg" className="group">
                                        Book a Demo to See App
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>

                                {/* Google Play badge */}
                                <a
                                    href={SITE_CONFIG.playStore}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Get GYANAMA on Google Play"
                                    className="inline-flex items-center gap-3 rounded-xl bg-foreground text-background px-5 py-2.5 hover:opacity-90 transition-opacity"
                                >
                                    <Play className="w-6 h-6 fill-current" />
                                    <span className="flex flex-col leading-none text-left">
                                        <span className="text-[10px] uppercase tracking-wider opacity-80">Get it on</span>
                                        <span className="text-lg font-semibold leading-tight">Google Play</span>
                                    </span>
                                </a>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Phone Mockup Area */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/20 to-blue-500/20 rounded-full blur-3xl -z-10" />

                        <AnimatedSection direction="right" className="relative">
                            {/* Phone Frame */}
                            <div className="relative w-full max-w-[300px] md:max-w-[320px] h-[500px] md:h-[640px] bg-gray-900 rounded-[2.5rem] md:rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden mx-auto">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20" />

                                {/* Screen Content */}
                                <div className="w-full h-full bg-slate-50 relative overflow-hidden flex flex-col">
                                    {/* Header */}
                                    <div className="pt-16 pb-6 px-6 bg-white shadow-sm z-10 text-center">
                                        <h3 className="text-xl font-bold text-slate-800">Gyanama App</h3>
                                        <p className="text-sm text-slate-500 mt-1">One app. Every role.</p>
                                    </div>

                                    {/* Role Cards Scroll */}
                                    <div className="flex-1 p-5 space-y-4 overflow-y-auto no-scrollbar">
                                        {/* Principal Card */}
                                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <GraduationCap className="w-24 h-24 text-blue-600" />
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                                                <GraduationCap size={24} />
                                            </div>
                                            <h4 className="font-bold text-slate-800 text-lg">Made for Principals</h4>
                                            <p className="text-sm text-slate-500 mt-1">Complete oversight at your fingertips.</p>
                                        </div>

                                        {/* Teacher Card */}
                                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Users className="w-24 h-24 text-emerald-600" />
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                                                <Users size={24} />
                                            </div>
                                            <h4 className="font-bold text-slate-800 text-lg">Made for Teachers</h4>
                                            <p className="text-sm text-slate-500 mt-1">Attendance & marks in seconds.</p>
                                        </div>

                                        {/* Parents Card */}
                                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                                <Heart className="w-24 h-24 text-amber-600" />
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
                                                <Heart size={24} />
                                            </div>
                                            <h4 className="font-bold text-slate-800 text-lg">Students & Parents</h4>
                                            <p className="text-sm text-slate-500 mt-1">Always connected, always updated.</p>
                                        </div>
                                    </div>

                                    {/* Bottom Indicator */}
                                    <div className="h-6 bg-slate-50 flex justify-center items-center">
                                        <div className="w-32 h-1 bg-slate-300 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
}
