"use client";

import { useEffect, useId, useRef, useState } from "react";
import Reveal from "./Reveal";
import { getProcedureIcon } from "./icons/ProcedureIcons";

type Step = { title: string; description: string };

/**
 * The "How is it performed" timeline: a flowing dotted connector that draws itself
 * in (like an elastic band snapping taut) once scrolled into view, with each step's
 * card popping up into place along it, staggered in sequence.
 */
export default function ProcedureTimeline({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative mt-20">
      {/* flowing connector: vertical wave on mobile, horizontal wave on desktop — both
          draw in via a widening clip-path "reveal window", elastic-band style */}
      <svg
        aria-hidden
        viewBox="0 0 100 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[90px] -translate-x-1/2 lg:hidden"
      >
        <defs>
          <linearGradient id={`flow-m-${rawId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-teal)" />
            <stop offset="100%" stopColor="var(--color-sky)" />
          </linearGradient>
          <clipPath id={`clip-m-${rawId}`}>
            <rect
              x="0"
              y="0"
              width="100"
              height={visible ? 800 : 0}
              style={{ transition: "height 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
          </clipPath>
          <marker
            id={`arrow-m-${rawId}`}
            viewBox="0 0 14 14"
            markerUnits="userSpaceOnUse"
            markerWidth="14"
            markerHeight="14"
            refX="12"
            refY="7"
            orient="auto"
          >
            <path d="M1,1 L13,7 L1,13 Z" fill="var(--color-sky)" />
          </marker>
        </defs>
        <g clipPath={`url(#clip-m-${rawId})`}>
          <path
            d="M50,0 C15,70 85,130 50,200 C15,270 85,330 50,400 C15,470 85,530 50,600 C15,670 85,730 50,794"
            fill="none"
            stroke={`url(#flow-m-${rawId})`}
            strokeWidth="2.5"
            strokeDasharray="1 10"
            strokeLinecap="round"
            markerEnd={`url(#arrow-m-${rawId})`}
          />
        </g>
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 1000 72"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[72px] w-full lg:block"
      >
        <defs>
          <linearGradient id={`flow-d-${rawId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-teal)" />
            <stop offset="100%" stopColor="var(--color-sky)" />
          </linearGradient>
          <clipPath id={`clip-d-${rawId}`}>
            <rect
              x="0"
              y="0"
              width={visible ? 1000 : 0}
              height="72"
              style={{ transition: "width 1.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
          </clipPath>
          <marker
            id={`arrow-d-${rawId}`}
            viewBox="0 0 14 14"
            markerUnits="userSpaceOnUse"
            markerWidth="14"
            markerHeight="14"
            refX="12"
            refY="7"
            orient="auto"
          >
            <path d="M1,1 L13,7 L1,13 Z" fill="var(--color-sky)" />
          </marker>
        </defs>
        <g clipPath={`url(#clip-d-${rawId})`}>
          <path
            d="M20,24 L100,24 C200,24 200,48 300,48 C400,48 400,24 500,24 C600,24 600,48 700,48 C800,48 800,24 900,24 L974,24"
            fill="none"
            stroke={`url(#flow-d-${rawId})`}
            strokeWidth="2.5"
            strokeDasharray="1 10"
            strokeLinecap="round"
            markerEnd={`url(#arrow-d-${rawId})`}
          />
        </g>
      </svg>

      <div className="relative grid grid-cols-1 gap-12 sm:gap-14 lg:grid-cols-5 lg:items-start lg:gap-6">
        {steps.map((step, i) => {
          const StepIcon = getProcedureIcon(step.title);
          const floatUp = i % 2 === 0;
          return (
            <Reveal key={step.title} delay={i * 140}>
              <div
                className={`relative mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none ${
                  floatUp
                    ? "translate-x-2 lg:translate-x-0 lg:-translate-y-3"
                    : "-translate-x-2 lg:translate-x-0 lg:translate-y-3"
                }`}
              >
                <span className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--color-tint)] ring-4 ring-white">
                  <StepIcon className="h-8 w-8 text-[var(--color-teal)]" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-bold text-white ring-2 ring-white">
                    {i + 1}
                  </span>
                </span>

                <div className="relative z-20 -mt-3 rounded-2xl bg-white p-5 pt-7 text-center shadow-[0_20px_45px_-20px_rgba(15,35,65,0.28)] ring-1 ring-black/[0.04] sm:p-6 sm:pt-8">
                  <h3 className="text-[17px] font-semibold text-[var(--color-navy)]">{step.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[var(--color-ink)]">{step.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
