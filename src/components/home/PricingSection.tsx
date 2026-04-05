import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { CalPopupButton } from '@/components/scheduling';

export function PricingSection() {
    return (
        <section className="section-padding relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f0fdf4 50%, #fefce8 75%, #fdf4ff 100%)'
        }}>
            {/* Themed floating decorations matching WhySection */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 -right-20 w-64 h-64 md:w-80 md:h-80 rounded-full"
                    style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 51, 234, 0.08) 100%)',
                        backdropFilter: 'blur(40px)',
                    }}
                    animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-blue-200 blur-3xl mix-blend-multiply filter opacity-40"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                        Plans that fit your school.
                    </h2>
                    <p className="text-lg text-slate-600 mb-10">
                        Choose the perfect plan for your institution. No hidden fees, just value.
                    </p>

                    <div className="relative">
                        <div className="bg-white/60 backdrop-blur-xl rounded-[24px] p-8 md:p-12 border border-white/50 shadow-2xl relative z-10">
                            <div className="flex flex-col text-center items-center justify-center gap-8">
                                <div className="w-full">
                                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                                        3 Flexible Options
                                    </h3>

                                    <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 backdrop-blur-sm">
                                        <span className="text-sm font-semibold">Pricing is as low as 0.1% of a student fee</span>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                                        <span className="px-6 py-2 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50 text-sm font-bold tracking-wide shadow-sm hover:bg-blue-100 transition-colors cursor-default">
                                            ASSIST
                                        </span>
                                        <span className="px-6 py-2 rounded-full bg-violet-50 text-violet-600 border border-violet-100/50 text-sm font-bold tracking-wide shadow-sm hover:bg-violet-100 transition-colors cursor-default">
                                            AUTOMATE
                                        </span>
                                        <span className="px-6 py-2 rounded-full bg-teal-50 text-teal-600 border border-teal-100/50 text-sm font-bold tracking-wide shadow-sm hover:bg-teal-100 transition-colors cursor-default">
                                            AUTONOMY
                                        </span>
                                    </div>

                                    <p className="text-slate-600 max-w-lg mx-auto font-medium">
                                        Three distinct tiers designed to match your school's evolution.
                                    </p>
                                </div>

                                <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />

                                <div className="w-full max-w-md">
                                    <p className="text-slate-500 mb-6 text-sm font-medium">
                                        Find the one that fits your vision.
                                    </p>
                                    <CalPopupButton className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-slate-900/10 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group">
                                        <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
                                        Book a Demo to Compare
                                    </CalPopupButton>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow Effect - Behind Card */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 blur-3xl opacity-50 -z-10 rounded-full" />
                    </div>
                    <p className="mt-6 text-sm text-slate-400">
                        Not sure which plan is right for you? Our team will help you decide.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
