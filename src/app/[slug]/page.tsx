import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TreatmentTemplate from "@/components/TreatmentTemplate";
import { getAllTreatmentSlugs, getTreatmentBySlug, type Treatment } from "@/lib/treatments";
import { customTreatmentPages } from "@/content/treatments/custom";

const siteUrl = "https://rancodental.com";

export function generateStaticParams() {
  const slugs = new Set([...getAllTreatmentSlugs(), ...Object.keys(customTreatmentPages)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return {};

  const path = `/${slug}/`;
  return {
    title: treatment.seo.title,
    description: treatment.seo.description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title: treatment.seo.title,
      description: treatment.seo.description,
      url: `${siteUrl}${path}`,
      siteName: "Ranco Dental Clinic",
      images: [treatment.heroImage],
      locale: "en_IN",
      type: "website",
    },
  };
}

function TreatmentJsonLd({ treatment, slug }: { treatment: Treatment; slug: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalProcedure",
        name: treatment.name,
        description: treatment.seo.description,
        url: `${siteUrl}/${slug}/`,
      },
      {
        "@type": "FAQPage",
        mainEntity: treatment.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
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

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const CustomPage = customTreatmentPages[slug];
  if (CustomPage) {
    return (
      <>
        <Header />
        <main>
          <CustomPage />
        </main>
        <Footer />
      </>
    );
  }

  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  return (
    <>
      <TreatmentJsonLd treatment={treatment} slug={slug} />
      <Header />
      <main>
        <TreatmentTemplate treatment={treatment} />
      </main>
      <Footer />
    </>
  );
}
