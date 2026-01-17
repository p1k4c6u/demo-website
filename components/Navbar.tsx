"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Logo className="w-10 h-10" />
          </motion.div>
          <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            AP-group
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`relative text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-light transition-colors"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}
