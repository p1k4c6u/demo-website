"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SunGlow() {
  const sunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sunRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(sunRef.current,
        {
          opacity: 0,
          scale: 0.5,
          filter: "blur(80px)",
        },
        {
          opacity: 1,
          scale: 1.2,
          filter: "blur(40px)",
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=600",  // 15% scroll
            end: "+=1200",   // 30% scroll
            scrub: 0.5,
          }
        }
      );

      // Golden hour tint
      gsap.to(sunRef.current, {
        filter: "blur(50px) hue-rotate(20deg) saturate(1.4)",
        scrollTrigger: {
          trigger: ".swamp-scene",
          start: "+=3000",  // 75% scroll
          end: "+=1000",
          scrub: 1,
        }
      });

      // Y position (sun rises)
      gsap.fromTo(sunRef.current,
        { y: "20%" },
        {
          y: "-10%",
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=800",
            end: "+=2000",
            scrub: 1,
          }
        }
      );
    }, sunRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        ref={sunRef}
        className="w-96 h-96 rounded-full opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(255,220,150,0.9) 0%, rgba(255,180,100,0.6) 30%, rgba(255,150,80,0.2) 60%, transparent 100%)",
        }}
      />
      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-orange-200/20 via-pink-200/10 to-transparent opacity-0"
        style={{
          animation: "fadeInGlow 2s ease-out 1s forwards",
        }}
      />
    </div>
  );
}
