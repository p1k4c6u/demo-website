"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import 3D scene
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
});

export default function Home() {
  const [identityResolved, setIdentityResolved] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Placeholders that cycle before identity is resolved
  const placeholders = ["— — —", "A / P", "A P ?", "...", "A—P"];

  // Cycle through placeholders on initial load
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 1200);

    // Stop cycling after 6 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Resolve identity based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.05 && !identityResolved) {
        setIdentityResolved(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, identityResolved]);

  // Transform values based on scroll
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);
  const identityY = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  const section2Opacity = useTransform(smoothProgress, [0.15, 0.3], [0, 1]);
  const section2Y = useTransform(smoothProgress, [0.15, 0.3], [100, 0]);

  const section3Opacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);
  const section3Y = useTransform(smoothProgress, [0.4, 0.55], [100, 0]);

  const section4Opacity = useTransform(smoothProgress, [0.65, 0.8], [0, 1]);
  const section4Y = useTransform(smoothProgress, [0.65, 0.8], [100, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section - Identity Formation */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* 3D Background - very subtle */}
          <div className="absolute inset-0 z-0 opacity-40">
            <Scene3D />
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background z-10" />

          {/* Identity Formation */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: identityY }}
            className="relative z-20 text-center"
          >
            {!identityResolved ? (
              <motion.div
                key={currentPlaceholder}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-7xl md:text-9xl font-bold text-foreground/40 tracking-wider"
              >
                {placeholders[currentPlaceholder]}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.h1
                  initial={{ letterSpacing: "0.5em", opacity: 0.4 }}
                  animate={{ letterSpacing: "0.05em", opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-7xl md:text-9xl font-bold text-foreground mb-12"
                >
                  AP-group
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-2xl md:text-4xl font-light text-foreground/90 mb-6 max-w-4xl mx-auto px-6"
                >
                  We build systems that scale.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto px-6 mb-12"
                >
                  Strategy, technology and execution for teams that want results — not noise.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.8 }}
                  className="text-sm text-foreground/40 tracking-widest"
                >
                  SCROLL TO CONTINUE
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Section 2: What We Do */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <motion.div
          style={{ opacity: section2Opacity, y: section2Y }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              What we do
            </h2>
            <p className="text-xl text-foreground/50 max-w-2xl mx-auto">
              Three pillars. One focus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-24">
            {[
              {
                title: "Strategy",
                description: "Clear roadmaps. Aligned priorities. No waste.",
              },
              {
                title: "Technology",
                description: "Modern systems. Built to last. Ready to scale.",
              },
              {
                title: "Execution",
                description: "Fast delivery. High quality. Real results.",
              },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-1 h-24 bg-primary mx-auto mb-8" />
                <h3 className="text-3xl font-bold text-foreground mb-6 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-lg text-foreground/60 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section 3: About */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <motion.div
          style={{ opacity: section3Opacity, y: section3Y }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <div className="space-y-8 text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
              <p>We are a small team.</p>
              <p>We work with ambitious companies.</p>
              <p>We build systems that matter.</p>
              <p className="text-foreground/50 text-xl md:text-2xl pt-8">
                No noise. No theatrics. Just clarity and execution.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-20 pt-20 border-t border-foreground/10"
            >
              <p className="text-lg text-foreground/50 italic">
                Per aspera ad astra
              </p>
              <p className="text-sm text-foreground/30 mt-2">
                Through hardship to the stars
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 4: Contact */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <motion.div
          style={{ opacity: section4Opacity, y: section4Y }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-12 tracking-tight">
              Let's talk
            </h2>

            <p className="text-xl text-foreground/60 mb-16 max-w-xl mx-auto">
              If you have a project that requires focus and precision, we should speak.
            </p>

            <div className="space-y-6 mb-16">
              <a
                href="mailto:info@ap-group.com"
                className="block text-2xl md:text-3xl text-primary hover:text-primary-light transition-colors"
              >
                info@ap-group.com
              </a>
              <p className="text-foreground/40">or</p>
              <a
                href="tel:+15551234567"
                className="block text-xl text-foreground/70 hover:text-foreground transition-colors"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-block px-12 py-5 border border-primary text-primary text-lg tracking-wide hover:bg-primary/5 transition-all"
              >
                SEND A MESSAGE
              </Link>
            </motion.div>

            <div className="mt-32 pt-16 border-t border-foreground/10">
              <p className="text-sm text-foreground/30">
                © 2026 AP-group. All rights reserved.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
