"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Announcer from "./Announcer";

type LiveAnnouncerContextType = {
  announcePolite: (message: string) => void;
  announceAssertive: (message: string) => void;
};

const LiveAnnouncerContext = createContext<LiveAnnouncerContextType | undefined>(
  undefined
);

type LiveAnnouncerProps = {
  children: ReactNode;
};

/**
 * LiveAnnouncer Provider Component
 * 
 * Wraps the application to provide ARIA live region functionality throughout
 * the component tree. Should be placed high up in the component hierarchy.
 * 
 * Provides announcePolite and announceAssertive functions via context
 * that can be accessed by any descendant component.
 * 
 * @example
 * ```tsx
 * <LiveAnnouncer>
 *   <App />
 * </LiveAnnouncer>
 * ```
 */
export const LiveAnnouncer = ({ children }: LiveAnnouncerProps) => {
  const [politeMessage, setPoliteMessage] = useState("");
  const [assertiveMessage, setAssertiveMessage] = useState("");

  const announcePolite = (message: string) => {
    setPoliteMessage(message);
  };

  const announceAssertive = (message: string) => {
    setAssertiveMessage(message);
  };

  return (
    <LiveAnnouncerContext.Provider value={{ announcePolite, announceAssertive }}>
      <Announcer
        politeMessage={politeMessage}
        assertiveMessage={assertiveMessage}
      />
      {children}
    </LiveAnnouncerContext.Provider>
  );
};

/**
 * Hook to access live announcer functions
 * 
 * @throws Error if used outside of LiveAnnouncer provider
 * @returns Object with announcePolite and announceAssertive functions
 * 
 * @example
 * ```tsx
 * const { announcePolite } = useLiveAnnouncer();
 * announcePolite("Data loaded successfully");
 * ```
 */
export const useLiveAnnouncer = (): LiveAnnouncerContextType => {
  const context = useContext(LiveAnnouncerContext);
  if (!context) {
    throw new Error("useLiveAnnouncer must be used within a LiveAnnouncer provider");
  }
  return context;
};
