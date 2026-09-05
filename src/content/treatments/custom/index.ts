import type { ComponentType } from "react";

/**
 * Escape hatch for treatment pages that need a bespoke layout instead of the
 * shared JSON + TreatmentTemplate pipeline.
 *
 * Add an entry here (slug -> a full page component, no required props) and it
 * takes priority over any same-named JSON file in src/content/treatments/.
 * Remember to add the slug to generateStaticParams too (see src/app/[slug]/page.tsx)
 * if there's no matching JSON file for it.
 */
export const customTreatmentPages: Record<string, ComponentType> = {
  // "some-slug": SomeCustomComponent,
};
