"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Per-card drift distance (px) for the scroll parallax, cycled by index so
// neighbouring cards (which usually land in different masonry columns) drift
// at visibly different rates.
const SPEEDS = [22, -16, 30, -24, 14, -28];

export default function TestimonialGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile carousel: native touch-swipe via scroll-snap, dots synced to scroll position.
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const onTrackScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const step = slideStep(track);
        const i = Math.round(track.scrollLeft / step);
        setActiveIndex(Math.max(0, Math.min(testimonials.length - 1, i)));
      });
    };
    track.addEventListener("scroll", onTrackScroll, { passive: true });
    return () => track.removeEventListener("scroll", onTrackScroll);
  }, []);

  // Slide width (peek carousel: each card is < 100% wide) plus the gap between cards.
  function slideStep(track: HTMLDivElement) {
    const first = track.children[0] as HTMLElement | undefined;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return (first?.offsetWidth || track.clientWidth) + gap;
  }

  function goToSlide(i: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * slideStep(track), behavior: "smooth" });
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // One-time fade + rise, staggered, independent of the parallax transform below.
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-6");
            entry.target.classList.add("opacity-100", "translate-y-0");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    fadeRefs.current.forEach((el) => el && fadeObserver.observe(el));

    if (prefersReduced) {
      return () => fadeObserver.disconnect();
    }

    // Continuous scroll-linked drift, only once there are enough columns (lg+).
    // CSS `columns` fills one column completely before starting the next, so
    // with only 1-2 columns, consecutive cards still stack directly on each
    // other within the same column — alternating +/- drift would make them
    // overlap instead of reading as column depth.
    const multiColumnQuery = window.matchMedia("(min-width: 1024px)");
    let ticking = false;
    let sectionVisible = false;

    const applyParallax = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!sectionVisible || !section) return;
      if (!multiColumnQuery.matches) {
        parallaxRefs.current.forEach((el) => {
          if (el) el.style.transform = "";
        });
        return;
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (section below the fold) .. 0 (centered) .. 1 (section above the fold)
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      parallaxRefs.current.forEach((el, i) => {
        if (!el) return;
        const speed = SPEEDS[i % SPEEDS.length];
        el.style.transform = `translateY(${(progress * speed).toFixed(1)}px)`;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    };

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = entry.isIntersecting;
        if (sectionVisible) {
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "200px 0px 200px 0px" },
    );
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    return () => {
      fadeObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile: swipeable dot-nav carousel, one review per slide (native touch scroll-snap) */}
      <div className="sm:hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <div key={t.name} className="w-[90%] shrink-0 snap-start">
              <figure className="flex h-full flex-col gap-3 rounded-2xl bg-[var(--color-tint)] p-4">
                <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-teal)]" aria-hidden>
                  {"★★★★★"}
                </div>
                <blockquote className="min-h-[72px] text-[13px] leading-[1.55] text-[var(--color-ink)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-2 pt-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-semibold text-white">
                    {initials(t.name)}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[13px] font-semibold text-[var(--color-navy)]">{t.name}</span>
                    <span className="text-[11px] text-[var(--color-teal-dark)]">{t.treatment}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5" role="tablist" aria-label="Testimonials">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
              onClick={() => goToSlide(i)}
              className={`h-2 shrink-0 transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 rounded-[50px] bg-[var(--color-teal)]"
                  : "w-2 rounded-full bg-[var(--color-teal)]/30 hover:bg-[var(--color-teal)]/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tablet+: masonry gallery with scroll-linked parallax */}
      <div
        ref={sectionRef}
        className="hidden columns-2 gap-3 sm:block sm:gap-5 lg:columns-3 xl:columns-4"
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => {
              parallaxRefs.current[i] = el;
            }}
            className="mb-3 break-inside-avoid sm:mb-5"
          >
            <div
              ref={(el) => {
                fadeRefs.current[i] = el;
              }}
              className="translate-y-6 opacity-0 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${(i % 4) * 90}ms` }}
            >
              <figure className="flex flex-col gap-3 rounded-2xl bg-[var(--color-tint)] p-4 sm:gap-4 sm:p-6">
                <div className="flex items-center gap-1.5 text-[var(--color-teal)] text-[12px] sm:gap-2 sm:text-base" aria-hidden>
                  {"★★★★★"}
                </div>
                <blockquote className="text-[13px] leading-[1.55] text-[var(--color-ink)] sm:text-[14px] sm:leading-[1.6]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-2 pt-2 sm:gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-semibold text-white sm:h-10 sm:w-10 sm:text-[13px]">
                    {initials(t.name)}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[13px] font-semibold text-[var(--color-navy)] sm:text-[14px]">
                      {t.name}
                    </span>
                    <span className="text-[11px] text-[var(--color-teal-dark)] sm:text-[12px]">
                      {t.treatment}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
