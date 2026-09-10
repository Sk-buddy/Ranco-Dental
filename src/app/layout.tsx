import type { Metadata, Viewport } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import "./globals.css";
import StickyActions from "@/components/StickyActions";

const GTM_ID = "GTM-NPFGZZK";

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Dentist Noida Sector 141 | Ranco Dental Clinic Near you",
    description:
      "Book your appointment at the nearest advanced dental clinic in Noida! 15+ experienced dentists offering services like root canal treatment, scaling, implants, extractions, and more. Serving Noida Sectors 143, 142, 137, and 141.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ranco Dental Clinic",
  },
  other: {
    "twitter:label1": "Written by",
    "twitter:data1": "Ranco Dental Clinic",
    "twitter:label2": "Time to read",
    "twitter:data2": "3 minutes",
    "msapplication-navbutton-color": "#0cb9d3",
  },
};

export const viewport: Viewport = {
  themeColor: "#0cb9d3",
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-screen bg-white text-[var(--color-ink)] antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <StickyActions />
      </body>
    </html>
  );
}
