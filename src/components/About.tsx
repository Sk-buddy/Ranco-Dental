import Image from "next/image";
import { clinic } from "@/lib/data";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PillCta({
  href,
  tone,
  children,
}: {
  href: string;
  tone: "teal" | "navy";
  children: React.ReactNode;
}) {
  const bg = tone === "teal" ? "bg-[var(--color-teal)]" : "bg-[var(--color-navy)]";
  const iconColor = tone === "teal" ? "text-[var(--color-teal)]" : "text-[var(--color-navy)]";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex shrink-0 items-center gap-2 rounded-full ${bg} py-1.5 pl-4 pr-1.5 text-[12px] font-semibold text-white transition-transform hover:scale-[1.02] sm:gap-4 sm:py-2 sm:pl-6 sm:pr-2 sm:text-[14px]`}
    >
      {children}
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ${iconColor} transition-transform group-hover:translate-x-0.5 sm:h-9 sm:w-9`}>
        <ArrowIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </span>
    </a>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[var(--color-tint)] py-16 sm:py-24">
      {/* organic decorative blobs, purely visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-80px] h-[420px] w-[420px] rounded-full bg-white/50 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[22%] top-[200px] hidden h-[380px] w-[380px] rounded-full bg-[var(--color-sky)]/30 blur-2xl lg:block"
      />

      <div className="container-fluid relative">
        <h2 className="relative z-10 max-w-3xl text-[32px] font-bold leading-[1.1] text-[var(--color-navy)] sm:text-[42px] lg:text-[48px]">
          More Than Dentistry —{" "}
          <span className="text-[var(--color-teal)]">It&rsquo;s Personal Care</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px]">
            <Image
              src="/images/clinic-pic.jpeg"
              alt="Modern treatment room at Ranco Dental Clinic"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="max-w-lg text-[16px] leading-[1.6] text-[var(--color-ink)] sm:text-[18px]">
              At {clinic.name}, we create an experience as personal as the
              care itself. From routine cleanings to advanced treatments like
              root canals and implants, every visit is designed around your
              comfort — using only the finest, top-quality materials because
              you deserve nothing but the best.
            </p>

            <div className="flex flex-nowrap gap-2 sm:flex-wrap sm:gap-4">
              <PillCta href={clinic.whatsappHref} tone="teal">
                Book Appointment
              </PillCta>
              <PillCta href={clinic.whatsappHref} tone="navy">
                Chat on WhatsApp
              </PillCta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
