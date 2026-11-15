"use client";

import { useEffect, useRef } from "react";
import { useSearchStore } from "@/store/search-store";
import type { PublishedContent } from "@/lib/content-schema";
import { AdminPanel } from "@/components/site/admin-panel";

/**
 * Seeds the client store with the published content rendered by the server
 * (so the first paint already shows the real content), checks whether this
 * browser has an admin session, and mounts the admin panel once for all pages.
 */
export function ContentHydrator({
  initial,
  children,
}: {
  initial: PublishedContent;
  children: React.ReactNode;
}) {
  const seeded = useRef(false);
  if (!seeded.current) {
    seeded.current = true;
    // In the browser, seed only once per page load so later navigations never
    // overwrite an admin's unpublished draft. On the server the store module
    // is shared between requests, so always seed with the latest content.
    if (typeof window === "undefined" || !useSearchStore.getState().hydrated) {
      useSearchStore.getState().hydrate(initial);
    }
  }

  const dirty = useSearchStore((s) => s.dirty);

  useEffect(() => {
    void useSearchStore.getState().checkSession();
  }, []);

  // Warn before leaving the page with unpublished edits.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  return (
    <>
      {children}
      <AdminPanel />
    </>
  );
}
