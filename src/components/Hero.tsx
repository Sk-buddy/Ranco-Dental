import Image from "next/image";
import { clinic } from "@/lib/data";

const heroImages = [
  { src: "/images/hero-1.webp", alt: "Dr. Neha Baliyan at Ranco Dental Clinic" },
  { src: "/images/hero-2.jpg", alt: "Dentist examining a patient at Ranco Dental Clinic" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-stretch overflow-hidden bg-[var(--color-navy)] pt-[78px] sm:pt-[100px] lg:pt-[112px]"
    >
      {/* soft radial glow, purely decorative, static */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[var(--color-teal)]/20 blur-3xl"
      />

      <div className="container-fluid grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-2 lg:gap-8 lg:py-6">
        {/* Text */}
        <div className="relative z-10 flex flex-col gap-6 py-6 lg:py-0">
          <span className="w-fit rounded-full bg-white/10 px-4 py-1.5 text-[12px] font-medium uppercase tracking-wide text-[var(--color-sky)]">
            {clinic.location} &middot; {clinic.hours}
          </span>

          <h1 className="max-w-2xl text-[44px] font-semibold leading-[1.05] text-white sm:text-[56px] lg:text-[64px]">
            Glow Up Your Smile with{" "}
            <span className="text-[var(--color-sky)]">Ranco Dental</span>
          </h1>

          <p className="max-w-[40rem] text-[15px] leading-[1.6] text-[var(--color-muted-navy)] sm:text-[16px]">
            {clinic.name} in Noida Sector 141 offers expert dental care for all
            ages — from routine cleanings to advanced treatments like root
            canals, implants, and smile makeovers.
          </p>

          <div className="flex flex-nowrap items-center gap-3 pt-2 sm:gap-4">
            <a
              href={clinic.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[155px] shrink-0 items-center justify-center rounded-full bg-white py-3 text-[13px] font-semibold text-[var(--color-navy)] transition-transform hover:scale-[1.03] sm:w-[220px] sm:py-3.5 sm:text-[14px]"
            >
              Book Now
            </a>
            <a
              href={clinic.phoneHref}
              className="flex w-[155px] shrink-0 items-center justify-center rounded-full border border-white/25 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/10 sm:w-[220px] sm:py-3.5 sm:text-[14px]"
            >
              Call {clinic.phone}
            </a>
          </div>
        </div>

        {/* Image — square source, shown at its native 1:1 ratio so nothing is cropped.
           Fills the full column width so its right edge lines up with the header's right edge. */}
        <div className="relative -mt-8 mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[20px] sm:-mt-12 sm:max-w-none lg:-mt-16">
          {heroImages.map((img, i) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="animate-[crossfade_11s_ease-in-out_infinite] object-contain"
              style={{ animationDelay: i === 0 ? "0s" : "-5.5s" }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/15" />
        </div>
      </div>
    </section>
  );
}
