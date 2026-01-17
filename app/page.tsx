"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import 3D scene to prevent SSR issues
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground">
              We build systems
              <br />
              <span className="text-primary">that scale.</span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto"
            >
              Strategy, technology and execution for teams that want results — not noise.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-medium hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
                >
                  Start a project
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-primary text-primary rounded-lg text-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  View approach
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-foreground/30 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What we do
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              We partner with ambitious teams to build digital products that drive real business value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Strategy",
                description: "Clear roadmaps that align technology with business goals.",
              },
              {
                title: "Development",
                description: "Modern, scalable systems built with the right tools.",
              },
              {
                title: "Execution",
                description: "Fast, reliable delivery without sacrificing quality.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 transition-all"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-foreground/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to build something great?
            </h2>
            <p className="text-xl text-foreground/70 mb-10">
              Let's talk about your project and how we can help you achieve your goals.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-primary text-white rounded-lg text-lg font-medium hover:bg-primary-light transition-colors shadow-xl shadow-primary/30"
              >
                Get in touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
