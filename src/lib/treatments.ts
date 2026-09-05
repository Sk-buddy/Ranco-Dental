import fs from "node:fs";
import path from "node:path";

export type Treatment = {
  slug: string;
  name: string;
  /** Short form of the name, for use inside interpolated subheadings (e.g. "Root Canal Treatment"). */
  shortName: string;
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  seo: {
    title: string;
    description: string;
  };
  overview: string[];
  /** Short bullet answers to "why do you need this treatment" (signs/reasons). */
  reasons: string[];
  procedure?: { title: string; description: string }[];
  /** Short bullet reasons to choose Ranco Dental for this specific treatment. */
  whyChooseUs: string[];
  faqs: { question: string; answer: string }[];
  doctor?: {
    name: string;
    specialty: string;
    photo: string;
  };
  /** Patient reviews — rendered as a dot-navigated carousel when there's more than one. */
  testimonials?: {
    quote: string;
    name: string;
  }[];
};

const TREATMENTS_DIR = path.join(process.cwd(), "src/content/treatments");

/** Every treatment slug that has a JSON content file — drives generateStaticParams. */
export function getAllTreatmentSlugs(): string[] {
  if (!fs.existsSync(TREATMENTS_DIR)) return [];
  return fs
    .readdirSync(TREATMENTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

/** Loads one treatment's content by slug, or null if no JSON file exists for it. */
export function getTreatmentBySlug(slug: string): Treatment | null {
  const filePath = path.join(TREATMENTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Treatment;
}

