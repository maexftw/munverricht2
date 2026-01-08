"use client";

import { useEffect, useRef } from "react";
import * as anime from "animejs";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animeObj = (anime as any).default || anime;

        animeObj({
            targets: ".hero-title",
            opacity: [0, 1],
            translateY: [100, 0],
            duration: 1500,
            easing: "easeOutExpo",
            delay: 3000,
        });

        animeObj({
            targets: ".hero-sub",
            opacity: [0, 1],
            translateX: [-50, 0],
            duration: 1000,
            easing: "easeOutElastic(1, .8)",
            delay: 3500,
        });
    }, []);

    return (
        <section ref={heroRef} className="min-h-screen flex items-center justify-center p-8 relative">
            <div className="max-w-4xl w-full">
                <div className="overflow-hidden mb-4">
                    <h1 className="hero-title text-6xl md:text-8xl font-bold glow-text leading-tight">
                        ENGINEERING <br />
                        <span className="text-white">PRECISION.</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-12">
                    <p className="hero-sub mono text-lg text-secondary max-w-md">
                        Scientific data-driven development focusing on high-performance architectures and ultra-responsive aesthetics.
                    </p>

                    <div className="hero-sub h-px flex-1 bg-primary opacity-20 hidden md:block"></div>

                    <div className="hero-sub flex flex-col gap-2">
                        <span className="mono text-xs text-secondary">PROJECT_NAME</span>
                        <span className="mono text-sm text-primary">MUNVERRICHT_ORB_V4</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
        section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }
        .max-w-4xl { max-width: 56rem; }
        .w-full { width: 100%; }
        .text-6xl { font-size: 3.75rem; }
        .md\\:text-8xl { font-size: 6rem; }
        .font-bold { font-weight: 700; }
        .leading-tight { line-height: 1.25; }
        .gap-8 { gap: 2rem; }
        .mt-12 { margin-top: 3rem; }
        .text-lg { font-size: 1.125rem; }
        .text-secondary { color: #7F7F7F; }
        .text-white { color: #fff; }
        .h-px { height: 1px; }
        .flex-1 { flex: 1 1 0%; }
        .bg-primary { background-color: #00FFC2; }
      `}</style>
        </section>
    );
}
