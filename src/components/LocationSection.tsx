import Image from "next/image";
import Reveal from "./Reveal";
import { clinic, landmarks } from "@/lib/data";

export default function LocationSection() {
  return (
    <section id="reach" className="relative overflow-hidden bg-[var(--color-navy)]">
      {/* background photo, dimmed under a navy gradient so the overlaid text stays readable */}
      <div aria-hidden className="absolute inset-0">
        <Image src="/images/clinic-pic.jpeg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/95 via-[var(--color-navy)]/85 to-[var(--color-navy)]/75" />
      </div>

      <div className="container-fluid relative py-16 sm:py-20">
        <Reveal>
          <h2 className="max-w-2xl text-[32px] font-bold leading-[1.1] text-white sm:text-[42px] lg:text-[48px]">
            How to <span className="text-[var(--color-sky)]">Reach Us</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-[var(--color-muted-navy)] sm:text-[16px]">
            {clinic.address}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            {landmarks.map((landmark) => (
              <div key={landmark.label} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Image
                    src={landmark.icon}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain brightness-0 invert"
                  />
                </span>
                <span className="whitespace-nowrap text-[14px] text-white/90">{landmark.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={260}>
        <div className="relative h-[340px] w-full sm:h-[420px] lg:h-[480px]">
          <iframe
            title="Ranco Dental Clinic location map"
            src={clinic.mapEmbedSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  );
}
