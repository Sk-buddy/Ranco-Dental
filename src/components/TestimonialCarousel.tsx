"use client";

import { useEffect, useState, type ReactNode } from "react";

type Testimonial = { quote: string; name: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Fades its children in on mount — remounted per-slide (via `key`) to crossfade quotes. */
function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

/** Review card — a dot-navigated carousel when there's more than one testimonial,
 * with the active dot stretching into a rectangle instead of staying a circle. */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  const active = items[index];
  if (!active) return null;

  return (
    <div className="flex h-full flex-col gap-4">
      <figure className="flex flex-1 flex-col gap-4 rounded-2xl bg-[var(--color-tint)] p-6 sm:p-8">
        <div className="flex items-center gap-1.5 text-[var(--color-teal)]" aria-hidden>
          {"★★★★★"}
        </div>
        <FadeIn key={index} className="min-h-[110px] sm:min-h-[95px]">
          <blockquote className="text-[15px] leading-[1.7] text-[var(--color-ink)] sm:text-[16px]">
            &ldquo;{active.quote}&rdquo;
          </blockquote>
        </FadeIn>

        <figcaption className="mt-auto flex items-center gap-3 pt-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[13px] font-semibold text-white">
            {initials(active.name)}
          </span>
          <span className="text-[14px] font-semibold text-[var(--color-navy)]">{active.name}</span>
        </figcaption>
      </figure>

      {items.length > 1 && (
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Reviews">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show review ${i + 1} of ${items.length}`}
              onClick={() => setIndex(i)}
              className={`h-2 shrink-0 transition-all duration-300 ${
                i === index
                  ? "w-6 rounded-[2px] bg-[var(--color-teal)]"
                  : "w-2 rounded-full bg-[var(--color-teal)]/30 hover:bg-[var(--color-teal)]/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
