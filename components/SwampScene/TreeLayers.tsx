"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TreeLayers() {
  const farTreesRef = useRef<HTMLDivElement>(null);
  const midTreesRef = useRef<HTMLDivElement>(null);
  const nearTreesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Far trees parallax (slowest)
      if (farTreesRef.current) {
        gsap.to(farTreesRef.current, {
          y: -100,
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "top top",
            end: "+=4000",
            scrub: 0.5,
          }
        });

        // Brightness increase
        gsap.to(farTreesRef.current, {
          filter: "brightness(1.5)",
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=600",
            end: "+=1400",
            scrub: 1,
          }
        });
      }

      // Mid trees parallax (medium)
      if (midTreesRef.current) {
        gsap.to(midTreesRef.current, {
          y: -250,
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "top top",
            end: "+=4000",
            scrub: 0.5,
          }
        });

        gsap.to(midTreesRef.current, {
          filter: "brightness(1.3)",
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=600",
            end: "+=1400",
            scrub: 1,
          }
        });
      }

      // Near trees parallax (fastest)
      if (nearTreesRef.current) {
        gsap.to(nearTreesRef.current, {
          y: -350,
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "top top",
            end: "+=4000",
            scrub: 0.5,
          }
        });

        gsap.to(nearTreesRef.current, {
          filter: "brightness(1.1)",
          scrollTrigger: {
            trigger: ".swamp-scene",
            start: "+=600",
            end: "+=1400",
            scrub: 1,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Far trees (ghostly, barely visible) */}
      <div
        ref={farTreesRef}
        className="absolute bottom-0 left-0 right-0 opacity-15"
        style={{ filter: "brightness(0.3)", willChange: "transform" }}
      >
        <svg className="w-full h-96" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {/* Distant tree silhouettes */}
          <path d="M100,350 L110,200 L105,200 L100,100 L95,200 L90,200 L100,350 Z" fill="#1a1a1f" opacity="0.4" />
          <path d="M300,350 L310,180 L305,180 L300,80 L295,180 L290,180 L300,350 Z" fill="#1a1a1f" opacity="0.3" />
          <path d="M500,350 L515,220 L508,220 L500,120 L492,220 L485,220 L500,350 Z" fill="#1a1a1f" opacity="0.35" />
          <path d="M700,350 L710,190 L705,190 L700,90 L695,190 L690,190 L700,350 Z" fill="#1a1a1f" opacity="0.3" />
          <path d="M900,350 L912,210 L906,210 L900,110 L894,210 L888,210 L900,350 Z" fill="#1a1a1f" opacity="0.4" />
          <path d="M1100,350 L1110,195 L1105,195 L1100,95 L1095,195 L1090,195 L1100,350 Z" fill="#1a1a1f" opacity="0.35" />
        </svg>
      </div>

      {/* Mid trees (more defined) */}
      <div
        ref={midTreesRef}
        className="absolute bottom-0 left-0 right-0 opacity-40"
        style={{ filter: "brightness(0.5)", willChange: "transform" }}
      >
        <svg className="w-full h-[500px]" viewBox="0 0 1200 500" preserveAspectRatio="none">
          <path d="M150,480 L165,250 L158,250 L150,100 L142,250 L135,250 L150,480 Z" fill="#0a0a0f" opacity="0.8" />
          <path d="M400,480 L420,220 L410,220 L400,90 L390,220 L380,220 L400,480 Z" fill="#0a0a0f" opacity="0.7" />
          <path d="M650,480 L670,240 L660,240 L650,110 L640,240 L630,240 L650,480 Z" fill="#0a0a0f" opacity="0.75" />
          <path d="M850,480 L865,260 L858,260 L850,130 L842,260 L835,260 L850,480 Z" fill="#0a0a0f" opacity="0.8" />
          <path d="M1050,480 L1068,235 L1059,235 L1050,105 L1041,235 L1032,235 L1050,480 Z" fill="#0a0a0f" opacity="0.7" />
        </svg>
      </div>

      {/* Near trees (clearest silhouettes) */}
      <div
        ref={nearTreesRef}
        className="absolute bottom-0 left-0 right-0 opacity-70"
        style={{ filter: "brightness(0.7)", willChange: "transform" }}
      >
        <svg className="w-full h-[600px]" viewBox="0 0 1200 600" preserveAspectRatio="none">
          <path d="M200,580 L225,280 L215,280 L200,80 L185,280 L175,280 L200,580 Z" fill="#000" />
          <path d="M450,580 L480,260 L465,260 L450,60 L435,260 L420,260 L450,580 Z" fill="#000" />
          <path d="M750,580 L775,290 L763,290 L750,90 L737,290 L725,290 L750,580 Z" fill="#000" />
          <path d="M1000,580 L1022,275 L1011,275 L1000,75 L989,275 L978,275 L1000,580 Z" fill="#000" />
        </svg>
      </div>
    </>
  );
}
