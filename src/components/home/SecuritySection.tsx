import { motion } from 'framer-motion';
import { Shield, Lock, Server, FileKey, CheckCircle } from 'lucide-react';

export function SecuritySection() {
    const securityFeatures = [
        {
            icon: Lock,
            title: "End-to-End Encryption",
            description: "Your data is encrypted in transit and at rest. Only you have access."
        },
        {
            icon: Server,
            title: "Secure Cloud Infrastructure",
            description: "Hosted on world-class servers with 99.9% uptime guarantee."
        },
        {
            icon: FileKey,
            title: "Role-Based Access",
            description: "Granular control over who sees what. Keep sensitive data private."
        },
        {
            icon: Shield,
            title: "Regular Audits",
            description: "We undergo frequent security audits to ensure maximum protection."
        }
    ];

    return (
        <section className="section-padding relative overflow-hidden bg-slate-900 text-white">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-20 text-blue-500/20"
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Shield size={120} />
                </motion.div>
                <motion.div
                    className="absolute bottom-20 left-20 text-emerald-500/20"
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Lock size={100} />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4 border border-emerald-500/20">
                        Ironclad Security
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Your Data Safety is Our <span className="text-emerald-400">Top Priority</span>.
                    </h2>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        We use bank-grade security protocols to ensure your school's data remains private, protected, and accessible only to you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {securityFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center mb-4 text-white shadow-lg shadow-blue-500/20">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
