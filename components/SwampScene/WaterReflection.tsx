"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function WaterReflection() {
  const waterRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const landRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Water surface - parallax
      if (waterRef.current) {
        gsap.to(waterRef.current, {
          y: -420,
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "top top",
            end: "+=4000",
            scrub: 0.5,
          }
        });
      }

      // Reflections fade in and enhance
      if (reflectionRef.current) {
        gsap.fromTo(reflectionRef.current,
          {
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            opacity: 0.8,
            filter: "blur(2px)",
            scrollTrigger: {
              trigger: ".swamp-scene",
              start: "+=1200",
              end: "+=2000",
              scrub: 1,
            }
          }
        );

        // Golden hour enhancement
        gsap.to(reflectionRef.current, {
          opacity: 0.9,
          filter: "blur(1px) saturate(1.3) hue-rotate(10deg)",
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=3000",
            end: "+=1000",
            scrub: 1,
          }
        });
      }

      // Land silhouettes
      if (landRef.current) {
        gsap.to(landRef.current, {
          y: -500,
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "top top",
            end: "+=4000",
            scrub: 0.5,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Water surface */}
      <div
        ref={waterRef}
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: "linear-gradient(to bottom, rgba(60, 80, 100, 0.3) 0%, rgba(40, 60, 80, 0.5) 50%, rgba(20, 40, 60, 0.7) 100%)",
          willChange: "transform",
        }}
      />

      {/* Tree reflections */}
      <div
        ref={reflectionRef}
        className="absolute bottom-0 left-0 right-0 h-56 opacity-0"
        style={{ willChange: "transform, opacity, filter" }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
          {/* Inverted tree reflections (mirrored) */}
          <path d="M200,20 L175,120 L185,120 L200,220 L215,120 L225,120 L200,20 Z" fill="rgba(0,0,0,0.3)" />
          <path d="M450,20 L420,140 L435,140 L450,240 L465,140 L480,140 L450,20 Z" fill="rgba(0,0,0,0.25)" />
          <path d="M750,20 L725,110 L737,110 L750,210 L763,110 L775,110 L750,20 Z" fill="rgba(0,0,0,0.3)" />
          <path d="M1000,20 L978,125 L989,125 L1000,225 L1011,125 L1022,125 L1000,20 Z" fill="rgba(0,0,0,0.28)" />
          {/* Ripple effect */}
          <path d="M0,150 Q300,155 600,150 T1200,150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M0,180 Q300,175 600,180 T1200,180" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Land silhouettes */}
      <div
        ref={landRef}
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ willChange: "transform" }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          {/* Dark land masses */}
          <path d="M0,100 Q200,80 400,100 L400,200 L0,200 Z" fill="#000" />
          <path d="M500,120 Q650,95 800,120 L800,200 L500,200 Z" fill="#000" />
          <path d="M900,110 Q1000,90 1100,110 L1200,110 L1200,200 L900,200 Z" fill="#000" />
          {/* Grass details */}
          <path d="M150,100 L155,90 L160,100 M300,95 L305,85 L310,95 M600,115 L605,105 L610,115 M950,108 L955,98 L960,108"
                stroke="#000" strokeWidth="2" fill="none" opacity="0.8" />
        </svg>
      </div>
    </>
  );
}
