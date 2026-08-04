/**
 * Registry of scroll-Y targets for chapters pinned inside a `<ChapterStack>`.
 * Those chapters all sit in the same `absolute inset-0` box, so the normal
 * `getElementById` + `getBoundingClientRect` approach `smoothScrollToId`
 * uses everywhere else always resolves to the same position — the top of
 * the whole pinned stack — no matter which chapter's id you ask for.
 * `ChapterStack` registers a live getter per chapter (derived from its
 * ScrollTrigger's resolved start/end) so nav links land on the right point
 * inside the pin instead of always the first chapter.
 */
type Getter = () => number | null;

const registry = new Map<string, Getter>();

export function registerChapterScrollTarget(id: string, getter: Getter) {
  registry.set(id, getter);
}

export function unregisterChapterScrollTarget(id: string) {
  registry.delete(id);
}

export function getChapterScrollTarget(id: string): number | null {
  return registry.get(id)?.() ?? null;
}
