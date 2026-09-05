import Image from "next/image";
import Link from "next/link";
import type { Treatment } from "@/lib/treatments";
import { clinic } from "@/lib/data";
import FaqAccordion from "./FaqAccordion";
import WhatsappCta from "./WhatsappCta";
import { getProcedureIcon } from "./icons/ProcedureIcons";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

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
  const { name, shortName, tagline, heroImage, overview, reasons, procedure, whyChooseUs, faqs, doctor, testimonial } =
    treatment;

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
        {/* decorative tooth watermark, bleeding in from the left edge behind the image */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute -left-16 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 fill-[var(--color-sky)]/25 lg:block"
        >
          <path d="M12 3.5c-3 0-5.5 2-5.5 5 0 1.8.7 3 1.4 4.3.9 1.7 1.8 3.4 2.1 6.2.1.9.9 1.5 2 1.5s1.9-.6 2-1.5c.3-2.8 1.2-4.5 2.1-6.2.7-1.3 1.4-2.5 1.4-4.3 0-3-2.5-5-5.5-5Z" />
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
              src="/images/hero-2.jpg"
              alt="Dentist examining a patient at Ranco Dental Clinic"
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

            <div className="relative mt-20">
              {/* flowing connector: vertical wave on mobile, horizontal wave on desktop */}
              <svg
                aria-hidden
                viewBox="0 0 100 800"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-1/2 top-0 h-full w-[90px] -translate-x-1/2 lg:hidden"
              >
                <defs>
                  <linearGradient id="flow-line-mobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-teal)" />
                    <stop offset="100%" stopColor="var(--color-sky)" />
                  </linearGradient>
                </defs>
                <path
                  d="M50,0 C15,70 85,130 50,200 C15,270 85,330 50,400 C15,470 85,530 50,600 C15,670 85,730 50,800"
                  fill="none"
                  stroke="url(#flow-line-mobile)"
                  strokeWidth="2.5"
                  strokeDasharray="1 10"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                aria-hidden
                viewBox="0 0 1000 72"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 top-0 hidden h-[72px] w-full lg:block"
              >
                <defs>
                  <linearGradient id="flow-line-desktop" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--color-teal)" />
                    <stop offset="100%" stopColor="var(--color-sky)" />
                  </linearGradient>
                </defs>
                <path
                  d="M20,24 L100,24 C200,24 200,48 300,48 C400,48 400,24 500,24 C600,24 600,48 700,48 C800,48 800,24 900,24 L980,24"
                  fill="none"
                  stroke="url(#flow-line-desktop)"
                  strokeWidth="2.5"
                  strokeDasharray="1 10"
                  strokeLinecap="round"
                />
              </svg>

              <div className="relative grid grid-cols-1 gap-12 sm:gap-14 lg:grid-cols-5 lg:items-start lg:gap-6">
                {procedure.map((step, i) => {
                  const StepIcon = getProcedureIcon(step.title);
                  const floatUp = i % 2 === 0;
                  return (
                    <div
                      key={step.title}
                      className={`relative mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none ${
                        floatUp
                          ? "translate-x-2 lg:translate-x-0 lg:-translate-y-3"
                          : "-translate-x-2 lg:translate-x-0 lg:translate-y-3"
                      }`}
                    >
                      <span className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--color-tint)] ring-4 ring-white">
                        <StepIcon className="h-8 w-8 text-[var(--color-teal)]" />
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-navy)] text-[11px] font-bold text-white ring-2 ring-white">
                          {i + 1}
                        </span>
                      </span>

                      <div className="relative z-10 mt-5 rounded-2xl bg-white p-5 text-center shadow-[0_20px_45px_-20px_rgba(15,35,65,0.28)] ring-1 ring-black/[0.04] sm:p-6">
                        <h3 className="text-[15px] font-semibold text-[var(--color-navy)]">{step.title}</h3>
                        <p className="mt-2 text-[13px] leading-[1.7] text-[var(--color-ink)]">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="bg-[var(--color-tint)] py-16 sm:py-24">
        <div className="container">
          <h2 className="text-[24px] font-bold leading-[1.2] text-[var(--color-navy)] sm:text-[30px]">
            Why Choose Ranco Dental for {shortName}?
          </h2>
          <ChecklistGrid items={whyChooseUs} />
        </div>
      </section>

      {/* Testimonial + doctor */}
      {(testimonial || doctor) && (
        <section className="bg-white py-16 sm:py-24">
          <div className="container grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            {testimonial && (
              <figure className="flex flex-col gap-4 rounded-2xl bg-[var(--color-tint)] p-6 sm:p-8">
                <div className="flex items-center gap-1.5 text-[var(--color-teal)]" aria-hidden>
                  {"★★★★★"}
                </div>
                <blockquote className="text-[15px] leading-[1.7] text-[var(--color-ink)] sm:text-[16px]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-[13px] font-semibold text-white">
                    {initials(testimonial.name)}
                  </span>
                  <span className="text-[14px] font-semibold text-[var(--color-navy)]">{testimonial.name}</span>
                </figcaption>
              </figure>
            )}

            {doctor && (
              <div className="flex flex-col items-start gap-4 rounded-2xl bg-[var(--color-tint)] p-6 sm:p-8">
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
          <FaqAccordion items={faqs} columns={1} />
        </div>
      </section>

      <WhatsappCta />
    </>
  );
}
