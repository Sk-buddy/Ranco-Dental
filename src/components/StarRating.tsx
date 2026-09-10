/** Renders a 5-star row with `rating` stars filled and the rest muted — used by both
 * testimonial carousels. Defaults to 5 (unrated reviews keep looking like a full rating). */
export default function StarRating({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? "text-[var(--color-teal)]" : "text-[var(--color-teal)]/25"}>
          ★
        </span>
      ))}
    </div>
  );
}
