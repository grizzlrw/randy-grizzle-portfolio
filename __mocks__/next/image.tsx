// Mock for Next.js Image component in tests
import React from "react";

const NextImage = (props: React.ComponentProps<"img"> & { width?: number; height?: number; priority?: boolean; fill?: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { width, height, priority, fill, ...rest } = props;
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...rest} />;
};

export default NextImage;
