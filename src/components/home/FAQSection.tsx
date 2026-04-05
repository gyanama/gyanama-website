import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, CheckCircle2, Phone, Database, Globe, Smartphone, BookOpen, LucideIcon } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
    icon: LucideIcon;
}

const faqs: FAQ[] = [
    {
        question: "Is this CBSE/ICSE compatible?",
        answer: "Yes, 100%. Our platform is designed to adapt to all major boards including CBSE, ICSE, IB, and State Boards with full compliance.",
        icon: BookOpen
    },
    {
        question: "Is training required to use the platform?",
        answer: "No, not at all. configuring GYANAMA is very simple. We've designed it to be intuitive - if you can use WhatsApp, you can use our platform.",
        icon: CheckCircle2
    },
    {
        question: "Does it work on mobile devices?",
        answer: "100% mobile compatible. We have dedicated, native apps for Teachers, Parents, and Admins covering iOS and Android devices seamlessly.",
        icon: Smartphone
    },
    {
        question: "How safe is our data?",
        answer: "Data safety is our top most priority. We employ banking-grade encryption and strict access controls. Your data belongs to you, and we ensure it stays that way.",
        icon: Database
    },
    {
        question: "Do you provide language support?",
        answer: "Yes. GYANAMA is available in multiple regional languages to ensure every staff member and parent feels comfortable using the system.",
        icon: Globe
    },
    {
        question: "Is there customer support available?",
        answer: "Absolutely. We provide dedicated account managers and 24/7 support to help you whenever you need it.",
        icon: Phone
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="section-padding bg-slate-50 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-blue-200 blur-3xl mix-blend-multiply filter" />
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-purple-200 blur-3xl mix-blend-multiply filter" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <AnimatedHeader />

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AnimatedHeader() {
    return (
        <div className="text-center mb-16">
            <motion.h2
                className="text-3xl md:text-5xl font-bold mb-4 text-slate-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Frequently Asked Questions
            </motion.h2>
            <motion.p
                className="text-slate-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
            >
                Everything you need to know about GYANAMA
            </motion.p>
        </div>
    );
}

function FAQItem({ faq, isOpen, onClick, index }: { faq: FAQ, isOpen: boolean, onClick: () => void, index: number }) {
    return (
        <motion.div
            className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-transparent shadow-sm'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <button
                onClick={onClick}
                className="w-full text-left p-6 flex items-center justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        <faq.icon size={20} />
                    </div>
                    <span className={`text-lg font-semibold ${isOpen ? 'text-blue-600' : 'text-slate-900'}`}>{faq.question}</span>
                </div>
                <div className={`p-1 rounded-full border transition-colors ${isOpen ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-200 text-slate-400'}`}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-2 md:pt-0 pl-16 md:pl-[4.5rem] pr-6 md:pr-8 text-slate-600 leading-relaxed text-sm md:text-base">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
