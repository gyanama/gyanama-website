import { motion, useScroll } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const dashboardSlides = [
    {
        role: 'Principal',
        tagline: 'Your entire school at a glance.',
        description: 'Real-time attendance, instant alerts, complete oversight.',
        image: '/dashboards/IMG_0761.PNG',
    },
    {
        role: 'Teacher',
        tagline: 'Teach more. Manage less.',
        description: 'Classes, homework, attendance — all in one tap.',
        image: '/dashboards/IMG_0762.PNG',
    },
    {
        role: 'Student',
        tagline: 'Your day, organized.',
        description: 'Classes, assignments, grades — never miss a thing.',
        image: '/dashboards/IMG_0763.PNG',
    },
];

// Hook to detect if we should use horizontal layout
function useLayoutMode() {
    const [isWideScreen, setIsWideScreen] = useState(false);

    useEffect(() => {
        const checkLayout = () => {
            // Wide screen = width >= 1024px (laptop and above)
            setIsWideScreen(window.innerWidth >= 1024);
        };

        checkLayout();
        window.addEventListener('resize', checkLayout);
        return () => window.removeEventListener('resize', checkLayout);
    }, []);

    return isWideScreen;
}

export function DashboardSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isWideScreen = useLayoutMode();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Auto-slide effect for mobile only
    useEffect(() => {
        if (isWideScreen) return; // Don't auto-slide on desktop

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % dashboardSlides.length);
        }, 3000); // Slide every 3 seconds

        return () => clearInterval(interval);
    }, [isWideScreen]);

    // Update active index based on scroll (desktop behavior)
    useEffect(() => {
        if (!isWideScreen) return; // Only use scroll on desktop

        const unsubscribe = scrollYProgress.on("change", (value) => {
            const newIndex = Math.min(
                Math.floor(value * dashboardSlides.length * 1.5),
                dashboardSlides.length - 1
            );
            setActiveIndex(Math.max(0, newIndex));
        });
        return () => unsubscribe();
    }, [scrollYProgress, isWideScreen]);

    return (
        <div
            ref={containerRef}
            className="relative gradient-hero"
            style={{ height: '300vh' }} // Scroll space for 3 cards
        >
            {/* Sticky container that locks viewport */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-start overflow-hidden px-4 pt-16 md:pt-20">
                {/* Background continuation */}
                <div className="absolute inset-0 gradient-hero" />

                {/* Glassmorphic decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Large floating glass orb - left */}
                    <motion.div
                        className="absolute -left-20 top-1/3 w-64 h-64 md:w-80 md:h-80 rounded-full"
                        style={{
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.08) 100%)',
                            backdropFilter: 'blur(40px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Large floating glass orb - right */}
                    <motion.div
                        className="absolute -right-16 top-1/2 w-56 h-56 md:w-72 md:h-72 rounded-full"
                        style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                        animate={{
                            y: [0, 15, 0],
                            rotate: [0, -3, 0],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />

                    {/* Small glass card - top left */}
                    <motion.div
                        className="absolute left-[10%] top-[15%] w-20 h-20 md:w-24 md:h-24 rounded-2xl hidden md:block"
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(15px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        }}
                        animate={{
                            y: [0, -15, 0],
                            rotate: [0, 8, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Small glass card - right */}
                    <motion.div
                        className="absolute right-[12%] top-[25%] w-16 h-16 md:w-20 md:h-20 rounded-xl hidden md:block"
                        style={{
                            background: 'rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.35)',
                            boxShadow: '0 6px 24px rgba(59, 130, 246, 0.1)',
                        }}
                        animate={{
                            y: [0, 10, 0],
                            rotate: [0, -5, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                    />

                    {/* Floating glow orbs */}
                    <motion.div
                        className="absolute left-[20%] bottom-[20%] w-32 h-32 rounded-full bg-primary/10 blur-2xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute right-[25%] bottom-[30%] w-40 h-40 rounded-full bg-accent/10 blur-2xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                    />
                </div>

                {/* Content wrapper - vertical on mobile, horizontal on wide screens */}
                <div className={`relative z-20 w-full max-w-7xl mx-auto flex-1 flex ${isWideScreen ? 'flex-row items-center gap-8 px-8' : 'flex-col'}`}>

                    {/* Text section */}
                    <div className={`${isWideScreen ? 'w-[45%] text-left' : 'w-full text-center mb-6 md:mb-10'}`}>
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm md:text-base backdrop-blur-sm">
                                {dashboardSlides[activeIndex].role} Dashboard
                            </span>
                            <p className={`mt-3 font-bold text-foreground ${isWideScreen ? 'text-2xl lg:text-4xl' : 'text-xl md:text-3xl'}`}>
                                {dashboardSlides[activeIndex].tagline}
                            </p>
                            <p className={`mt-2 text-muted-foreground ${isWideScreen ? 'text-base max-w-md' : 'text-sm md:text-base max-w-lg mx-auto px-4'}`}>
                                {dashboardSlides[activeIndex].description}
                            </p>

                            {/* Scroll indicators - show in text section on wide screens */}
                            {isWideScreen && (
                                <>
                                    <div className="flex items-center gap-3 mt-8">
                                        {dashboardSlides.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`transition-all duration-300 rounded-full ${activeIndex === index
                                                    ? 'w-8 h-3 bg-primary'
                                                    : 'w-3 h-3 bg-muted-foreground/30'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <motion.p
                                        className="text-sm text-muted-foreground mt-3"
                                        animate={{ opacity: activeIndex < 2 ? 1 : 0 }}
                                    >
                                        ↓ Scroll to explore all dashboards
                                    </motion.p>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Cards section */}
                    <div className={`relative flex flex-col items-center justify-center ${isWideScreen ? 'w-[55%]' : 'w-full flex-1'}`}>
                        {/* Stacked Cards Container */}
                        <div
                            className="relative flex justify-center items-center mx-auto"
                            style={{
                                height: isWideScreen ? 'clamp(300px, 50vh, 500px)' : '45vh',
                                maxHeight: isWideScreen ? undefined : '450px',
                                minHeight: isWideScreen ? undefined : '300px',
                                perspective: '1000px'
                            }}
                        >
                            {dashboardSlides.map((slide, index) => {
                                const position = index - activeIndex;
                                const isActive = position === 0;
                                const isBehindLeft = position < 0;
                                const isBehindRight = position > 0;

                                // Responsive transforms
                                const translateX = isBehindLeft ? -60 : isBehindRight ? 60 : 0;
                                const translateZ = isActive ? 0 : -80;
                                const rotateY = isBehindLeft ? 12 : isBehindRight ? -12 : 0;
                                const scale = isActive ? 1 : 0.8;
                                const cardOpacity = isActive ? 1 : 0.5;
                                const zIndex = dashboardSlides.length - Math.abs(position);

                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute"
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            zIndex,
                                        }}
                                        animate={{
                                            x: translateX,
                                            z: translateZ,
                                            rotateY,
                                            scale,
                                            opacity: cardOpacity,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                    >
                                        {/* Glass card wrapper */}
                                        <div
                                            className="relative rounded-2xl md:rounded-3xl overflow-hidden"
                                            style={{
                                                width: isWideScreen ? 'clamp(200px, 20vw, 280px)' : 'min(260px, 65vw)',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                boxShadow: isActive
                                                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(59, 130, 246, 0.15)'
                                                    : '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
                                                padding: '8px',
                                            }}
                                        >
                                            <img
                                                src={slide.image}
                                                alt={`${slide.role} Dashboard`}
                                                className="w-full h-auto block rounded-xl md:rounded-2xl"
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Scroll Indicator Dots - only on mobile */}
                        {!isWideScreen && (
                            <div className="flex justify-center gap-2 mt-4 md:mt-6">
                                {dashboardSlides.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-300 rounded-full ${activeIndex === index
                                            ? 'w-6 md:w-8 h-2 md:h-3 bg-primary'
                                            : 'w-2 md:w-3 h-2 md:h-3 bg-muted-foreground/30'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Scroll hint - only on mobile */}
                        {!isWideScreen && (
                            <motion.p
                                className="text-center text-xs md:text-sm text-muted-foreground mt-4"
                                animate={{ opacity: activeIndex < 2 ? 1 : 0 }}
                            >
                                ↓ Scroll to explore all dashboards
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
