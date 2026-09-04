import Image from "next/image";
import { clinic } from "@/lib/data";

const socialLinks = [
  {
    label: "Facebook",
    href: clinic.social.facebook,
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "Instagram",
    href: clinic.social.instagram,
    path: "M12 2.2c2.67 0 2.99.01 4.04.06 1.05.05 1.77.22 2.4.46.65.25 1.2.6 1.75 1.14.5.5.86 1.06 1.14 1.75.24.63.41 1.35.46 2.4.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.05 1.05-.22 1.77-.46 2.4a4.7 4.7 0 0 1-1.14 1.75 4.7 4.7 0 0 1-1.75 1.14c-.63.24-1.35.41-2.4.46-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-1.05-.05-1.77-.22-2.4-.46a4.7 4.7 0 0 1-1.75-1.14 4.7 4.7 0 0 1-1.14-1.75c-.24-.63-.41-1.35-.46-2.4C2.21 14.99 2.2 14.67 2.2 12s.01-2.99.06-4.04c.05-1.05.22-1.77.46-2.4.25-.65.6-1.2 1.14-1.75A4.7 4.7 0 0 1 5.6 2.67c.63-.24 1.35-.41 2.4-.46C8.99 2.16 9.31 2.15 12 2.15v.05Zm0 1.8c-2.63 0-2.93.01-3.97.06-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83-.05 1.04-.06 1.34-.06 3.97s.01 2.93.06 3.97c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.04.05 1.34.06 3.97.06s2.93-.01 3.97-.06c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.05-1.04.06-1.34.06-3.97s-.01-2.93-.06-3.97c-.04-.96-.2-1.48-.34-1.83a3 3 0 0 0-.74-1.13 3 3 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34-1.04-.05-1.34-.06-3.97-.06Zm0 3.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 1.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm4.6-1.98a1.03 1.03 0 1 1 0 2.06 1.03 1.03 0 0 1 0-2.06Z",
  },
  {
    label: "WhatsApp",
    href: clinic.whatsappHref,
    path: "M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.4 1.26 4.82L2 22l5.36-1.29a9.9 9.9 0 0 0 4.68 1.19h.01c5.5 0 9.95-4.46 9.95-9.96C22 6.46 17.55 2 12.04 2Zm5.83 14.2c-.25.7-1.24 1.3-1.9 1.44-.51.1-1.17.19-3.4-.73-2.86-1.18-4.71-4.08-4.85-4.27-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.36.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.84 2.06.91 2.2.07.15.12.32.02.51-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.75 1.24 1.61 2 1.1.98 2.03 1.29 2.32 1.43.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.7-.18 1.4Z",
  },
  {
    label: "YouTube",
    href: clinic.social.youtube,
    path: "M21.6 7.2s-.2-1.45-.83-2.1c-.8-.83-1.68-.84-2.09-.89C15.8 4 12 4 12 4h-.01s-3.8 0-6.68.21c-.41.05-1.3.06-2.1.89-.62.65-.82 2.1-.82 2.1S2.18 8.9 2.18 10.6v1.6c0 1.7.2 3.4.2 3.4s.2 1.45.82 2.1c.8.83 1.85.8 2.32.89 1.68.16 7.13.21 7.48.21.01 0 3.8-.01 6.68-.22.41-.05 1.3-.06 2.1-.89.62-.65.83-2.1.83-2.1s.21-1.7.21-3.4v-1.6c0-1.7-.21-3.4-.21-3.4ZM9.9 14.4V8.8l5.4 2.8-5.4 2.8Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] pb-20 pt-16 sm:pb-8 sm:pt-20">
      <div className="container">
        <div className="flex flex-col items-center gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-fit rounded-xl bg-white p-3">
            <Image
              src="/images/logo.webp"
              alt="Ranco Dental Clinic"
              width={400}
              height={124}
              className="h-[60px] w-auto"
            />
          </div>
          <a
            href={clinic.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--color-teal)] px-7 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Book Appointment
          </a>
        </div>

        <div className="flex flex-col-reverse items-center gap-4 pt-6 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-[var(--color-muted-navy)]">
            © {new Date().getFullYear()} Ranco Dental. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[var(--color-teal)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
