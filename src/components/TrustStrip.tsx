import { trustStats } from "@/lib/data";
import StatCard from "./StatCard";

export default function TrustStrip() {
  return (
    <section aria-label="Our track record" className="bg-white py-10 sm:py-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-[var(--color-tint)]">
          {trustStats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
