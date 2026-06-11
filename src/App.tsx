import { useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SITE_CONFIG } from "./lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load richer pages for code-splitting to reduce initial bundle size.
// Privacy/Terms are imported eagerly because they're small static legal pages
// and we don't want any loading flash when users tap their footer links.
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
const Index = lazy(() => import("./pages/Index"));
const AISystems = lazy(() => import("./pages/AISystems"));
const Features = lazy(() => import("./pages/Features"));
const UseCases = lazy(() => import("./pages/UseCases"));
const About = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const BookDemo = lazy(() => import("./pages/BookDemo"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Skip loading screen during prerendering (Playwright sets navigator.webdriver)
const isPrerender = typeof navigator !== 'undefined' && navigator.webdriver;

const App = () => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(!isPrerender);
  const [pageReady, setPageReady] = useState(isPrerender);
  const [timerDone, setTimerDone] = useState(isPrerender);

  // Remove the HTML loading overlay once React has mounted (LoadingScreen is now visible)
  // Skip during prerendering so the overlay stays in the captured HTML
  useEffect(() => {
    if (!isPrerender) {
      document.getElementById('initial-loader')?.remove();
    }
  }, []);

  useEffect(() => {
    if (isPrerender) return;

    // Preload the Index page during loading screen
    import("./pages/Index").then(() => setPageReady(true));

    // Show loading screen for minimum 1.8 seconds
    const timer = setTimeout(() => {
      setTimerDone(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Only hide loading when BOTH timer is done AND page is ready
  useEffect(() => {
    if (timerDone && pageReady) {
      setIsLoading(false);
    }
  }, [timerDone, pageReady]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* On phones, disable framer-motion transform/scale/rotate animations
              globally. The many infinite floating/orbital loops are the main
              cause of mobile jank; reducedMotion="always" stops them while
              keeping opacity fades. Desktop keeps "user" (respects OS setting). */}
          <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={null}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/ai-systems" element={<AISystems />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/use-cases" element={<UseCases />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/book-demo" element={<BookDemo />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            )}
          </AnimatePresence>
          </MotionConfig>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
