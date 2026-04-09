import { useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SITE_CONFIG } from "./lib/constants";

// Lazy load pages for code-splitting to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const AISystems = lazy(() => import("./pages/AISystems"));
const Features = lazy(() => import("./pages/Features"));
const UseCases = lazy(() => import("./pages/UseCases"));
const About = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const BookDemo = lazy(() => import("./pages/BookDemo"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading spinner shown between route transitions
function RouteLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}

// Skip loading screen during prerendering (Playwright sets navigator.webdriver)
const isPrerender = typeof navigator !== 'undefined' && navigator.webdriver;

const App = () => {
  const [isLoading, setIsLoading] = useState(!isPrerender);
  const [pageReady, setPageReady] = useState(isPrerender);
  const [timerDone, setTimerDone] = useState(isPrerender);

  // Remove the HTML loading overlay once React has mounted (LoadingScreen is now visible)
  useEffect(() => {
    document.getElementById('initial-loader')?.remove();
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

  // Initialize Cal.com embed globally for popup buttons
  useEffect(() => {
    if (SITE_CONFIG.isCalConfigured) {
      import("@calcom/embed-react").then(({ getCalApi }) => {
        getCalApi().then((cal) => {
          cal("ui", {
            theme: "light",
            cssVarsPerTheme: {
              light: {
                "cal-brand": "#2563eb",
                "cal-brand-emphasis": "#1d4ed8",
              },
            },
            hideEventTypeDetails: false,
            layout: "month_view",
          });
        });
      });
    }
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
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<RouteLoadingFallback />}>
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
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
