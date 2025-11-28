// __mocks__/react-syntax-highlighter.tsx
import React from "react";

type Props = {
  children?: React.ReactNode;
  language?: string;
  style?: unknown;
};

export const Prism = ({ children }: Props) => {
  return <pre>{children}</pre>;
};

// Export a dummy style object with a11yDark to satisfy the import
export const a11yDark = {};
export const dark = {};

export default Prism;
