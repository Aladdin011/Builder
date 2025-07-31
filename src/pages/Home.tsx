import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PremiumLayout from "@/components/layout/PremiumLayout";
import PremiumNavigation from "@/components/layout/PremiumNavigation";
import PremiumHero from "@/components/sections/home/PremiumHero";
import PremiumServices from "@/components/sections/home/PremiumServices";
import PlatformHub from "@/components/sections/home/PlatformHub";
import PremiumAbout from "@/components/sections/home/PremiumAbout";
import PremiumProjects from "@/components/sections/home/PremiumProjects";
import PremiumTestimonials from "@/components/sections/home/PremiumTestimonials";
import CallToActionSection from "@/components/sections/home/CallToActionSection";
import BlogPreview from "@/components/sections/home/BlogPreview";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { useAppStore, usePerformanceMonitoring } from "@/stores/appStore";
import { usePersonalization, useLeadScoring } from "@/lib/personalization";
import { useAdvancedAnimations } from "@/lib/advancedAnimations";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

// Staggered reveal for sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();

  // Enhanced state management
  const {
    setMousePosition: setStoreMousePosition,
    setScrollProgress,
    trackUserInteraction,
    updateUserActivity
  } = useAppStore();

  // Advanced features
  const { personalization, adaptContent } = usePersonalization();
  const { calculateScore } = useLeadScoring();
  const animations = useAdvancedAnimations();

  // Performance monitoring
  usePerformanceMonitoring();

  // Parallax effect for hero background
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  // Enhanced mouse tracking with analytics
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const position = { x: e.clientX, y: e.clientY };
      setMousePosition(position);
      setStoreMousePosition(position);
    };

    const handleUserActivity = () => {
      updateUserActivity();
    };

    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
      trackUserInteraction('scroll');
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Enhanced page load simulation with performance tracking
    const startTime = performance.now();
    const timer = setTimeout(() => {
      const loadTime = performance.now() - startTime;
      setIsLoading(false);
      trackUserInteraction('page-loaded');

      // Track page load performance
      if (loadTime > 3000) {
        trackUserInteraction('slow-page-load');
      }
    }, 800);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [setStoreMousePosition, setScrollProgress, trackUserInteraction, updateUserActivity]);

  // Loading animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full border-4 border-orange-200 border-t-orange-500 rounded-full" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-slate-800 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            JD Marc Limited
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Building Africa's Future
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <CustomCursor position={mousePosition} />
      <PremiumLayout hideNavigation>
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Premium Hero Section */}
            <motion.section
              id="hero"
              variants={sectionVariants}
              className="relative"
            >
              <PremiumHero />
            </motion.section>

            {/* Premium Services */}
            <motion.section
              id="services"
              variants={sectionVariants}
              className="relative"
            >
              <PremiumServices />
            </motion.section>

            {/* Platform Hub */}
            <motion.section
              id="platform"
              variants={sectionVariants}
              className="relative"
            >
              <PlatformHub />
            </motion.section>

            {/* About Section */}
            <motion.section
              id="about"
              variants={sectionVariants}
              className="relative"
            >
              <PremiumAbout />
            </motion.section>

            {/* Projects Showcase */}
            <motion.section
              id="projects"
              variants={sectionVariants}
              className="relative"
            >
              <PremiumProjects />
            </motion.section>

            {/* Testimonials */}
            <motion.section
              id="testimonials"
              variants={sectionVariants}
              className="relative"
            >
              <PremiumTestimonials />
            </motion.section>

            {/* Blog Preview */}
            <motion.section
              id="blog"
              variants={sectionVariants}
              className="relative py-20 bg-gray-50"
            >
              <BlogPreview />
            </motion.section>

            {/* Call to Action */}
            <motion.section
              id="contact"
              variants={sectionVariants}
              className="relative py-20 bg-gradient-to-br from-gray-900 to-black"
            >
              <CallToActionSection />
            </motion.section>
          </motion.div>
        </motion.div>
      </PremiumLayout>
    </>
  );
}
