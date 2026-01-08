"use client";

import { useEffect, useRef, useState } from "react";
import * as anime from "animejs";

export default function QuantumIntro() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        const animeObj = (anime as any).default || anime;

        const timeline = animeObj.timeline({
            easing: "easeInOutQuart",
            complete: () => {
                setIsVisible(false);
            },
        });

        timeline
            .add({
                targets: "#logo-path",
                strokeDashoffset: [animeObj.setDashoffset, 0],
                duration: 1500,
                delay: 500,
            })
            .add({
                targets: ".boot-text",
                opacity: [0, 1],
                translateY: [20, 0],
                delay: animeObj.stagger(100),
                duration: 800,
            })
            .add({
                targets: containerRef.current,
                opacity: 0,
                duration: 1000,
                delay: 500,
                easing: "easeInExpo",
            });
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
            style={{ isolation: "isolate" }}
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

            <div className="mt-8 flex flex-col items-center">
                <p className="boot-text mono text-xs text-[#00FFC2]">INITIALIZING_NEURO_MATRIX...</p>
                <p className="boot-text mono text-xs text-[#7F7F7F] mt-1">ESTABLISHING_LANCE_DB_SYNC</p>
                <p className="boot-text mono text-xs text-[#00FFC2] mt-1">STATUS: STABLE</p>
            </div>

            <style jsx>{`
        .fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .bg-black { background-color: #000; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .z-50 { z-index: 50; }
        .inset-0 { top: 0; left: 0; right: 0; bottom: 0; }
        .mt-8 { margin-top: 2rem; }
        .text-xs { font-size: 0.75rem; }
        .mt-1 { margin-top: 0.25rem; }
      `}</style>
        </div>
    );
}
