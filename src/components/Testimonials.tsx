import TestimonialGallery from "./TestimonialGallery";

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-[32px] font-bold leading-[1.1] text-[var(--color-navy)] sm:text-[42px] lg:text-[48px]">
            What Our Patients <span className="text-[var(--color-teal)]">Say</span>
          </h2>
        </div>

        <div className="mt-12">
          <TestimonialGallery />
        </div>
      </div>
    </section>
  );
}
