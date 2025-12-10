import React from "react";

const offScreenStyle: React.CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  width: "1px",
  position: "absolute",
};

type MessageBlockProps = {
  message: string;
  "aria-live": "polite" | "assertive";
};

/**
 * MessageBlock Component
 * 
 * Renders an off-screen ARIA live region that screen readers will monitor.
 * The block is visually hidden but accessible to assistive technology.
 */
const MessageBlock = ({ message, "aria-live": ariaLive }: MessageBlockProps) => (
  <div
    style={offScreenStyle}
    role="log"
    aria-live={ariaLive}
    aria-relevant="additions"
    aria-atomic="true"
  >
    {message || ""}
  </div>
);

export default MessageBlock;
