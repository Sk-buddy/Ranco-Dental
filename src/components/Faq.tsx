import { faqs } from "@/lib/data";
import FaqAccordion from "./FaqAccordion";

export default function Faq() {
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

        <FaqAccordion items={faqs} columns={2} />
      </div>
    </section>
  );
}
