import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, ArrowRight, Calendar, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '@/lib/constants';
import { CalPopupButton } from '@/components/scheduling';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const ContactUs = () => {
    useDocumentTitle('Contact Us');

    return (
        <PageLayout>
            <div className="section-padding min-h-screen flex items-center bg-slate-50 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl mix-blend-multiply" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                                Get in <span className="text-blue-600">Touch</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                We're here to help you transform your school. Reach out to us directly or book a demo to see GYANAMA in action.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">
                            {/* Contact Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">Email Us</p>
                                            <a href={`mailto:${SITE_CONFIG.email}`} className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                                                {SITE_CONFIG.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">Call or Text</p>
                                            <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-lg font-semibold text-slate-900 hover:text-purple-600 transition-colors">
                                                {SITE_CONFIG.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                                            <MessageCircle size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">WhatsApp</p>
                                            <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-slate-900 hover:text-green-600 transition-colors">
                                                {SITE_CONFIG.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 flex-shrink-0">
                                            <Linkedin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500 mb-1">LinkedIn</p>
                                            <a href={SITE_CONFIG.linkedIn} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-slate-900 hover:text-sky-600 transition-colors">
                                                GYANAMA
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Book Demo Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden"
                            >
                                {/* Abstract Shapes */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-xl -ml-5 -mb-5" />

                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Calendar className="text-blue-400" />
                                    Book a Demo
                                </h2>

                                <p className="text-slate-300 mb-8 leading-relaxed">
                                    Understand everything in just <span className="text-white font-bold">15 minutes</span>. See how GYANAMA can work for your specific needs.
                                </p>

                                <div className="flex items-center gap-3 mb-8 text-sm text-slate-400 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <Clock size={16} className="text-blue-400" />
                                    <span>No commitment required. Free consultation.</span>
                                </div>

                                <CalPopupButton
                                  className="w-full bg-blue-600 hover:bg-blue-500 text-white border-none h-14 text-lg"
                                >
                                  Book Now <ArrowRight size={20} className="ml-2" />
                                </CalPopupButton>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default ContactUs;
