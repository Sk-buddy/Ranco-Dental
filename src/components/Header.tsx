import Image from "next/image";
import Link from "next/link";
import { clinic } from "@/lib/data";

const iconWrapMobile =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#42a0c4] text-white";
const iconWrapDesktop =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#42a0c4] text-white";

function InfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className={iconWrapDesktop}>{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[14px] font-semibold text-[var(--color-teal-dark)]">{label}</span>
        <span className="text-[13px] text-[var(--color-ink)]">{value}</span>
      </span>
    </>
  );
  const className = "flex items-center gap-3 whitespace-nowrap";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} group`}>
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-2.5 sm:pt-5">
      <div className="container-fluid">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[14px] bg-white/95 px-3 py-2.5 shadow-[0_8px_30px_rgba(4,53,82,0.10)] backdrop-blur sm:gap-4 sm:px-6 sm:py-3">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.webp"
              alt="Ranco Dental Clinic"
              width={400}
              height={124}
              priority
              className="h-10 w-auto sm:h-14 lg:h-16"
            />
          </Link>

          {/* Middle: opening hours, location, phone — icon + bold label + value from lg up, icons only below that */}
          <div className="flex items-center justify-center">
            <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
              <InfoItem icon={<ClockIcon className="h-5 w-5" />} label="Opening Hours" value={clinic.hours} />
              <span className="h-9 w-px shrink-0 bg-black/10" aria-hidden />
              <InfoItem
                icon={<LocationIcon className="h-5 w-5" />}
                label="Location"
                value={clinic.location}
                href={clinic.mapLink}
              />
              <span className="h-9 w-px shrink-0 bg-black/10" aria-hidden />
              <a href={clinic.phoneHref} className="flex items-center gap-3 whitespace-nowrap">
                <span className={iconWrapDesktop}>
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span className="text-[15px] font-normal text-[var(--color-ink)]">{clinic.phone}</span>
              </a>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <a href={clinic.mapLink} target="_blank" rel="noopener noreferrer" aria-label={clinic.location} className={iconWrapMobile}>
                <LocationIcon className="h-4 w-4" />
              </a>
              <span aria-label={`Open ${clinic.hours}`} title={clinic.hours} className={iconWrapMobile}>
                <ClockIcon className="h-4 w-4" />
              </span>
              <a href={clinic.phoneHref} aria-label={`Call ${clinic.phone}`} className={iconWrapMobile}>
                <PhoneIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <a
            href={clinic.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-[var(--color-navy)] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(4,53,82,0.35)] transition-transform hover:scale-[1.03] sm:px-7 sm:py-3 sm:text-sm"
          >
            <span className="sm:hidden">Book Now</span>
            <span className="hidden sm:inline">Book Appointment</span>
          </a>
        </div>
      </div>
    </header>
  );
}

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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="8.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
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
