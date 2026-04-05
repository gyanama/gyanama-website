import { motion } from 'framer-motion';
import { BookOpen, Pencil, School, GraduationCap, Users, Globe, Lightbulb, Calculator } from 'lucide-react';

export function LoadingScreen() {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background md:bg-white/80 md:backdrop-blur-3xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="relative flex items-center justify-center">
                {/* Central Logo */}
                <motion.div
                    className="relative z-20 flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-4">
                        <img
                            src="/v2 transparent.png"
                            alt="GYANAMA Logo"
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                        GYANAMA
                    </h1>
                </motion.div>

                {/* Orbit 1 - Inner - Fast */}
                <motion.div
                    className="absolute z-10 w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full border border-blue-500/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
                        <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-2 rounded-full shadow-lg">
                        <Pencil className="w-5 h-5 text-indigo-500" />
                    </div>
                </motion.div>

                {/* Orbit 2 - Middle - Medium */}
                <motion.div
                    className="absolute z-10 w-[260px] h-[260px] md:w-[420px] md:h-[420px] rounded-full border border-violet-500/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-1/4 left-0 -translate-x-1/2 bg-white p-2.5 rounded-full shadow-lg">
                        <School className="w-6 h-6 text-violet-500" />
                    </div>
                    <div className="absolute bottom-1/4 right-0 translate-x-1/2 bg-white p-2.5 rounded-full shadow-lg">
                        <GraduationCap className="w-6 h-6 text-fuchsia-500" />
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-2.5 rounded-full shadow-lg">
                        <Users className="w-6 h-6 text-purple-500" />
                    </div>
                </motion.div>

                {/* Orbit 3 - Outer - Slow */}
                <motion.div
                    className="absolute z-10 w-[340px] h-[340px] md:w-[580px] md:h-[580px] rounded-full border border-emerald-500/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 bg-white p-3 rounded-full shadow-lg">
                        <Globe className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="absolute top-0 right-1/4 translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="absolute bottom-1/4 right-[10%] translate-x-1/2 bg-white p-3 rounded-full shadow-lg">
                        <Calculator className="w-6 h-6 text-cyan-500" />
                    </div>
                </motion.div>

                {/* Background Radial Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-fuchsia-500/5 rounded-full blur-3xl -z-10 scale-150" />
            </div>

            {/* Loading Text */}
            <motion.p
                className="absolute bottom-10 md:bottom-20 text-muted-foreground text-sm font-medium tracking-wide"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Made for Your School
            </motion.p>
        </motion.div>
    );
}
