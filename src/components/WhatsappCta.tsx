import { clinic } from "@/lib/data";

export default function WhatsappCta() {
  return (
    <section
      id="callback"
      className="relative overflow-hidden bg-[var(--color-navy)] py-16 sm:py-24"
    >
      {/* decorative glow, purely visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-[var(--color-teal)]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full bg-[var(--color-sky)]/20 blur-3xl"
      />

      <div className="container relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-[32px] font-bold leading-[1.1] text-white sm:text-[42px] lg:text-[48px]">
          Skip the Wait —{" "}
          <span className="text-[var(--color-sky)]">Chat With Us Now</span>
        </h2>

        <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-[var(--color-muted-navy)] sm:text-[16px]">
          Got a question or ready to book? Message us on WhatsApp and talk to
          our team directly — no forms, no hold music.
        </p>

        <a
          href={clinic.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-9 flex items-center gap-3 rounded-full bg-[#25D366] px-9 py-4 text-[16px] font-semibold text-white shadow-[0_15px_40px_rgba(37,211,102,0.4)] transition-transform hover:scale-[1.04] sm:px-10 sm:py-5 sm:text-[18px]"
        >
          {/* pulsing rings, purely decorative */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-[whatsapp-pulse_2.2s_ease-out_infinite]"
          />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-[whatsapp-pulse_2.2s_ease-out_infinite]"
            style={{ animationDelay: "1.1s" }}
          />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.4 1.26 4.82L2 22l5.36-1.29a9.9 9.9 0 0 0 4.68 1.19h.01c5.5 0 9.95-4.46 9.95-9.96C22 6.46 17.55 2 12.04 2Zm5.83 14.2c-.25.7-1.24 1.3-1.9 1.44-.51.1-1.17.19-3.4-.73-2.86-1.18-4.71-4.08-4.85-4.27-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.36.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.84 2.06.91 2.2.07.15.12.32.02.51-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2 1.1.98 2.03 1.29 2.32 1.43.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.7-.18 1.4Z" />
          </svg>
          Chat on WhatsApp
        </a>

        <p className="mt-6 text-[13px] text-[var(--color-muted-navy)]">
          Prefer to call? <a href={clinic.phoneHref} className="font-semibold text-white hover:underline">{clinic.phone}</a> · Open {clinic.hours}
        </p>
      </div>
    </section>
  );
}
