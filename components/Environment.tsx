"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface EnvironmentProps {
  scrollProgress: any;
}

export default function Environment({ scrollProgress }: EnvironmentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background color transitions
  const backgroundColor = useTransform(
    scrollProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "#0a0a0f", // Night
      "#1a2a3a", // Pre-dawn
      "#87a7c4", // Day
      "#b8957a", // Late afternoon
      "#d4a574", // Golden hour
    ]
  );

  // Stars opacity (fade out during sunrise)
  const starsOpacity = useTransform(scrollProgress, [0, 0.2, 0.3], [1, 0.5, 0]);

  // Sun opacity and position
  const sunOpacity = useTransform(scrollProgress, [0.15, 0.3], [0, 1]);
  const sunY = useTransform(scrollProgress, [0.2, 0.5], [100, 30]);

  // Fog opacity
  const fogOpacity = useTransform(scrollProgress, [0, 0.3, 0.6, 0.9], [0.7, 0.5, 0.25, 0.09]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Generate stars
    const stars: Array<{ x: number; y: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7, // Stars in top 70%
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    // Generate shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
    }> = [];

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI / 6 + Math.PI / 4, // Diagonal
        opacity: 1,
      });
    };

    // Create shooting star periodically
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createShootingStar();
      }
    }, 3000);

    // Animation loop
    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Draw and update shooting stars
      shootingStars.forEach((star, index) => {
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        );
        ctx.stroke();

        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.01;

        // Remove if faded or off screen
        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(shootingStarInterval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Background color */}
      <motion.div
        style={{ backgroundColor }}
        className="absolute inset-0 transition-colors duration-1000"
      />

      {/* Stars canvas */}
      <motion.canvas
        ref={canvasRef}
        style={{ opacity: starsOpacity }}
        className="absolute inset-0"
      />

      {/* Sun */}
      <motion.div
        style={{
          opacity: sunOpacity,
          y: sunY,
        }}
        className="absolute left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-radial from-yellow-200 via-orange-300 to-transparent blur-xl"
      />

      {/* Horizon glow */}
      <motion.div
        style={{ opacity: sunOpacity }}
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-orange-200/20 via-pink-200/10 to-transparent"
      />

      {/* Fog layers */}
      <motion.div
        style={{ opacity: fogOpacity }}
        className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-gray-300/10 via-gray-400/5 to-transparent backdrop-blur-sm"
      />

      {/* Swamp silhouette (subtle) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
