"use client";

import { ReactNode } from "react";
import { LiveAnnouncer } from "../features/aria-live";

type LiveAnnouncerWrapperProps = {
  children: ReactNode;
};

/**
 * Client-side wrapper for LiveAnnouncer
 * 
 * This wrapper allows LiveAnnouncer to be used in the server-side root layout
 * by isolating the client component boundary.
 */
export default function LiveAnnouncerWrapper({ children }: LiveAnnouncerWrapperProps) {
  return <LiveAnnouncer>{children}</LiveAnnouncer>;
}
