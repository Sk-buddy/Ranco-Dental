"use client";

import { useEffect, useRef, useState } from "react";

type Testimonial = { quote: string; name: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Review card — a real sliding carousel (the whole card slides via native scroll-snap,
 * swipeable by touch) when there's more than one testimonial, with the active dot
 * stretching into a rectangle below it. */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Autoplay — reads live scroll position rather than `index` so it never acts on a
  // stale closure if the user just swiped.
  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.clientWidth || 1;
      const next = (Math.round(track.scrollLeft / width) + 1) % items.length;
      track.scrollTo({ left: next * width, behavior: "smooth" });
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  // Keep the active dot in sync with manual swipes too.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const i = Math.round(track.scrollLeft / (track.clientWidth || 1));
        setIndex(Math.max(0, Math.min(items.length - 1, i)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [items.length]);

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    <div className="relative h-full">
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t) => (
          <figure
            key={t.name}
            className="flex h-full w-full shrink-0 snap-center flex-col gap-4 rounded-2xl bg-[var(--color-tint)] p-6 sm:p-8"
          >
            <div className="flex items-center gap-1.5 text-[var(--color-teal)]" aria-hidden>
              {"★★★★★"}
            </div>
            <blockquote className="min-h-[110px] text-[15px] leading-[1.7] text-[var(--color-ink)] sm:min-h-[95px] sm:text-[16px]">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[13px] font-semibold text-white">
                {initials(t.name)}
              </span>
              <span className="text-[14px] font-semibold text-[var(--color-navy)]">{t.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {items.length > 1 && (
        <div
          className="absolute left-6 top-full mt-4 flex items-center gap-1.5 sm:left-8"
          role="tablist"
          aria-label="Reviews"
        >
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show review ${i + 1} of ${items.length}`}
              onClick={() => goTo(i)}
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
  );
}
