import Image from "next/image";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-[32px] font-bold leading-[1.1] text-[var(--color-navy)] sm:text-[42px] lg:text-[48px]">
            Complete Dental Care,
            <br />
            <span className="text-[var(--color-teal)]">One Roof</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {services.map((service) => (
            <a
              key={service.slug}
              href={service.href}
              className="group flex flex-col overflow-hidden rounded-2xl bg-[var(--color-tint)] p-2.5 transition-transform hover:-translate-y-1 sm:p-3"
            >
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image
                  src={service.icon}
                  alt=""
                  width={80}
                  height={80}
                  className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2.5 px-1 pb-1 pt-3 sm:gap-4 sm:px-2 sm:pb-2 sm:pt-4">
                <h3 className="text-[14px] font-semibold leading-[1.3] text-[var(--color-navy)] sm:text-[19px]">
                  {service.name}
                </h3>

                <span className="mt-auto w-fit rounded-full bg-[var(--color-navy)] px-3 text-[11px] font-medium text-white sm:px-4" style={{ paddingBlock: "5px" }}>
                  View Details
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
