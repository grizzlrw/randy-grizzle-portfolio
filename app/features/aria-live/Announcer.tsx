
import React, { useEffect, useRef, useState } from "react";
import MessageBlock from "./MessageBlock";

type AnnouncerProps = {
  politeMessage?: string;
  assertiveMessage?: string;
};

/**
 * Announcer Component
 * 
 * Manages dual ARIA live regions for both polite and assertive messages.
 * Uses two regions per level and alternates between them to prevent
 * screen readers from swallowing rapid successive messages.
 * 
 * Based on the pattern from nga11y and react-aria-live.
 */

const Announcer = ({ politeMessage = "", assertiveMessage = "" }: AnnouncerProps) => {
  // Track which slot is active for each region
  const politeSlot = useRef(false);
  const assertiveSlot = useRef(false);
  const [politeMessages, setPoliteMessages] = useState(["", ""]);
  const [assertiveMessages, setAssertiveMessages] = useState(["", ""]);

  useEffect(() => {
    if (politeMessage) {
      politeSlot.current = !politeSlot.current;
      setPoliteMessages(() => {
        const next = ["", ""];
        next[politeSlot.current ? 1 : 0] = politeMessage;
        return next;
      });
    }
  }, [politeMessage]);

  useEffect(() => {
    if (assertiveMessage) {
      assertiveSlot.current = !assertiveSlot.current;
      setAssertiveMessages(() => {
        const next = ["", ""];
        next[assertiveSlot.current ? 1 : 0] = assertiveMessage;
        return next;
      });
    }
  }, [assertiveMessage]);

  return (
    <div>
      <MessageBlock aria-live="assertive" message={assertiveMessages[0]} />
      <MessageBlock aria-live="assertive" message={assertiveMessages[1]} />
      <MessageBlock aria-live="polite" message={politeMessages[0]} />
      <MessageBlock aria-live="polite" message={politeMessages[1]} />
    </div>
  );
};

export default Announcer;
