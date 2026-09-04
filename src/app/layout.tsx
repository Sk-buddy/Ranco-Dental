import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";
import StickyActions from "@/components/StickyActions";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = "https://rancodental.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ranco Dental Clinic | Best Dentist in Noida Sector 141",
  description:
    "Ranco Dental Clinic in Noida Sector 141 offers expert dental care for all ages — root canal, implants, braces, kids dentistry & smile makeovers. Book your appointment today.",
  keywords: [
    "dentist Noida Sector 141",
    "Ranco Dental Clinic",
    "root canal treatment Noida",
    "dental implants Noida",
    "kids dentistry Noida",
  ],
  openGraph: {
    title: "Ranco Dental Clinic | Best Dentist in Noida Sector 141",
    description:
      "Expert dental care for all ages — root canal, implants, braces, kids dentistry & smile makeovers in Noida Sector 141.",
    url: siteUrl,
    siteName: "Ranco Dental Clinic",
    images: ["/images/clinic-pic.jpeg"],
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${notoSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white text-[var(--color-ink)] antialiased">
        {children}
        <StickyActions />
      </body>
    </html>
  );
}
