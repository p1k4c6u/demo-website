"use client";

import SwampScene from "@/components/SwampScene/SwampScene";

export default function Home() {
  return (
    <div className="relative">
      {/* Swamp scene (pinned for 4000px scroll) */}
      <section className="h-[500vh]">
        <SwampScene />
      </section>

      {/* Content sections (scroll normally after scene) */}

      {/* Section 2: Introduction */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-32 px-6"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(135, 167, 196, 0.3) 100%)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-12 leading-tight">
            We build systems
            <br />
            that scale.
          </h2>

          <p className="text-xl md:text-2xl text-foreground/70 font-light max-w-3xl mx-auto leading-relaxed">
            Strategy, technology and execution —
            <br />
            without noise.
          </p>
        </div>
      </section>

      {/* Section 3: About */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-32 px-6"
        style={{ background: "linear-gradient(to bottom, rgba(135, 167, 196, 0.3) 0%, rgba(212, 165, 116, 0.2) 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-24">
            {/* Who we are */}
            <div className="text-center space-y-6">
              <h3 className="text-sm text-foreground/40 tracking-[0.3em] uppercase mb-8">
                Who we are
              </h3>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                A small studio based in Estonia.
              </p>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                We work with ambitious teams.
              </p>
            </div>

            {/* What we focus on */}
            <div className="text-center space-y-6">
              <h3 className="text-sm text-foreground/40 tracking-[0.3em] uppercase mb-8">
                What we focus on
              </h3>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                Digital products that matter.
              </p>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                Infrastructure that scales.
              </p>
            </div>

            {/* How we work */}
            <div className="text-center space-y-6">
              <h3 className="text-sm text-foreground/40 tracking-[0.3em] uppercase mb-8">
                How we work
              </h3>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                Clear thinking. Fast execution.
              </p>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-relaxed">
                No theatrics. Just results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contact */}
      <section className="relative z-10 min-h-screen flex items-center justify-center py-32 px-6"
        style={{ background: "linear-gradient(to bottom, rgba(212, 165, 116, 0.2) 0%, rgba(212, 165, 116, 0.4) 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-light text-foreground mb-16 leading-tight">
            Let's work together
          </h2>

          <p className="text-xl md:text-2xl text-foreground/70 font-light mb-20 max-w-2xl mx-auto leading-relaxed">
            If you need a partner who understands both strategy and execution.
          </p>

          <div className="space-y-8 mb-24">
            <a
              href="mailto:hello@ap-projects.ee"
              className="block text-2xl md:text-3xl text-foreground hover:text-foreground/70 transition-colors font-light"
            >
              hello@ap-projects.ee
            </a>
          </div>

          {/* Minimal footer */}
          <div className="pt-32 mt-32 border-t border-foreground/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-foreground/30">
              <p>© 2026 AP PROJECTS</p>
              <p className="tracking-[0.2em]">TALLINN, ESTONIA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
