import type { Metadata } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
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
  title: "Best Dentist Noida Sector 141 | Ranco Dental Clinic Near you",
  description:
    "Book your appointment at the nearest advanced dental clinic in Noida! 15+ experienced dentists offering services like root canal treatment, scaling, implants, extractions, and more. Serving Noida Sectors 143, 142, 137, and 141.",
  keywords: [
    "dentist Noida Sector 141",
    "Ranco Dental Clinic",
    "root canal treatment Noida",
    "dental implants Noida",
    "kids dentistry Noida",
  ],
  openGraph: {
    title: "Best Dentist Noida Sector 141 | Ranco Dental Clinic Near you",
    description:
      "Book your appointment at the nearest advanced dental clinic in Noida! 15+ experienced dentists offering services like root canal treatment, scaling, implants, extractions, and more. Serving Noida Sectors 143, 142, 137, and 141.",
    url: siteUrl,
    siteName: "Ranco Dental Clinic Near you: Best Dentist Noida Sector 141",
    images: ["/images/logo.webp"],
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
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${notoSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-white text-[var(--color-ink)] antialiased">
        {children}
        <StickyActions />
      </body>
      <GoogleTagManager gtmId="GTM-NPFGZZK" />
    </html>
  );
}
