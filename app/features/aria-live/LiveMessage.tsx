"use client";

import { useEffect, useRef } from "react";
import { useLiveAnnouncer } from "./LiveAnnouncerContext";

type LiveMessageProps = {
  message: string;
  "aria-live": "polite" | "assertive";
  clearOnUnmount?: boolean;
};

/**
 * LiveMessage Component
 * 
 * Announces messages to screen readers via ARIA live regions.
 * Can be placed anywhere in the component tree as long as it's
 * within a LiveAnnouncer provider.
 * 
 * Announces on mount (if message is non-empty) and whenever the message changes.
 * 
 * @param message - The text to announce to screen readers
 * @param aria-live - The priority level: "polite" (wait for pause) or "assertive" (interrupt)
 * @param clearOnUnmount - Whether to clear the message when component unmounts (default: false)
 * 
 * @example
 * ```tsx
 * const [status, setStatus] = useState("");
 * 
 * <LiveMessage message={status} aria-live="polite" />
 * 
 * <button onClick={() => setStatus("Form submitted successfully")}>
 *   Submit
 * </button>
 * ```
 */
const LiveMessage = ({
  message,
  "aria-live": ariaLive,
  clearOnUnmount = false,
}: LiveMessageProps) => {
  const { announcePolite, announceAssertive } = useLiveAnnouncer();
  const prevMessage = useRef(message);

  const announce = (text: string) => {
    if (ariaLive === "assertive") {
      announceAssertive(text);
    } else if (ariaLive === "polite") {
      announcePolite(text);
    }
  };

  // Announce on mount if message is non-empty
  useEffect(() => {
    if (message) {
      announce(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Announce when message changes
  useEffect(() => {
    if (message !== prevMessage.current) {
      announce(message);
      prevMessage.current = message;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  // Clear on unmount if requested
  useEffect(() => {
    return () => {
      if (clearOnUnmount) {
        announce("");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearOnUnmount]);

  return null;
};

export default LiveMessage;
