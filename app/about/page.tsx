"use client";

import { motion } from "framer-motion";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      {/* Abstract Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#1F6F54"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            About <span className="text-primary">AP-group</span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            We're a team of strategists, engineers, and designers who build technology that drives real business outcomes.
          </p>
        </motion.div>

        {/* Who We Are */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Who we are
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-4">
                AP-group is a technology consultancy focused on helping ambitious companies build systems that scale. We combine strategic thinking with technical expertise to deliver solutions that work.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We don't believe in one-size-fits-all solutions. Every project starts with understanding your unique challenges, goals, and constraints.
              </p>
            </div>

            <div className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-8">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-16 h-16 bg-primary/30 rounded-lg backdrop-blur-sm border border-primary/20"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* What We Focus On */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            What we focus on
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Products",
                description:
                  "Web and mobile applications that users love and businesses rely on.",
              },
              {
                title: "Platform Engineering",
                description:
                  "Scalable infrastructure and systems that grow with your needs.",
              },
              {
                title: "Technical Strategy",
                description:
                  "Clear roadmaps that connect technology decisions to business outcomes.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg mb-6 flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-sm" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">
                  {item.title}
                </h3>
                <p className="text-foreground/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How We Work */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground text-center">
            How we work
          </h2>

          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Discovery",
                description:
                  "We start by understanding your business, your users, and your goals. No assumptions, just questions.",
              },
              {
                number: "02",
                title: "Strategy",
                description:
                  "We develop a clear plan that aligns technology with business objectives and sets realistic expectations.",
              },
              {
                number: "03",
                title: "Execution",
                description:
                  "We build, test, and iterate quickly. Regular check-ins keep everyone aligned and moving forward.",
              },
              {
                number: "04",
                title: "Delivery",
                description:
                  "We launch with confidence and provide support to ensure everything runs smoothly post-launch.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-8 items-start group"
              >
                <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg text-foreground/60">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center py-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Let's work together
          </h2>
          <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
            Ready to start a project or just want to chat about an idea? We'd love to hear from you.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-5 bg-primary text-white rounded-lg text-lg font-medium hover:bg-primary-light transition-colors shadow-xl shadow-primary/30"
          >
            Start a conversation
          </motion.a>
        </motion.section>
      </div>
    </main>
  );
}
