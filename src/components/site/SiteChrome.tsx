"use client";

import { Header } from "./Header";
import { FullscreenMenu } from "./FullscreenMenu";
import { ScrollProgress } from "./ScrollProgress";
import { CustomCursor } from "./CustomCursor";
import { FullscreenViewer } from "@/components/gallery/FullscreenViewer";

/** Client-side persistent chrome mounted once in the root layout. */
export function SiteChrome() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <FullscreenMenu />
      <FullscreenViewer />
      <CustomCursor />
    </>
  );
}
