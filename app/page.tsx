"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Environment from "@/components/Environment";

export default function Home() {
  const [identityResolved, setIdentityResolved] = useState(false);
  const [currentFragment, setCurrentFragment] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for all scroll-based animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Fragmented name states (before resolution)
  const fragments = [
    "AutoParing",
    "AutoParing projects",
    "A / P",
    "A???",
    "P A solutions",
    "AssHoles"
  ];

  // Cycle through fragments initially
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFragment((prev) => (prev + 1) % fragments.length);
    }, 800);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Resolve identity on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.08 && !identityResolved) {
        setIdentityResolved(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, identityResolved]);

  // Section opacity and position transforms
  const section1Opacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const section1Scale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

  const section2Opacity = useTransform(smoothProgress, [0.15, 0.25, 0.60], [0, 1, 0]);
  const section2Y = useTransform(smoothProgress, [0.15, 0.3], [60, 0]);

  const section3Opacity = useTransform(smoothProgress, [0.4, 0.55, 0.88], [0, 1, 0]);
  const section3Y = useTransform(smoothProgress, [0.4, 0.55], [60, 0]);

  const section4Opacity = useTransform(smoothProgress, [0.65, 0.83], [0, 1]);
  const section4Y = useTransform(smoothProgress, [0.65, 0.8], [60, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Environmental background */}
      <Environment scrollProgress={smoothProgress} />

      {/* Section 1: Night / Opening */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <motion.div
            style={{
              opacity: section1Opacity,
              scale: section1Scale,
            }}
            className="text-center px-6"
          >
            {!identityResolved ? (
              // Fragmented state
              <motion.div
                key={currentFragment}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground/40 tracking-[0.3em] font-mono"
              >
                {fragments[currentFragment]}
              </motion.div>
            ) : (
              // Resolved state
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <motion.h1
                  initial={{ letterSpacing: "0.8em", opacity: 0.3 }}
                  animate={{ letterSpacing: "0.15em", opacity: 1 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-16"
                >
                  AP PROJECTS
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="text-sm md:text-base text-foreground/40 tracking-[0.3em] uppercase"
                >
                  Scroll to wake
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Section 2: Early Morning / Introduction */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <motion.div
          style={{
            opacity: section2Opacity,
            y: section2Y,
          }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-12 leading-tight">
            We build systems
            <br />
            that scale.
          </h2>

          <p className="text-xl md:text-2xl text-foreground/60 font-light max-w-3xl mx-auto leading-relaxed">
            Strategy, technology and execution —
            <br />
            without noise.
          </p>
        </motion.div>
      </section>

      {/* Section 3: Midday / About */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <motion.div
          style={{
            opacity: section3Opacity,
            y: section3Y,
          }}
          className="max-w-4xl mx-auto px-6"
        >
          <div className="space-y-24">
            {/* Who we are */}
            <div className="text-center space-y-6">
              <h3 className="text-sm text-foreground/40 tracking-[0.3em] uppercase mb-8">
                Who we are
              </h3>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                A small studio based in Estonia.
              </p>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                We work ambitiously.
              </p>
            </div>

            {/* What we focus on */}
            <div className="text-center space-y-6">
              <h3 className="text-sm text-foreground/40 tracking-[0.3em] uppercase mb-8">
                What we focus on
              </h3>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                Digital products that matter.
              </p>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                Infrastructure that scales.
              </p>
            </div>

            {/* How we work */}
            <div className="text-center space-y-6">
              <h3 className="text-sm text-foreground/40 tracking-[0.3em] uppercase mb-8">
                How we work
              </h3>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                Clear thinking. Fast execution.
              </p>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                No theatrics. Just results.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 4: Golden Hour / Contact */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <motion.div
          style={{
            opacity: section4Opacity,
            y: section4Y,
          }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-light text-foreground mb-16 leading-tight">
            Let's work together
          </h2>

          <p className="text-xl md:text-2xl text-foreground/70 font-light mb-20 max-w-2xl mx-auto leading-relaxed">
            If you need a partner who understands both strategy and execution.
          </p>

          <div className="space-y-8 mb-24">
            <a
              href="mailto:hello@ap-projects.ee"
              className="block text-2xl md:text-3xl text-foreground hover:text-foreground/70 transition-colors font-light"
            >
              oskarlouiskalev2@gmail.com
            </a>
          </div>

          {/* Minimal footer */}
          <div className="pt-32 mt-32 border-t border-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-foreground/30">
              <p>© 2026 AP PROJECTS</p>
              <p className="tracking-[0.2em]">TALLINN, ESTONIA</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
