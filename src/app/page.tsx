import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import LocationSection from "@/components/LocationSection";
import Testimonials from "@/components/Testimonials";
import Specialists from "@/components/Specialists";
import WhatsappCta from "@/components/WhatsappCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { clinic, faqs, services, specialists } from "@/lib/data";

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        name: clinic.name,
        image: "https://rancodental.com/images/clinic-pic.jpeg",
        telephone: clinic.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address,
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          postalCode: "201305",
          addressCountry: "IN",
        },
        openingHours: "Mo-Su 10:00-20:00",
        url: "https://rancodental.com",
        medicalSpecialty: services.map((s) => s.name),
        employee: specialists.map((doc) => ({
          "@type": "Person",
          name: doc.name,
          jobTitle: doc.specialty,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <LocationSection />
        <Testimonials />
        <Specialists />
        <WhatsappCta />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
