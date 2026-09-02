import { Kicker, AnimatedQuote } from "@/components/typography/primitives";

/** The one real, attributed review anywhere in the codebase (previously
 *  rendered inline inside the now-deleted Chapter.tsx). Framed honestly as
 *  a single review, not a testimonials wall — no carousel, no plural
 *  "what our clients say," since there's exactly one to show. */
export function TestimonialSection() {
  return (
    <section id="testimonials" className="scroll-mt-[var(--header-h)] container-editorial py-20 md:py-28">
      <Kicker accent>In their words</Kicker>
      <div className="mt-10">
        <AnimatedQuote cite="malik_khurram · Verified Fiverr review">
          Great communication, great skills, project finished way ahead of schedule. I would be glad to work again
          with him.
        </AnimatedQuote>
      </div>
    </section>
  );
}
