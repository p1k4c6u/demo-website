"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BrandTypography() {
  const [currentFragment, setCurrentFragment] = useState(0);
  const [resolved, setResolved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resolvedRef = useRef<HTMLDivElement>(null);

  const fragments = [
    "A_ _R_J_C_S",
    "_P PR_J_ _TS",
    "AP _RO_ _CT_",
    "A_ PRO_EC_S",
    "AP P_OJE_TS",
  ];

  useEffect(() => {
    // Fragment cycling
    const interval = setInterval(() => {
      setCurrentFragment(prev => (prev + 1) % fragments.length);
    }, 700);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Trigger resolution at 15% scroll (600px / 4000px)
      ScrollTrigger.create({
        trigger: ".swamp-scene",
        start: "+=600",
        onEnter: () => setResolved(true),
      });

      // Fade out entire text at 30% scroll
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: ".swamp-scene",
          start: "+=1200",
          end: "+=600",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (resolved && resolvedRef.current) {
      // Letter-spacing animation on resolution
      gsap.fromTo(resolvedRef.current,
        {
          letterSpacing: "0.8em",
          opacity: 0.3,
          scale: 0.95,
        },
        {
          letterSpacing: "0.15em",
          opacity: 1,
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        }
      );
    }
  }, [resolved]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30"
    >
      {!resolved ? (
        /* Fragmented state */
        <div
          key={currentFragment}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground/30 tracking-[0.3em] font-mono animate-pulse"
        >
          {fragments[currentFragment]}
        </div>
      ) : (
        /* Resolved state */
        <div className="text-center">
          <h1
            ref={resolvedRef}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-12"
            style={{ letterSpacing: "0.8em", opacity: 0.3 }}
          >
            AP PROJECTS
          </h1>

          <p className="text-sm md:text-base text-foreground/40 tracking-[0.3em] uppercase animate-fade-in-delayed">
            Scroll to wake
          </p>
        </div>
      )}
    </div>
  );
}
