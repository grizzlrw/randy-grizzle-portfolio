// components/VectorRenderer.tsx
import * as React from "react";
import type { GlyphComponent } from "../../types/glyph";

type VectorRendererProps = {
  title: string;
  description?: string;
  glyph: GlyphComponent;
};

export function VectorRenderer({
  title,
  description,
  glyph: Glyph,
}: VectorRendererProps) {
  const titleId = React.useId();
  const descId = React.useId();

  return (
    <Glyph
      // make the SVG fill its container
      preserveAspectRatio="xMidYMid meet" // fit entire viewBox; keep aspect
      role="img"
      aria-label={title}
      aria-describedby={description}
      //aria-labelledby={description ? `${titleId} ${descId}` : titleId}
    >
      <title id={titleId}>{title}</title>
      {description && <desc id={descId}>{description}</desc>}
    </Glyph>
  );
}
