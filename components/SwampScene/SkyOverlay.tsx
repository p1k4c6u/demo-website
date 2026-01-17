"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SkyOverlay() {
  const skyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skyRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".swamp-scene",
          start: "top top",
          end: "+=4000",
          scrub: 1,
        }
      });

      // Night → Dawn → Day → Golden Hour
      timeline
        .to(skyRef.current, {
          background: "linear-gradient(to bottom, #1a2a3f 0%, #2a3a4f 50%, #3a4a5f 100%)",
          duration: 0.15,
        }, 0)
        .to(skyRef.current, {
          background: "linear-gradient(to bottom, #4a5f7a 0%, #5a6f8a 50%, #87a7c4 100%)",
          duration: 0.2,
        }, 0.3)
        .to(skyRef.current, {
          background: "linear-gradient(to bottom, #87a7c4 0%, #a7b7d4 50%, #c7d7e4 100%)",
          duration: 0.25,
        }, 0.5)
        .to(skyRef.current, {
          background: "linear-gradient(to bottom, #d4a574 0%, #e4b584 50%, #f4c594 100%)",
          duration: 0.25,
        }, 0.75);
    }, skyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={skyRef}
      className="absolute inset-0 -z-50"
      style={{
        background: "linear-gradient(to bottom, #0a0a0f 0%, #1a1a1f 50%, #2a2a2f 100%)",
      }}
    />
  );
}
