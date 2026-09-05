"use client";

import { useEffect, useId, useRef, useState, type ComponentType } from "react";
import Reveal from "./Reveal";
import { getProcedureIcon } from "./icons/ProcedureIcons";

type Step = { title: string; description: string };

/** One step's icon badge + number, shared between the desktop timeline and the mobile slide. */
function StepBadge({ icon: Icon, index }: { icon: ComponentType<{ className?: string }>; index: number }) {
  return (
    <span className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--color-tint)] ring-4 ring-white">
      <Icon className="h-8 w-8 text-[var(--color-teal)]" />
      <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-bold text-white ring-2 ring-white">
        {index + 1}
      </span>
    </span>
  );
}

/**
 * The "How is it performed" section.
 * Desktop (lg+): a flowing dotted connector that draws itself in (elastic-band style)
 * with each step's card floating along it, staggered in sequence.
 * Mobile: a swipeable, dot-navigated carousel — one step per slide.
 */
export default function ProcedureTimeline({ steps }: { steps: Step[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
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

  useEffect(() => {
    if (steps.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % steps.length), 5000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div ref={wrapRef} className="relative mt-12 lg:mt-20">
      {/* Mobile: swipeable dot-nav carousel, one step per slide */}
      <div className="relative lg:hidden">
        {/* progress line — fills as you move through the steps, elastic-band style */}
        <svg
          aria-hidden
          viewBox="0 0 400 32"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-6 top-10 h-16"
        >
          <defs>
            <linearGradient id={`flow-mc-${rawId}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-teal)" />
              <stop offset="100%" stopColor="var(--color-sky)" />
            </linearGradient>
            <clipPath id={`clip-mc-${rawId}`}>
              <rect
                x="0"
                y="0"
                width={visible ? ((index + 1) / steps.length) * 400 : 0}
                height="32"
                style={{ transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
              />
            </clipPath>
            <marker
              id={`arrow-mc-${rawId}`}
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
          <g clipPath={`url(#clip-mc-${rawId})`}>
            <path
              d="M6,16 C60,2 100,30 160,16 C220,2 260,30 320,16 C350,10 370,16 390,16"
              fill="none"
              stroke={`url(#flow-mc-${rawId})`}
              strokeWidth="2.5"
              strokeDasharray="1 10"
              strokeLinecap="round"
              markerEnd={`url(#arrow-mc-${rawId})`}
            />
          </g>
        </svg>

        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ width: `${steps.length * 100}%`, transform: `translateX(-${index * (100 / steps.length)}%)` }}
          >
            {steps.map((step, i) => (
              <div key={step.title} className="shrink-0 pt-9" style={{ width: `${100 / steps.length}%` }}>
                <StepBadge icon={getProcedureIcon(step.title)} index={i} />
                <div className="relative z-20 -mt-3 rounded-2xl bg-white p-5 pt-7 text-center shadow-[0_20px_45px_-20px_rgba(15,35,65,0.28)] ring-1 ring-black/[0.04]">
                  <h3 className="text-[17px] font-semibold text-[var(--color-navy)]">{step.title}</h3>
                  <p className="mt-2 min-h-[80px] text-[13px] leading-[1.7] text-[var(--color-ink)]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {steps.length > 1 && (
          <div className="mt-5 flex items-center justify-center gap-1.5" role="tablist" aria-label="Steps">
            {steps.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show step ${i + 1} of ${steps.length}`}
                onClick={() => setIndex(i)}
                className={`h-2 shrink-0 transition-all duration-300 ${
                  i === index
                    ? "w-6 rounded-[50px] bg-[var(--color-teal)]"
                    : "w-2 rounded-full bg-[var(--color-teal)]/30 hover:bg-[var(--color-teal)]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: flowing connector, drawing in via a widening clip-path "reveal window" */}
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

      <div className="relative hidden lg:grid lg:grid-cols-5 lg:items-start lg:gap-6">
        {steps.map((step, i) => {
          const floatUp = i % 2 === 0;
          return (
            <Reveal key={step.title} delay={i * 140}>
              <div className={floatUp ? "lg:-translate-y-3" : "lg:translate-y-3"}>
                <StepBadge icon={getProcedureIcon(step.title)} index={i} />
                <div className="relative z-20 -mt-3 rounded-2xl bg-white p-6 pt-8 text-center shadow-[0_20px_45px_-20px_rgba(15,35,65,0.28)] ring-1 ring-black/[0.04]">
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
