"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        import("animejs").then((animeModule: any) => {
            const anime = animeModule.default || animeModule;

            anime({
                targets: ".hero-title",
                opacity: [0, 1],
                translateY: [100, 0],
                duration: 1500,
                easing: "easeOutExpo",
                delay: 3000,
            });

            anime({
                targets: ".hero-sub",
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 1000,
                easing: "easeOutElastic(1, .8)",
                delay: 3500,
            });
        });
    }, []);

    return (
        <section
            ref={heroRef}
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                position: "relative",
            }}
        >
            <div style={{ maxWidth: "56rem", width: "100%" }}>
                <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
                    <h1
                        className="hero-title glow-text"
                        style={{
                            fontSize: "clamp(3rem, 8vw, 6rem)",
                            fontWeight: 700,
                            lineHeight: 1.25,
                            opacity: 0,
                        }}
                    >
                        ENGINEERING <br />
                        <span style={{ color: "#fff" }}>PRECISION.</span>
                    </h1>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                        marginTop: "3rem",
                    }}
                >
                    <p
                        className="hero-sub"
                        style={{
                            fontFamily: "monospace",
                            fontSize: "1.125rem",
                            color: "#7F7F7F",
                            maxWidth: "28rem",
                            opacity: 0,
                        }}
                    >
                        Scientific data-driven development focusing on high-performance
                        architectures and ultra-responsive aesthetics.
                    </p>

                    <div
                        className="hero-sub"
                        style={{ display: "flex", flexDirection: "column", gap: "0.5rem", opacity: 0 }}
                    >
                        <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#7F7F7F" }}>
                            PROJECT_NAME
                        </span>
                        <span style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#00FFC2" }}>
                            MUNVERRICHT_ORB_V4
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
