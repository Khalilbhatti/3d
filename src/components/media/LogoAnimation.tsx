import { cn } from "@/lib/utils";

/**
 * The brand's animated logo, looping silently — used as the WebGL services
 * orbit's centre hub and on the site preloader.
 */
export function LogoAnimation({ className }: { className?: string }) {
  return (
    <video
      src="/video/logo-animation.mp4"
      autoPlay
      loop
      muted
      playsInline
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
