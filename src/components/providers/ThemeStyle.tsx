import { themeStyleString } from "@/config/theme";

/**
 * Server component that injects the theme palette as CSS custom properties on
 * :root. Runs during SSR so there is no colour flash. Edit src/config/theme.ts
 * to re-brand — this reflects it automatically.
 */
export function ThemeStyle() {
  return (
    <style
      id="gitztech-theme"
      // themeStyleString() is derived from a trusted, in-repo config object.
      dangerouslySetInnerHTML={{ __html: themeStyleString() }}
    />
  );
}
