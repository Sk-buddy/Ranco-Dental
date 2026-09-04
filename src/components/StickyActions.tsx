import { clinic } from "@/lib/data";

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path
        d="M12 21s-7-6.1-7-11.5C5 5.9 8.13 3 12 3s7 2.9 7 6.5C19 14.9 12 21 12 21Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.4 1.26 4.82L2 22l5.36-1.29a9.9 9.9 0 0 0 4.68 1.19h.01c5.5 0 9.95-4.46 9.95-9.96C22 6.46 17.55 2 12.04 2Zm5.83 14.2c-.25.7-1.24 1.3-1.9 1.44-.51.1-1.17.19-3.4-.73-2.86-1.18-4.71-4.08-4.85-4.27-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.36.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.84 2.06.91 2.2.07.15.12.32.02.51-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2 1.1.98 2.03 1.29 2.32 1.43.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.7-.18 1.4Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path
        d="M4 5c0-.55.45-1 1-1h2.7c.5 0 .92.36 1 .85l.65 3.9a1 1 0 0 1-.28.9L7.5 11.3a13.6 13.6 0 0 0 5.2 5.2l1.65-1.57a1 1 0 0 1 .9-.28l3.9.65c.49.08.85.5.85 1V19c0 .55-.45 1-1 1h-1.5C9.94 20 4 14.06 4 6.5V5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StickyActions() {
  return (
    <>
      {/* Desktop / tablet: floating circular buttons */}
      <div className="fixed bottom-5 right-5 z-50 hidden flex-col gap-3 sm:flex">
        <a
          href={clinic.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="h-[26px] w-[26px]" />
        </a>
        <a
          href={clinic.phoneHref}
          aria-label={`Call ${clinic.phone}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-teal)] text-white shadow-[0_10px_24px_rgba(12,185,211,0.45)] transition-transform hover:scale-105"
        >
          <PhoneIcon className="h-6 w-6" />
        </a>
      </div>

      {/* Mobile: full-width bottom tab bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 divide-x divide-black/10 rounded-t-2xl bg-white shadow-[0_-8px_24px_rgba(4,53,82,0.15)] sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={clinic.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 active:bg-[var(--color-tint)]"
        >
          <LocationIcon className="h-[18px] w-[18px] text-[var(--color-teal)]" />
          <span className="text-[12px] font-medium text-[var(--color-navy)]">Direction</span>
        </a>
        <a
          href={clinic.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 active:bg-[var(--color-tint)]"
        >
          <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
          <span className="text-[12px] font-medium text-[var(--color-navy)]">WhatsApp</span>
        </a>
        <a
          href={clinic.phoneHref}
          className="flex items-center justify-center gap-1.5 py-3 active:bg-[var(--color-tint)]"
        >
          <PhoneIcon className="h-[18px] w-[18px] text-[var(--color-teal)]" />
          <span className="text-[11px] font-medium text-[var(--color-navy)]">Call</span>
        </a>
      </div>
    </>
  );
}
