"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // Show navbar after scrolling a bit
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navOpacity = useTransform(scrollY, [100, 200], [0, 1]);

  // Only show on home page since it's one-page
  if (pathname !== "/") {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-lg font-bold text-foreground">AP-group</span>
          </Link>
          <Link href="/" className="text-sm text-foreground/70 hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md border-b border-white/5" />
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <Logo className="w-8 h-8" />
          <span className="text-sm font-medium text-foreground tracking-wide">AP-group</span>
        </Link>

        <div className="text-xs text-foreground/40 tracking-widest">
          SCROLL TO EXPLORE
        </div>
      </div>
    </motion.nav>
  );
}
