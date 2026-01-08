"use client";

import { useEffect, useRef, useState } from "react";

export default function QuantumIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        let timeline: any;

        import("animejs").then((animeModule: any) => {
            // Anime.js v4 API Adaptation
            const anime = animeModule.default || animeModule;

            // Use createTimeline if available (v4), fallback to anime.timeline (v3 compat)
            // Based on inspection, 'Timeline' is exported, and 'createTimeline'.
            const createTimeline = anime.createTimeline || anime.timeline;
            // Stagger is exported as 'stagger'
            const stagger = anime.stagger;
            // setDashoffset might be in utils or direct export. 
            // Inspection showed 'set' but not 'setDashoffset'. 
            // Common v4 pattern is using the 'svg' helper or manual calculation.
            // However, for safety, we'll try to find it or define a helper.
            const setDashoffset = anime.setDashoffset || ((el: any) => {
                const pathLength = anime.setDashoffset ? anime.setDashoffset(el) : el.getTotalLength();
                el.setAttribute('stroke-dasharray', pathLength);
                return pathLength;
            });

            timeline = createTimeline({
                defaults: { easing: "easeInOutQuart" }, // v4 uses defaults
                complete: () => {
                    anime.animate({ // v4 uses animate() or anime()
                        targets: containerRef.current,
                        opacity: 0,
                        duration: 800,
                        easing: "easeOutExpo",
                        onComplete: () => setIsVisible(false), // v4 uses onComplete
                    });
                },
            });

            timeline
                .add({
                    targets: "#logo-path",
                    strokeDashoffset: [anime.setDashoffset ? anime.setDashoffset : (el: any) => el.getTotalLength(), 0],
                    duration: 1500,
                    delay: 500,
                })
                .add({
                    targets: ".boot-text",
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: stagger(100),
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
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
                isolation: "isolate"
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
