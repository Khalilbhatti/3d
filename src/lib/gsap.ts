/**
 * Central GSAP entrypoint. Registers ScrollTrigger + SplitText once, on the
 * client only. Import gsap/plugins from here everywhere so registration is
 * guaranteed and tree-shaking stays predictable.
 *
 * SplitText is bundled free in GSAP 3.13+.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Keep pinned sections stable when the mobile URL bar shows/hides.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText };
