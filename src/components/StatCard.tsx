"use client";

import { useEffect, useRef, useState } from "react";
import Counter from "./Counter";

export default function StatCard({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-1 px-2 py-2 text-center transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-[42px] font-semibold leading-none text-[var(--color-navy)] sm:text-[52px] lg:text-[60px]">
        <Counter value={value} suffix={suffix} />
      </span>
      <span className="text-[15px] font-medium text-[var(--color-teal-dark)] sm:text-[16px]">
        {label}
      </span>
    </div>
  );
}
