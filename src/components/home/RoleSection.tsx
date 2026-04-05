import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GraduationCap, Users, BookOpen, ClipboardList, Bus, Shield, Sparkles } from 'lucide-react';

const roles = [
    {
        icon: GraduationCap,
        title: 'Principals',
        tagline: 'Lead with clarity',
        color: 'text-blue-600',
        bgColor: 'bg-blue-500',
    },
    {
        icon: Users,
        title: 'Teachers',
        tagline: 'Focus on teaching',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-500',
    },
    {
        icon: BookOpen,
        title: 'Parents',
        tagline: 'Stay connected',
        color: 'text-amber-600',
        bgColor: 'bg-amber-500',
    },
    {
        icon: ClipboardList,
        title: 'Administrators',
        tagline: 'Simplify operations',
        color: 'text-violet-600',
        bgColor: 'bg-violet-500',
    },
    {
        icon: Bus,
        title: 'Transport Teams',
        tagline: 'Track with ease',
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-500',
    },
    {
        icon: Shield,
        title: 'Management',
        tagline: 'Oversee everything',
        color: 'text-rose-600',
        bgColor: 'bg-rose-500',
    },
];

export function RoleSection() {
    return (
        <section className="section-padding relative overflow-hidden" style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 30%, #e0f2fe 70%, #f0fdf4 100%)'
        }}>
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Central glowing orb */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Solar System of Books - Orbiting clockwise */}
                {/* Inner Orbit - 3 books, fast */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: 'min(350px, 80vw)', height: 'min(350px, 80vw)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                        <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-500/40" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-emerald-500/35" />
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 p-2.5 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                        <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-violet-500/40" />
                    </div>
                </motion.div>

                {/* Middle Orbit - 3 books, medium speed */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: 'min(500px, 95vw)', height: 'min(400px, 75vw)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 right-[20%] p-3 md:p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25">
                        <BookOpen className="w-7 h-7 md:w-9 md:h-9 text-amber-500/35" />
                    </div>
                    <div className="absolute bottom-0 left-[25%] p-3 md:p-4 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25">
                        <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-cyan-500/35" />
                    </div>
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25">
                        <BookOpen className="w-7 h-7 md:w-9 md:h-9 text-rose-500/35" />
                    </div>
                </motion.div>

                {/* Outer Orbit - 2 books, slow */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: 'min(700px, 100vw)', height: 'min(500px, 90vw)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-[30%] p-3 md:p-5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-indigo-500/30" />
                    </div>
                    <div className="absolute bottom-0 right-[35%] p-4 md:p-5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                        <BookOpen className="w-9 h-9 md:w-12 md:h-12 text-teal-500/30" />
                    </div>
                </motion.div>

                {/* Sparkles */}
                <motion.div
                    className="absolute top-[20%] left-[15%] p-2 rounded-lg bg-white/40 backdrop-blur-sm"
                    animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-400/80" />
                </motion.div>
                <motion.div
                    className="absolute top-[25%] right-[12%] p-2 rounded-lg bg-white/40 backdrop-blur-sm"
                    animate={{ y: [0, 6, 0], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-violet-400/80" />
                </motion.div>
                <motion.div
                    className="absolute bottom-[20%] right-[18%] p-2 rounded-lg bg-white/40 backdrop-blur-sm"
                    animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-emerald-400/80" />
                </motion.div>
            </div>

            <div className="container-wide relative z-10">
                {/* Title */}
                <AnimatedSection className="text-center mb-12 md:mb-16">
                    <motion.h2
                        className="text-headline mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Built for{' '}
                        <span className="text-gradient-primary">Every Role</span>
                        {' '}in Your School
                    </motion.h2>
                    <motion.p
                        className="text-subtitle max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        One platform. Everyone connected.
                    </motion.p>
                </AnimatedSection>

                {/* Roles - Horizontal scroll on mobile, centered on desktop */}
                <div className="relative">
                    {/* Desktop: Circular/Arc layout */}
                    <div className="hidden md:flex justify-center items-center gap-8 lg:gap-12 flex-wrap max-w-4xl mx-auto">
                        {roles.map((role, index) => (
                            <motion.div
                                key={role.title}
                                className="flex flex-col items-center group cursor-pointer"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {/* Icon with pulse ring */}
                                <div className="relative mb-4">
                                    {/* Pulse ring on hover */}
                                    <motion.div
                                        className={`absolute inset-0 rounded-full ${role.bgColor}/20`}
                                        initial={{ scale: 1, opacity: 0 }}
                                        whileHover={{ scale: 1.5, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <motion.div
                                        className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full ${role.bgColor} flex items-center justify-center shadow-lg`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{
                                            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                                            scale: { type: "spring", stiffness: 300 },
                                        }}
                                    >
                                        <role.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                                    </motion.div>
                                </div>

                                {/* Title */}
                                <motion.h3
                                    className={`text-lg lg:text-xl font-semibold ${role.color} mb-1`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {role.title}
                                </motion.h3>

                                {/* Tagline - appears on hover with line animation */}
                                <motion.div
                                    className="overflow-hidden"
                                    initial={{ height: 0, opacity: 0 }}
                                    whileHover={{ height: 'auto', opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-sm text-slate-500 whitespace-nowrap">{role.tagline}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile: Horizontal scroll with snap */}
                    <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        <div className="flex gap-6 min-w-max">
                            {roles.map((role, index) => (
                                <motion.div
                                    key={role.title}
                                    className="flex flex-col items-center"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                >
                                    {/* Icon */}
                                    <motion.div
                                        className={`w-14 h-14 rounded-full ${role.bgColor} flex items-center justify-center shadow-lg mb-3`}
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }}
                                    >
                                        <role.icon className="w-7 h-7 text-white" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className={`text-base font-semibold ${role.color} mb-0.5`}>{role.title}</h3>

                                    {/* Tagline - always visible on mobile */}
                                    <p className="text-xs text-slate-500">{role.tagline}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll hint for mobile */}
                    <motion.div
                        className="md:hidden text-center mt-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <p className="text-xs text-slate-400">← Swipe to see all →</p>
                    </motion.div>
                </div>

                {/* Connecting line animation - desktop only */}
                <div className="hidden md:block mt-12">
                    <motion.div
                        className="h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent max-w-md mx-auto"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                    />
                    <motion.p
                        className="text-center text-sm text-slate-500 mt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        viewport={{ once: true }}
                    >
                        All working together, seamlessly
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
