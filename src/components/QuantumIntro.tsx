"use client";

import { useEffect, useRef, useState } from "react";

export default function QuantumIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        let timeline: any;

        import("animejs").then((animeModule: any) => {
            const anime = animeModule.default || animeModule;

            timeline = anime.timeline({
                easing: "easeInOutQuart",
                complete: () => {
                    anime({
                        targets: containerRef.current,
                        opacity: 0,
                        duration: 800,
                        easing: "easeOutExpo",
                        complete: () => setIsVisible(false),
                    });
                },
            });

            timeline
                .add({
                    targets: "#logo-path",
                    strokeDashoffset: [anime.setDashoffset, 0],
                    duration: 1500,
                    delay: 500,
                })
                .add({
                    targets: ".boot-text",
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(100),
                    duration: 800,
                });
        });

        return () => {
            if (timeline) timeline.pause();
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="quantum-intro"
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
            }}
        >
            <svg
                width="200"
                height="200"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="logo-path"
                    d="M20 50L50 20L80 50L50 80L20 50Z"
                    stroke="#00FFC2"
                    strokeWidth="0.5"
                />
                <circle cx="50" cy="50" r="10" stroke="#00FFC2" strokeWidth="0.2" opacity="0.5" />
            </svg>

            <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <p className="boot-text" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#00FFC2", opacity: 0 }}>
                    INITIALIZING_NEURO_MATRIX...
                </p>
                <p className="boot-text" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#7F7F7F", marginTop: "0.25rem", opacity: 0 }}>
                    ESTABLISHING_LANCE_DB_SYNC
                </p>
                <p className="boot-text" style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#00FFC2", marginTop: "0.25rem", opacity: 0 }}>
                    STATUS: STABLE
                </p>
            </div>
        </div>
    );
}
