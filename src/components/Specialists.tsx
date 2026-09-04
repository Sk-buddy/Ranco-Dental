import Image from "next/image";
import { clinic, specialists } from "@/lib/data";

export default function Specialists() {
  return (
    <section id="specialists" className="bg-[var(--color-tint)] py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-[32px] font-bold leading-[1.1] text-[var(--color-navy)] sm:text-[42px] lg:text-[48px]">
            Meet the <span className="text-[var(--color-teal)]">Specialists</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {specialists.map((doc) => (
            <div
              key={doc.name}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(4,53,82,0.08)]"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={doc.photo}
                  alt={doc.name}
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <h3 className="text-[19px] font-semibold text-[var(--color-navy)]">
                  {doc.name}
                </h3>
                <p className="text-[12px] text-[var(--color-teal-dark)]">{doc.qualification}</p>
                <p className="text-[13px] leading-[1.5] text-[var(--color-ink)]">
                  {doc.specialty}
                </p>

                <div className="mt-auto flex flex-col gap-3 pt-3">
                  <span className="w-fit rounded-full bg-[var(--color-tint)] px-2.5 py-1 text-[13px] font-normal text-[var(--color-teal-dark)]">
                    {doc.experience} Exp.
                  </span>
                  <a
                    href={clinic.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-full bg-[var(--color-navy)] px-5 py-2 text-center text-[13px] font-semibold text-white transition-transform hover:scale-[1.04]"
                  >
                    Book
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
