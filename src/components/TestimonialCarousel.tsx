"use client";

import { useEffect, useState } from "react";

type Testimonial = { quote: string; name: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Review card — a real sliding carousel (the whole card track translates) when there's
 * more than one testimonial, with the active dot stretching into a rectangle below it. */
export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex-1 overflow-hidden rounded-2xl">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ width: `${items.length * 100}%`, transform: `translateX(-${index * (100 / items.length)}%)` }}
        >
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex h-full shrink-0 flex-col gap-4 rounded-2xl bg-[var(--color-tint)] p-6 sm:p-8"
              style={{ width: `${100 / items.length}%` }}
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
      </div>

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
