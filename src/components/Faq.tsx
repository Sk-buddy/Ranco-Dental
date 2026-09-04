"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-[32px] font-bold leading-[1.1] text-[var(--color-navy)] sm:text-[42px] lg:text-[48px]">
            Frequently Asked <span className="text-[var(--color-teal)]">Questions</span>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-ink)] sm:text-[16px]">
            Everything you&apos;d want to know before your visit — if
            it&apos;s not here, just message us on WhatsApp.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="h-fit overflow-hidden rounded-2xl bg-[var(--color-tint)] shadow-[0_2px_10px_rgba(4,53,82,0.05)] transition-shadow hover:shadow-[0_6px_20px_rgba(4,53,82,0.08)]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-[15px] font-semibold leading-[1.4] text-[var(--color-navy)] sm:text-[16px]">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-teal)] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[14px] leading-[1.7] text-[var(--color-ink)] sm:px-6 sm:pb-6 sm:text-[15px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
