"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FogLayers() {
  const heavyFogRef = useRef<HTMLDivElement>(null);
  const lightFogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heavy fog - drifts up and fades
      if (heavyFogRef.current) {
        gsap.to(heavyFogRef.current, {
          y: -80,
          opacity: 0.4,
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=800",
            end: "+=2000",
            scrub: 1,
          }
        });
      }

      // Light fog - slower drift
      if (lightFogRef.current) {
        gsap.to(lightFogRef.current, {
          y: -50,
          opacity: 0.2,
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=1200",
            end: "+=2400",
            scrub: 1,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Heavy fog layer */}
      <div
        ref={heavyFogRef}
        className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none opacity-90"
        style={{
          background: "linear-gradient(to top, rgba(200, 210, 220, 0.6) 0%, rgba(180, 190, 200, 0.4) 40%, transparent 100%)",
          backdropFilter: "blur(4px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Light fog layer */}
      <div
        ref={lightFogRef}
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none opacity-60"
        style={{
          background: "linear-gradient(to top, rgba(220, 225, 230, 0.4) 0%, rgba(200, 210, 215, 0.2) 50%, transparent 100%)",
          backdropFilter: "blur(2px)",
          willChange: "transform, opacity",
        }}
      />

      {/* Ground fog (always present, subtle) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-30"
        style={{
          background: "linear-gradient(to top, rgba(240, 240, 245, 0.3) 0%, transparent 100%)",
        }}
      />
    </>
  );
}
