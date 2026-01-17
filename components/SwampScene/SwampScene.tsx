"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkyOverlay from "./SkyOverlay";
import StarField from "./StarField";
import SunGlow from "./SunGlow";
import TreeLayers from "./TreeLayers";
import FogLayers from "./FogLayers";
import WaterReflection from "./WaterReflection";
import BrandTypography from "./BrandTypography";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SwampScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the entire scene during scroll
      ScrollTrigger.create({
        trigger: sceneRef.current,
        start: "top top",
        end: "+=4000",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      className="swamp-scene relative h-screen w-full overflow-hidden"
    >
      {/* Sky with color transitions */}
      <SkyOverlay />

      {/* Stars (night only) */}
      <StarField />

      {/* Sun glow */}
      <SunGlow />

      {/* Tree layers (parallax) */}
      <TreeLayers />

      {/* Fog layers (drift + fade) */}
      <FogLayers />

      {/* Water + reflections */}
      <WaterReflection />

      {/* Brand typography */}
      <BrandTypography />
    </div>
  );
}
