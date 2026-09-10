import Image from "next/image";
import Link from "next/link";
import type { Treatment } from "@/lib/treatments";
import { clinic } from "@/lib/data";
import FaqAccordion from "./FaqAccordion";
import WhatsappCta from "./WhatsappCta";
import ProcedureTimeline from "./ProcedureTimeline";
import TestimonialCarousel from "./TestimonialCarousel";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChecklistGrid({ items }: { items: string[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)] text-white">
            <CheckIcon className="h-4 w-4" />
          </span>
          <span className="text-[14px] font-medium text-[var(--color-navy)]">{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function TreatmentTemplate({ treatment }: { treatment: Treatment }) {
  const {
    name,
    shortName,
    tagline,
    heroImage,
    overview,
    overviewImage,
    overviewImageAlt,
    reasons,
    procedure,
    whyChooseUs,
    faqs,
    doctor,
    testimonials,
  } = treatment;

  return (
    <>
      {/* Hero — full-width banner photo with overlaid content; the floating header sits on top of it */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] pt-[78px] sm:pt-[100px] lg:pt-[112px]">
        <div aria-hidden className="absolute inset-0">
          <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/90 via-[var(--color-navy)]/80 to-[var(--color-navy)]/95" />
        </div>

        <div className="container-fluid relative py-12 sm:py-16 lg:py-20">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--color-muted-navy)] hover:text-white"
          >
            <span aria-hidden>←</span> Back to Services
          </Link>

          <div className="mt-6 max-w-2xl">
            <h1 className="text-[32px] font-bold leading-[1.15] text-white sm:text-[42px] lg:text-[52px]">
              {name}
            </h1>
            <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-muted-navy)] sm:text-[16px]">
              {tagline}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={clinic.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[var(--color-navy)] transition-transform hover:scale-[1.03]"
              >
                Book Appointment
              </a>
              <a
                href={clinic.phoneHref}
                className="rounded-full border border-white/25 px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call {clinic.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        {/* decorative tooth watermark, tucked into the top-left corner (rotated) to fill the
            otherwise-empty white space above the heading */}
        <svg
          aria-hidden
          viewBox="0 0 512 512"
          className="pointer-events-none absolute -left-6 -top-8 hidden h-[360px] w-[360px] rotate-[135deg] fill-[var(--color-sky)]/25 lg:block"
        >
          <path d="M256 76 C218 76 190 54 151 54 C94 54 55 99 55 161 C55 210 75 249 94 280 C103 295 103 319 103 345 C103 408 117 464 153 475 C183 484 195 455 204 416 C214 372 225 329 256 329 C287 329 298 372 308 416 C317 455 329 484 359 475 C395 464 409 408 409 345 C409 319 409 295 418 280 C437 249 457 210 457 161 C457 99 418 54 361 54 C322 54 294 76 256 76 Z" />
        </svg>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[var(--color-teal)]/10 blur-3xl"
        />

        <div className="container relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-[24px] font-bold leading-[1.2] text-[var(--color-navy)] sm:text-[30px]">
              What is {shortName}?
            </h2>
            <div className="mt-5 flex max-w-lg flex-col gap-4">
              {overview.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-[1.7] text-[var(--color-ink)] sm:text-[16px]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-[28px] lg:mx-0 lg:ml-auto">
            <Image
              src={overviewImage || "/images/hero-2.jpg"}
              alt={overviewImageAlt || "Dentist examining a patient at Ranco Dental Clinic"}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-[center_30%]"
            />
          </div>
        </div>
      </section>

      {/* Reasons / signs you need it */}
      <section className="bg-[var(--color-tint)] py-16 sm:py-24">
        <div className="container">
          <h2 className="text-[24px] font-bold leading-[1.2] text-[var(--color-navy)] sm:text-[30px]">
            Why Do You Need {shortName}?
          </h2>
          <ChecklistGrid items={reasons} />
        </div>
      </section>

      {/* Procedure — cards floating along a flowing connector line */}
      {procedure && procedure.length > 0 && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-[24px] font-bold leading-[1.2] text-[var(--color-navy)] sm:text-[30px]">
                How is {shortName} Performed?
              </h2>
            </div>

            <ProcedureTimeline steps={procedure} />
          </div>
        </section>
      )}

      {/* Why choose us — full-bleed photo + navy checklist banner */}
      <section className="bg-[var(--color-navy)]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[280px] sm:h-[380px] lg:h-auto">
            <Image
              src="/images/hero-1.webp"
              alt="Dentist at Ranco Dental Clinic ready for a treatment"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[30%_25%]"
            />
          </div>

          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <h2 className="max-w-md text-[24px] font-bold leading-[1.25] text-white sm:text-[30px] lg:text-[34px]">
              Why Choose Ranco Dental for {shortName}?
            </h2>
            <ul className="mt-8 flex max-w-md flex-col gap-4">
              {whyChooseUs.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-teal)]">
                    <CheckIcon className="h-3.5 w-3.5 text-white" />
                  </span>
                  <span className="text-[15px] font-semibold text-white sm:text-[16px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonial + doctor — order swaps on mobile so the doctor card leads, review follows.
          When there's no real testimonial yet, the doctor card centers alone rather than
          leaving an empty column (no placeholder review gets fabricated to fill the gap). */}
      {((testimonials && testimonials.length > 0) || doctor) && (
        <section className="bg-white py-16 sm:py-24">
          <div
            className={
              testimonials && testimonials.length > 0
                ? "container grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12"
                : "container flex justify-center"
            }
          >
            {testimonials && testimonials.length > 0 && (
              <div className="order-2 lg:order-1">
                <TestimonialCarousel items={testimonials} />
              </div>
            )}

            {doctor && (
              <div
                className={`order-1 flex flex-col items-start gap-4 rounded-2xl bg-[var(--color-tint)] p-6 sm:p-8 ${
                  testimonials && testimonials.length > 0 ? "lg:order-2" : "w-full max-w-sm"
                }`}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                  <Image src={doctor.photo} alt={doctor.name} fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-[var(--color-teal-dark)]">
                    Your Specialist
                  </p>
                  <h3 className="mt-1 text-[17px] font-semibold text-[var(--color-navy)]">{doctor.name}</h3>
                  <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-ink)]">{doctor.specialty}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-[var(--color-tint)] py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-[24px] font-bold leading-[1.2] text-[var(--color-navy)] sm:text-[30px]">
              FAQs About {shortName}
            </h2>
          </div>
          <FaqAccordion items={faqs} columns={1} cardBg="white" />
        </div>
      </section>

      <WhatsappCta />
    </>
  );
}
